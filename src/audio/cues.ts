// The cue vocabulary, kept as plain data so the layers above and below can both
// stay ignorant of each other: `algorithms/sortCues.ts` decides *which* cue a
// step deserves without knowing how sound is made, and `audio/engine.ts` knows
// how to make a sound without knowing what an algorithm is.
//
// `Waveform` is declared here rather than imported from lib.dom's
// `OscillatorType` so this module has no DOM dependency at all — it is safe to
// import from anywhere, including pure algorithm code and node-env tests.

export type Waveform = 'sine' | 'square' | 'sawtooth' | 'triangle';

/** The events worth hearing. Extend here first, then in a cue resolver. */
export type CueName = 'compare' | 'swap';

export interface CueSpec {
  wave: Waveform;
  /** Hz. */
  freq: number;
  /** How long the tone rings, in ms. Also bounds the engine's rate limiter. */
  durationMs: number;
  /** Peak amplitude before the master volume, 0..1. */
  gain: number;
}

/**
 * Compare is the frequent background event, so it sits lower and quieter; swap
 * is the "something actually changed" event and cuts through.
 *
 * 660 is exactly 2x330 — an exact octave. At the rates these fire (up to ~22/s)
 * any non-integer frequency ratio would produce audible beating and dissonance,
 * whereas an octave stays consonant no matter how the two streams interleave.
 *
 * `triangle` rather than `square` for the swap ping: it keeps the bright odd
 * harmonics that make a "ping" read as a ping, without square's harshness,
 * which is genuinely unpleasant repeated dozens of times a second.
 */
export const CUES: Record<CueName, CueSpec> = {
  compare: { wave: 'sine', freq: 330, durationMs: 18, gain: 0.25 },
  swap: { wave: 'triangle', freq: 660, durationMs: 28, gain: 0.4 },
};

/**
 * Shared empty result for cue resolvers. Most steps produce no cue, and a
 * resolver runs on every advance — up to ~250 times a second at max speed — so
 * returning one frozen array beats allocating a fresh `[]` each time.
 */
export const NO_CUES: readonly CueName[] = Object.freeze([]);
