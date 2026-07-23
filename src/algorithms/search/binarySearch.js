import { snap, done } from './_utils.js';

/**
 * Binary Search — repeatedly halves the search range by comparing the target
 * to the midpoint element, discarding the half that cannot contain it.
 *
 * ASSUMES `input` is already sorted in ascending order. The caller (the
 * composable) is responsible for only ever generating sorted arrays before
 * invoking this generator — unsorted input yields undefined behavior.
 *
 * @param {number[]} input sorted ascending
 * @param {number} target
 * @yields snapshot objects (see _utils.js)
 */
export function* binarySearch(input, target) {
  const a = [...input];
  let low = 0;
  let high = a.length - 1;
  let comparisons = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    yield snap(a, low, high, mid, mid, target, comparisons);

    if (a[mid] === target) {
      yield done(a, target, mid, comparisons);
      return;
    }

    if (a[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  yield done(a, target, null, comparisons);
}
