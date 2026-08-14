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
  /**
   * Optional edge cost. Absent on the unweighted graphs the traversal
   * category generates, present on the ones the MST category asks for — see
   * `generateGraph`'s `weighted` option. Optional rather than required so
   * every existing caller and every existing traversal stays untouched: a
   * traversal that ignores weight is still correct on a weighted graph,
   * whereas a required field would force a meaningless number onto BFS.
   */
  weight?: number;
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

// ---- Dynamic programming ---------------------------------------------------

/** A table coordinate. Row-major, both 0-based, including the header row/column. */
export interface DpCell {
  row: number;
  col: number;
}

/**
 * One cell the cursor cell was computed from, tagged with the branch of the
 * recurrence it represents ('take', 'skip', 'match', 'delete', ...).
 *
 * `value` is the dependency's contents *at the moment the cursor cell was
 * computed*, carried on the snapshot rather than re-read from `table` so the
 * inspector text can never disagree with the arrows it is explaining.
 */
export interface DpDep extends DpCell {
  label: string;
  value: number | null;
}

export interface DpStep {
  /** Row-major copy of the table; `null` means "not computed yet". */
  table: (number | null)[][];
  /** The cell just written; null on setup steps and during traceback. */
  cursor: DpCell | null;
  /** Every cell the recurrence read to produce `cursor`. */
  deps: DpDep[];
  /** The dependency the recurrence actually selected — the argmin/argmax branch. */
  chosen: DpCell | null;
  /** The recurrence with this step's real numbers substituted in. */
  explain: string | null;
  /** Traceback cells. Empty until the fill completes, then grows backwards. */
  path: DpCell[];
  /** The decoded answer once traceback finishes — an LCS string, an item set, ... */
  result: string | null;
  /** Cells written so far; the counterpart to the naive-recursion call count. */
  cellsFilled: number;
  done: boolean;
  /** 0-based index into this algorithm's pseudocode entry, as with SortStep. */
  line?: number;
}

// ---- Disjoint set union / minimum spanning tree -----------------------------

export type DsuOpKind = 'union' | 'find';

/** `b` is unused for a `find`. */
export interface DsuOp {
  kind: DsuOpKind;
  a: number;
  b?: number;
}

/**
 * The forest at one instant. `findPath` and `compressed` are what make path
 * compression visible: the walk up to the root, and the pointers that were
 * re-hung directly onto it afterwards.
 */
export interface DsuSnapshot {
  parent: number[];
  rank: number[];
  setSize: number[];
  findPath: number[];
  compressed: number[];
  finds: number;
  unions: number;
  compressions: number;
  /** Deepest node in the whole forest — the honest proof union-by-rank works. */
  maxDepth: number;
}

export interface DsuStep {
  kind: 'dsu';
  forest: DsuSnapshot;
  /** The operation being executed; null on the synthetic initial snapshot. */
  op: DsuOp | null;
  /** Node under the cursor while walking to a root. */
  active: number | null;
  explain: string | null;
  done: boolean;
  line?: number;
}

export interface MstStep {
  kind: 'mst';
  /**
   * The disjoint-set forest driving Kruskal. Prim fills it too — its "tree so
   * far" is exactly one set — so both algorithms render through one component.
   */
  forest: DsuSnapshot;
  /** Edge id under consideration; null on the terminal snapshot. */
  consideringEdge: string | null;
  /** Edge ids in the spanning tree so far. */
  acceptedEdges: string[];
  /** Edge ids rejected because both endpoints were already connected. */
  rejectedEdges: string[];
  /** Edge ids still waiting to be considered, in the order they will be. */
  queue: string[];
  totalWeight: number;
  /** Disjoint components remaining; reaches 1 exactly when the tree spans. */
  components: number;
  explain: string | null;
  done: boolean;
  line?: number;
}

// ---- Hash table ------------------------------------------------------------

export type HashOpKind = 'insert' | 'search' | 'delete';

export interface HashOp {
  kind: HashOpKind;
  key: string;
}

/**
 * `tombstone` exists only under open addressing: deleting a probed-past key by
 * simply emptying its slot would truncate every probe sequence that ran through
 * it, so the slot is marked instead of cleared.
 */
export type HashSlotState = 'empty' | 'occupied' | 'tombstone';

export interface HashEntry {
  key: string;
  value: number;
}

/**
 * One bucket, unified across both collision strategies: chaining fills
 * `entries` with the whole chain, open addressing with at most one entry and a
 * `state` that distinguishes an empty slot from a tombstone.
 */
export interface HashBucket {
  entries: HashEntry[];
  state: HashSlotState;
}

export type HashPhase =
  | 'idle'
  | 'hashing'
  | 'probing'
  | 'inserted'
  | 'updated'
  | 'found'
  | 'not-found'
  | 'deleted'
  | 'resizing'
  | 'rehashed';

export interface HashStep {
  /** A copy of the bucket array at this instant. */
  buckets: HashBucket[];
  capacity: number;
  size: number;
  /** `size / capacity`, carried rather than derived so the snapshot is self-contained. */
  loadFactor: number;
  op: HashOpKind | null;
  key: string | null;
  /** The raw hash before it is folded into the table. */
  hash: number | null;
  /** `hash mod capacity` — where the probe sequence starts. */
  homeIndex: number | null;
  /** Bucket currently being examined; null once the operation concludes. */
  probeIndex: number | null;
  /** Every index probed so far in this operation, in order. */
  probeSeq: number[];
  probes: number;
  collisions: number;
  resizes: number;
  phase: HashPhase;
  /** The arithmetic spelled out: `h("cat") = 193456 → 193456 mod 8 = 0`. */
  explain: string | null;
  done: boolean;
  line?: number;
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
