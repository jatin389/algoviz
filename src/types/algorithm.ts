// Shared contracts for the algorithm registries.
//
// Every visualized algorithm in this app is a *generator* that yields plain,
// serializable "step snapshot" objects (see ./steps.ts). The UI never reads
// algorithm internals — only these snapshots. These types make that contract
// compiler-enforced rather than convention-enforced.

/** Playback state machine shared by all six driver composables. */
export type AlgoStatus = 'idle' | 'running' | 'paused' | 'done';

/** Big-O strings shown in the UI. Free-form text, not parsed. */
export interface Complexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

/**
 * Used where best/average/worst genuinely coincide — graph traversals are all
 * O(V + E) regardless of input, so stating one `time` is more honest than
 * repeating the same string three times.
 */
export interface TimeSpaceComplexity {
  time: string;
  space: string;
}

/**
 * Either complexity shape. The selector components render complexity by
 * iterating its entries, so they are agnostic to which one they receive.
 */
export type AnyComplexity = Complexity | TimeSpaceComplexity;

/**
 * A generator over step snapshots. The `TReturn`/`TNext` params are pinned to
 * `void`/`undefined` because the drivers only ever call `.next()` with no
 * argument and ignore the return value.
 */
export type StepGenerator<TStep> = Generator<TStep, void, undefined>;

/** A generator *function*: the thing stored in a registry's `generator` field. */
export type AlgorithmFn<TStep, TArgs extends unknown[] = unknown[]> = (
  ...args: TArgs
) => StepGenerator<TStep>;

/**
 * One registry entry. Generic over the generator function type so each domain
 * keeps its exact call signature (sorts take `number[]`, searches take
 * `number[] + target`, pathfinding takes a grid + endpoints) while all five
 * registries still share a single shape.
 */
export interface AlgorithmMeta<
  TFn extends AlgorithmFn<any, any>,
  TComplexity extends AnyComplexity = Complexity,
> {
  key: string;
  name: string;
  generator: TFn;
  description: string;
  complexity: TComplexity;
  /** Sorting-only: whether equal elements keep their relative order. */
  stable?: boolean;
}

/**
 * Structural, generator-agnostic view of a registry entry. Used by UI that
 * only reads metadata (name/description/complexity) and never calls
 * `generator` — notably the shared algorithm-selector component.
 */
export type AnyAlgorithmMeta = AlgorithmMeta<AlgorithmFn<any, any>, AnyComplexity>;
