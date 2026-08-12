import type { SortAlgoKey } from './index';

/** One line of displayed pseudocode. Indentation is literal leading spaces. */
export type Pseudocode = readonly string[];

/**
 * Every sort in the registry is written out here today, but the type stays
 * `Partial` on purpose: the panel's empty state is what lets a new algorithm
 * ship before anyone has sat down to write its pseudocode, and widening this to
 * a total `Record` would turn that ordering freedom into a compile error at the
 * moment it is least welcome. A missing entry renders the empty state; adding
 * one later is a registry entry and no code changes.
 *
 * Entries are kept in registry order (see index.ts) so the two files can be read
 * side by side.
 *
 * INVARIANT: every `line` a generator yields must index into its entry here, and
 * the generator's terminal yield must tag the final line — which is why every
 * entry ends with a "done" line that nothing else in the run tags. Both are
 * enforced by tests in algorithms.test.ts.
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
  selection: [
    'for i = 0 to n - 1',
    '  min = i',
    '  for j = i + 1 to n - 1',
    '    if a[j] < a[min]: min = j',
    '  if min != i',
    '    swap a[i] and a[min]',
    '  a[i] is now in its final position',
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
  heap: [
    'siftDown(root, hi):',
    '  while root still has a child at or before hi',
    '    child = the larger child of root',
    '    if a[root] >= a[child]: stop',
    '    swap a[root] and a[child]; root = child',
    'build the max-heap: for i = n/2 - 1 down to 0',
    '  siftDown(i, n - 1)',
    'for end = n - 1 down to 1',
    '  swap a[0] and a[end]   // the max lands in its final slot',
    '  siftDown(0, end - 1)',
    'done — array is sorted',
  ],
  shell: [
    'for gap = n/2; gap > 0; gap = gap/2',
    '  for i = gap to n - 1',
    '    j = i',
    '    while j >= gap and a[j - gap] > a[j]',
    '      swap a[j - gap] and a[j]',
    '      j = j - gap',
    'done — array is sorted',
  ],
  comb: [
    'gap = n; swapped = true',
    'while gap > 1 or swapped',
    '  gap = max(1, floor(gap / 1.3))',
    '  swapped = false',
    '  for i = 0 while i + gap < n',
    '    if a[i] > a[i + gap]',
    '      swap a[i] and a[i + gap]; swapped = true',
    'done — array is sorted',
  ],
  counting: [
    'count = zeros, sized max(a) + 1',
    'for i = 0 to n - 1',
    '  count[a[i]] = count[a[i]] + 1',
    'for v = 1 to max',
    '  count[v] = count[v] + count[v - 1]   // where each value ends',
    'for i = n - 1 down to 0   // backwards keeps equal values in order',
    '  d = count[a[i]] - 1; count[a[i]] = d',
    '  output[d] = a[i]',
    'done — array is sorted',
  ],
  radix: [
    'for exp = 1, 10, 100, ... while max / exp > 0',
    '  digit(v) = (v / exp) mod 10',
    '  count = ten zeros',
    '  for i = 0 to n - 1',
    '    count[digit(a[i])] = count[digit(a[i])] + 1',
    '  for d = 1 to 9',
    '    count[d] = count[d] + count[d - 1]   // where each digit ends',
    '  for i = n - 1 down to 0   // backwards keeps the pass stable',
    '    k = count[digit(a[i])] - 1; count[digit(a[i])] = k',
    '    output[k] = a[i]',
    '  a = output   // now ordered by every digit up to exp',
    'done — array is sorted',
  ],
};
