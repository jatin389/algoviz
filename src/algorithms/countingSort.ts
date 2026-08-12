import type { SortStep } from '@/types';
import { snap, done } from './_utils';

/**
 * Counting Sort — tallies how many times each value occurs, converts those
 * tallies into destination offsets via a prefix sum, then places every
 * element directly into its final slot. No two elements are ever compared
 * against each other, so the comparison counter stays at zero throughout —
 * that absence is itself the point this algorithm demonstrates. The swap
 * counter instead tracks each write into the output array.
 *
 * Assumes non-negative integer input, which holds for every array this app
 * generates.
 *
 * @yields snapshot objects (see _utils.ts)
 */
export function* countingSort(input: number[]): Generator<SortStep, void, undefined> {
  const a = [...input];
  const n = a.length;
  const sorted = new Set<number>();
  const comparisons = 0; // never incremented — this sort makes no comparisons
  let swaps = 0;

  if (n === 0) {
    // Tagged with the same final pseudocode line as the ordinary exit below.
    // The empty-array path is a second terminal yield, and the code panel would
    // otherwise clear its highlight on the one step it is guaranteed to show.
    yield done(a, comparisons, swaps, 8);
    return;
  }

  const max = Math.max(...a);
  const count = new Array(max + 1).fill(0);

  // Phase 1: tally how many times each value occurs.
  for (let i = 0; i < n; i++) {
    yield snap(a, [i], [], sorted, comparisons, swaps, 2);
    count[a[i]]++;
  }

  // Phase 2: turn counts into prefix sums — count[v] now holds the index just
  // past where the LAST occurrence of value v belongs in the output.
  //
  // Deliberately yields nothing, so the pseudocode lines for this phase are
  // never highlighted: the snapshot shape can only describe the array, and this
  // phase touches the tally table alone. Emitting a step per iteration would
  // stall the visualization on frames where every bar is visibly identical.
  for (let v = 1; v <= max; v++) {
    count[v] += count[v - 1];
  }

  // Phase 3: walk the input backwards (preserves relative order of equal
  // values, keeping the sort stable) and drop each element into its final
  // slot. The output starts zero-filled so every bar has a defined height
  // before it's placed.
  const output = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const value = a[i];
    const destination = --count[value];
    output[destination] = value;
    swaps++;
    yield snap(output, [], [destination], sorted, comparisons, swaps, 7);
  }

  yield done(output, comparisons, swaps, 8);
}
