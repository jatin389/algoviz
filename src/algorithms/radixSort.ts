import type { SortStep } from '@/types';
import { snap, done } from './_utils';

const BASE = 10; // decimal digits

/**
 * Radix Sort (LSD, base 10) — repeatedly buckets the array by one decimal
 * digit at a time, from least to most significant, using a stable counting
 * sort for each digit pass. Once every digit position up to the largest
 * number's has been processed, the array is fully ordered.
 *
 * Like Counting Sort, no two elements are ever compared directly, so the
 * comparison counter stays at zero; the swap counter tracks writes into each
 * pass's output array.
 *
 * Assumes non-negative integer input, which holds for every array this app
 * generates.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* radixSort(input: number[]): Generator<SortStep, void, undefined> {
  let a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  const comparisons = 0; // never incremented — this sort makes no comparisons
  let swaps = 0;

  if (n === 0) {
    yield done(a, comparisons, swaps);
    return;
  }

  const max = Math.max(...a);

  // exp = 1, 10, 100, ... selects the ones, tens, hundreds, ... digit.
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= BASE) {
    const digitOf = (value: number) => Math.floor(value / exp) % BASE;
    const count = new Array(BASE).fill(0);

    // Tally occurrences of the current digit across the array.
    for (let i = 0; i < n; i++) {
      yield snap(a, [i], [], sorted, comparisons, swaps);
      count[digitOf(a[i])]++;
    }

    // Prefix-sum the digit counts into destination offsets.
    for (let d = 1; d < BASE; d++) {
      count[d] += count[d - 1];
    }

    // Place elements into this pass's output, walking backwards so elements
    // sharing a digit keep the relative order they had entering the pass —
    // the stability every earlier pass's ordering depends on.
    const output = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      const destination = --count[digitOf(a[i])];
      output[destination] = a[i];
      swaps++;
      yield snap(output, [], [destination], sorted, comparisons, swaps);
    }

    a = output;
  }

  yield done(a, comparisons, swaps);
}
