import { describe, it, expect } from 'vitest';
import type { SortStep } from '@/types';
import { algorithms } from './index';
import type { SortAlgoKey } from './index';
import { pseudocode } from './pseudocode';
import { source, sourceMap, buildSourceMap } from './source';

const INPUT = [42, 7, 13, 99, 1, 56, 23, 8, 71, 4];

function runToCompletion(key: SortAlgoKey): SortStep[] {
  const steps: SortStep[] = [];
  for (const step of algorithms[key].generator([...INPUT])) steps.push(step);
  return steps;
}

const keys = Object.keys(algorithms) as SortAlgoKey[];

describe('generator source text', () => {
  for (const key of keys) {
    it(`${key} imports a non-empty file`, () => {
      const { file, text } = source[key];
      expect(file).toMatch(/^\w+\.ts$/);
      expect(text.length).toBeGreaterThan(0);
      // ?raw must hand back the real module, not a transformed or empty stub.
      expect(text).toContain(`export function* ${algorithms[key].generator.name}`);
    });
  }
});

// buildSourceMap parses source text with a regex, which is the fragile part of
// the source view: a reformatted yield stops matching and the highlight
// silently disappears. These pin the parse both ways.
describe('buildSourceMap', () => {
  it('maps a tag to the line its yield sits on', () => {
    const map = buildSourceMap(
      [
        'const a = 1;',
        'yield snap(a, [j, j + 1], [], sorted, c, s, 2);',
        'yield done(a, c, s, 5);',
      ].join('\n'),
    );
    expect(map.get(2)).toEqual([1]);
    expect(map.get(5)).toEqual([2]);
  });

  it('collects every line sharing a tag', () => {
    const map = buildSourceMap(
      ['yield snap(a, [i], [], sorted, c, s, 3);', 'yield snap(a, [], [i], sorted, c, s, 3);'].join(
        '\n',
      ),
    );
    expect(map.get(3)).toEqual([0, 1]);
  });

  it('does not mistake a trailing index expression for a tag', () => {
    const map = buildSourceMap('yield snap(a, [], [lo + k], sorted, comparisons, swaps);');
    expect(map.size).toBe(0);
  });

  it('ignores yields that are not snapshot calls', () => {
    const map = buildSourceMap(['yield* qsort(lo, i - 1);', 'yield* msort(0, 8);'].join('\n'));
    expect(map.size).toBe(0);
  });
});

// The invariant the source view rests on: every tag a generator actually emits
// has to resolve to a line, or the panel highlights nothing while the algorithm
// visibly runs. This is the source-side twin of the bounds check in
// algorithms.test.ts.
describe('step tags resolve to source lines', () => {
  const tagged = Object.keys(pseudocode) as SortAlgoKey[];

  for (const key of tagged) {
    it(`${key} resolves every tag it emits`, () => {
      const map = sourceMap(key);
      const emitted = new Set(
        runToCompletion(key)
          .map((step) => step.line)
          .filter((line): line is number => line !== undefined),
      );

      expect(emitted.size).toBeGreaterThan(0);
      for (const tag of emitted) {
        expect(map.get(tag)?.length ?? 0).toBeGreaterThan(0);
      }
    });

    it(`${key} points at lines that really do yield`, () => {
      const lines = source[key].text.split('\n');
      for (const indices of sourceMap(key).values()) {
        for (const index of indices) expect(lines[index]).toContain('yield');
      }
    });
  }

  // Every sort is tagged today, so this loop has nothing to iterate. The count
  // is asserted rather than left implicit because a bare loop over an empty list
  // passes while asserting nothing — the emptiness has to be the claim, not an
  // accident. `pseudocode` is deliberately `Partial`, so a sort shipped ahead of
  // its pseudocode bumps this back above zero and puts the loop back to work.
  it('leaves the untagged algorithms with an empty map', () => {
    const untagged = keys.filter((k) => !(k in pseudocode));
    expect(untagged).toHaveLength(0);
    for (const key of untagged) {
      expect(sourceMap(key).size).toBe(0);
    }
  });
});
