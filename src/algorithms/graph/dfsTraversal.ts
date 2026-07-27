import type { GraphStep, NodeId } from '@/types';

// Depth-First Search over a generic node-link graph (adjacency list), not a
// grid — kept independent from the grid-based pathfinding module.
//
// Iterative with an explicit stack rather than recursion, so each expansion
// step can yield a snapshot cleanly (a recursive generator would need
// `yield*` delegation at every call site to get the same step-by-step control).
//
// Snapshot shape matches bfsTraversal.js:
//   { visited: id[], frontier: id[], current: id|null, done: boolean }
//   - frontier here is the stack's contents rather than a queue's.
//
// Time: O(V + E), Space: O(V).

export function* dfsTraversal(
  adjacency: Map<NodeId, NodeId[]>,
  startId: NodeId,
): Generator<GraphStep, void, undefined> {
  const visited: NodeId[] = [];
  const visitedSet = new Set<NodeId>();
  const stack: NodeId[] = [];

  if (!adjacency.has(startId)) {
    yield { visited, frontier: [], current: null, done: true };
    return;
  }

  stack.push(startId);

  while (stack.length > 0) {
    const current = stack.pop()!;
    // A node can be pushed more than once before it's visited; skip re-processing.
    if (visitedSet.has(current)) continue;

    visitedSet.add(current);
    visited.push(current);

    // Push neighbors in reverse so the first-listed neighbor is explored first
    // (it ends up on top of the stack), matching BFS's traversal-order intuition.
    const neighbors = adjacency.get(current) ?? [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visitedSet.has(neighbor)) stack.push(neighbor);
    }

    yield { visited: [...visited], frontier: [...stack], current, done: false };
  }

  yield { visited: [...visited], frontier: [], current: null, done: true };
}
