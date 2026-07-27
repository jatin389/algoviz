import type { SearchStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Binary Search — repeatedly halves the search range by comparing the target
 * to the midpoint element, discarding the half that cannot contain it.
 *
 * ASSUMES `input` is already sorted in ascending order. The caller (the
 * composable) is responsible for only ever generating sorted arrays before
 * invoking this generator — unsorted input yields undefined behavior.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* binarySearch(
  input: number[],
  target: number,
): Generator<SearchStep, void, undefined> {
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
