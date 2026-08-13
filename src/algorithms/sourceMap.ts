// Turning a step's pseudocode tag back into the source line that produced it.
//
// Extracted from `algorithms/source.ts`, which owned both this parsing logic
// and a memo cache hard-wired to `SortAlgoKey`. Four domains now back a code
// panel — sorting, dynamic programming, MST and hashing — and each one needs
// the same parse against a different key union, so the cache is generic here
// and each domain builds its own instance.

/** One generator file, as the code panel shows it. */
export interface GeneratorSource {
  /** Displayed above the code so the panel names what it is showing. */
  file: string;
  /** The file's text, verbatim. */
  text: string;
}

/**
 * A tagged yield: `yield snap(...)` or `yield done(...)` whose final argument is
 * the pseudocode line literal.
 *
 * The anchored closing paren is what makes the lazy `.*?` safe — the digits have
 * to be the *last* argument, so an index expression like `[j, j + 1]` can't be
 * mistaken for a tag. Untagged yields end in `swaps)` and simply never match.
 */
const TAGGED_YIELD = /^\s*yield\s+(?:snap|done)\(.*?,\s*(\d+)\s*\)\s*;?\s*$/;

/**
 * Build `pseudocode line index -> 0-based source lines carrying that tag`.
 *
 * Derived from the text rather than written by hand on purpose: the tag numbers
 * already live in the yield calls, and a hand-kept table would go stale the
 * first time anyone inserted a line above one. A test pins the parse instead —
 * see source.test.ts.
 */
export function buildSourceMap(text: string): Map<number, number[]> {
  const map = new Map<number, number[]>();

  text.split('\n').forEach((line, index) => {
    const match = TAGGED_YIELD.exec(line);
    if (!match) return;
    const tag = Number(match[1]);
    map.set(tag, [...(map.get(tag) ?? []), index]);
  });

  return map;
}

/**
 * Memoized `buildSourceMap` over a domain's source record.
 *
 * Parsing is cheap but not free, and the panel asks for the same algorithm's
 * map on every step. One parse per key per session.
 *
 * Returns a function rather than a populated record so a domain with ten
 * generators does not parse ten files at import time to show one.
 */
export function createSourceMapCache<K extends string>(
  sources: Record<K, GeneratorSource>,
): (key: K) => Map<number, number[]> {
  const cache = new Map<K, Map<number, number[]>>();

  return (key: K) => {
    let map = cache.get(key);
    if (!map) {
      map = buildSourceMap(sources[key].text);
      cache.set(key, map);
    }
    return map;
  };
}
