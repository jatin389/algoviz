// Manufacturing collisions on demand, plus the random keys the bulk loader uses.
//
// A collision demo that waits for a collision to happen by luck is a demo that
// does not work in front of an audience. With the `weak` hash function keys can
// be chosen by eye ("cat", "cow", "car" all start with c), but for djb2 or Knuth
// nobody can pick colliding keys by inspection — so they are found by search
// instead, which is what makes the "force a collision" button work for every
// hash function rather than only the teaching one.
//
// The search is a plain enumeration rather than a seeded random walk. Two
// reasons: it is exhaustive over short keys, so "no such key exists" is a fact
// rather than a timeout (see `keysForBucket`), and it is stable, so the same
// button on the same table always produces the same demo.

import { hashFns, homeIndexOf, normalizeCapacity } from './hashFns';
import type { HashFnKey } from './hashFns';
import type { Rng } from '@/utils/rng';

/**
 * Alphanumeric only, because `HashOpBuilder` validates keys as alphanumeric and
 * a URL codec for the op script will want the same guarantee. Lowercase first so
 * the keys these produce look like ordinary words before they look like noise.
 */
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Enumeration depth. 62 + 62² + 62³ ≈ 242k candidates — ample, and bounded. */
const MAX_KEY_LENGTH = 3;

export interface CollideOptions {
  hashFnKey: HashFnKey;
  capacity: number;
  /** Keys already in play, so a second press does not re-offer the first press's keys. */
  exclude?: ReadonlySet<string>;
}

/**
 * Enumerate short alphanumeric keys, shortest first.
 *
 * Counts in base-62 rather than building each length from the previous one:
 * the incremental version is a line shorter but materializes all 238k
 * three-character keys before yielding the first of them, and almost every
 * caller stops within the first few thousand.
 */
function* candidates(): Generator<string, void, undefined> {
  const alphabet = [...ALPHABET];
  const base = alphabet.length;
  for (let length = 1; length <= MAX_KEY_LENGTH; length++) {
    const total = base ** length;
    for (let code = 0; code < total; code++) {
      let key = '';
      let rest = code;
      for (let i = 0; i < length; i++) {
        key = alphabet[rest % base] + key;
        rest = Math.floor(rest / base);
      }
      yield key;
    }
  }
}

/**
 * Up to `count` keys whose home index is exactly `bucket`.
 *
 * MAY RETURN FEWER, INCLUDING NONE, and that is a real case rather than a
 * defensive shrug: with the `weak` hash function the home index is
 * `charCodeAt(0) mod capacity`, so at capacity 64 the reachable indices are
 * only those congruent to an alphanumeric character code — buckets 0 and 27..32
 * have no alphanumeric key at all. Callers that just want *a* collision should
 * use `collidingKeys`, which picks a bucket it can actually reach.
 */
export function keysForBucket(bucket: number, count: number, options: CollideOptions): string[] {
  const capacity = normalizeCapacity(options.capacity);
  const hash = hashFns[options.hashFnKey].hash;
  const exclude = options.exclude ?? new Set<string>();
  const target = ((bucket % capacity) + capacity) % capacity;

  const found: string[] = [];
  for (const key of candidates()) {
    if (exclude.has(key)) continue;
    if (homeIndexOf(hash(key), capacity) !== target) continue;
    found.push(key);
    if (found.length >= count) break;
  }
  return found;
}

/**
 * `count` keys that all land in one bucket, and the bucket they land in.
 *
 * Prefers `preferred` when it is reachable and falls back to the first bucket a
 * full group can be assembled for. The fallback is what makes the button honest
 * under the weak hash: rather than silently doing nothing on an unreachable
 * bucket, it stages the collision somewhere it genuinely occurs.
 */
export function collidingKeys(
  count: number,
  options: CollideOptions,
  preferred?: number,
): { bucket: number; keys: string[] } {
  const capacity = normalizeCapacity(options.capacity);
  const hash = hashFns[options.hashFnKey].hash;
  const exclude = options.exclude ?? new Set<string>();

  if (preferred !== undefined) {
    const keys = keysForBucket(preferred, count, options);
    const bucket = ((preferred % capacity) + capacity) % capacity;
    if (keys.length === count) return { bucket, keys };
  }

  // One pass, grouping as it goes: the first bucket to reach `count` wins. A
  // per-bucket retry loop would re-enumerate the whole candidate space up to
  // `capacity` times to answer the same question.
  const groups = new Map<number, string[]>();
  for (const key of candidates()) {
    if (exclude.has(key)) continue;
    const index = homeIndexOf(hash(key), capacity);
    const group = groups.get(index) ?? [];
    group.push(key);
    groups.set(index, group);
    if (group.length >= count) return { bucket: index, keys: group };
  }

  // Fewer than `count` keys exist for every bucket — only possible for a tiny
  // `exclude`-exhausted alphabet. Hand back the best group there is.
  let best: { bucket: number; keys: string[] } = { bucket: 0, keys: [] };
  for (const [bucket, keys] of groups) {
    if (keys.length > best.keys.length) best = { bucket, keys };
  }
  return best;
}

/**
 * `count` distinct random alphanumeric keys, drawn from a seeded `Rng`.
 *
 * Seeded rather than `Math.random` for the reason every generator in this repo
 * is: a bulk load is part of what a shared link has to reproduce, and "the same
 * seed gives the same table" stops being true the moment one call site reaches
 * for real randomness.
 */
export function randomKeys(rng: Rng, count: number, exclude?: ReadonlySet<string>): string[] {
  const taken = new Set(exclude ?? []);
  const keys: string[] = [];
  // The alphabet supports 26³ + ... distinct 3-letter keys, so a bounded number
  // of attempts is plenty; the cap only exists so an exhausted alphabet cannot
  // spin forever.
  for (let attempt = 0; attempt < count * 50 && keys.length < count; attempt++) {
    const length = rng.int(2, 3);
    let key = '';
    for (let i = 0; i < length; i++) key += ALPHABET[rng.int(0, 25)];
    if (taken.has(key)) continue;
    taken.add(key);
    keys.push(key);
  }
  return keys;
}
