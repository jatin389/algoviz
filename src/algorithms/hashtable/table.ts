// The instrumented hash-table core. No Vue, no generators, no snapshots — just
// a table that can be asked, one probe at a time, what it would do next.
//
// The split from `ops.ts` is the load-bearing design decision in this domain.
// A hash table written the ordinary way hides the probe sequence inside a
// `while` loop, which is precisely the part the visualization exists to show.
// So the loop is inverted: this file exposes *where the k-th probe lands* and
// *what is sitting there*, and `ops.ts` drives that cursor forward, yielding a
// snapshot per step. Nothing here knows a step exists.
//
// Rejected alternative: have each operation return a "trace" array that the
// generator replays. That would have run the whole operation before the first
// frame was drawn, so a script that resizes a 4096-slot table would freeze the
// UI for the length of the rehash instead of animating it, and the table would
// have to carry a trace-recording mode it otherwise has no use for.

import type { HashBucket, HashEntry, HashSlotState } from '@/types';
import { hashFns, homeIndexOf, normalizeCapacity, secondaryStep } from './hashFns';
import type { HashFnKey } from './hashFns';

/**
 * How the table resolves two keys wanting the same slot.
 *
 * These four are also the registry keys in `index.ts` — the collision strategy
 * *is* the algorithm here, in the way that "binary" or "linear" is the
 * algorithm in the search category.
 */
export type CollisionStrategy = 'chaining' | 'linear' | 'quadratic' | 'double';

export const OPEN_STRATEGIES: readonly CollisionStrategy[] = ['linear', 'quadratic', 'double'];

/**
 * The lowest load-factor threshold the table honours, and it is a correctness
 * floor rather than a taste one.
 *
 * Growth is a doubling, and a doubling only helps if one doubling is enough.
 * Let c be the capacity and t the threshold. An insert is only reached when the
 * table was already within threshold, so before it `size - 1 <= t·c`, and after
 * the doubling the new load factor is
 *
 *     size / 2c  <=  (t·c + 1) / 2c  =  t/2 + 1/(2c)  <=  t/2 + 1/8
 *
 * since the smallest capacity is 4. That is <= t exactly when t >= 1/4. Below
 * a quarter, a single insert could still leave the *grown* table over
 * threshold, so the resize would have to loop — and a loop that doubles until
 * it is satisfied is one typo away from allocating until the tab dies. Flooring
 * the threshold instead makes "one insert causes at most one doubling" a
 * theorem, which is also what lets the animation assume a single grow step.
 */
export const MIN_THRESHOLD = 0.25;

/**
 * Open addressing stores one key per slot, so a load factor of 1 means a full
 * table and a probe sequence that never finds a free slot. Capping below 1
 * guarantees every probe walk terminates; 0.9 is the usual textbook ceiling,
 * past which linear probing's clustering makes the average probe count blow up
 * anyway. Chaining has no such limit — a chain can be as long as it likes — so
 * the cap is applied per strategy rather than globally.
 */
export const MAX_OPEN_THRESHOLD = 0.9;

/**
 * Growth stops here. Nothing in the UI can build a script long enough to reach
 * it (the bulk loader is capped in the dozens), so this is a backstop against a
 * pathological hand-typed script, not a policy.
 */
export const MAX_CAPACITY = 4096;

/** The threshold actually enforced, after the floor and the per-strategy cap. */
export function effectiveThreshold(strategy: CollisionStrategy, requested: number): number {
  const floored = Math.max(MIN_THRESHOLD, requested);
  return strategy === 'chaining' ? floored : Math.min(MAX_OPEN_THRESHOLD, floored);
}

/**
 * Where the k-th probe of an operation is looking.
 *
 * Both fields are meaningful for both families, which is what lets `ops.ts`
 * carry one probe loop instead of two:
 *
 *   open addressing — `index` advances along the probe sequence, `chainPos`
 *                     is always 0, because a slot holds at most one entry;
 *   chaining        — `index` is pinned to the home bucket, `chainPos` walks
 *                     down its chain link by link.
 *
 * The unification mirrors `HashBucket` itself, which is deliberately one shape
 * for both strategies for the same reason.
 */
export interface ProbeCursor {
  index: number;
  chainPos: number;
}

/**
 * What the cursor found. `free` means "this operation can stop walking": an
 * empty slot under open addressing, or the end of the chain under chaining.
 */
export type ProbeOutcome = 'match' | 'occupied' | 'tombstone' | 'free';

/**
 * Run-wide counters. Held in one mutable object rather than as fields so a
 * grown table can carry the totals of the table it replaced — see `growEmpty`.
 */
export interface HashCounters {
  probes: number;
  collisions: number;
  resizes: number;
}

export interface HashTableConfig {
  strategy: CollisionStrategy;
  hashFnKey: HashFnKey;
  /** Rounded up to a power of two; see `normalizeCapacity`. */
  capacity: number;
  threshold: number;
  /** Internal: supplied only by `growEmpty`, so a rehash keeps the run's totals. */
  counters?: HashCounters;
  /** Internal: supplied only by `growEmpty`, so arrival ordinals stay unique. */
  arrivals?: { next: number };
}

export interface HashTable {
  readonly strategy: CollisionStrategy;
  readonly hashFnKey: HashFnKey;
  /** Always a power of two, and fixed for the lifetime of this instance. */
  readonly capacity: number;
  /** The enforced threshold, not the requested one. */
  readonly threshold: number;
  readonly counters: HashCounters;

  /** Live keys. Tombstones are not counted — they hold no key. */
  size(): number;
  /** Open addressing only; always 0 under chaining, which has no tombstones. */
  tombstones(): number;
  /** Slots unavailable to a fresh insert: occupied + tombstoned. */
  fill(): number;
  /** `size / capacity` — what the UI calls α. */
  loadFactor(): number;

  hash(key: string): number;
  home(hash: number): number;
  /** Double hashing's stride for this key; 1 for every other strategy. */
  stride(hash: number): number;
  /** The offset added to the home index on probe number `k` (0-based). */
  offset(k: number, stride: number): number;
  cursor(hash: number, k: number): ProbeCursor;
  /**
   * How many probes an operation may take before the walk is provably over:
   * the whole table for open addressing, one past the end of the chain for
   * chaining. Never an unbounded loop.
   */
  maxProbes(home: number): number;

  classify(cursor: ProbeCursor, key: string): ProbeOutcome;
  entryAt(cursor: ProbeCursor): HashEntry | null;
  stateAt(index: number): HashSlotState;
  chainLength(index: number): number;

  /** Write a new key at the cursor. Returns the entry, with its arrival ordinal. */
  place(cursor: ProbeCursor, key: string): HashEntry;
  /** Re-stamp the entry already at the cursor, as a repeat insert of a live key does. */
  overwrite(cursor: ProbeCursor): HashEntry;
  /** Remove the entry at the cursor — unlinked under chaining, tombstoned otherwise. */
  remove(cursor: ProbeCursor): void;

  /** Every live entry, in bucket then chain order. The rehash reads this. */
  entries(): HashEntry[];
  /** A deep copy of the bucket array, safe to hand to a step snapshot. */
  snapshot(): HashBucket[];

  overThreshold(): boolean;
  canGrow(): boolean;
  /** An empty table of twice the capacity, sharing this run's counters. */
  growEmpty(): HashTable;
  /**
   * Place an entry without narrating the probes — the rehash's inner loop.
   * Reports where it landed so the caller can still show the result.
   */
  insertDirect(entry: HashEntry): { hash: number; home: number; index: number; probes: number };
}

function emptyBucket(): HashBucket {
  return { entries: [], state: 'empty' };
}

export function createHashTable(config: HashTableConfig): HashTable {
  const strategy = config.strategy;
  const hashFnKey = config.hashFnKey;
  const capacity = normalizeCapacity(config.capacity);
  const threshold = effectiveThreshold(strategy, config.threshold);
  const hashOf = hashFns[hashFnKey].hash;
  const counters: HashCounters = config.counters ?? { probes: 0, collisions: 0, resizes: 0 };

  // Every entry carries the ordinal of the insert that created it. A HashEntry
  // needs *some* value and the key is the interesting half, so rather than
  // invent a payload nobody can read anything into, the value states when the
  // key arrived — which is the one fact about a stored entry that a viewer can
  // actually check against the script they wrote.
  const arrivals = config.arrivals ?? { next: 1 };

  const buckets: HashBucket[] = Array.from({ length: capacity }, emptyBucket);
  const chaining = strategy === 'chaining';

  let size = 0;
  let tombstones = 0;

  function home(hash: number): number {
    return homeIndexOf(hash, capacity);
  }

  function stride(hash: number): number {
    // Only double hashing varies its step. The other two open strategies are
    // written as offsets from the home index, so a stride of 1 is the identity
    // that keeps one `offset` signature covering all of them.
    return strategy === 'double' ? secondaryStep(hash, capacity) : 1;
  }

  function offset(k: number, step: number): number {
    switch (strategy) {
      // Triangular numbers rather than k². k² only reaches half the slots of a
      // power-of-two table; k(k+1)/2 is guaranteed to hit every one of them
      // exactly once — which is the same power-of-two dependency
      // `normalizeCapacity` documents from the other end.
      case 'quadratic':
        return (k * (k + 1)) / 2;
      case 'double':
        return k * step;
      case 'linear':
        return k;
      // Chaining never leaves its home bucket; the walk happens *inside* it.
      default:
        return 0;
    }
  }

  function cursor(hash: number, k: number): ProbeCursor {
    const start = home(hash);
    if (chaining) return { index: start, chainPos: k };
    return { index: (start + offset(k, stride(hash))) % capacity, chainPos: 0 };
  }

  function maxProbes(start: number): number {
    // Open addressing: the sequence covers every slot exactly once (that is
    // what the coprime stride and the triangular offsets buy), so `capacity`
    // probes is a complete search and anything beyond it would repeat.
    // Chaining: one past the end of the chain is the append position.
    return chaining ? buckets[start].entries.length + 1 : capacity;
  }

  function entryAt(c: ProbeCursor): HashEntry | null {
    return buckets[c.index].entries[c.chainPos] ?? null;
  }

  function classify(c: ProbeCursor, key: string): ProbeOutcome {
    const bucket = buckets[c.index];
    if (chaining) {
      const entry = bucket.entries[c.chainPos];
      if (!entry) return 'free';
      return entry.key === key ? 'match' : 'occupied';
    }
    if (bucket.state === 'empty') return 'free';
    if (bucket.state === 'tombstone') return 'tombstone';
    return bucket.entries[0].key === key ? 'match' : 'occupied';
  }

  function place(c: ProbeCursor, key: string): HashEntry {
    const entry: HashEntry = { key, value: arrivals.next++ };
    const bucket = buckets[c.index];
    if (chaining) {
      bucket.entries.push(entry);
      bucket.state = 'occupied';
    } else {
      // Reusing a tombstone reclaims a slot that was already counted as filled,
      // so `fill` only moves when a genuinely empty slot is consumed.
      if (bucket.state === 'tombstone') tombstones -= 1;
      bucket.entries = [entry];
      bucket.state = 'occupied';
    }
    size += 1;
    return entry;
  }

  function overwrite(c: ProbeCursor): HashEntry {
    const entry = buckets[c.index].entries[c.chainPos];
    entry.value = arrivals.next++;
    return entry;
  }

  function remove(c: ProbeCursor): void {
    const bucket = buckets[c.index];
    if (chaining) {
      bucket.entries.splice(c.chainPos, 1);
      if (bucket.entries.length === 0) bucket.state = 'empty';
    } else {
      // THE tombstone. Emptying this slot instead would truncate every probe
      // sequence that ever ran *through* it: a key placed further along its
      // sequence is only findable because the walk keeps going past occupied
      // slots, and an empty slot is the signal to stop walking. Clear it and
      // that key becomes unreachable while still sitting in the table.
      bucket.entries = [];
      bucket.state = 'tombstone';
      tombstones += 1;
    }
    size -= 1;
  }

  function entries(): HashEntry[] {
    const all: HashEntry[] = [];
    for (const bucket of buckets) all.push(...bucket.entries);
    return all;
  }

  function snapshot(): HashBucket[] {
    // Entries are copied too, not just the arrays holding them. A consumer that
    // pokes at `step.buckets[0].entries[0].value` must not be able to reach
    // back into the live table — the immutability test pins exactly this.
    return buckets.map((bucket) => ({
      entries: bucket.entries.map((entry) => ({ ...entry })),
      state: bucket.state,
    }));
  }

  function fill(): number {
    return size + tombstones;
  }

  function overThreshold(): boolean {
    // Tombstones count. They hold no key, so they do not move α as the UI reads
    // it, but they still consume a slot every probe sequence has to walk past —
    // a table of one key and fifty tombstones probes like a table of fifty-one.
    // Measuring occupancy rather than population is also what keeps an open
    // table from ever filling completely: `fill` is what a resize resets.
    return fill() / capacity > threshold;
  }

  function canGrow(): boolean {
    return capacity * 2 <= MAX_CAPACITY;
  }

  function growEmpty(): HashTable {
    counters.resizes += 1;
    return createHashTable({
      strategy,
      hashFnKey,
      capacity: capacity * 2,
      // The requested threshold has already been floored and capped, so passing
      // the effective value back through is idempotent.
      threshold,
      counters,
      arrivals,
    });
  }

  function insertDirect(entry: HashEntry): {
    hash: number;
    home: number;
    index: number;
    probes: number;
  } {
    const hash = hashOf(entry.key);
    const start = home(hash);
    const step = stride(hash);
    const limit = maxProbes(start);

    for (let k = 0; k < limit; k++) {
      const c = chaining
        ? { index: start, chainPos: buckets[start].entries.length }
        : { index: (start + offset(k, step)) % capacity, chainPos: 0 };
      counters.probes += 1;
      if (chaining || buckets[c.index].state === 'empty') {
        buckets[c.index].entries = chaining ? [...buckets[c.index].entries, entry] : [entry];
        buckets[c.index].state = 'occupied';
        size += 1;
        return { hash, home: start, index: c.index, probes: k + 1 };
      }
    }

    // Unreachable: a rehash target is always at least twice the size of the
    // table that overflowed, and the threshold floor guarantees one doubling is
    // enough (see MIN_THRESHOLD). Reported rather than thrown so a future change
    // to that arithmetic degrades into a visible missing key instead of a crash
    // in the middle of an animation.
    return { hash, home: start, index: -1, probes: limit };
  }

  return {
    strategy,
    hashFnKey,
    capacity,
    threshold,
    counters,
    size: () => size,
    tombstones: () => tombstones,
    fill,
    loadFactor: () => size / capacity,
    hash: hashOf,
    home,
    stride,
    offset,
    cursor,
    maxProbes,
    classify,
    entryAt,
    stateAt: (index) => buckets[index].state,
    chainLength: (index) => buckets[index].entries.length,
    place,
    overwrite,
    remove,
    entries,
    snapshot,
    overThreshold,
    canGrow,
    growEmpty,
    insertDirect,
  };
}
