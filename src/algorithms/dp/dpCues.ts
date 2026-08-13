import type { DpAlgoKey } from './index';
import type { CueName } from '@/audio/cues';
import { NO_CUES } from '@/audio/cues';
import type { DpStep } from '@/types';

/** Maps a single step snapshot to the cues it should trigger, if any. */
export type DpCueResolver = (step: DpStep) => readonly CueName[];

/**
 * The two phases of a DP run sound different, and that is the whole point of
 * wiring audio here at all: the fill is a long, even stream of `compare` pips —
 * one per cell, at a steady rate — and then it stops, and the traceback walks
 * back through a handful of `hit` tones. With the tab in the background you can
 * hear a run finish without watching it, and you can hear how much longer the
 * fill takes on a 30x30 table than on a 6x6 one.
 *
 * `cursor !== null` is the phase test rather than `path.length === 0`, because
 * `DpStep` defines `cursor` as "the cell just written; null during traceback" —
 * so it *is* the phase, whereas an empty path also describes every fill step of
 * an algorithm whose traceback turned out to be empty.
 *
 * Returns the shared `NO_CUES` rather than a fresh `[]` on the silent path:
 * this runs on every forward advance, up to ~250 times a second at max speed.
 */
export const defaultDpCues: DpCueResolver = (step) => {
  if (step.cursor !== null) return ['compare'];
  if (step.path.length > 0) return ['hit'];
  return NO_CUES;
};

/**
 * Partial by design, matching `sortCues.ts`: the mechanism is generic and a
 * missing entry simply means silence, so an algorithm can ship before anyone
 * has decided what it should sound like. All eight share `defaultDpCues` today
 * because the fill/traceback split is the only distinction worth hearing and it
 * is identical across the category — an algorithm that wanted, say, a `miss` on
 * an unreachable coin-change cell can be given its own resolver here with no
 * change anywhere else.
 */
export const dpCues: Partial<Record<DpAlgoKey, DpCueResolver>> = {
  fib: defaultDpCues,
  'coin-change': defaultDpCues,
  lis: defaultDpCues,
  knapsack: defaultDpCues,
  'subset-sum': defaultDpCues,
  lcs: defaultDpCues,
  'edit-distance': defaultDpCues,
  'matrix-chain': defaultDpCues,
};
