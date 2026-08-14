import type { DsuSnapshot } from '@/types';

// A disjoint-set (union-find) forest with path compression and union by rank,
// instrumented so a visualizer can *watch* it rather than only read its answer.
//
// Why this is a class and not the usual pair of free functions over a parent
// array: three callers need it — the standalone DSU op-script generator, and
// both MST generators — and every one of them needs the counters
// (finds/unions/compressions) and the current max tree depth kept in step with
// the array. Passing five parallel arrays plus four counters through free
// functions was the first shape tried and it lost immediately: every call site
// had to remember to bump the right counter, which is exactly the kind of
// bookkeeping that goes wrong silently and makes the "union by rank keeps the
// tree shallow" claim on screen a lie nobody notices.
//
// The unusual part of this API is that `find` is *decomposed*. A textbook
// implementation compresses the path inside find, so the walk and the re-hang
// are one indivisible event. That is precisely what cannot be animated: the
// whole teaching payoff of path compression is seeing the pointers travel up
// to the root and then seeing them snap flat onto it, which needs those to be
// two observable states of the same array. So `pathTo` (pure, mutates nothing,
// counts nothing) and `completeFind` (counts the find, re-hangs the walk) are
// separate, and `find` is just the two glued back together for callers that
// don't care. Alternatives rejected:
//
//   - `find(x, { compress: false })` — a flag argument that silently changes
//     whether the structure mutates is a trap; two of the three callers would
//     have to pass it, and forgetting it degrades the whole animation to a
//     single frame with no error anywhere.
//   - Having `find` emit its own step objects — that would drag `DsuStep`,
//     pseudocode line numbers and explain strings into this file, and this
//     file is deliberately the one piece of the category with no opinion about
//     how it's displayed.
//
// `union` is decomposed the same way and for the same reason: `link` takes two
// roots the caller has already found (and already animated), so the merge is
// its own observable step.
//
// Time: find/union are O(α(n)) amortized — effectively constant. Space: O(n).

export class DisjointSet {
  /** Element count. Elements are the integers 0..n-1. */
  readonly n: number;

  private readonly parents: number[];
  private readonly ranks: number[];
  private readonly sizes: number[];

  private findCount = 0;
  private unionCount = 0;
  private compressionCount = 0;
  private componentCount: number;

  constructor(n: number) {
    this.n = Math.max(0, Math.floor(n));
    this.parents = Array.from({ length: this.n }, (_, i) => i);
    this.ranks = new Array<number>(this.n).fill(0);
    this.sizes = new Array<number>(this.n).fill(1);
    this.componentCount = this.n;
  }

  /** Disjoint sets remaining. Reaches 1 exactly when everything is connected. */
  get components(): number {
    return this.componentCount;
  }

  /** How many find operations have been performed. */
  get finds(): number {
    return this.findCount;
  }

  /** How many unions actually merged two different sets. A no-op union is not counted. */
  get unions(): number {
    return this.unionCount;
  }

  /**
   * How many *pointers* have been re-hung by path compression — not how many
   * finds compressed something.
   *
   * Counting pointers rather than events is the number that means something
   * here: it is exactly the amount of tree height that compression has
   * removed, so it can be read side by side with the max-depth stat and the
   * two tell one story. A per-find counter would instead be bounded by the
   * find counter and would say nothing about how much work was saved.
   */
  get compressions(): number {
    return this.compressionCount;
  }

  /** True when `x` is a root. Pure. */
  isRoot(x: number): boolean {
    return this.parents[x] === x;
  }

  /**
   * Rank of `x`. Only meaningful for a root, where it is an upper bound on the
   * tree's height. Exposed so a generator can read the two ranks it is about
   * to compare *before* `link` bumps the survivor's — an explain string that
   * quoted the ranks afterwards would be describing the aftermath while
   * claiming to describe the decision.
   */
  rankOf(x: number): number {
    return this.ranks[x];
  }

  /** Number of elements in `x`'s set. Only meaningful for a root. */
  sizeOf(x: number): number {
    return this.sizes[x];
  }

  /**
   * The walk from `x` up to its root, inclusive at both ends — so the last
   * element is always the root, and a root's own path is `[x]`.
   *
   * Pure: mutates nothing and counts nothing. This is what the generators
   * animate one element at a time, *before* asking for the compression, so the
   * snapshots they yield show the pointers as they were on the way up.
   */
  pathTo(x: number): number[] {
    const path = [x];
    let node = x;
    while (this.parents[node] !== node) {
      node = this.parents[node];
      path.push(node);
    }
    return path;
  }

  /**
   * Finish a find whose walk is `path` (as returned by `pathTo`): count the
   * find, then re-hang every node on the walk directly onto the root.
   *
   * Returns the nodes whose parent actually changed — which is what the
   * snapshot's `compressed` field renders, and deliberately *not* the whole
   * path: the root and the node already pointing straight at it were never
   * re-hung, and painting them as if they had been would overstate what
   * compression did on that step.
   */
  completeFind(path: readonly number[]): number[] {
    this.findCount += 1;
    if (path.length === 0) return [];

    const root = path[path.length - 1];
    const compressed: number[] = [];
    for (const node of path) {
      if (node === root) continue;
      if (this.parents[node] === root) continue;
      this.parents[node] = root;
      compressed.push(node);
    }
    this.compressionCount += compressed.length;
    return compressed;
  }

  /** Root of `x`, compressing the path behind it. Counts one find. */
  find(x: number): number {
    const path = this.pathTo(x);
    this.completeFind(path);
    return path[path.length - 1];
  }

  /**
   * Root of `x` without compressing and without counting.
   *
   * Exists for read-only consumers — the node badges on the graph canvas ask
   * for every node's set root on every repaint, and a repaint must never
   * mutate the structure it is drawing or the counters would climb while the
   * user sat perfectly still.
   */
  rootOf(x: number): number {
    let node = x;
    while (this.parents[node] !== node) node = this.parents[node];
    return node;
  }

  /**
   * Merge two roots by rank. Returns false when they are already the same set,
   * which is the rejection test both MST generators are built on.
   *
   * Takes roots, not arbitrary elements, so the caller can animate the two
   * finds itself and yield the merge as its own step.
   */
  link(rootA: number, rootB: number): boolean {
    if (rootA === rootB) return false;

    // Shorter tree under taller: the result's height is then max(hA, hB)
    // rather than hA + 1, which is the whole reason depth stays O(log n).
    let a = rootA;
    let b = rootB;
    if (this.ranks[a] < this.ranks[b]) [a, b] = [b, a];

    this.parents[b] = a;
    this.sizes[a] += this.sizes[b];
    // Only a tie can deepen the tree, and then by exactly one.
    if (this.ranks[a] === this.ranks[b]) this.ranks[a] += 1;

    this.unionCount += 1;
    this.componentCount -= 1;
    return true;
  }

  /** find both, then link. Returns false if they were already connected. */
  union(a: number, b: number): boolean {
    return this.link(this.find(a), this.find(b));
  }

  /** Whether `a` and `b` are in the same set. Counts two finds and compresses. */
  connected(a: number, b: number): boolean {
    return this.find(a) === this.find(b);
  }

  /** Whether `a` and `b` are in the same set, without counting or compressing. */
  isConnected(a: number, b: number): boolean {
    return this.rootOf(a) === this.rootOf(b);
  }

  /**
   * Deepest node in the whole forest, counting a root as depth 0.
   *
   * Recomputed on demand rather than maintained incrementally. Maintaining it
   * would be wrong, not merely fiddly: compression lifts an unbounded number
   * of nodes at once and can shrink a tree's height by any amount, so there is
   * no O(1) update — an incremental counter could only ever be an upper bound
   * that drifts further from the truth the better compression works, which
   * would turn the one honest piece of evidence on the stats panel into the
   * least honest one. Iterative rather than recursive, with a memo, so a
   * pathological chain cannot blow the stack: O(n) per call.
   */
  maxDepth(): number {
    const depth = new Array<number>(this.n).fill(-1);
    let max = 0;

    for (let i = 0; i < this.n; i++) {
      // Walk up until a node with a known depth (or a root) is reached,
      // remembering the way back down so the whole chain can be filled in.
      const pending: number[] = [];
      let node = i;
      while (depth[node] === -1 && this.parents[node] !== node) {
        pending.push(node);
        node = this.parents[node];
      }
      if (depth[node] === -1) depth[node] = 0;

      let d = depth[node];
      while (pending.length > 0) {
        d += 1;
        depth[pending.pop()!] = d;
      }
      if (d > max) max = d;
    }

    return max;
  }

  /**
   * A plain, fully-copied view of the forest for one step snapshot.
   *
   * Every array is copied: `useStepPlayer` keeps every snapshot it pulls on a
   * tape so the user can scrub backwards, so a shared reference would mean
   * step 3 quietly showing step 40's parent array.
   */
  snapshot(findPath: readonly number[] = [], compressed: readonly number[] = []): DsuSnapshot {
    return {
      parent: [...this.parents],
      rank: [...this.ranks],
      setSize: [...this.sizes],
      findPath: [...findPath],
      compressed: [...compressed],
      finds: this.findCount,
      unions: this.unionCount,
      compressions: this.compressionCount,
      maxDepth: this.maxDepth(),
    };
  }
}
