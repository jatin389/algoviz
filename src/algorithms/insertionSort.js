import { snap, done } from './_utils.js';

/**
 * Insertion Sort — grow a sorted prefix one element at a time by shifting the
 * incoming element left past every larger neighbour until it lands in order.
 *
 * Note: the sorted prefix is only sorted *relative to itself* mid-run — elements
 * are not yet in their global final positions — so we intentionally do not mark
 * any index green until the terminal snapshot.
 *
 * @param {number[]} input
 * @yields snapshot objects (see _utils.js)
 */
export function* insertionSort(input) {
  const a = [...input];
  const n = a.length;
  const sorted = new Set();
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      yield snap(a, [j - 1, j], [], sorted, comparisons, swaps);
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        swaps++;
        yield snap(a, [], [j - 1, j], sorted, comparisons, swaps);
        j--;
      } else {
        break;
      }
    }
  }

  yield done(a, comparisons, swaps);
}
