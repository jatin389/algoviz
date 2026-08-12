import type { GraphStep, NodeId } from '@/types';

// Cycle detection over a generic node-link graph (adjacency list) — undirected
// only. The demo graph model (see graphModel.ts) always inserts edges
// symmetrically (`adjacency.get(a).push(b); adjacency.get(b).push(a)`), so
// every adjacency map this app actually produces is undirected, and there is
// nowhere in the codebase that builds a directed one. Directed cycle
// detection needs a different rule entirely (recursion-stack / "grey" nodes,
// because a directed graph can have a node reached by two different paths
// with no cycle at all — a cross edge — which cannot happen in an undirected
// DFS tree). That rule is not implemented here since there is no directed
// data to exercise it against; only the undirected rule is: a back edge to
// any already-visited neighbor that isn't the edge you just arrived on means
// a cycle.
//
// Whole-graph, not just start's component: a cycle can live in a component
// the start node never reaches, and "does this graph have a cycle" should be
// true regardless of where the caller happens to click. So after exhausting
// startId's component with no cycle, remaining unvisited nodes are swept as
// fresh roots too — seeding with start and then walking the rest, rather
// than changing the generator signature to drop the start node entirely
// (which would break the GraphView caller, which always has one in hand).
//
// Result encoding: GraphStep carries no boolean/witness field for "a cycle
// was found" (compare HeapStep's algorithm-specific `extracted?`), and
// extending GraphStep is out of scope for this slice — src/types/steps.ts is
// shared with other in-flight work. So the result rides a documented
// convention on the existing fields instead, deliberately mirroring
// bfsTraversal/dfsTraversal's own "current is null on the terminal snapshot"
// rule: the terminal step's `current` stays null when the whole graph was
// swept with no cycle, and is set to the already-visited neighbor the
// closing back edge points at when one is found. Every other step's
// `current` means exactly what it means in dfsTraversal: the node just
// popped and expanded. (This also renders for free — GraphCanvas.vue already
// paints `current` with its own highlight color, so the witness node lights
// up without any view change.) The cleaner long-term fix would give
// GraphStep a dedicated `cycleEdge: [NodeId, NodeId] | null` field.
//
// Time: O(V + E), Space: O(V).

export function* cycleDetection(
  adjacency: Map<NodeId, NodeId[]>,
  startId: NodeId,
): Generator<GraphStep, void, undefined> {
  const visited: NodeId[] = [];
  const visitedSet = new Set<NodeId>();

  if (!adjacency.has(startId)) {
    yield { visited, frontier: [], current: null, done: true };
    return;
  }

  // Try startId's component first, then sweep any components it can't reach.
  const roots = [startId, ...[...adjacency.keys()].filter((id) => id !== startId)];

  for (const root of roots) {
    if (visitedSet.has(root)) continue;

    // Explicit stack of [node, parent] pairs rather than recursion, matching
    // dfsTraversal's iterative style. `parent` is the one neighbor edge to
    // skip when scanning for back edges — the edge just arrived on.
    const stack: Array<[NodeId, NodeId | null]> = [[root, null]];

    while (stack.length > 0) {
      const [current, parent] = stack.pop()!;
      // A node can be pushed more than once before it's visited; skip re-processing.
      if (visitedSet.has(current)) continue;

      visitedSet.add(current);
      visited.push(current);

      const neighbors = adjacency.get(current) ?? [];
      let skippedParent = false;
      // Reverse order so the first-listed neighbor ends up on top of the
      // stack and is explored first, matching dfsTraversal's convention.
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        if (!skippedParent && neighbor === parent) {
          skippedParent = true;
          continue;
        }
        if (visitedSet.has(neighbor)) {
          // Already fully visited, and it isn't the edge we arrived on: a
          // second path reaches it, which is a cycle in an undirected graph.
          yield { visited: [...visited], frontier: [], current: neighbor, done: true };
          return;
        }
        stack.push([neighbor, current]);
      }

      yield {
        visited: [...visited],
        frontier: stack.map(([id]) => id),
        current,
        done: false,
      };
    }
  }

  yield { visited: [...visited], frontier: [], current: null, done: true };
}
