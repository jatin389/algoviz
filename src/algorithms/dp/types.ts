// The one interface all eight dynamic-programming algorithms hide behind.
//
// Every other DP category design I sketched leaked the algorithm into the UI.
// The obvious one — a `DpView` with a `v-if` per algorithm choosing which input
// editor and which table renderer to mount — was rejected outright: it makes
// "add a ninth algorithm" a change to the view, the panel, the composable and
// the table, which is exactly the coupling `AvAlgorithmSelector` and the four
// existing registries were built to avoid. The second sketch gave each
// algorithm its own `DpStep` variant and discriminated on it in the renderer;
// that failed for the same reason one step further down.
//
// What is actually different between Fibonacci and matrix-chain multiplication
// is only ever: the shape of the input, the shape of the table, the recurrence,
// and which cells a cell reads. So those four are the interface, and everything
// downstream — the SVG table, the stats, the inspector, the code panel — reads
// nothing else.

import type {
  AlgorithmFn,
  AlgorithmMeta,
  Complexity,
  DpCell,
  DpDep,
  DpStep,
  StepGenerator,
} from '@/types';

/**
 * The table as a generator holds it: row-major, `null` for "not computed yet".
 *
 * Identical to `DpStep['table']` on purpose rather than by coincidence — it is
 * aliased here so the pure `depsOf` functions, which are also called by the
 * hover overlay against a *snapshot's* table, name the same type the snapshot
 * carries.
 */
export type DpTableData = (number | null)[][];

/**
 * `Infinity` is a legitimate cell value: coin change needs a "this amount is
 * unreachable" marker that still participates in `min`, and reserving a magic
 * negative number for it would break the moment someone allows negative values
 * elsewhere. `null` stays reserved for "the fill has not reached this cell",
 * which is a different statement and is what drives the `empty` cell tone.
 */
export const UNREACHABLE = Infinity;

// ---- Inputs ----------------------------------------------------------------

export type DpInputKind = 'scalar' | 'coins' | 'sequence' | 'items' | 'strings2' | 'chain';

/**
 * `value` is meaningless to subset-sum, which shares this editor with 0/1
 * knapsack and reads only `weight`.
 *
 * Giving subset-sum its own `{ kind: 'weights' }` input was the alternative,
 * and it lost on the thing users actually do: the interesting comparison
 * between the two algorithms is running them over the *same* item list, and a
 * separate input kind means switching algorithms silently throws the list away
 * (see `useDp`, which keys its inputs by kind precisely so that does not
 * happen). One unused field is a cheaper price than that.
 */
export interface DpItem {
  weight: number;
  value: number;
}

export interface ScalarInput {
  kind: 'scalar';
  n: number;
}

export interface CoinsInput {
  kind: 'coins';
  coins: number[];
  amount: number;
}

export interface SequenceInput {
  kind: 'sequence';
  values: number[];
}

export interface ItemsInput {
  kind: 'items';
  items: DpItem[];
  /** The knapsack's capacity; subset-sum's target. */
  capacity: number;
}

export interface Strings2Input {
  kind: 'strings2';
  a: string;
  b: string;
}

export interface ChainInput {
  kind: 'chain';
  /** `n + 1` dimensions describe `n` matrices: A_i is dims[i] x dims[i+1]. */
  dims: number[];
}

export type DpInput =
  | ScalarInput
  | CoinsInput
  | SequenceInput
  | ItemsInput
  | Strings2Input
  | ChainInput;

/** `DpInputOf<'coins'>` is `CoinsInput`. Used to key records by input kind. */
export type DpInputOf<K extends DpInputKind> = Extract<DpInput, { kind: K }>;

// ---- Table description -----------------------------------------------------

/**
 * The labels down the left edge and across the top. Strings rather than
 * anything richer because the axis of a DP table is genuinely heterogeneous —
 * `0..n` for Fibonacci, the characters of a word for LCS, `#3 w=4 v=5` for
 * knapsack — and the renderer has no business knowing which.
 */
export interface DpAxes {
  rowHeaders: string[];
  colHeaders: string[];
  rowTitle: string;
  colTitle: string;
}

export interface DpDims {
  rows: number;
  cols: number;
  /**
   * How many cells the fill phase actually writes.
   *
   * `rows * cols` for seven of the eight; matrix chain only ever fills the
   * upper triangle, so reporting `n^2` there would understate the speedup over
   * naive recursion by roughly half and make the "cells filled" readout stall
   * at 55% forever. Carried explicitly rather than inferred so the exception
   * is stated once, here, instead of being special-cased in the stats panel.
   */
  fillable: number;
}

// ---- Branches --------------------------------------------------------------

/**
 * One arm of a recurrence: the cells it reads, the value it would give the
 * cursor cell if it won, and how it should read inside `explain`.
 *
 * This exists because `DpDep.value` is defined (in `types/steps.ts`) as the
 * dependency's *contents*, not the branch's score, and for most of these
 * algorithms those differ — knapsack's take-branch reads `dp[i-1][c-w]` but
 * scores `v + dp[i-1][c-w]`. Rather than have the generator recompute scores
 * alongside a separately-built dep list and hope the two stay in step, each
 * algorithm has exactly one internal `branchesOf` that produces both, and its
 * public `depsOf` is a projection of it:
 *
 *     export const depsOf = (...args) => branchesOf(...args).flatMap((b) => b.deps);
 *
 * That is what makes the generator's emitted `deps` and the hover overlay's
 * `depsOf` equal *by construction* rather than by a test — the test in
 * `dp.test.ts` then pins the construction.
 */
export interface DpBranch {
  /**
   * Every cell this branch reads. One for most branches; matrix chain's split
   * at k reads two, `dp[i][k]` and `dp[k+1][j]`.
   *
   * `deps[0]` is the branch's representative: it is what becomes `DpStep.chosen`
   * when the branch wins, and it is the cell the traceback hops to next. For
   * matrix chain that is the left half `dp[i][k]`, which is the half that names
   * the split point — an acknowledged compromise, since `chosen` is a single
   * cell and that branch genuinely has two.
   */
  deps: DpDep[];
  /** The value the cursor cell takes if this branch wins. */
  score: number;
  /** This branch as it appears inside `explain`, e.g. `3+dp[2][1]=7`. */
  text: string;
}

// ---- The spec --------------------------------------------------------------

/**
 * Everything the category needs to know about one algorithm.
 *
 * `depsOf` is the load-bearing member. It is pure, it takes a table rather than
 * reading generator state, and it is called from two places: the generator, to
 * build the step it is about to yield, and `DpTable.vue`, when the user hovers
 * a cell that is not the cursor and wants to know where *that* cell came from.
 * One function means the animation and the hover explanation cannot disagree.
 */
export interface DpSpec<I extends DpInput> {
  /** Which editor `DpInputPanel` mounts, and which slot `useDp` keeps this input in. */
  kind: I['kind'];
  defaults: I;
  /** Static formula for the table header, e.g. `dp[i][j] = min(...)`. */
  recurrence: string;
  axes(input: I): DpAxes;
  dims(input: I): DpDims;
  /**
   * Algorithm-specific input rules, or null when the input is runnable. The
   * shared table-size budget is *not* checked here — see `validateInput` in
   * `_utils.ts`, which layers it on top so the arithmetic lives in one place.
   */
  validate(input: I): string | null;
  depsOf(input: I, row: number, col: number, table: DpTableData): DpDep[];
  generator(input: I): StepGenerator<DpStep>;
  /** Exact number of calls the naive recursion would make. See `naiveCount.ts`. */
  naiveCalls(input: I): number;
}

/**
 * The union of every concrete spec, formed by mapping over the input kinds
 * rather than written out by hand so a seventh input kind cannot be added
 * without this following it.
 */
export type AnyDpSpec = { [K in DpInputKind]: DpSpec<DpInputOf<K>> }[DpInputKind];

export type DpFn<I extends DpInput = DpInput> = AlgorithmFn<DpStep, [I]>;

/**
 * A registry entry: the metadata `AvAlgorithmSelector` renders, plus the spec
 * everything else reads. `Complexity` (best/average/worst/space) rather than
 * `TimeSpaceComplexity`, because DP's whole pitch is the gap between the naive
 * and memoized cases and collapsing them to one `time` string would hide it.
 */
export type DpAlgorithm<I extends DpInput> = AlgorithmMeta<DpFn<I>, Complexity> & DpSpec<I>;

export type AnyDpAlgorithm = { [K in DpInputKind]: DpAlgorithm<DpInputOf<K>> }[DpInputKind];

/** Re-exported so downstream files import one module rather than two. */
export type { DpCell, DpDep, DpStep };
