// The sorting generators' own source text, plus the mapping that turns a step's
// pseudocode tag back into the source line that produced it.
//
// This is what backs the code panel's "Source" mode: instead of the hand-written
// prose in pseudocode.ts, the panel can show the file that is actually running,
// highlighting the `yield` the generator is currently suspended at.
//
// `?raw` rather than `generator.toString()`. toString() is the obvious move and
// it is wrong twice over: esbuild strips comments and rewrites whitespace in a
// production build, so what is on screen would stop being what is in the repo,
// and the line numbers would stop lining up with it. `?raw` inlines the file's
// exact bytes as a string literal, which minification leaves alone.

import type { SortAlgoKey } from './index';
import bubbleSrc from './bubbleSort.ts?raw';
import selectionSrc from './selectionSort.ts?raw';
import insertionSrc from './insertionSort.ts?raw';
import mergeSrc from './mergeSort.ts?raw';
import quickSrc from './quickSort.ts?raw';
import heapSrc from './heapSort.ts?raw';
import shellSrc from './shellSort.ts?raw';
import combSrc from './combSort.ts?raw';
import countingSrc from './countingSort.ts?raw';
import radixSrc from './radixSort.ts?raw';

export interface GeneratorSource {
  /** Displayed above the code so the panel names what it is showing. */
  file: string;
  /** The file's text, verbatim. */
  text: string;
}

/** Every key in the registry has source; unlike pseudocode, nothing to write. */
export const source: Record<SortAlgoKey, GeneratorSource> = {
  bubble: { file: 'bubbleSort.ts', text: bubbleSrc },
  selection: { file: 'selectionSort.ts', text: selectionSrc },
  insertion: { file: 'insertionSort.ts', text: insertionSrc },
  merge: { file: 'mergeSort.ts', text: mergeSrc },
  quick: { file: 'quickSort.ts', text: quickSrc },
  heap: { file: 'heapSort.ts', text: heapSrc },
  shell: { file: 'shellSort.ts', text: shellSrc },
  comb: { file: 'combSort.ts', text: combSrc },
  counting: { file: 'countingSort.ts', text: countingSrc },
  radix: { file: 'radixSort.ts', text: radixSrc },
};

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

// Parsing is cheap but not free, and the panel asks for the same algorithm's map
// on every step. One parse per key per session.
const cache = new Map<SortAlgoKey, Map<number, number[]>>();

/** Memoized `buildSourceMap` for a registered algorithm. */
export function sourceMap(key: SortAlgoKey): Map<number, number[]> {
  let map = cache.get(key);
  if (!map) {
    map = buildSourceMap(source[key].text);
    cache.set(key, map);
  }
  return map;
}
