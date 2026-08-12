import type { SearchStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Interpolation Search — like binary search, but instead of always probing
 * the midpoint it estimates the target's position by linear interpolation
 * between the range's endpoint values, assuming a roughly uniform
 * distribution. Converges much faster than binary search on uniformly
 * distributed data (O(log log n)) but degrades to O(n) on skewed data.
 *
 * ASSUMES `input` is already sorted in ascending order, same precondition as
 * binarySearch — the caller is responsible for that.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* interpolationSearch(
  input: number[],
  target: number,
): Generator<SearchStep, void, undefined> {
  const a = [...input];
  let low = 0;
  let high = a.length - 1;
  let comparisons = 0;

  while (low <= high && target >= a[low] && target <= a[high]) {
    let pos: number;

    if (a[low] === a[high]) {
      // The interpolation formula divides by (a[high] - a[low]); when every
      // element in the current range is equal that denominator is 0, which
      // would produce NaN instead of an index. But a uniform range is also
      // the easy case: the loop guard above already confirmed
      // a[low] <= target <= a[high], and here a[low] === a[high], so target
      // must equal that shared value. Probe `low` directly rather than
      // interpolating.
      pos = low;
    } else {
      pos = low + Math.floor(((target - a[low]) * (high - low)) / (a[high] - a[low]));
    }

    comparisons++;
    yield snap(a, low, high, pos, pos, target, comparisons);

    if (a[pos] === target) {
      yield done(a, target, pos, comparisons);
      return;
    }

    if (a[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  yield done(a, target, null, comparisons);
}
