// The runner's own source text, for the code panel's "Source" mode.
//
// `?raw` rather than `generator.toString()`, for the reason spelled out at
// length in `algorithms/source.ts`: esbuild strips comments and rewrites
// whitespace in a production build, so `toString()` would show something that
// is not what is in the repo and whose line numbers no longer line up with the
// tags. `?raw` inlines the file's exact bytes, which minification leaves alone.
//
// All four strategies point at the same file, because they genuinely are the
// same file — one probe loop, parameterized by strategy (see the header comment
// in `ops.ts`). The record is still keyed per strategy rather than collapsed to
// a single export so the panel's wiring stays identical to every other domain's,
// and so a strategy that one day needs its own generator can get one without
// touching a single call site.

import { createSourceMapCache } from '@/algorithms/sourceMap';
import type { GeneratorSource } from '@/algorithms/sourceMap';
import type { HashStrategyKey } from './index';
import opsSrc from './ops.ts?raw';

export const source: Record<HashStrategyKey, GeneratorSource> = {
  chaining: { file: 'hashtable/ops.ts', text: opsSrc },
  linear: { file: 'hashtable/ops.ts', text: opsSrc },
  quadratic: { file: 'hashtable/ops.ts', text: opsSrc },
  double: { file: 'hashtable/ops.ts', text: opsSrc },
};

/** Memoized `buildSourceMap` for a strategy: pseudocode tag -> source line indices. */
export const sourceMap: (key: HashStrategyKey) => Map<number, number[]> =
  createSourceMapCache(source);
