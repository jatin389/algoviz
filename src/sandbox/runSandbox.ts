// The parent half of the sandbox: owns the iframe, drives one run, and
// guarantees the thing gets torn down however the run ends.
//
// Shape of a run: create a throwaway `<iframe sandbox="allow-scripts">`, post
// the snippet into it once it loads, accumulate validated steps until the
// runner says it is done, then destroy the iframe. One run per iframe — no
// reuse, so a snippet can never observe or interfere with a later one.
//
// The whole tape is collected *before* playback begins. That is what keeps
// `useStepPlayer` untouched: it is handed an ordinary local generator over an
// array (see `replaySteps`), exactly like a built-in algorithm, rather than
// something that has to await a message. Streaming into the player would have
// meant making its synchronous `pump()` async, which every existing category
// flows through.

import type { SortStep } from '@/types';
import {
  MAX_SANDBOX_ARRAY_LENGTH,
  MAX_SANDBOX_MS,
  MAX_SANDBOX_STEPS,
  SANDBOX_BATCH_SIZE,
  SANDBOX_SILENCE_MS,
} from './contract';
import { RUNNER_SRCDOC, WORKER_SOURCE } from './protocol';
import type { SandboxResponse, SandboxStopReason } from './protocol';
import { validateSortStep } from './validate';

export interface SandboxRunOptions {
  code: string;
  input: number[];
  maxSteps?: number;
  maxMs?: number;
  silenceMs?: number;
}

export interface SandboxRunResult {
  steps: SortStep[];
  reason: SandboxStopReason;
  /** Steps dropped by validation, and why the first one was dropped. */
  rejected: number;
  firstRejectReason: string | null;
  elapsedMs: number;
}

export interface SandboxRunHandle {
  result: Promise<SandboxRunResult>;
  /** Tear the iframe down early. Resolves the run with reason `cancelled`. */
  cancel: () => void;
}

export class SandboxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SandboxError';
  }
}

/** Plays a collected tape back as an ordinary generator, for `useStepPlayer`. */
export function* replaySteps(steps: readonly SortStep[]): Generator<SortStep, void, undefined> {
  for (const step of steps) yield step;
}

export function runSandbox(options: SandboxRunOptions): SandboxRunHandle {
  const maxSteps = options.maxSteps ?? MAX_SANDBOX_STEPS;
  const maxMs = options.maxMs ?? MAX_SANDBOX_MS;
  const silenceMs = options.silenceMs ?? SANDBOX_SILENCE_MS;

  const steps: SortStep[] = [];
  let rejected = 0;
  let firstRejectReason: string | null = null;
  const startedAt = Date.now();

  let frame: HTMLIFrameElement | null = null;
  let watchdog: ReturnType<typeof setTimeout> | null = null;
  let settled = false;

  let resolveRun!: (value: SandboxRunResult) => void;
  let rejectRun!: (error: Error) => void;
  const result = new Promise<SandboxRunResult>((resolve, reject) => {
    resolveRun = resolve;
    rejectRun = reject;
  });

  function teardown() {
    if (watchdog !== null) {
      clearTimeout(watchdog);
      watchdog = null;
    }
    window.removeEventListener('message', onMessage);

    if (frame) {
      // Ask first so the worker stops promptly, then remove the element —
      // which is the only hard kill available, since without
      // `allow-same-origin` the parent cannot reach into the frame beyond
      // postMessage. Destroying the document destroys the worker with it.
      try {
        frame.contentWindow?.postMessage({ type: 'sandbox:kill' }, '*');
      } catch {
        // A frame already detached or in a broken state needs no kill signal.
      }
      frame.remove();
      frame = null;
    }
  }

  function finish(reason: SandboxStopReason) {
    if (settled) return;
    settled = true;
    teardown();
    resolveRun({
      steps,
      reason,
      rejected,
      firstRejectReason,
      elapsedMs: Date.now() - startedAt,
    });
  }

  function fail(message: string) {
    if (settled) return;
    settled = true;
    teardown();
    rejectRun(new SandboxError(message));
  }

  function armWatchdog() {
    if (watchdog !== null) clearTimeout(watchdog);
    watchdog = setTimeout(() => finish('watchdog'), silenceMs);
  }

  function onMessage(event: MessageEvent) {
    // Identity check. `event.origin` is the string "null" for an opaque
    // origin and proves nothing, so the sender is authenticated by object
    // identity against our own frame instead. Without this, any other frame
    // or extension on the page could inject steps.
    if (!frame || event.source !== frame.contentWindow) return;

    const message = event.data as SandboxResponse | undefined;
    if (!message || typeof message !== 'object' || typeof message.type !== 'string') return;

    armWatchdog();

    switch (message.type) {
      case 'sandbox:steps': {
        if (!Array.isArray(message.steps)) return;
        for (const raw of message.steps) {
          const validation = validateSortStep(raw);
          if (!validation.ok) {
            rejected += 1;
            if (firstRejectReason === null) firstRejectReason = validation.reason;
            continue;
          }
          steps.push(validation.step);
        }
        return;
      }
      case 'sandbox:done':
        finish(message.reason);
        return;
      case 'sandbox:error':
        fail(message.message || 'The sandbox reported an unknown error.');
        return;
      default:
        // ready / started / killed are informational.
        return;
    }
  }

  window.addEventListener('message', onMessage);

  frame = document.createElement('iframe');
  // INVARIANT: `allow-scripts` WITHOUT `allow-same-origin`.
  //
  // Granting both together is a documented sandbox escape — with a
  // same-origin document, scripts inside can rewrite the frame's own sandbox
  // attribute and reload themselves out of containment. The pair must never
  // be combined here, and there is no configuration knob for it on purpose.
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.setAttribute('aria-hidden', 'true');
  frame.setAttribute('title', 'Algorithm sandbox runner');
  // Never given a visible surface: the frame emits data and the app draws it.
  // That is also what keeps UI-spoofing out of the threat model entirely.
  frame.style.cssText =
    'position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;';
  frame.srcdoc = RUNNER_SRCDOC;

  frame.addEventListener('load', () => {
    if (settled || !frame) return;
    frame.contentWindow?.postMessage(
      {
        type: 'sandbox:run',
        workerSource: WORKER_SOURCE,
        code: options.code,
        // Copied into a plain array at the boundary. Callers hand us whatever
        // they have, and a Vue ref's array is a reactive Proxy — structured
        // clone refuses to serialize one, so passing it straight through
        // throws before the snippet ever starts.
        input: Array.from(options.input, Number),
        maxSteps,
        maxMs,
        batchSize: SANDBOX_BATCH_SIZE,
        arrayCap: MAX_SANDBOX_ARRAY_LENGTH,
      },
      '*',
    );
  });

  document.body.appendChild(frame);
  armWatchdog();

  return {
    result,
    cancel: () => finish('cancelled'),
  };
}
