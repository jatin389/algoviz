import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Heap Sort — build a max-heap in place, then repeatedly swap the root (largest
 * remaining element) to the end of the heap and sift the new root back down.
 * The sorted region grows from the tail.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* heapSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  // Sift a[root] down until the subtree rooted at `root` satisfies the max-heap
  // property. `hi` is the last valid index still inside the heap.
  function* siftDown(root: number, hi: number): Generator<SortStep, void, undefined> {
    while (2 * root + 1 <= hi) {
      let child = 2 * root + 1;
      // Pick the larger of the two children.
      if (child + 1 <= hi) {
        comparisons++;
        yield snap(a, [child, child + 1], [], sorted, comparisons, swaps, 2);
        if (a[child] < a[child + 1]) child++;
      }

      comparisons++;
      yield snap(a, [root, child], [], sorted, comparisons, swaps, 3);
      if (a[root] < a[child]) {
        [a[root], a[child]] = [a[child], a[root]];
        swaps++;
        yield snap(a, [], [root, child], sorted, comparisons, swaps, 4);
        root = child;
      } else {
        return;
      }
    }
  }

  // Phase 1: heapify.
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    yield* siftDown(i, n - 1);
  }

  // Phase 2: extract max repeatedly.
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    swaps++;
    yield snap(a, [], [0, end], sorted, comparisons, swaps, 8);
    sorted.add(end);
    yield* siftDown(0, end - 1);
  }
  sorted.add(0);

  yield done(a, comparisons, swaps, 10);
}
