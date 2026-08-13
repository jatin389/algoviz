// Step-snapshot shapes, one per algorithm domain.
//
// Each generator yields a fresh, plain object describing the state of the
// world at a single step. Arrays that the generator continues to mutate are
// copied before being yielded; see the `_utils.ts` in each domain for exactly
// which fields are copied and which are shared references.

// ---- Sorting ---------------------------------------------------------------

export interface SortStep {
  /** A copy of the array at this instant. */
  array: number[];
  /** Indices currently being compared. */
  comparing: number[];
  /** Indices currently being written/swapped. */
  swapping: number[];
  /** Indices confirmed to be in their final position. */
  sorted: number[];
  comparisons: number;
  /** Swap/write counter — non-comparison sorts count writes here. */
  swaps: number;
  /** True only on the terminal snapshot. */
  done: boolean;
  /**
   * 0-based index into this algorithm's entry in `algorithms/pseudocode.ts`.
   * Optional: untagged generators omit it and the panel renders with no
   * highlight.
   */
  line?: number;
}

// ---- Searching -------------------------------------------------------------

export interface SearchStep {
  array: number[];
  /** Inclusive lower bound; null once the search terminates. */
  low: number | null;
  /** Inclusive upper bound; null once the search terminates. */
  high: number | null;
  /** Midpoint under consideration. Always null for linear search. */
  mid: number | null;
  /** Index currently compared against the target. */
  checking: number | null;
  target: number;
  /** Set once the target is located; stays null if it was never found. */
  foundIndex: number | null;
  comparisons: number;
  done: boolean;
}

// ---- Pathfinding (grid) ----------------------------------------------------

export interface Coord {
  row: number;
  col: number;
}

/** 0 = open, 1 = wall. */
export type Grid = number[][];

export interface PathStep {
  /** Every cell expanded so far. Accumulates, never shrinks. */
  visited: Coord[];
  /** Fringe/open-set contents at this step; replaced on each yield. */
  frontier: Coord[];
  /** The cell just expanded; null on the terminal snapshot. */
  current: Coord | null;
  /** Empty until the terminal snapshot, then start..end inclusive. Empty if unreachable. */
  path: Coord[];
  done: boolean;
}

// ---- Graph traversal (node-link) -------------------------------------------

/**
 * The built-in demo graph uses numeric ids, but the traversal generators are
 * written to work with either.
 */
export type NodeId = number | string;

export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  /** Stable "min-max" key, e.g. "2-5". */
  id: string;
  from: number;
  to: number;
}

export interface GraphModel {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /**
   * Keyed by NodeId rather than number even though the demo generator only
   * produces numeric ids: Map is invariant in TypeScript, so a
   * Map<number, number[]> would not be assignable to the traversal
   * generators' Map<NodeId, NodeId[]> parameter.
   */
  adjacency: Map<NodeId, NodeId[]>;
}

export interface GraphStep {
  /** Traversal order so far; grows monotonically. */
  visited: NodeId[];
  /** A copy of the queue/stack contents at this step. */
  frontier: NodeId[];
  /** The node just dequeued/popped; null on the terminal snapshot. */
  current: NodeId | null;
  done: boolean;
}

// ---- Binary search tree ----------------------------------------------------

/**
 * `id` is a stable incrementing counter, deliberately independent of `value`,
 * so duplicate values still yield unique diffing keys.
 */
export interface BSTNode {
  id: number;
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export type BSTPhase = 'searching' | 'inserted' | 'removing' | 'deleted' | 'not-found';

export interface BSTStep {
  tree: BSTNode | null;
  /** The *id* of the node under the cursor, not its value. */
  visiting: number | null;
  phase: BSTPhase;
  done: boolean;
}

// ---- Heap ------------------------------------------------------------------

export interface HeapStep {
  /** Array-backed binary heap; a copy at this instant. */
  heap: number[];
  comparing: number[];
  swapping: number[];
  done: boolean;
  /**
   * Only produced by extractRootHeap. Explicitly `null` when extracting from
   * an empty heap, and absent entirely on insert steps.
   */
  extracted?: number | null;
}

// ---- Concurrency -----------------------------------------------------------

/**
 * `critical` means "inside the critical section" — tracked as a status rather
 * than derived from lock ownership because the whole point of the mutex
 * scenario is that a thread can be in the critical section *without* being the
 * legitimate lock owner. Deriving it from `lockOwners` would define the bug
 * out of existence.
 */
export type ThreadStatus = 'ready' | 'critical' | 'done';

export interface ThreadState {
  id: number;
  /** Index into this thread's own instruction list; equals its length when done. */
  pc: number;
  status: ThreadStatus;
  /** Per-thread registers — a thread's private copy of a shared value. */
  locals: Record<string, number>;
}

export interface ConcurrencyStep {
  /** A copy of every thread's state at this instant. */
  threads: ThreadState[];
  /** Shared memory all threads read and write. */
  sharedMem: Record<string, number>;
  /** Lock name -> owning thread id, or null when free. */
  lockOwners: Record<string, number | null>;
  /** The instruction just executed; null only on a synthetic initial snapshot. */
  lastAction: { threadId: number; instruction: string } | null;
  /** Whether the scenario's invariant holds *as of this exact step*. */
  violated: boolean;
  done: boolean;
}
