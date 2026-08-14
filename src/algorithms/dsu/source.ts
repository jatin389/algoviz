import type { DsuAlgoKey } from './index';
import { createSourceMapCache } from '../sourceMap';
import type { GeneratorSource } from '../sourceMap';
import dsuSrc from './dsuOps.ts?raw';
import kruskalSrc from './kruskal.ts?raw';
import primSrc from './prim.ts?raw';

// The union-find / MST generators' own source text, backing the code panel's
// "Source" mode.
//
// `?raw` rather than `generator.toString()`, for the reason spelled out in
// `algorithms/source.ts`: esbuild strips comments and rewrites whitespace in a
// production build, so `toString()` would put something on screen that is not
// what is in the repo, and the highlighted line numbers would stop lining up
// with it. `?raw` inlines the file's exact bytes, which minification leaves
// alone.
//
// The parse and its memo cache live in `../sourceMap.ts`, shared with the
// sorting, DP and hashing domains. Only the record below is category-specific.

export type { GeneratorSource };

/** Every key in the registry has source; unlike pseudocode, nothing to write. */
export const source: Record<DsuAlgoKey, GeneratorSource> = {
  dsu: { file: 'dsuOps.ts', text: dsuSrc },
  kruskal: { file: 'kruskal.ts', text: kruskalSrc },
  prim: { file: 'prim.ts', text: primSrc },
};

/** Memoized `buildSourceMap` for a registered algorithm. */
export const sourceMap: (key: DsuAlgoKey) => Map<number, number[]> = createSourceMapCache(source);
