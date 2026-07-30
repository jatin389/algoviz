// The only file in the app that touches Web Audio.
//
// Written against the raw API rather than a library on purpose: the candidates
// (Tone.js 79 KB, Howler 9.7 KB and sample-based, ZzFX 870 B behind a 20-argument
// positional call) all cost bytes or legibility, and none of them ship the two
// parts that are actually fiddly here — a rate limiter and a no-op fallback for
// environments with no AudioContext. Those are app-specific either way, so a
// library would have been paid for and still left this file to write.
//
// Everything degrades to a silent no-op rather than throwing: audio is a garnish,
// and neither a locked-down browser nor a Vitest run without an AudioContext
// should be able to break a visualization over it.

import type { CueName, CueSpec } from './cues';

/**
 * Cues of the same kind arriving closer together than this are dropped.
 *
 * The step delay floors at 4 ms (`useStepDelay.ts`), so cues can be requested
 * ~250 times a second. Stacking 28 ms tones every 4 ms would sum roughly seven
 * voices and clip hard. 45 ms is chosen to exceed the longest cue, so same-kind
 * cues can never overlap at all and clipping is structurally impossible rather
 * than merely unlikely; it also sits just above the ~20 Hz threshold where the
 * ear stops resolving separate events, past which extra cues carry no
 * information anyway. Tracked per cue kind so a burst of comparisons cannot
 * swallow the swap ping interleaved with it.
 *
 * At the default speed of 60 the delay is 84 ms, so this never engages in normal
 * use — only above roughly speed 80.
 */
export const MIN_CUE_INTERVAL_MS = 45;

/**
 * Starting a tone at full gain is a step discontinuity, which is broadband and
 * reads as a click. 1.5 ms removes it while staying well under the ~10 ms where
 * an attack starts to be heard as a fade-in.
 */
const ATTACK_S = 0.0015;

/** `exponentialRampToValueAtTime` can neither start from nor reach exactly 0. */
const SILENT = 0.0001;

/** Ceiling on the master gain, leaving ~14 dB of headroom at full volume. */
const MASTER_CEILING = 0.5;

export interface AudioEngineOptions {
  /**
   * Injected so tests can pass a stub: Vitest's node environment has no
   * AudioContext, and neither does jsdom.
   */
  createContext?: () => AudioContext | null;
  /** Defaults to MIN_CUE_INTERVAL_MS. */
  minIntervalMs?: number;
  /** Monotonic clock, injected so the rate limiter is testable directly. */
  now?: () => number;
}

export interface AudioEngine {
  /** False once building a context has failed; every play() is then a no-op. */
  readonly available: boolean;
  /** 0..1. Safe to call before the context exists — applied when it is built. */
  setVolume(volume: number): void;
  /** Must be called from inside a user-gesture handler, per the autoplay policy. */
  unlock(): void;
  /** True if a voice actually started. */
  play(spec: CueSpec, name: CueName): boolean;
  /** Closes the context. The engine stays reusable: the next play() rebuilds. */
  dispose(): void;
}

function defaultCreateContext(): AudioContext | null {
  try {
    const scope = window as Window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? scope.webkitAudioContext;
    return Ctor ? new Ctor() : null;
  } catch {
    return null;
  }
}

/** Swallows both a thrown and a rejected result, whatever the platform returns. */
function ignoreOutcome(result: unknown) {
  Promise.resolve(result).catch(() => {
    // A refused resume or close is not worth surfacing.
  });
}

export function createAudioEngine(options: AudioEngineOptions = {}): AudioEngine {
  const createContext = options.createContext ?? defaultCreateContext;
  const minIntervalMs = options.minIntervalMs ?? MIN_CUE_INTERVAL_MS;
  const now = options.now ?? (() => performance.now());

  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let failed = false;
  let volume = 1;
  let lastPlayedAt: Partial<Record<CueName, number>> = {};

  // Squared because loudness is roughly a power law: mapped linearly, the lower
  // half of a volume slider would do almost nothing.
  const masterGain = () => MASTER_CEILING * volume * volume;

  /** Builds the context on first use. False once it is known to be unavailable. */
  function ensureContext(): boolean {
    if (ctx) return true;
    if (failed) return false;

    let created: AudioContext | null = null;
    try {
      created = createContext();
    } catch {
      created = null;
    }
    if (!created) {
      failed = true;
      return false;
    }

    ctx = created;
    master = ctx.createGain();
    master.gain.value = masterGain();
    master.connect(ctx.destination);
    return true;
  }

  function setVolume(next: number) {
    volume = Math.min(1, Math.max(0, next));
    if (master) master.gain.value = masterGain();
  }

  function unlock() {
    if (!ensureContext() || !ctx) return;
    if (ctx.state === 'suspended') ignoreOutcome(ctx.resume());
  }

  function play(spec: CueSpec, name: CueName): boolean {
    const at = now();
    const last = lastPlayedAt[name];
    if (last !== undefined && at - last < minIntervalMs) return false;
    if (!ensureContext() || !ctx || !master) return false;

    try {
      const startAt = ctx.currentTime;
      const endAt = startAt + spec.durationMs / 1000;
      const osc = ctx.createOscillator();
      const envelope = ctx.createGain();

      osc.type = spec.wave;
      osc.frequency.value = spec.freq;

      envelope.gain.setValueAtTime(SILENT, startAt);
      // Clamped so a hypothetical cue shorter than the attack cannot invert the ramps.
      envelope.gain.linearRampToValueAtTime(spec.gain, Math.min(startAt + ATTACK_S, endAt));
      envelope.gain.exponentialRampToValueAtTime(SILENT, endAt);

      osc.connect(envelope);
      envelope.connect(master);
      // Without this the master gain accumulates an unbounded fan-in of dead nodes.
      osc.onended = () => {
        osc.disconnect();
        envelope.disconnect();
      };

      osc.start(startAt);
      osc.stop(endAt + 0.01);
    } catch {
      return false;
    }

    lastPlayedAt[name] = at;
    return true;
  }

  function dispose() {
    const closing = ctx;
    ctx = null;
    master = null;
    lastPlayedAt = {};
    if (closing) ignoreOutcome(closing.close());
  }

  return {
    get available() {
      return !failed;
    },
    setVolume,
    unlock,
    play,
    dispose,
  };
}
