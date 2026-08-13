// Message shapes crossing the two isolation hops:
//
//   parent  <->  sandboxed iframe (opaque origin)  <->  worker (own thread)
//
// Everything here is untrusted on the way *in*. The iframe runs at an opaque
// origin, so `event.origin` is the string "null" and carries no information —
// identity is established by comparing `event.source` against the iframe's own
// `contentWindow` instead, and the payload is validated field by field
// afterwards (see ./validate.ts). Nothing in this file is a security boundary
// on its own; it just names the traffic.

/** Why a run stopped. Only `complete` means the snippet finished on its own. */
export type SandboxStopReason =
  | 'complete'
  | 'step-budget'
  | 'time-budget'
  | 'watchdog'
  | 'cancelled';

export interface SandboxRunRequest {
  type: 'sandbox:run';
  /** The worker's own bootstrap, shipped as text so the iframe can Blob it. */
  workerSource: string;
  /** The user's snippet, verbatim. */
  code: string;
  input: number[];
  maxSteps: number;
  maxMs: number;
  batchSize: number;
}

export interface SandboxKillRequest {
  type: 'sandbox:kill';
}

export type SandboxRequest = SandboxRunRequest | SandboxKillRequest;

export type SandboxResponse =
  | { type: 'sandbox:ready' }
  | { type: 'sandbox:started' }
  | { type: 'sandbox:steps'; steps: unknown[] }
  | { type: 'sandbox:done'; reason: SandboxStopReason; count: number }
  | { type: 'sandbox:killed' }
  | { type: 'sandbox:error'; message: string };

/**
 * The worker bootstrap, as source text.
 *
 * It is a string rather than a `?worker` import for one reason: the iframe
 * that hosts it has an opaque origin and cannot fetch anything from ours, so
 * the code has to travel to it by `postMessage` and be turned into a Blob URL
 * on the far side.
 *
 * Written in ES5-flavoured JS on purpose — it is never transpiled, since it
 * lives inside a string literal rather than in the module graph.
 *
 * Note the normalisation step: every snapshot is rebuilt as a plain object of
 * primitives before being posted. That guarantees it survives structured
 * clone (a snippet yielding a DOM node or a closure would otherwise throw on
 * postMessage) and keeps the payload small. It is NOT a trust boundary — user
 * code shares this realm and could replace `self.postMessage` outright, which
 * is exactly why the parent validates everything again.
 */
export const WORKER_SOURCE = `
'use strict';

function toNumberArray(value, cap) {
  if (!Array.isArray(value)) return [];
  var out = [];
  var limit = Math.min(value.length, cap);
  for (var i = 0; i < limit; i++) {
    var n = Number(value[i]);
    out.push(isFinite(n) ? n : 0);
  }
  return out;
}

function toCount(value) {
  var n = Number(value);
  return isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function normalize(raw, cap) {
  if (!raw || typeof raw !== 'object') return null;
  var step = {
    array: toNumberArray(raw.array, cap),
    comparing: toNumberArray(raw.comparing, cap),
    swapping: toNumberArray(raw.swapping, cap),
    sorted: toNumberArray(raw.sorted, cap),
    comparisons: toCount(raw.comparisons),
    swaps: toCount(raw.swaps),
    done: raw.done === true
  };
  var line = Number(raw.line);
  if (isFinite(line) && line >= 0) step.line = Math.floor(line);
  return step;
}

self.onmessage = function (event) {
  var data = event.data || {};
  var cap = data.arrayCap || 500;

  try {
    var factory = new Function(
      '"use strict";' + data.code + '\\n;return typeof run === "function" ? run : null;'
    );
    var runFn = factory();

    if (typeof runFn !== 'function') {
      self.postMessage({
        type: 'sandbox:error',
        message: 'No run function found. Define: function* run(input) { ... }'
      });
      return;
    }

    var iterator = runFn(data.input.slice());
    if (!iterator || typeof iterator.next !== 'function') {
      self.postMessage({
        type: 'sandbox:error',
        message: 'run did not return a generator. Declare it with function* and use yield.'
      });
      return;
    }

    var started = Date.now();
    var count = 0;
    var batch = [];
    var reason = 'complete';

    for (;;) {
      if (count >= data.maxSteps) { reason = 'step-budget'; break; }
      if (Date.now() - started > data.maxMs) { reason = 'time-budget'; break; }

      var result = iterator.next();
      if (result.done) { reason = 'complete'; break; }

      var step = normalize(result.value, cap);
      if (step === null) {
        self.postMessage({
          type: 'sandbox:error',
          message: 'Step ' + count + ' was not an object. Yield a snapshot object.'
        });
        return;
      }

      batch.push(step);
      count++;

      if (batch.length >= data.batchSize) {
        self.postMessage({ type: 'sandbox:steps', steps: batch });
        batch = [];
      }

      // A terminal snapshot ends the run without asking for one more value,
      // matching how useStepPlayer treats \`done\` on the built-in generators.
      if (step.done) { reason = 'complete'; break; }
    }

    if (batch.length) self.postMessage({ type: 'sandbox:steps', steps: batch });
    self.postMessage({ type: 'sandbox:done', reason: reason, count: count });
  } catch (err) {
    self.postMessage({
      type: 'sandbox:error',
      message: String((err && err.message) || err)
    });
  }
};
`;

/**
 * Assembled rather than written literally so this module can never itself
 * terminate a `<script>` block, whatever inlines it later. Setting `srcdoc` is
 * a property assignment and does not parse this file as HTML, so it is not
 * required today — it costs one line to keep true regardless.
 */
const CLOSE_SCRIPT = `</scr${'ipt>'}`;

/**
 * The iframe document.
 *
 * Deliberately tiny and static: it owns no application logic, only the hop
 * from `postMessage` to a Worker and back. Keeping the worker's code out of
 * here (it arrives in the run request) is what lets this stay a constant
 * instead of a template that would need escaping every time it changed.
 */
export const RUNNER_SRCDOC = `<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function () {
  'use strict';
  var worker = null;

  function reply(message) {
    // '*' as targetOrigin: this document has an opaque origin and cannot name
    // the parent's. The parent authenticates by event.source instead.
    parent.postMessage(message, '*');
  }

  function cleanup() {
    if (worker) {
      try { worker.terminate(); } catch (e) { /* already gone */ }
      worker = null;
    }
  }

  window.addEventListener('message', function (event) {
    var data = event.data || {};

    if (data.type === 'sandbox:run') {
      cleanup();
      try {
        var blob = new Blob([data.workerSource], { type: 'application/javascript' });
        var url = URL.createObjectURL(blob);
        worker = new Worker(url);
        URL.revokeObjectURL(url);

        worker.onmessage = function (ev) { reply(ev.data); };
        worker.onerror = function (ev) {
          reply({ type: 'sandbox:error', message: (ev && ev.message) || 'worker failed' });
        };

        worker.postMessage({
          code: data.code,
          input: data.input,
          maxSteps: data.maxSteps,
          maxMs: data.maxMs,
          batchSize: data.batchSize,
          arrayCap: data.arrayCap
        });
        reply({ type: 'sandbox:started' });
      } catch (err) {
        reply({
          type: 'sandbox:error',
          message: 'This browser blocked the sandboxed worker: ' + String((err && err.message) || err)
        });
      }
      return;
    }

    if (data.type === 'sandbox:kill') {
      cleanup();
      reply({ type: 'sandbox:killed' });
    }
  });

  reply({ type: 'sandbox:ready' });
})();
${CLOSE_SCRIPT}
</body>
</html>`;
