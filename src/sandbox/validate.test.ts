import { describe, it, expect } from 'vitest';
import { validateSortStep } from './validate';
import { MAX_SANDBOX_ARRAY_LENGTH } from './contract';

// These are the parent's defences against a snippet that sends nonsense rather
// than one that does something forbidden. Isolation covers the second case;
// nothing but this covers the first.

function goodStep(overrides: Record<string, unknown> = {}) {
  return {
    array: [3, 1, 2],
    comparing: [0, 1],
    swapping: [],
    sorted: [2],
    comparisons: 4,
    swaps: 1,
    done: false,
    ...overrides,
  };
}

describe('validateSortStep', () => {
  it('accepts a well-formed step and preserves its fields', () => {
    const result = validateSortStep(goodStep());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.step.array).toEqual([3, 1, 2]);
    expect(result.step.comparing).toEqual([0, 1]);
    expect(result.step.sorted).toEqual([2]);
    expect(result.step.comparisons).toBe(4);
    expect(result.step.swaps).toBe(1);
    expect(result.step.done).toBe(false);
  });

  it.each([
    ['null', null],
    ['a string', 'nope'],
    ['a number', 7],
  ])('rejects %s', (_label, input) => {
    expect(validateSortStep(input).ok).toBe(false);
  });

  it('rejects a missing or non-array `array`', () => {
    expect(validateSortStep(goodStep({ array: undefined })).ok).toBe(false);
    expect(validateSortStep(goodStep({ array: 'abc' })).ok).toBe(false);
  });

  it('rejects NaN and Infinity in the array, which would break the bar scale', () => {
    expect(validateSortStep(goodStep({ array: [1, NaN, 3] })).ok).toBe(false);
    expect(validateSortStep(goodStep({ array: [1, Infinity] })).ok).toBe(false);
  });

  it('rejects an array longer than the render cap', () => {
    const huge = new Array(MAX_SANDBOX_ARRAY_LENGTH + 1).fill(1);
    const result = validateSortStep(goodStep({ array: huge, comparing: [], sorted: [] }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toContain('over the');
  });

  it('rejects out-of-range highlight indices rather than clamping them', () => {
    // Clamping would silently highlight a different bar — a plausible-looking
    // run of the wrong algorithm, which is worse than refusing the step.
    const result = validateSortStep(goodStep({ comparing: [5] }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toContain('outside the array');
  });

  it('rejects negative and fractional highlight indices', () => {
    expect(validateSortStep(goodStep({ swapping: [-1] })).ok).toBe(false);
    expect(validateSortStep(goodStep({ swapping: [1.5] })).ok).toBe(false);
  });

  it('treats missing highlight lists as empty', () => {
    const result = validateSortStep({ array: [1, 2], done: true });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.step.comparing).toEqual([]);
    expect(result.step.swapping).toEqual([]);
    expect(result.step.sorted).toEqual([]);
  });

  it('clamps negative counters instead of rejecting — they only feed a readout', () => {
    const result = validateSortStep(goodStep({ comparisons: -5, swaps: -2 }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.step.comparisons).toBe(0);
    expect(result.step.swaps).toBe(0);
  });

  it('rejects non-numeric counters', () => {
    expect(validateSortStep(goodStep({ comparisons: 'lots' })).ok).toBe(false);
    expect(validateSortStep(goodStep({ swaps: {} })).ok).toBe(false);
  });

  it('only treats an exact `true` as done', () => {
    const truthy = validateSortStep(goodStep({ done: 1 }));
    expect(truthy.ok).toBe(true);
    if (!truthy.ok) return;
    expect(truthy.step.done).toBe(false);
  });

  it('keeps a valid line number and drops a nonsense one', () => {
    const withLine = validateSortStep(goodStep({ line: 3 }));
    expect(withLine.ok && withLine.step.line).toBe(3);

    const badLine = validateSortStep(goodStep({ line: -1 }));
    expect(badLine.ok && badLine.step.line).toBeUndefined();
  });

  it('ignores unexpected extra properties rather than passing them through', () => {
    const result = validateSortStep(goodStep({ evil: () => 'gotcha' }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect('evil' in result.step).toBe(false);
  });
});
