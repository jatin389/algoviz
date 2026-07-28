import { describe, it, expect } from 'vitest';
import { createRng, parseSeed } from './rng';

describe('createRng', () => {
  it('produces a bit-identical sequence for the same seed', () => {
    const a = createRng(1234);
    const b = createRng(1234);
    const seqA = Array.from({ length: 1000 }, () => a.next());
    const seqB = Array.from({ length: 1000 }, () => b.next());
    expect(seqA).toEqual(seqB);
  });

  it('diverges for different seeds', () => {
    const a = createRng(1234);
    const b = createRng(5678);
    const seqA = Array.from({ length: 1000 }, () => a.next());
    const seqB = Array.from({ length: 1000 }, () => b.next());
    expect(seqA).not.toEqual(seqB);
  });

  it('always returns a value in [0, 1)', () => {
    const rng = createRng(42);
    for (let i = 0; i < 10000; i++) {
      const value = rng.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('int(1, 99) never escapes range and hits both endpoints', () => {
    const rng = createRng(7);
    let sawMin = false;
    let sawMax = false;
    for (let i = 0; i < 10000; i++) {
      const value = rng.int(1, 99);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(99);
      if (value === 1) sawMin = true;
      if (value === 99) sawMax = true;
    }
    expect(sawMin).toBe(true);
    expect(sawMax).toBe(true);
  });

  it('int(5, 5) always returns 5', () => {
    const rng = createRng(99);
    for (let i = 0; i < 100; i++) {
      expect(rng.int(5, 5)).toBe(5);
    }
  });

  it('pick returns undefined for an empty list', () => {
    const rng = createRng(1);
    expect(rng.pick([])).toBeUndefined();
  });

  it('pick always returns a member of a non-empty list', () => {
    const rng = createRng(2);
    const items = ['a', 'b', 'c'];
    for (let i = 0; i < 100; i++) {
      expect(items).toContain(rng.pick(items));
    }
  });

  it('restarts the sequence for a fresh instance with the same seed', () => {
    const drained = createRng(42);
    for (let i = 0; i < 500; i++) drained.next();

    const fresh = createRng(42);
    const expected = createRng(42);
    for (let i = 0; i < 10; i++) {
      expect(fresh.next()).toBe(expected.next());
    }
  });
});

describe('parseSeed', () => {
  it('rejects blank and non-numeric input', () => {
    expect(parseSeed('')).toBeNull();
    expect(parseSeed('   ')).toBeNull();
    expect(parseSeed('abc')).toBeNull();
    expect(parseSeed('NaN')).toBeNull();
    expect(parseSeed('Infinity')).toBeNull();
    expect(parseSeed('1.5')).toBeNull();
    expect(parseSeed(null)).toBeNull();
    expect(parseSeed(undefined)).toBeNull();
  });

  it('accepts integer strings', () => {
    expect(parseSeed('0')).toBe(0);
    expect(parseSeed('42')).toBe(42);
  });

  it('normalizes negative integers via >>> 0', () => {
    expect(parseSeed('-1')).toBe(4294967295);
  });
});
