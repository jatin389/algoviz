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
export interface AlgorithmMeta<TFn extends AlgorithmFn<any, any>> {
  key: string;
  name: string;
  generator: TFn;
  description: string;
  complexity: Complexity;
  /** Sorting-only: whether equal elements keep their relative order. */
  stable?: boolean;
}

/**
 * Structural, generator-agnostic view of a registry entry. Used by UI that
 * only reads metadata (name/description/complexity) and never calls
 * `generator` — notably the shared algorithm-selector component.
 */
export type AnyAlgorithmMeta = AlgorithmMeta<AlgorithmFn<any, any>>;
