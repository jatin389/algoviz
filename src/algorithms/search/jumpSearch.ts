import type { SearchStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Jump Search — advances in fixed-size blocks of √n, testing only the last
 * element of each block, until it finds a block whose last element is ≥ the
 * target (or runs off the end of the array). Then falls back to a linear
 * scan within that single block. Trades binary search's O(log n) for a
 * simpler O(√n) by only ever jumping forward, never backward — useful when
 * backward seeks are expensive (e.g. sequential storage).
 *
 * ASSUMES `input` is already sorted in ascending order, same precondition as
 * binarySearch — the caller is responsible for that.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* jumpSearch(
  input: number[],
  target: number,
): Generator<SearchStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  let comparisons = 0;

  // Guarded explicitly: unlike binarySearch's `low <= high`, the block-jump
  // condition below can't naturally fall through to "zero iterations" for an
  // empty array, so an early return keeps the empty case snap-free.
  if (n === 0) {
    yield done(a, target, null, comparisons);
    return;
  }

  const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));
  let prev = 0;
  let curr = Math.min(blockSize, n) - 1;

  // Phase 1: jump block by block until the block's last element is >= the
  // target, or we've reached the final block.
  while (true) {
    comparisons++;
    yield snap(a, prev, curr, null, curr, target, comparisons);

    if (a[curr] === target) {
      yield done(a, target, curr, comparisons);
      return;
    }
    if (a[curr] > target || curr === n - 1) break;

    prev = curr + 1;
    curr = Math.min(curr + blockSize, n - 1);
  }

  // Phase 2: linear scan the identified block. `curr` was already compared
  // in phase 1 and found not to match, so the scan stops just short of it.
  for (let i = prev; i < curr; i++) {
    comparisons++;
    yield snap(a, prev, curr, null, i, target, comparisons);

    if (a[i] === target) {
      yield done(a, target, i, comparisons);
      return;
    }
  }

  yield done(a, target, null, comparisons);
}
