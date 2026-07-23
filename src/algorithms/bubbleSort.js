import { snap, done } from './_utils.js';

/**
 * Bubble Sort — repeatedly step through the list, comparing adjacent pairs and
 * swapping them if they are out of order. After each outer pass the largest
 * remaining element "bubbles" to its final position at the tail.
 *
 * @param {number[]} input
 * @yields snapshot objects (see _utils.js)
 */
export function* bubbleSort(input) {
  const a = [...input];
  const n = a.length;
  const sorted = new Set();
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      yield snap(a, [j, j + 1], [], sorted, comparisons, swaps);

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        yield snap(a, [], [j, j + 1], sorted, comparisons, swaps);
      }
    }
    // The tail element for this pass is now in its final position.
    sorted.add(n - 1 - i);
  }
  sorted.add(0);

  yield done(a, comparisons, swaps);
}
