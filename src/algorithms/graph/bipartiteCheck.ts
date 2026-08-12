import type { GraphStep, NodeId } from '@/types';

// 2-colouring / bipartite check over a generic node-link graph (adjacency
// list) — undirected only, same reasoning as cycleDetection.ts: this app
// never builds a directed adjacency map, and bipartiteness is an inherently
// undirected notion anyway (edge direction plays no part in its definition).
//
// Whole-graph, not just start's component: bipartiteness is a property of
// the entire graph, and a component the start node can't reach might be the
// one that breaks it. Same "seed with start, then sweep remaining
// components" approach as cycleDetection.ts, and for the same reason —
// dropping the start node from the signature would break the GraphView
// caller, which always has one in hand.
//
// Visualization limit worth being explicit about: GraphStep has no per-node
// field to carry a colour (0/1) alongside `visited` — it is visited/frontier
// -shaped only, not colour-shaped. So the actual red/blue partition cannot be
// shown step by step here; every node gets added to `visited` the same way
// regardless of which side it lands on. What *is* shown faithfully is the
// real BFS layer-by-layer expansion (`visited`/`frontier` are the genuine
// queue mechanics of the 2-colouring pass, not a fake), plus the final
// yes/no answer, which rides the same terminal-`current` convention as
// cycleDetection.ts (see that file for the fuller rationale): null on the
// terminal step means every component 2-coloured cleanly; non-null names the
// node where a same-colour edge broke it. A proper fix for the missing
// colour visualization would add something like a `colors: Map<NodeId, 0 |
// 1>` field to GraphStep and teach GraphCanvas.vue to paint the two colours
// — both out of scope for this slice.
//
// Time: O(V + E), Space: O(V).

export function* bipartiteCheck(
  adjacency: Map<NodeId, NodeId[]>,
  startId: NodeId,
): Generator<GraphStep, void, undefined> {
  const visited: NodeId[] = [];
  const visitedSet = new Set<NodeId>();
  const color = new Map<NodeId, 0 | 1>();

  if (!adjacency.has(startId)) {
    yield { visited, frontier: [], current: null, done: true };
    return;
  }

  // Try startId's component first, then sweep any components it can't reach.
  const roots = [startId, ...[...adjacency.keys()].filter((id) => id !== startId)];

  for (const root of roots) {
    if (visitedSet.has(root)) continue;

    const queue: NodeId[] = [root];
    visitedSet.add(root);
    color.set(root, 0);

    while (queue.length > 0) {
      const current = queue.shift()!;
      visited.push(current);

      const currentColor = color.get(current)!;
      const nextColor: 0 | 1 = currentColor === 0 ? 1 : 0;

      for (const neighbor of adjacency.get(current) ?? []) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          color.set(neighbor, nextColor);
          queue.push(neighbor);
        } else if (color.get(neighbor) === currentColor) {
          // Same colour on both ends of an edge: no valid 2-colouring exists.
          yield { visited: [...visited], frontier: [...queue], current: neighbor, done: true };
          return;
        }
      }

      yield { visited: [...visited], frontier: [...queue], current, done: false };
    }
  }

  yield { visited: [...visited], frontier: [], current: null, done: true };
}
