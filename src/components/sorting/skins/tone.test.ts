import { describe, it, expect } from 'vitest';
import { resolveSortTone } from './tone';

function sets(overrides: { comparing?: number[]; swapping?: number[]; sorted?: number[] } = {}) {
  return {
    comparing: new Set(overrides.comparing ?? []),
    swapping: new Set(overrides.swapping ?? []),
    sorted: new Set(overrides.sorted ?? []),
  };
}

describe('resolveSortTone', () => {
  it('resolves idle when an index is in none of the sets', () => {
    expect(resolveSortTone(sets(), 3)).toBe('idle');
  });

  it('resolves probe when only comparing', () => {
    expect(resolveSortTone(sets({ comparing: [2] }), 2)).toBe('probe');
  });

  it('resolves active when only swapping', () => {
    expect(resolveSortTone(sets({ swapping: [5] }), 5)).toBe('active');
  });

  it('resolves settled when only sorted', () => {
    expect(resolveSortTone(sets({ sorted: [1] }), 1)).toBe('settled');
  });

  it('prefers swapping over comparing', () => {
    expect(resolveSortTone(sets({ comparing: [4], swapping: [4] }), 4)).toBe('active');
  });

  it('prefers swapping over sorted', () => {
    expect(resolveSortTone(sets({ sorted: [4], swapping: [4] }), 4)).toBe('active');
  });

  it('prefers comparing over sorted', () => {
    expect(resolveSortTone(sets({ sorted: [4], comparing: [4] }), 4)).toBe('probe');
  });

  it('prefers swapping over both comparing and sorted at once', () => {
    expect(resolveSortTone(sets({ comparing: [4], sorted: [4], swapping: [4] }), 4)).toBe('active');
  });

  it('does not confuse indices that are merely near a highlighted one', () => {
    const highlighted = sets({ swapping: [4] });
    expect(resolveSortTone(highlighted, 3)).toBe('idle');
    expect(resolveSortTone(highlighted, 5)).toBe('idle');
  });
});
