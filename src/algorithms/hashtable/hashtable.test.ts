import { describe, it, expect } from 'vitest';
import type { HashBucket, HashOp, HashPhase, HashStep } from '@/types';
import { createRng } from '@/utils/rng';
import { algorithms } from './index';
import type { HashStrategyKey } from './index';
import { hashPseudocode } from './pseudocode';
import { sourceMap } from './source';
import { runHashScript } from './ops';
import type { HashRunConfig } from './ops';
import { createHashTable, effectiveThreshold } from './table';
import { hashFns, homeIndexOf, normalizeCapacity } from './hashFns';
import type { HashFnKey } from './hashFns';
import { collidingKeys, keysForBucket, randomKeys } from './collide';

const STRATEGIES = Object.keys(algorithms) as HashStrategyKey[];
const HASH_FNS = Object.keys(hashFns) as HashFnKey[];

const BASE: HashRunConfig = { hashFnKey: 'djb2', capacity: 8, threshold: 0.75 };

function run(ops: readonly HashOp[], strategy: HashStrategyKey, config = BASE): HashStep[] {
  return [...runHashScript(ops, config, strategy)];
}

/** Every live key in a snapshot, regardless of which bucket or chain link holds it. */
function keysOf(buckets: readonly HashBucket[]): Set<string> {
  const keys = new Set<string>();
  for (const bucket of buckets) for (const entry of bucket.entries) keys.add(entry.key);
  return keys;
}

/** The phases that conclude an operation, as opposed to continuing one. */
const OUTCOMES: readonly HashPhase[] = ['inserted', 'updated', 'found', 'not-found', 'deleted'];

interface OpTrace {
  op: HashOp;
  steps: HashStep[];
  outcome: HashPhase | null;
  /** The table as it stood once this operation (and any resize it caused) finished. */
  keys: Set<string>;
}

/**
 * Split a run into one group per script operation.
 *
 * Every operation starts with exactly one `hashing` step, which is what makes
 * the boundaries unambiguous; the terminal snapshot belongs to whatever ran
 * last, since it reports the same table.
 */
function traceOps(ops: readonly HashOp[], steps: HashStep[]): OpTrace[] {
  const traces: OpTrace[] = [];
  for (const step of steps) {
    if (step.phase === 'hashing')
      traces.push({ op: ops[traces.length], steps: [], outcome: null, keys: new Set() });
    traces[traces.length - 1]?.steps.push(step);
  }
  for (const trace of traces) {
    const last = trace.steps[trace.steps.length - 1];
    trace.keys = keysOf(last.buckets);
    trace.outcome = trace.steps.map((s) => s.phase).filter((p) => OUTCOMES.includes(p))[0] ?? null;
  }
  return traces;
}

function randomScript(seed: number, length: number, pool: readonly string[]): HashOp[] {
  const rng = createRng(seed);
  return Array.from({ length }, () => {
    const roll = rng.int(0, 9);
    const kind = roll < 6 ? 'insert' : roll < 8 ? 'search' : 'delete';
    return { kind, key: pool[rng.int(0, pool.length - 1)] } as HashOp;
  });
}

// ---- the headline property --------------------------------------------------

describe('hash table behaves exactly like a JS Map', () => {
  const pool = ['cat', 'dog', 'cow', 'car', 'ant', 'bee', 'owl', 'fox', 'elk', 'ape', 'yak', 'ram'];

  for (const strategy of STRATEGIES) {
    for (const hashFnKey of HASH_FNS) {
      it(`${strategy} + ${hashFnKey} matches a reference Map after every operation`, () => {
        const script = randomScript(0xc0ffee, 120, pool);
        const steps = run(script, strategy, { hashFnKey, capacity: 4, threshold: 0.7 });
        const traces = traceOps(script, steps);
        const reference = new Map<string, true>();

        expect(traces).toHaveLength(script.length);

        for (const { op, outcome, keys } of traces) {
          const present = reference.has(op.key);
          if (op.kind === 'insert') {
            expect(outcome).toBe(present ? 'updated' : 'inserted');
            reference.set(op.key, true);
          } else if (op.kind === 'search') {
            expect(outcome).toBe(present ? 'found' : 'not-found');
          } else {
            expect(outcome).toBe(present ? 'deleted' : 'not-found');
            reference.delete(op.key);
          }
          expect([...keys].sort()).toEqual([...reference.keys()].sort());
        }
      });
    }
  }
});

// ---- the classic tombstone bug ----------------------------------------------

describe('deletion leaves a tombstone rather than a hole', () => {
  // The `weak` hash reads only the first character, so these three keys are
  // guaranteed to share a home slot — the collision has to be certain for the
  // probe sequence under test to exist at all.
  const script: HashOp[] = [
    { kind: 'insert', key: 'aa' },
    { kind: 'insert', key: 'ab' },
    { kind: 'insert', key: 'ac' },
    { kind: 'delete', key: 'ab' },
    { kind: 'search', key: 'ac' },
  ];

  for (const strategy of STRATEGIES) {
    it(`${strategy} still finds a key whose probe path runs through the deleted slot`, () => {
      const steps = run(script, strategy, { hashFnKey: 'weak', capacity: 8, threshold: 0.9 });
      const traces = traceOps(script, steps);

      expect(traces[3].outcome).toBe('deleted');
      expect(traces[4].outcome).toBe('found');
    });
  }

  it('marks the emptied slot as a tombstone, not as empty, under open addressing', () => {
    for (const strategy of STRATEGIES.filter((s) => s !== 'chaining')) {
      const steps = run(script, strategy, { hashFnKey: 'weak', capacity: 8, threshold: 0.9 });
      const final = steps[steps.length - 1];
      expect(final.buckets.some((bucket) => bucket.state === 'tombstone')).toBe(true);
    }
  });

  it('reuses a tombstone rather than growing the table around it', () => {
    const reinsert: HashOp[] = [...script, { kind: 'insert', key: 'ad' }];
    const steps = run(reinsert, 'linear', { hashFnKey: 'weak', capacity: 8, threshold: 0.9 });
    const final = steps[steps.length - 1];
    // 'aa','ac','ad' live; 'ad' took the slot 'ab' vacated, so nothing is left marked.
    expect(keysOf(final.buckets)).toEqual(new Set(['aa', 'ac', 'ad']));
    expect(final.buckets.filter((bucket) => bucket.state === 'tombstone')).toHaveLength(0);
  });
});

// ---- resizing ---------------------------------------------------------------

describe('resize and rehash', () => {
  const keys = randomKeys(createRng(7), 24);
  const script: HashOp[] = keys.map((key) => ({ kind: 'insert', key }));

  for (const strategy of STRATEGIES) {
    it(`${strategy} still finds every key after the table has grown`, () => {
      const withSearches: HashOp[] = [
        ...script,
        ...keys.map((key) => ({ kind: 'search', key }) as HashOp),
      ];
      const steps = run(withSearches, strategy, { hashFnKey: 'djb2', capacity: 4, threshold: 0.7 });
      const traces = traceOps(withSearches, steps);

      expect(steps[steps.length - 1].resizes).toBeGreaterThan(0);
      for (const trace of traces.slice(script.length)) {
        expect(trace.outcome).toBe('found');
      }
    });

    it(`${strategy} keeps the load factor within the threshold once an insert settles`, () => {
      const threshold = effectiveThreshold(strategy, 0.7);
      const steps = run(script, strategy, { hashFnKey: 'djb2', capacity: 4, threshold: 0.7 });

      for (const step of steps) {
        // `inserted` is the one instant the table is knowingly over its limit,
        // and `resizing` is the step that says so out loud before fixing it.
        if (step.phase === 'inserted' || step.phase === 'resizing') continue;
        expect(step.loadFactor).toBeLessThanOrEqual(threshold);
      }
    });

    it(`${strategy} animates the rehash one key at a time`, () => {
      const steps = run(script, strategy, { hashFnKey: 'djb2', capacity: 4, threshold: 0.7 });
      const resizing = steps.filter((s) => s.phase === 'resizing');
      const rehashed = steps.filter((s) => s.phase === 'rehashed');

      expect(resizing.length).toBeGreaterThan(0);
      // Every key living in the table at the moment of a grow gets its own step.
      expect(rehashed.length).toBeGreaterThanOrEqual(resizing.length);
      for (const step of rehashed) expect(step.probeIndex).not.toBeNull();
    });
  }
});

// ---- probe sequences --------------------------------------------------------

describe('probe sequences', () => {
  for (const strategy of STRATEGIES.filter((s) => s !== 'chaining')) {
    it(`${strategy} visits every slot exactly once before repeating`, () => {
      const capacity = 16;
      const table = createHashTable({ strategy, hashFnKey: 'djb2', capacity, threshold: 0.75 });

      for (const key of randomKeys(createRng(99), 40)) {
        const hash = table.hash(key);
        const seen = new Set<number>();
        for (let k = 0; k < capacity; k++) seen.add(table.cursor(hash, k).index);
        expect(seen.size).toBe(capacity);
      }
    });
  }

  it('double hashing uses an odd stride, which is what makes it coprime with a power of two', () => {
    const table = createHashTable({
      strategy: 'double',
      hashFnKey: 'djb2',
      capacity: 32,
      threshold: 0.75,
    });
    for (const key of randomKeys(createRng(5), 50)) {
      const stride = table.stride(table.hash(key));
      expect(stride % 2).toBe(1);
      expect(stride).toBeGreaterThan(0);
    }
  });

  it('chaining never leaves the home bucket', () => {
    const script: HashOp[] = ['aa', 'ab', 'ac', 'ad'].map((key) => ({ kind: 'insert', key }));
    const steps = run(script, 'chaining', { hashFnKey: 'weak', capacity: 8, threshold: 2 });
    for (const step of steps) {
      if (step.homeIndex === null) continue;
      for (const index of step.probeSeq) expect(index).toBe(step.homeIndex);
    }
  });
});

// ---- forced collisions ------------------------------------------------------

describe('collide', () => {
  for (const hashFnKey of HASH_FNS) {
    for (const capacity of [8, 64]) {
      it(`${hashFnKey} at capacity ${capacity} yields keys that share a bucket`, () => {
        const { bucket, keys } = collidingKeys(4, { hashFnKey, capacity });
        const hash = hashFns[hashFnKey].hash;

        expect(keys).toHaveLength(4);
        expect(new Set(keys).size).toBe(4);
        for (const key of keys) {
          expect(homeIndexOf(hash(key), normalizeCapacity(capacity))).toBe(bucket);
          expect(key).toMatch(/^[A-Za-z0-9]+$/);
        }
      });
    }
  }

  it('honours a requested bucket when the hash function can reach it', () => {
    const keys = keysForBucket(5, 3, { hashFnKey: 'djb2', capacity: 16 });
    expect(keys).toHaveLength(3);
    for (const key of keys) expect(homeIndexOf(hashFns.djb2.hash(key), 16)).toBe(5);
  });

  it('reports honestly when a bucket is unreachable instead of looping', () => {
    // `weak` hashes on the first character, and no alphanumeric character code
    // is congruent to 0 mod 64 — so bucket 0 genuinely has no key.
    expect(keysForBucket(0, 1, { hashFnKey: 'weak', capacity: 64 })).toEqual([]);
  });

  it('does not re-offer excluded keys', () => {
    const first = collidingKeys(3, { hashFnKey: 'djb2', capacity: 16 });
    const second = collidingKeys(3, {
      hashFnKey: 'djb2',
      capacity: 16,
      exclude: new Set(first.keys),
    });
    expect(second.keys.some((key) => first.keys.includes(key))).toBe(false);
  });

  it('draws reproducible bulk keys from a seed', () => {
    expect(randomKeys(createRng(42), 10)).toEqual(randomKeys(createRng(42), 10));
    expect(new Set(randomKeys(createRng(42), 10)).size).toBe(10);
  });
});

// ---- code-panel wiring ------------------------------------------------------

describe('pseudocode tags', () => {
  const script = randomScript(1234, 40, ['cat', 'dog', 'cow', 'car', 'ant']);

  for (const strategy of STRATEGIES) {
    it(`${strategy} tags every step with a line in its own pseudocode`, () => {
      const lines = hashPseudocode[strategy];
      const steps = run(script, strategy, { hashFnKey: 'mod', capacity: 4, threshold: 0.7 });

      for (const step of steps) {
        expect(step.line).toBeTypeOf('number');
        expect(step.line).toBeGreaterThanOrEqual(0);
        expect(step.line).toBeLessThan(lines.length);
      }
    });

    it(`${strategy} tags its terminal step with the final line`, () => {
      const steps = run(script, strategy);
      const last = steps[steps.length - 1];
      expect(last.done).toBe(true);
      expect(last.line).toBe(hashPseudocode[strategy].length - 1);
    });

    it(`${strategy} resolves every tag it emits to at least one source line`, () => {
      const map = sourceMap(strategy);
      const steps = run(script, strategy);
      for (const step of steps) {
        expect(map.get(step.line as number)?.length ?? 0).toBeGreaterThan(0);
      }
    });
  }

  it('writes all four pseudocode entries in parallel, so one set of tags fits all', () => {
    const lengths = STRATEGIES.map((strategy) => hashPseudocode[strategy].length);
    expect(new Set(lengths).size).toBe(1);
  });
});

// ---- snapshot hygiene -------------------------------------------------------

describe('snapshot immutability', () => {
  for (const strategy of STRATEGIES) {
    it(`${strategy} hands out buckets that cannot be written back into the table`, () => {
      const script: HashOp[] = ['aa', 'ab', 'ac'].map((key) => ({ kind: 'insert', key }));
      const generator = runHashScript(script, { ...BASE, hashFnKey: 'weak' }, strategy);

      const first = generator.next().value as HashStep;
      first.buckets.push({ entries: [{ key: 'intruder', value: 0 }], state: 'occupied' });
      first.buckets[0].entries.push({ key: 'intruder', value: 0 });
      first.buckets[0].state = 'tombstone';
      first.probeSeq.push(999);

      for (const step of generator) {
        expect(step.buckets).toHaveLength(first.capacity);
        expect(keysOf(step.buckets).has('intruder')).toBe(false);
        expect(step.probeSeq).not.toContain(999);
      }
    });
  }
});

// ---- registry ---------------------------------------------------------------

describe('registry', () => {
  for (const strategy of STRATEGIES) {
    it(`${strategy} carries complete metadata and a working generator`, () => {
      const entry = algorithms[strategy];
      expect(entry.name).not.toBe('');
      expect(entry.description).not.toBe('');
      expect(Object.values(entry.complexity).every((value) => value !== '')).toBe(true);

      const steps = [...entry.generator([{ kind: 'insert', key: 'cat' }], BASE)];
      expect(steps[steps.length - 1].done).toBe(true);
    });
  }

  it('produces a single terminal step for an empty script', () => {
    for (const strategy of STRATEGIES) {
      const steps = run([], strategy);
      expect(steps).toHaveLength(1);
      expect(steps[0].done).toBe(true);
      expect(steps[0].size).toBe(0);
    }
  });
});
