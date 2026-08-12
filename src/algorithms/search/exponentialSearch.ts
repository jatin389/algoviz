import type { SearchStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Exponential Search — doubles a bound (1, 2, 4, 8, ...) until it lands on
 * an element >= the target or runs off the end of the array, then binary
 * searches within the range the doubling narrowed us to. Useful when the
 * target is likely near the start of a (possibly unbounded) sorted array,
 * since it reaches small indices faster than binary search's fixed
 * midpoint-of-the-whole-array first probe.
 *
 * ASSUMES `input` is already sorted in ascending order, same precondition as
 * binarySearch — the caller is responsible for that.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* exponentialSearch(
  input: number[],
  target: number,
): Generator<SearchStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  let comparisons = 0;

  // Phase 1: find a range by doubling the bound until it overshoots the
  // target or runs off the end of the array. `low` trails one step behind
  // `bound`, tracking the last index confirmed to be < target — for n === 0
  // the loop condition is false immediately, so this needs no separate
  // empty-array guard (mirrors binarySearch's `low <= high` short-circuit).
  let low = 0;
  let bound = 1;
  while (bound < n) {
    comparisons++;
    yield snap(a, low, bound, null, bound, target, comparisons);

    if (a[bound] === target) {
      yield done(a, target, bound, comparisons);
      return;
    }
    if (a[bound] > target) break;

    low = bound;
    bound *= 2;
  }

  // Phase 2: binary search the range the doubling phase narrowed us to.
  // `low` may re-probe an index already known to be < target; that costs at
  // most one redundant comparison and keeps this phase identical to
  // binarySearch rather than special-casing the boundary.
  let high = Math.min(bound, n - 1);

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
