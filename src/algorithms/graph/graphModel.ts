import type { GraphEdge, GraphModel, GraphNode } from '@/types';
import { createRng, randomSeed, type Rng } from '@/utils/rng';

// Deterministic demo-graph generator for the traversal vertical.
//
// This is a generic node-link graph (nodes + edges), not a grid — it has no
// relationship to the grid-based pathfinding module elsewhere in this app.
// No layout library, no physics simulation: nodes sit at fixed positions on a
// circle so the diagram always renders sensibly with zero settling time.

const VIEWBOX_SIZE = 400;
const RADIUS_RATIO = 0.42; // circle radius relative to the SVG viewBox
const EXTRA_EDGE_RATIO = 0.35; // extra chord edges added, roughly proportional to node count

export function generateGraph(nodeCount = 10, rng: Rng = createRng(randomSeed())): GraphModel {
  const n = Math.max(1, Math.floor(nodeCount));
  const center = VIEWBOX_SIZE / 2;
  const radius = VIEWBOX_SIZE * RADIUS_RATIO;

  const nodes: GraphNode[] = Array.from({ length: n }, (_, i) => {
    // Start at the top (-90deg) and go clockwise so the layout reads naturally.
    const theta = (2 * Math.PI * i) / n - Math.PI / 2;
    return {
      id: i,
      label: `N${i}`,
      x: center + radius * Math.cos(theta),
      y: center + radius * Math.sin(theta),
    };
  });

  const edgeKeys = new Set<string>();
  const edges: GraphEdge[] = [];

  function addEdge(from: number, to: number) {
    if (from === to) return;
    const key = from < to ? `${from}-${to}` : `${to}-${from}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push({ id: key, from, to });
  }

  // A ring first: guarantees the whole graph is connected regardless of which
  // random chords land below, so BFS/DFS always have a full graph to explore.
  for (let i = 0; i < n; i++) {
    addEdge(i, (i + 1) % n);
  }

  // A handful of random chords add branching beyond the plain ring.
  const extraEdgeCount = n > 2 ? Math.max(1, Math.round(n * EXTRA_EDGE_RATIO)) : 0;
  for (let i = 0; i < extraEdgeCount; i++) {
    const a = rng.int(0, n - 1);
    const b = rng.int(0, n - 1);
    addEdge(a, b);
  }

  const adjacency = new Map<number, number[]>(nodes.map((node) => [node.id, []]));
  for (const edge of edges) {
    adjacency.get(edge.from)!.push(edge.to);
    adjacency.get(edge.to)!.push(edge.from);
  }

  return { nodes, edges, adjacency };
}
