import type { GraphStep, NodeId } from '@/types';

// Breadth-First Search over a generic node-link graph (adjacency list), not a
// grid — kept independent from the grid-based pathfinding module.
//
// Snapshot shape (per yield):
//   { visited: id[], frontier: id[], current: id|null, done: boolean }
//   - visited:  traversal order so far, grows monotonically, never mutated
//               in place once yielded
//   - frontier: a fresh copy of the queue's contents at that step
//   - current:  the node just dequeued/expanded (null on the terminal step)
//
// Time: O(V + E) — every node is dequeued once, every edge examined once from
// each endpoint. Space: O(V) for the visited set and queue.

export function* bfsTraversal(
  adjacency: Map<NodeId, NodeId[]>,
  startId: NodeId,
): Generator<GraphStep, void, undefined> {
  const visited: NodeId[] = [];
  const visitedSet = new Set<NodeId>();
  const queue: NodeId[] = [];

  if (!adjacency.has(startId)) {
    yield { visited, frontier: [], current: null, done: true };
    return;
  }

  queue.push(startId);
  visitedSet.add(startId);

  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.push(current);

    for (const neighbor of adjacency.get(current) ?? []) {
      if (!visitedSet.has(neighbor)) {
        visitedSet.add(neighbor);
        queue.push(neighbor);
      }
    }

    yield { visited: [...visited], frontier: [...queue], current, done: false };
  }

  yield { visited: [...visited], frontier: [], current: null, done: true };
}
