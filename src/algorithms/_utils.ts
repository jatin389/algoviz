// Shared step-snapshot helpers used by every sorting generator.
//
// The visualizer is driven entirely by these snapshots — each generator yields
// a plain, serializable object describing the *state of the world* at one step.
// This keeps algorithm logic fully decoupled from any rendering concern: the UI
// only ever reads these fields, never the algorithm internals.
//
// Snapshot shape:
//   {
//     array:       number[]  // a COPY of the array at this instant
//     comparing:   number[]  // indices currently being compared
//     swapping:    number[]  // indices currently being written/swapped
//     sorted:      number[]  // indices confirmed in their FINAL position
//     comparisons: number    // running comparison counter
//     swaps:       number    // running swap/write counter
//     done:        boolean   // true only on the terminal snapshot
//   }

import type { SortStep } from '@/types';

/**
 * Build an intermediate snapshot. The array is copied so downstream consumers
 * can hold onto a step without it mutating underneath them.
 */
export const snap = (
  array: readonly number[],
  comparing: number[],
  swapping: number[],
  // Every sort tracks finalized indices in a Set for O(1) membership; it is
  // spread into a plain array on the way into the snapshot.
  sorted: ReadonlySet<number>,
  comparisons: number,
  swaps: number,
): SortStep => ({
  array: [...array],
  comparing,
  swapping,
  sorted: [...sorted],
  comparisons,
  swaps,
  done: false,
});

/**
 * Build the terminal snapshot. Every index is marked sorted so the UI can paint
 * the whole array green on completion.
 */
export const done = (
  array: readonly number[],
  comparisons: number,
  swaps: number,
): SortStep => ({
  array: [...array],
  comparing: [],
  swapping: [],
  sorted: array.map((_, i) => i),
  comparisons,
  swaps,
  done: true,
});
