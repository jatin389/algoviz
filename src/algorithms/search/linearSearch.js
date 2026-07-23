import { snap, done } from './_utils.js';

/**
 * Linear Search — scans the array left to right, comparing each element to
 * the target in turn until a match is found or the array is exhausted.
 * Makes no assumption about ordering, so it works on any input.
 *
 * @param {number[]} input
 * @param {number} target
 * @yields snapshot objects (see _utils.js)
 */
export function* linearSearch(input, target) {
  const a = [...input];
  const n = a.length;
  let comparisons = 0;

  for (let i = 0; i < n; i++) {
    comparisons++;
    yield snap(a, 0, n - 1, null, i, target, comparisons);

    if (a[i] === target) {
      yield done(a, target, i, comparisons);
      return;
    }
  }

  yield done(a, target, null, comparisons);
}
