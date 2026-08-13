import { describe, it, expect } from 'vitest';
import { STARTER_SOURCE } from './contract';
import { validateSortStep } from './validate';

// The starter snippet is the contract's worked example: it is what a first-time
// visitor reads to learn the shape. If it ever drifted out of spec, every
// snippet copied from it would inherit the same fault — so it is executed here
// exactly the way the worker executes user code, and every snapshot it emits is
// put through the same validator the parent uses.

function compile(source: string) {
  const factory = new Function(`"use strict";${source}\n;return typeof run === "function" ? run : null;`);
  return factory() as ((input: number[]) => Generator<unknown>) | null;
}

describe('STARTER_SOURCE', () => {
  it('compiles to a `run` generator function', () => {
    const run = compile(STARTER_SOURCE);
    expect(typeof run).toBe('function');
    const iterator = run!([3, 1, 2]);
    expect(typeof iterator.next).toBe('function');
  });

  it('emits only snapshots the parent validator accepts', () => {
    const run = compile(STARTER_SOURCE)!;
    let count = 0;
    for (const raw of run([5, 3, 8, 1, 9, 2])) {
      const result = validateSortStep(raw);
      if (!result.ok) {
        throw new Error(`starter snippet emitted an invalid step at ${count}: ${result.reason}`);
      }
      count += 1;
      if (count > 10_000) throw new Error('starter snippet did not terminate');
    }
    expect(count).toBeGreaterThan(0);
  });

  it('actually sorts, and marks only the final snapshot done', () => {
    const run = compile(STARTER_SOURCE)!;
    const input = [5, 3, 8, 1, 9, 2];
    const steps = [...run(input)].map((raw) => {
      const result = validateSortStep(raw);
      if (!result.ok) throw new Error(result.reason);
      return result.step;
    });

    const last = steps[steps.length - 1];
    expect(last.done).toBe(true);
    expect(last.array).toEqual([1, 2, 3, 5, 8, 9]);
    // Every index reported as settled on the terminal snapshot.
    expect(last.sorted).toHaveLength(input.length);
    expect(steps.slice(0, -1).every((step) => !step.done)).toBe(true);
  });

  it('leaves the caller\'s input array untouched', () => {
    // The snippet copies `input` before mutating. If it did not, the app's
    // baseArray would be sorted in place and "reset" would have nothing to
    // restore.
    const run = compile(STARTER_SOURCE)!;
    const input = [4, 2, 7, 1];
    const snapshot = [...input];
    for (const _step of run(input)) void _step;
    expect(input).toEqual(snapshot);
  });
});
