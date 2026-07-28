// Algorithm visualizations need reproducible randomness: a shareable link with a seed
// must replay the exact same graph, maze, or shuffle every time it's opened, and a bug
// report needs to be re-runnable from the seed alone. mulberry32 is used because it is
// tiny, fast, and — unlike Math.random — has no engine-dependent internal state, so the
// same seed produces bit-identical output on every JS engine that runs this app.

export interface Rng {
  /** Uniform in [0, 1). */
  next(): number;
  /** Uniform integer in [minInclusive, maxInclusive]. */
  int(minInclusive: number, maxInclusive: number): number;
  /** Uniform element, or undefined for an empty list. */
  pick<T>(items: readonly T[]): T | undefined;
}

/** mulberry32. `seed` is coerced to uint32, so any integer is accepted. */
export function createRng(seed: number): Rng {
  let state = seed >>> 0;

  // Closures rather than `this`-based methods: callers are expected to
  // destructure (`const { int } = createRng(seed)`), which would break `this`.
  function next(): number {
    state = (state + 0x6d2b79f5) | 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function int(minInclusive: number, maxInclusive: number): number {
    if (maxInclusive < minInclusive) return minInclusive;
    return minInclusive + Math.floor(next() * (maxInclusive - minInclusive + 1));
  }

  function pick<T>(items: readonly T[]): T | undefined {
    if (items.length === 0) return undefined;
    return items[int(0, items.length - 1)];
  }

  return { next, int, pick };
}

/** The ONLY Math.random call site left in the app. Returns a uint32. */
export function randomSeed(): number {
  return Math.floor(Math.random() * 0x100000000) >>> 0;
}

/** Parse a user- or URL-supplied seed. Returns null for anything unusable. */
export function parseSeed(raw: string | null | undefined): number | null {
  if (raw == null) return null;
  const trimmed = raw.trim();
  if (trimmed === '') return null;

  const value = Number(trimmed);
  if (!Number.isFinite(value) || !Number.isInteger(value)) return null;

  return value >>> 0;
}
