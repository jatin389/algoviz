import { describe, it, expect } from 'vitest';
import { algorithms, algorithmList } from './index.js';

// Drive a generator to completion and return the sequence of snapshots.
function runToCompletion(generator, input, target) {
  const steps = [];
  for (const step of generator([...input], target)) steps.push(step);
  return steps;
}

// Sorted fixture with a duplicate value, shared by every case below unless a
// case supplies its own array (empty / single-element).
const sortedArray = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 67, 72, 91];

const cases = [
  { name: 'present at start', array: sortedArray, target: 2, found: true },
  { name: 'present at end', array: sortedArray, target: 91, found: true },
  { name: 'present in middle', array: sortedArray, target: 23, found: true },
  { name: 'absent, falls between two elements', array: sortedArray, target: 20, found: false },
  { name: 'absent, below minimum', array: sortedArray, target: -5, found: false },
  { name: 'absent, above maximum', array: sortedArray, target: 200, found: false },
  { name: 'empty array', array: [], target: 5, found: false },
  { name: 'single-element array, present', array: [42], target: 42, found: true },
  { name: 'single-element array, absent', array: [42], target: 7, found: false },
  { name: 'duplicate values, present', array: sortedArray, target: 67, found: true },
];

describe('search algorithm generators', () => {
  for (const { key, name: algoName, generator } of algorithmList) {
    describe(algoName, () => {
      for (const { name, array, target, found } of cases) {
        it(`handles "${name}" correctly`, () => {
          const steps = runToCompletion(generator, array, target);
          const last = steps[steps.length - 1];

          expect(last.done).toBe(true);
          if (found) {
            expect(last.foundIndex).not.toBeNull();
            expect(array[last.foundIndex]).toBe(target);
          } else {
            expect(last.foundIndex).toBeNull();
          }
        });
      }

      it('yields monotonically non-decreasing comparison counts', () => {
        const steps = runToCompletion(generator, sortedArray, 45);
        let prevC = 0;
        for (const s of steps) {
          expect(s.comparisons).toBeGreaterThanOrEqual(prevC);
          prevC = s.comparisons;
        }
      });

      it(`is registered under key "${key}"`, () => {
        expect(algorithms[key].generator).toBe(generator);
      });
    });
  }

  it('handles an empty array without throwing', () => {
    for (const { generator } of algorithmList) {
      const steps = runToCompletion(generator, [], 5);
      const last = steps[steps.length - 1];
      expect(last.done).toBe(true);
      expect(last.foundIndex).toBeNull();
    }
  });
});
