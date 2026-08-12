import { describe, it, expect } from 'vitest';
import type { SortStep } from '@/types';
import { algorithms } from './index';
import type { SortAlgoKey, SortFn } from './index';
import { pseudocode } from './pseudocode';
import type { Pseudocode } from './pseudocode';
import { sortCues } from './sortCues';
import type { CueName } from '@/audio/cues';

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
    expect(tagged.map(([key]) => key).sort()).toEqual([
      'bubble',
      'comb',
      'counting',
      'heap',
      'insertion',
      'merge',
      'quick',
      'radix',
      'selection',
      'shell',
    ]);
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

  // Every registered sort is tagged as of now, so the filter comes back empty
  // and the loop below does nothing. Kept rather than deleted: the count is the
  // same kind of tripwire it has always been — it makes the number move visibly
  // in a diff rather than declaring that an untagged sort is forbidden — and the
  // loop is the contract it guards, that a sort without pseudocode still runs to
  // completion and simply highlights nothing. A future sort shipped ahead of its
  // pseudocode (which `pseudocode`'s `Partial` type deliberately allows) bumps
  // this literal back up and puts the loop back to work unchanged.
  it('leaves the untagged algorithms running with no line', () => {
    const untagged = (Object.keys(algorithms) as SortAlgoKey[]).filter((k) => !(k in pseudocode));
    expect(untagged).toHaveLength(0);
    for (const key of untagged) {
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      expect(steps[steps.length - 1].done).toBe(true);
      expect(steps.every((s) => s.line === undefined)).toBe(true);
    }
  });
});

// Deliberately not asserting Object.keys(sortCues) === Object.keys(pseudocode):
// coupling the two registries would make a legitimate future "cues added
// before pseudocode" change fail for the wrong reason. The pseudocode-only
// literals above stay untouched — they are about `pseudocode`, not cues.
describe('sort cue tagging', () => {
  // Same literal as `pseudocode`'s "covers exactly the algorithms that are
  // tagged" above, and coincidentally identical today, but the two lists move
  // independently: this one tracks `sortCues`, not `pseudocode`.
  const cued = Object.keys(sortCues) as SortAlgoKey[];

  it('covers exactly the algorithms wired for audio cues', () => {
    expect(cued.sort()).toEqual(['bubble', 'insertion', 'merge', 'quick']);
  });

  for (const key of cued) {
    const resolver = sortCues[key];
    if (!resolver) continue; // narrows for TS below; every key in `cued` has an entry by construction

    it(`${key} yields at most one cue per step`, () => {
      // Load-bearing invariant of the whole audio design: defaultSortCues
      // assumes `comparing` and `swapping` are mutually exclusive on every
      // step, so a step that trips both would silently drop one cue. Nothing
      // else pins this assumption, so pin it here.
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      for (const step of steps) {
        expect(resolver(step).length).toBeLessThanOrEqual(1);
      }
    });

    it(`${key} fires both a compare and a swap cue across a full run`, () => {
      // Catches a resolver registered against a sort that never actually
      // triggers one of the two cue kinds.
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      const fired = new Set<CueName>();
      for (const step of steps) {
        for (const cue of resolver(step)) fired.add(cue);
      }
      expect(fired.has('compare')).toBe(true);
      expect(fired.has('swap')).toBe(true);
    });

    it(`${key} yields no cues on its terminal step`, () => {
      const steps = runToCompletion(algorithms[key].generator, cases[0].input);
      const last = steps[steps.length - 1];
      expect(last.done).toBe(true);
      expect(resolver(last)).toHaveLength(0);
    });
  }
});
