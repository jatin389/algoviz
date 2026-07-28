import { describe, it, expect } from 'vitest';
import type { SortStep } from '@/types';
import { algorithms } from './index';
import type { SortAlgoKey, SortFn } from './index';
import { pseudocode } from './pseudocode';
import type { Pseudocode } from './pseudocode';

// Drive a generator to completion and return the sequence of snapshots.
function runToCompletion(generator: SortFn, input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  for (const step of generator([...input])) steps.push(step);
  return steps;
}

function isSorted(arr: number[]): boolean {
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
  for (const key of Object.keys(algorithms) as SortAlgoKey[]) {
    const { name: algoName, description, generator } = algorithms[key];
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

      it(`registers complete metadata under "${key}"`, () => {
        expect(algoName).not.toBe('');
        expect(description).not.toBe('');
        expect(typeof generator).toBe('function');
      });
    });
  }

  it('handles an empty array without throwing', () => {
    for (const { generator } of Object.values(algorithms)) {
      const steps = runToCompletion(generator, []);
      const last = steps[steps.length - 1];
      expect(last.done).toBe(true);
      expect(last.array).toEqual([]);
    }
  });
});

// Editing a pseudocode array without renumbering the `line` arguments in the
// generator is invisible on screen except as a highlight on the wrong line, so
// the index bounds are pinned here instead.
describe('pseudocode line tagging', () => {
  // Entries rather than keys: `Partial<Record<...>>` types a lookup as possibly
  // undefined, and destructuring the entry keeps `lines` narrowed.
  const tagged = Object.entries(pseudocode) as [SortAlgoKey, Pseudocode][];

  it('covers exactly the algorithms that are tagged', () => {
    expect(tagged.map(([key]) => key).sort()).toEqual(['bubble', 'insertion', 'merge', 'quick']);
  });

  for (const [key, lines] of tagged) {
    it(`${key} yields only in-range line indices`, () => {
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      for (const step of steps) {
        if (step.line === undefined) continue;
        expect(step.line).toBeGreaterThanOrEqual(0);
        expect(step.line).toBeLessThan(lines.length);
      }
    });

    it(`${key} still tags at least one step`, () => {
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      expect(steps.some((s) => s.line !== undefined)).toBe(true);
    });

    it(`${key} tags its terminal step`, () => {
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      expect(steps[steps.length - 1].line).toBe(lines.length - 1);
    });
  }

  it('leaves the untagged algorithms running with no line', () => {
    const untagged = (Object.keys(algorithms) as SortAlgoKey[]).filter((k) => !(k in pseudocode));
    expect(untagged).toHaveLength(6);
    for (const key of untagged) {
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      expect(steps[steps.length - 1].done).toBe(true);
      expect(steps.every((s) => s.line === undefined)).toBe(true);
    }
  });
});
