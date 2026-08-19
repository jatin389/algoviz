import type { AlgoTone } from '@/theme/tones';

/** O(1)-per-index lookup sets, built once per step from a SortStep's
 *  highlight arrays — the same shape BarChart built inline before this file
 *  existed, now named so SortStage can build it once and every consumer
 *  shares it. */
export interface SortToneSets {
  comparing: Set<number>;
  swapping: Set<number>;
  sorted: Set<number>;
}

/**
 * The sorting precedence, in exactly one place: swapping > comparing >
 * sorted > idle. Every skin receives the resolved AlgoTone, never the raw
 * index arrays, so this function is the only place that can get the
 * precedence wrong.
 */
export function resolveSortTone(sets: SortToneSets, index: number): AlgoTone {
  if (sets.swapping.has(index)) return 'active';
  if (sets.comparing.has(index)) return 'probe';
  if (sets.sorted.has(index)) return 'settled';
  return 'idle';
}
