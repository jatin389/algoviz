import type { DsuAlgoKey } from './index';

/** One line of displayed pseudocode. Indentation is literal leading spaces. */
export type Pseudocode = readonly string[];

/**
 * Pseudocode for the union-find / MST category, in registry order.
 *
 * `Partial` for the same reason `algorithms/pseudocode.ts` is: the panel's
 * empty state is what lets a new algorithm ship before anyone has written its
 * prose, and a total `Record` would turn that ordering freedom into a compile
 * error at the worst possible moment. All three keys are written today.
 *
 * INVARIANT: every `line` a generator yields must index into its entry here,
 * and the terminal yield must tag the *final* line — which is why each entry
 * ends with a "done" line that nothing else in the run tags. `mst.test.ts`
 * enforces both.
 */
export const pseudocode: Partial<Record<DsuAlgoKey, Pseudocode>> = {
  dsu: [
    'parent[i] = i, rank[i] = 0        // n singleton sets',
    'find(x):',
    '  walk parent pointers up to the root',
    '  re-hang every node walked onto the root   // path compression',
    'union(a, b):',
    '  ra = find(a); rb = find(b)',
    '  if ra == rb: already one set — nothing to do',
    '  hang the lower-rank root under the higher   // union by rank',
    '  on a tie, the surviving root’s rank goes up by 1',
    'done — every operation in the script has run',
  ],
  kruskal: [
    'sort every edge by weight, lightest first',
    'parent[i] = i        // every node starts as its own component',
    'for each edge (u, v) in that order',
    '  if find(u) == find(v): reject — u and v are already connected',
    '  else accept (u, v) and union(u, v)',
    '  stop early once V - 1 edges have been accepted',
    'done — spanning tree, or a spanning forest if the graph was disconnected',
  ],
  prim: [
    'pick a start node; the tree holds just that node',
    'offer every edge leaving the tree as a candidate',
    'take the lightest candidate',
    '  if both its ends are already in the tree, drop it   // it would close a cycle',
    '  otherwise accept it: its far end joins the tree and offers its own edges',
    'no candidate left but nodes remain — restart from an unreached node',
    'done — spanning tree, or a spanning forest if the graph was disconnected',
  ],
};
