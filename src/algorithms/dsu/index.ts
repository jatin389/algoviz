import type {
  AlgorithmFn,
  AlgorithmMeta,
  DsuOp,
  DsuStep,
  GraphModel,
  MstStep,
  TimeSpaceComplexity,
} from '@/types';
import { dsuScript } from './dsuOps';
import { kruskal } from './kruskal';
import { prim } from './prim';

// Borůvka's algorithm is deliberately NOT registered here, and the reason is
// worth writing down because it is the obvious fourth entry. Borůvka is a
// genuinely different MST strategy — every component simultaneously picks its
// own cheapest outgoing edge, then all of those are merged at once — and it
// leans on a disjoint set even harder than Kruskal does, so it would fit the
// category perfectly. What it does not fit is `MstStep`. Its unit of work is a
// *round* in which many edges are chosen at the same instant, and this
// snapshot has exactly one `consideringEdge`; rendering a Borůvka round
// through it would mean either faking a sequential order that the algorithm
// does not have (dishonest — the whole point is the simultaneity) or adding a
// `consideringEdges: string[]` field to a shared types file that other
// in-flight work also owns. It belongs here once `MstStep` can describe a
// round, and not before.
//
// Reverse-delete is absent for a plainer reason: it needs a connectivity check
// per edge on the *whole* graph, which is a traversal, not a union-find — it
// would sit in this category rendering an empty forest panel and teaching the
// opposite of the lesson.

/** The standalone Union-Find driver: an element count plus a script of operations. */
export type DsuFn = AlgorithmFn<DsuStep, [number, readonly DsuOp[]]>;

/**
 * Both MST generators. The second parameter is Prim's root; Kruskal declares
 * only the first and is still assignable here, since a function may ignore
 * arguments it was not written to take. That is what lets one call site drive
 * both without a per-algorithm branch — the alternative, giving Kruskal an
 * unused `_root` parameter purely for symmetry, would be a parameter that
 * lies about what the algorithm reads.
 */
export type MstFn = AlgorithmFn<MstStep, [GraphModel, number]>;

/**
 * A registry entry, discriminated by the driver shape it needs.
 *
 * This is the one place this category departs from the other five registries,
 * and it is unavoidable: `dsu` runs on a script of operations while `kruskal`
 * and `prim` run on a weighted graph, so there is no single call signature
 * covering all three. Widening the generator field to
 * `AlgorithmFn<DsuStep | MstStep, unknown[]>` was tried first and rejected —
 * it type-checks and then hands every call site a generator it cannot
 * legitimately call, pushing a cast into `useMst`. A discriminated union
 * pushes the decision to where the knowledge actually lives: `mode` is checked
 * once, and TypeScript narrows the generator to the right signature on the
 * other side of the branch. Metadata-only consumers (`AvAlgorithmSelector`)
 * never look at `mode` and need no change.
 */
export type DsuCategoryAlgorithm =
  | (AlgorithmMeta<DsuFn, TimeSpaceComplexity> & { mode: 'dsu' })
  | (AlgorithmMeta<MstFn, TimeSpaceComplexity> & { mode: 'mst' });

/**
 * Central registry mapping a stable key -> algorithm metadata + generator.
 * Rendering code depends only on this contract, never on individual files.
 *
 * `satisfies` rather than a `: Record<string, ...>` annotation: the annotation
 * would widen `keyof typeof algorithms` to `string`, and the whole point of
 * the property names is that they *are* the algorithm keys.
 *
 * `{ time, space }` rather than best/average/worst: none of the three has an
 * input-dependent bound worth distinguishing, so repeating one string three
 * times would only pad the panel.
 */
export const algorithms = {
  dsu: {
    name: 'Union-Find',
    mode: 'dsu',
    generator: dsuScript,
    description:
      'The disjoint-set forest on its own: compose a script of union and find operations and watch the trees merge. Each find walks to its root and then re-hangs the whole walk onto it — path compression — while union always hangs the shallower tree under the deeper, which is what keeps the forest from degenerating into a linked list.',
    complexity: { time: 'O(α(n)) amortized per op', space: 'O(n)' },
  },
  kruskal: {
    name: "Kruskal's MST",
    mode: 'mst',
    generator: kruskal,
    description:
      'Sorts every edge by weight and walks that list once, accepting an edge whenever its endpoints are still in different components and rejecting it when they are not. The "still different?" question is answered by the disjoint set, which is the only reason the greedy rule is affordable.',
    complexity: { time: 'O(E log E)', space: 'O(V + E)' },
  },
  prim: {
    name: "Prim's MST",
    mode: 'mst',
    generator: prim,
    description:
      'Grows a single tree from a root, repeatedly taking the cheapest edge that crosses from the tree to a node outside it. Reaches the same total weight as Kruskal on any connected graph, by a completely different route — one growing tree instead of many merging ones.',
    complexity: { time: 'O(V · E)', space: 'O(V + E)' },
  },
} satisfies Record<string, DsuCategoryAlgorithm>;

/** Literal union of the registry keys: 'dsu' | 'kruskal' | 'prim' */
export type DsuAlgoKey = keyof typeof algorithms;

/** The two keys whose generator takes a graph — i.e. everything except `dsu`. */
export type MstAlgoKey = Exclude<DsuAlgoKey, 'dsu'>;

/** The step union this category's single step player is parameterised on. */
export type DsuCategoryStep = DsuStep | MstStep;
