import type { SortAlgoKey } from './index';

/** One line of displayed pseudocode. Indentation is literal leading spaces. */
export type Pseudocode = readonly string[];

/**
 * Partial by design: the mechanism is generic, the content is not yet written
 * for every sort. A missing entry renders the panel's empty state; adding one
 * later is a registry entry and no code changes.
 *
 * INVARIANT: every `line` a generator yields must index into its entry here.
 * Enforced by a test in algorithms.test.ts.
 */
export const pseudocode: Partial<Record<SortAlgoKey, Pseudocode>> = {
  bubble: [
    'for i = 0 to n - 2',
    '  for j = 0 to n - 2 - i',
    '    if a[j] > a[j + 1]',
    '      swap a[j] and a[j + 1]',
    '  a[n - 1 - i] is now in its final position',
    'done — array is sorted',
  ],
  insertion: [
    'for i = 1 to n - 1',
    '  j = i',
    '  while j > 0 and a[j - 1] > a[j]',
    '    swap a[j - 1] and a[j]',
    '    j = j - 1',
    'done — array is sorted',
  ],
  quick: [
    'quicksort(lo, hi):',
    '  if lo >= hi: return',
    '  pivot = a[hi]; i = lo',
    '  for j = lo to hi - 1',
    '    if a[j] < pivot',
    '      swap a[i] and a[j]; i = i + 1',
    '  swap a[i] and a[hi]   // pivot into its final position',
    '  quicksort(lo, i - 1); quicksort(i + 1, hi)',
    'done — array is sorted',
  ],
  merge: [
    'mergesort(lo, hi):',
    '  if hi - lo <= 1: return',
    '  mid = (lo + hi) / 2',
    '  mergesort(lo, mid); mergesort(mid, hi)',
    '  while both halves still have items',
    '    compare a[i] and a[j]; move the smaller into buffer',
    '  append whatever remains of either half',
    '  copy the buffer back into a[lo..hi)',
    'done — array is sorted',
  ],
};
