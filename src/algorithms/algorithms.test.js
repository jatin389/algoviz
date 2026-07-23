import { describe, it, expect } from 'vitest';
import { algorithms, algorithmList } from './index.js';

// Drive a generator to completion and return the sequence of snapshots.
function runToCompletion(generator, input) {
  const steps = [];
  for (const step of generator([...input])) steps.push(step);
  return steps;
}

function isSorted(arr) {
  return arr.every((v, i) => i === 0 || arr[i - 1] <= v);
}

const cases = [
  { name: 'random', input: [42, 7, 13, 99, 1, 56, 23, 8, 71, 4] },
  { name: 'already sorted', input: [1, 2, 3, 4, 5] },
  { name: 'reverse sorted', input: [9, 8, 7, 6, 5, 4, 3, 2, 1] },
  { name: 'duplicates', input: [5, 3, 5, 1, 3, 5, 1] },
  { name: 'single element', input: [42] },
  { name: 'two elements', input: [2, 1] },
];

describe('sorting algorithm generators', () => {
  for (const { key, name: algoName, generator } of algorithmList) {
    describe(algoName, () => {
      for (const { name, input } of cases) {
        it(`sorts ${name} correctly`, () => {
          const steps = runToCompletion(generator, input);
          const last = steps[steps.length - 1];
          const expected = [...input].sort((a, b) => a - b);

          expect(last.done).toBe(true);
          expect(last.array).toEqual(expected);
          expect(isSorted(last.array)).toBe(true);
          // Final snapshot marks every index as sorted.
          expect(last.sorted).toHaveLength(input.length);
        });
      }

      it('yields monotonically non-decreasing counters', () => {
        const steps = runToCompletion(generator, cases[0].input);
        let prevC = 0;
        let prevS = 0;
        for (const s of steps) {
          expect(s.comparisons).toBeGreaterThanOrEqual(prevC);
          expect(s.swaps).toBeGreaterThanOrEqual(prevS);
          prevC = s.comparisons;
          prevS = s.swaps;
        }
      });

      it(`is registered under key "${key}"`, () => {
        expect(algorithms[key].generator).toBe(generator);
      });
    });
  }

  it('handles an empty array without throwing', () => {
    for (const { generator } of algorithmList) {
      const steps = runToCompletion(generator, []);
      const last = steps[steps.length - 1];
      expect(last.done).toBe(true);
      expect(last.array).toEqual([]);
    }
  });
});
