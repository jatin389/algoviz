import type { DsuOp, DsuStep, GraphEdge, GraphNode, MstStep } from '@/types';
import type { DisjointSet } from './disjointSet';

// Shared step-snapshot builders for the union-find / MST category, mirroring
// the `_utils.ts` that `algorithms/`, `algorithms/search/` and
// `algorithms/pathfinding/` each already carry.
//
// It exists for a specific reason rather than out of habit: `kruskal.ts` and
// `prim.ts` yield the *same* `MstStep` shape with the same seven fields
// copied the same way, and a second hand-written copy of that builder is
// exactly the kind of duplication that ends with one generator forgetting to
// copy `acceptedEdges` and the history tape mutating under a backward scrub.
//
// IMPORTANT — the builders are exported under prefixed names but every
// generator imports them bare:
//
//     import { mstSnap as snap, mstDone as done } from './_utils';
//
// That is not stylistic. `sourceMap.ts` recovers which source line produced a
// step by matching `/^\s*yield\s+(?:snap|done)\(.*?,\s*(\d+)\s*\)\s*;?\s*$/`
// against the file's raw text, so the call site must literally read `snap(`
// or `done(` and the line tag must be the last argument on a single line. The
// prefixes exist only so both pairs can live in one module; the aliases are
// what keep the source-view highlight working.
//
// The corollary that bites: never inline a long template literal into a
// tagged yield. Prettier's 100-column wrap would split the call across lines
// and the regex — anchored at both ends — would stop matching, silently
// killing the highlight with no test failure anywhere near it. Build the
// explain string into a local first, then yield.

/** Weight of an edge that may not carry one. */
export const EDGE_WEIGHT_DEFAULT = 1;

/**
 * `GraphEdge.weight` is optional (traversal graphs have no weights), so an
 * unweighted edge is treated as cost 1 rather than being refused. Both MST
 * generators then still produce a correct spanning tree on an unweighted
 * graph — every spanning tree of it is minimum — instead of throwing at the
 * user because the graph came from the wrong generator call.
 */
export function edgeWeight(edge: GraphEdge): number {
  return edge.weight ?? EDGE_WEIGHT_DEFAULT;
}

/**
 * `min-max` key matching `graphModel.ts`'s own edge ids, so a synthetic edge
 * built in a test lines up with a generated one.
 */
export function edgeKey(from: number, to: number): string {
  return from < to ? `${from}-${to}` : `${to}-${from}`;
}

/** Weight ascending, then edge id, so equal weights still order deterministically. */
export function byWeightThenId(a: GraphEdge, b: GraphEdge): number {
  const delta = edgeWeight(a) - edgeWeight(b);
  return delta !== 0 ? delta : a.id.localeCompare(b.id);
}

/**
 * `GraphNode.id -> 0..n-1 slot`.
 *
 * `DisjointSet` is indexed by dense integers because its parent/rank/size
 * arrays are plain arrays, but a `GraphModel`'s node ids are only *usually*
 * 0..n-1 (that is `generateGraph`'s convention, not the type's contract). One
 * translation table at the boundary keeps the DSU honest about its own domain
 * instead of quietly assuming the ids it is handed happen to be indices.
 */
export function indexNodes(nodes: readonly GraphNode[]): Map<number, number> {
  return new Map(nodes.map((node, i) => [node.id, i]));
}

/** Labels indexed by DSU slot, for panels that render the forest by index. */
export function nodeLabels(nodes: readonly GraphNode[]): string[] {
  return nodes.map((node) => node.label);
}

/** The endpoint of `edge` that isn't `index` — both given as DSU slots. */
export function otherEnd(from: number, to: number, index: number): number {
  return from === index ? to : from;
}

/** Shared empty walk, so the common "no path was walked" case allocates nothing. */
export const NO_WALK: readonly number[] = Object.freeze([]);

// ---- DSU op-script snapshots ------------------------------------------------

/** Intermediate `DsuStep`. Import as `snap`. */
export const dsuSnap = (
  dsu: DisjointSet,
  op: DsuOp | null,
  active: number | null,
  explain: string,
  findPath: readonly number[],
  compressed: readonly number[],
  line: number,
): DsuStep => ({
  kind: 'dsu',
  forest: dsu.snapshot(findPath, compressed),
  op,
  active,
  explain,
  done: false,
  line,
});

/** Terminal `DsuStep`. Import as `done`. */
export const dsuDone = (dsu: DisjointSet, explain: string, line: number): DsuStep => ({
  kind: 'dsu',
  forest: dsu.snapshot(),
  op: null,
  active: null,
  explain,
  done: true,
  line,
});

// ---- MST snapshots ----------------------------------------------------------

/**
 * The mutable state one MST run carries between yields.
 *
 * Bundled into an object rather than passed as seven arguments purely so the
 * `yield snap(...)` call stays on one line — see the regex note at the top of
 * this file. The builders copy every array out of it, so the object staying
 * mutable never leaks into the recorded history.
 */
export interface MstRun {
  dsu: DisjointSet;
  /** Edge id under consideration right now; null between decisions. */
  considering: string | null;
  acceptedEdges: string[];
  rejectedEdges: string[];
  /** Edge ids still waiting, in the order they will be considered. */
  queue: string[];
  totalWeight: number;
}

export function createMstRun(dsu: DisjointSet): MstRun {
  return {
    dsu,
    considering: null,
    acceptedEdges: [],
    rejectedEdges: [],
    queue: [],
    totalWeight: 0,
  };
}

/** Intermediate `MstStep`. Import as `snap`. */
export const mstSnap = (
  run: MstRun,
  explain: string,
  findPath: readonly number[],
  line: number,
): MstStep => ({
  kind: 'mst',
  forest: run.dsu.snapshot(findPath),
  consideringEdge: run.considering,
  acceptedEdges: [...run.acceptedEdges],
  rejectedEdges: [...run.rejectedEdges],
  queue: [...run.queue],
  totalWeight: run.totalWeight,
  components: run.dsu.components,
  explain,
  done: false,
  line,
});

/** Terminal `MstStep`. Import as `done`. */
export const mstDone = (run: MstRun, explain: string, line: number): MstStep => ({
  kind: 'mst',
  forest: run.dsu.snapshot(),
  consideringEdge: null,
  acceptedEdges: [...run.acceptedEdges],
  rejectedEdges: [...run.rejectedEdges],
  queue: [],
  totalWeight: run.totalWeight,
  components: run.dsu.components,
  explain,
  done: true,
  line,
});

/**
 * The terminal sentence, shared by both generators.
 *
 * Written once here because getting it wrong is the specific dishonesty this
 * category is most prone to: on a disconnected graph there is no spanning
 * *tree*, `components` never reaches 1, and `|accepted|` is `V - components`
 * rather than `V - 1`. Reporting "spanning tree complete" anyway would be a
 * lie the visualization tells confidently, so the disconnected case is spelled
 * out rather than glossed.
 */
export function terminalExplain(run: MstRun, nodeCount: number, algorithm: string): string {
  const edges = run.acceptedEdges.length;
  const components = run.dsu.components;
  const weight = run.totalWeight;

  if (nodeCount === 0) return `${algorithm} finished: the graph has no nodes.`;
  if (components === 1) {
    return `${algorithm} finished: spanning tree with ${edges} edges (V - 1 = ${nodeCount - 1}), total weight ${weight}.`;
  }
  return `${algorithm} finished: the graph is disconnected, so this is a spanning forest — ${components} components, ${edges} edges (V - components = ${nodeCount} - ${components}), total weight ${weight}. No spanning tree exists.`;
}

/** Human-readable "N3 — N7" for an explain string, given DSU slots. */
export function describeEdge(labels: readonly string[], a: number, b: number): string {
  return `${labels[a] ?? a} — ${labels[b] ?? b}`;
}
