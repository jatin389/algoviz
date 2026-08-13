import { describe, it, expect } from 'vitest';
import { algorithms } from '@/algorithms';
import {
  decodeInt,
  decodeKey,
  encodeCoord,
  decodeCoord,
  encodeNumberList,
  decodeNumberList,
  encodeOpScript,
  decodeOpScript,
} from './urlCodec';
import type { OpScriptCodec } from './urlCodec';

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

describe('op script codec', () => {
  // A stand-in for the real DSU/hash codecs, deliberately shaped like them: a
  // single-letter kind, then operands that may themselves need a separator of
  // their own. That second part is the interesting case — it is why the shared
  // separator is `-` and intra-op structure has to use something else.
  interface FakeOp {
    kind: 'u' | 'f';
    a: number;
    b?: number;
  }

  const codec: OpScriptCodec<FakeOp> = {
    encodeOp: (op) => (op.kind === 'u' ? `u${op.a}.${op.b}` : `f${op.a}`),
    decodeOp: (token) => {
      const match = /^([uf])(\d+)(?:\.(\d+))?$/.exec(token);
      if (!match) return undefined;
      const kind = match[1] as 'u' | 'f';
      if (kind === 'u' && match[3] === undefined) return undefined;
      return kind === 'u'
        ? { kind, a: Number(match[2]), b: Number(match[3]) }
        : { kind, a: Number(match[2]) };
    },
    maxOps: 4,
  };

  it('round-trips a mixed script', () => {
    const ops: FakeOp[] = [
      { kind: 'u', a: 3, b: 4 },
      { kind: 'f', a: 7 },
      { kind: 'u', a: 0, b: 1 },
    ];
    const encoded = encodeOpScript(ops, codec);
    expect(encoded).toBe('u3.4-f7-u0.1');
    expect(decodeOpScript(encoded, codec)).toEqual(ops);
  });

  it('treats an empty string as an empty script rather than a parse failure', () => {
    // `''.split('-')` yields one empty token, which every real codec rejects —
    // so without the explicit early return this would come back undefined and a
    // deliberately cleared script would fail to survive a round trip.
    expect(decodeOpScript('', codec)).toEqual([]);
    expect(decodeOpScript('   ', codec)).toEqual([]);
    expect(encodeOpScript([], codec)).toBe('');
  });

  it('rejects the ENTIRE script when a single op is malformed', () => {
    // All-or-nothing: dropping just the bad op would silently produce a
    // different run than the link described.
    expect(decodeOpScript('u3.4-XX-f7', codec)).toBeUndefined();
    expect(decodeOpScript('u3.4-u5', codec)).toBeUndefined();
  });

  it('rejects a script longer than maxOps', () => {
    expect(decodeOpScript('f1-f2-f3-f4', codec)).toHaveLength(4);
    expect(decodeOpScript('f1-f2-f3-f4-f5', codec)).toBeUndefined();
  });
});
