import { snap, done } from './_utils.js';

/**
 * Quick Sort (Lomuto partition scheme) — pick the last element as the pivot,
 * partition the range so smaller elements sit left of the pivot and larger to
 * the right, then recurse into each side. The pivot lands in its final position
 * after every partition.
 *
 * @param {number[]} input
 * @yields snapshot objects (see _utils.js)
 */
export function* quickSort(input) {
  const a = [...input];
  const sorted = new Set();
  let comparisons = 0;
  let swaps = 0;

  function* qsort(lo, hi) {
    if (lo > hi) return;
    if (lo === hi) {
      sorted.add(lo);
      return;
    }

    const pivot = a[hi]; // pivot value
    let i = lo;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      // hi is the pivot index — highlight it alongside the scanned element.
      yield snap(a, [j, hi], [], sorted, comparisons, swaps);
      if (a[j] < pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          swaps++;
          yield snap(a, [], [i, j], sorted, comparisons, swaps);
        }
        i++;
      }
    }

    if (i !== hi) {
      [a[i], a[hi]] = [a[hi], a[i]];
      swaps++;
      yield snap(a, [], [i, hi], sorted, comparisons, swaps);
    }
    // Pivot is now in its final resting position.
    sorted.add(i);

    yield* qsort(lo, i - 1);
    yield* qsort(i + 1, hi);
  }

  yield* qsort(0, a.length - 1);
  yield done(a, comparisons, swaps);
}
