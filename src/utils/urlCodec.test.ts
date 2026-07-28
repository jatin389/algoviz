import { describe, it, expect } from 'vitest';
import { algorithms } from '@/algorithms';
import {
  decodeInt,
  decodeKey,
  encodeCoord,
  decodeCoord,
  encodeNumberList,
  decodeNumberList,
} from './urlCodec';

describe('decodeInt', () => {
  it('clamps values above the max', () => {
    expect(decodeInt('1e9', 10, 100)).toBe(100);
  });

  it('clamps values below the min', () => {
    expect(decodeInt('-5', 10, 100)).toBe(10);
  });

  it('passes through in-range values', () => {
    expect(decodeInt('55', 10, 100)).toBe(55);
  });

  it.each(['', 'abc', '1.5', 'NaN'])('returns undefined for %j', (raw) => {
    expect(decodeInt(raw, 10, 100)).toBeUndefined();
  });
});

describe('decodeKey', () => {
  it('accepts a known registry key', () => {
    expect(decodeKey(algorithms, 'bubble')).toBe('bubble');
  });

  it('rejects a key that is not in the registry', () => {
    expect(decodeKey(algorithms, 'nonsense')).toBeUndefined();
  });

  it('rejects inherited prototype members (prototype-pollution guard)', () => {
    expect(decodeKey(algorithms, 'toString')).toBeUndefined();
  });
});

describe('coord codec', () => {
  it('round-trips through encode/decode', () => {
    const c = { row: 3, col: 7 };
    expect(decodeCoord(encodeCoord(c), 15, 25)).toEqual(c);
  });

  it('rejects out-of-bounds coordinates instead of clamping', () => {
    expect(decodeCoord('99,99', 15, 25)).toBeUndefined();
  });

  it('rejects a string with too few parts', () => {
    expect(decodeCoord('3', 15, 25)).toBeUndefined();
  });

  it('rejects non-numeric parts', () => {
    expect(decodeCoord('a,b', 15, 25)).toBeUndefined();
  });

  it('accepts the boundary value 0,0', () => {
    expect(decodeCoord('0,0', 15, 25)).toEqual({ row: 0, col: 0 });
  });
});

describe('number list codec', () => {
  it('round-trips through encode/decode', () => {
    const values = [5, 3, 9];
    expect(decodeNumberList(encodeNumberList(values))).toEqual(values);
  });

  it('returns undefined for structurally invalid input', () => {
    expect(decodeNumberList('1,2,x')).toBeUndefined();
  });
});
