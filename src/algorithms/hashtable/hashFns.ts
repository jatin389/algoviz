// The hash functions the table can be driven with, plus the two arithmetic
// helpers everything else in this domain depends on: how a capacity is chosen,
// and how the second hash for double hashing is derived from the first.
//
// Four functions rather than one because the whole point of the category is
// that *the hash function is a choice with consequences*. `djb2` behaves; `mod`
// collides on anagrams; `weak` collides on almost everything. Being able to
// switch between them mid-lesson is what turns "collisions happen" into
// "collisions happen because of this".

/** One selectable hash function. */
export interface HashFnSpec {
  name: string;
  /** Shown under the picker; says what this function is good or bad at. */
  description: string;
  /**
   * Maps a key to a non-negative 32-bit integer. The table folds this into a
   * slot with `hash % capacity`, so the *low* bits are what actually decide
   * where a key lands — see `knuth` for why that matters.
   */
  hash(key: string): number;
}

/**
 * Knuth's multiplicative constant: round(2^32 / φ), the value that spreads
 * consecutive integers most evenly around the 32-bit ring.
 */
const KNUTH_CONSTANT = 2654435761;

/**
 * djb2 (xor variant). `h * 33 ^ c` via Math.imul, which keeps the multiply in
 * 32-bit integer space — plain `h * 33` would silently promote to a double past
 * 2^53 and stop being the algorithm anyone else calls djb2.
 */
function djb2(key: string): number {
  let h = 5381;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(h, 33) ^ key.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

/**
 * Knuth multiplicative hash: fold the string into an integer, multiply by
 * 2^32/φ, then *drop the bottom byte*.
 *
 * The shift is the part worth reading twice. Multiplicative hashing puts its
 * quality in the HIGH bits of the product — the low bits of `a * b` depend only
 * on the low bits of `a`, so they are barely mixed at all. This table folds a
 * hash into a slot with `% capacity` where capacity is a power of two, which
 * keeps precisely those low bits. Without the shift the two halves of the
 * design would work against each other and Knuth would cluster no better than
 * the naive sum. `>>> 8` hands the modulo the well-mixed bits instead.
 *
 * Rejected alternative: return the full product and have `homeIndexOf` shift
 * instead. That would have made the raw hash shown in the UI a number the
 * displayed `mod` arithmetic did not actually apply to, which is exactly the
 * kind of quiet lie the explain strings exist to avoid.
 */
function knuth(key: string): number {
  let acc = 0;
  for (let i = 0; i < key.length; i++) {
    acc = (Math.imul(acc, 31) + key.charCodeAt(i)) | 0;
  }
  return Math.imul(acc, KNUTH_CONSTANT) >>> 8;
}

/** The textbook "just add the characters up" hash. Anagrams always collide. */
function sumMod(key: string): number {
  let sum = 0;
  for (let i = 0; i < key.length; i++) {
    sum += key.charCodeAt(i);
  }
  return sum;
}

/**
 * Deliberately terrible: the first character and nothing else.
 *
 * This exists for teaching, not for hashing. With it, "cat", "cow" and "car"
 * are guaranteed to collide, so a chain or a probe cluster can be produced on
 * demand in front of an audience instead of hoped for. Every other function
 * here would need a search (see `collide.ts`) to stage the same lesson.
 */
function firstChar(key: string): number {
  return key.length === 0 ? 0 : key.charCodeAt(0);
}

// `satisfies` rather than a `: Record<string, HashFnSpec>` annotation, for the
// same reason the algorithm registries use it: the annotation would widen
// `keyof typeof hashFns` to `string`, and the property names *are* the keys.
export const hashFns = {
  djb2: {
    name: 'djb2',
    description: 'Classic string hash — mixes every character, spreads keys evenly.',
    hash: djb2,
  },
  knuth: {
    name: 'Knuth',
    description: 'Multiplicative hash against 2^32/φ; well-spread, cheap to compute.',
    hash: knuth,
  },
  mod: {
    name: 'Sum + mod',
    description: 'Adds the character codes. Simple, but every anagram collides.',
    hash: sumMod,
  },
  weak: {
    name: 'Weak (first char)',
    description: 'First character only. Awful on purpose — collisions on demand.',
    hash: firstChar,
  },
} satisfies Record<string, HashFnSpec>;

/** Literal union of the hash-function keys: 'djb2' | 'knuth' | 'mod' | 'weak' */
export type HashFnKey = keyof typeof hashFns;

export const DEFAULT_HASH_FN: HashFnKey = 'djb2';

/** Narrowing guard for values arriving from outside the type system (URL, storage). */
export function isHashFnKey(value: string): value is HashFnKey {
  return Object.prototype.hasOwnProperty.call(hashFns, value);
}

export const MIN_CAPACITY = 4;

/**
 * Round a requested capacity to a power of two, floored at MIN_CAPACITY.
 *
 * Every capacity in this domain is a power of two, and that is a load-bearing
 * invariant rather than a convenience:
 *
 *   - double hashing needs its step to be coprime with the capacity, and with a
 *     power of two "coprime" collapses to "odd" — see `secondaryStep`;
 *   - quadratic probing with triangular offsets k(k+1)/2 is guaranteed to visit
 *     every slot exactly once *only* when the capacity is a power of two;
 *   - growth is a doubling, which preserves the property for free.
 *
 * Rejected alternative: prime capacities, which is what a production table
 * usually picks. Primes make the double-hashing step "1 + h mod (capacity - 1)"
 * and make plain `i*i` quadratic probing cover half the table. They also mean
 * carrying a prime table around, and growth stops being a visibly obvious
 * "twice as many slots" — which is the thing the resize animation is trying to
 * show.
 */
export function normalizeCapacity(requested: number): number {
  const wanted = Math.max(MIN_CAPACITY, Math.floor(requested) || MIN_CAPACITY);
  let capacity = MIN_CAPACITY;
  while (capacity < wanted) capacity *= 2;
  return capacity;
}

/**
 * The step size double hashing walks the table with: `(home + k * step) % capacity`.
 *
 * Two properties have to hold or the probe sequence is broken rather than
 * merely slow:
 *
 *   1. it must be NON-ZERO, or every probe re-examines the home slot forever;
 *   2. it must be COPRIME with the capacity, or the sequence cycles through
 *      only capacity/gcd slots and can report "table full" while half the
 *      table sits empty.
 *
 * `| 1` buys both at once. It forces the low bit on, so the result is odd —
 * hence never zero, and since the capacity is a power of two (see
 * `normalizeCapacity`) its only prime factor is 2, so any odd number is
 * automatically coprime with it. No gcd, no retry loop, no prime table.
 *
 * The input hash is re-mixed first rather than reused directly: two keys with
 * the same home slot must not also share a step, or double hashing degrades
 * into linear probing with a fixed stride and the clustering it exists to
 * avoid comes straight back.
 */
export function secondaryStep(hash: number, capacity: number): number {
  const mixed = Math.imul(hash ^ (hash >>> 15), 0x2c1b3c6d) >>> 0;
  return (mixed % capacity) | 1;
}

/** Where a probe sequence starts: the raw hash folded into the table. */
export function homeIndexOf(hash: number, capacity: number): number {
  return hash % capacity;
}
