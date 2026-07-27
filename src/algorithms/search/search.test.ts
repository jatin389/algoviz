import { describe, it, expect } from 'vitest';
import type { SearchStep } from '@/types';
import { algorithms } from './index';
import type { SearchAlgoKey, SearchFn } from './index';

// Drive a generator to completion and return the sequence of snapshots.
function runToCompletion(generator: SearchFn, input: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
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
  for (const key of Object.keys(algorithms) as SearchAlgoKey[]) {
    const { name: algoName, description, generator } = algorithms[key];
    describe(algoName, () => {
      for (const { name, array, target, found } of cases) {
        it(`handles "${name}" correctly`, () => {
          const steps = runToCompletion(generator, array, target);
          const last = steps[steps.length - 1];

          expect(last.done).toBe(true);
          if (found) {
            expect(last.foundIndex).not.toBeNull();
            expect(array[last.foundIndex as number]).toBe(target);
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

      it(`registers complete metadata under "${key}"`, () => {
        expect(algoName).not.toBe('');
        expect(description).not.toBe('');
        expect(typeof generator).toBe('function');
      });
    });
  }

  it('handles an empty array without throwing', () => {
    for (const { generator } of Object.values(algorithms)) {
      const steps = runToCompletion(generator, [], 5);
      const last = steps[steps.length - 1];
      expect(last.done).toBe(true);
      expect(last.foundIndex).toBeNull();
    }
  });
});
