// The DP generators' own source text, for the code panel's "Source" mode.
//
// Mirrors `algorithms/source.ts` exactly, including its reasoning: `?raw`
// rather than `generator.toString()`, because esbuild strips comments and
// rewrites whitespace in a production build, so `toString()` would stop
// matching the repo and the line numbers would stop matching the file. `?raw`
// inlines the file's exact bytes, which minification leaves alone.
//
// The parse and its memo cache live in `../sourceMap.ts`, shared with sorting
// and the other domains that back a code panel; this module only supplies the
// per-key text and builds its own cache instance.

import { createSourceMapCache } from '@/algorithms/sourceMap';
import type { GeneratorSource } from '@/algorithms/sourceMap';
import type { DpAlgoKey } from './index';
import fibSrc from './fib.ts?raw';
import coinChangeSrc from './coinChange.ts?raw';
import lisSrc from './lis.ts?raw';
import knapsackSrc from './knapsack.ts?raw';
import subsetSumSrc from './subsetSum.ts?raw';
import lcsSrc from './lcs.ts?raw';
import editDistanceSrc from './editDistance.ts?raw';
import matrixChainSrc from './matrixChain.ts?raw';

export type { GeneratorSource };

/** Every key in the registry has source; unlike pseudocode, nothing to write. */
export const source: Record<DpAlgoKey, GeneratorSource> = {
  fib: { file: 'fib.ts', text: fibSrc },
  'coin-change': { file: 'coinChange.ts', text: coinChangeSrc },
  lis: { file: 'lis.ts', text: lisSrc },
  knapsack: { file: 'knapsack.ts', text: knapsackSrc },
  'subset-sum': { file: 'subsetSum.ts', text: subsetSumSrc },
  lcs: { file: 'lcs.ts', text: lcsSrc },
  'edit-distance': { file: 'editDistance.ts', text: editDistanceSrc },
  'matrix-chain': { file: 'matrixChain.ts', text: matrixChainSrc },
};

/** Memoized `buildSourceMap` for a registered algorithm. */
export const sourceMap: (key: DpAlgoKey) => Map<number, number[]> = createSourceMapCache(source);
