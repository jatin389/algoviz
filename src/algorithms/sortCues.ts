import type { SortAlgoKey } from './index';
import type { CueName } from '@/audio/cues';
import { NO_CUES } from '@/audio/cues';
import type { SortStep } from '@/types';

/** Maps a single step snapshot to the cues it should trigger, if any. */
export type SortCueResolver = (step: SortStep) => readonly CueName[];

/**
 * `comparing` and `swapping` are mutually exclusive across all four sorts this
 * resolver is registered for, so in practice at most one cue name is ever
 * returned — the array shape exists so a future sort with, say, a simultaneous
 * compare-and-swap step could return both without a signature change.
 *
 * Returns the shared `NO_CUES` rather than a fresh `[]` on the silent path:
 * this runs on every forward advance, up to ~250 times a second at max speed.
 */
export const defaultSortCues: SortCueResolver = (step) => {
  if (step.comparing.length > 0) return ['compare'];
  if (step.swapping.length > 0) return ['swap'];
  return NO_CUES;
};

/**
 * Partial by design: the mechanism is generic, the content is not yet written
 * for every sort. A missing entry means that algorithm stays silent even with
 * sound enabled; adding one later is a registry entry and no code changes.
 */
export const sortCues: Partial<Record<SortAlgoKey, SortCueResolver>> = {
  bubble: defaultSortCues,
  insertion: defaultSortCues,
  quick: defaultSortCues,
  merge: defaultSortCues,
};
