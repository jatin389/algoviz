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
//
// The parse itself and its memo cache now live in `../sourceMap.ts`, shared with
// the other domains that back a code panel. They are re-exported below so this
// module stays the single import site for anything sorting-related.

import type { SortAlgoKey } from './index';
import { buildSourceMap, createSourceMapCache } from './sourceMap';
import type { GeneratorSource } from './sourceMap';
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

export type { GeneratorSource };
export { buildSourceMap };

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

/** Memoized `buildSourceMap` for a registered algorithm. */
export const sourceMap: (key: SortAlgoKey) => Map<number, number[]> =
  createSourceMapCache(source);
