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
const DEFAULT_MAX_WEIGHT = 20;

/**
 * `weighted`/`maxWeight` are their own options object rather than positional
 * parameters so the MST vertical (Kruskal/Prim need real edge costs; BFS/DFS
 * don't) can opt in without disturbing the existing two-argument call sites
 * this generator already has.
 */
export interface GraphGenOptions {
  weighted?: boolean;
  /** Inclusive upper bound for a drawn weight; weights are always >= 1. */
  maxWeight?: number;
}

export function generateGraph(
  nodeCount = 10,
  rng: Rng = createRng(randomSeed()),
  options?: GraphGenOptions,
): GraphModel {
  const n = Math.max(1, Math.floor(nodeCount));
  const center = VIEWBOX_SIZE / 2;
  const radius = VIEWBOX_SIZE * RADIUS_RATIO;
  const weighted = options?.weighted ?? false;
  const maxWeight = options?.maxWeight ?? DEFAULT_MAX_WEIGHT;

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

    // Weight is drawn right here, at the instant the edge is actually
    // created, rather than in a later pass over the finished `edges` array.
    // addEdge is called in one fixed, deterministic order (the ring first,
    // then each random chord as its endpoints are drawn below), and every
    // call shares the single seeded `rng` that the edge *selection* itself
    // is drawn from. Assigning weights in a separate post-pass would still
    // be deterministic in isolation, but would silently rebind "which draw
    // produced this weight" to array position/iteration order instead of to
    // the edge's creation order — an invitation for a future refactor
    // (sorting or filtering `edges` before the weight pass) to break
    // reproducibility with no visible symptom until a shared seed started
    // rendering different weights than the bug report that cited it.
    const weight = weighted ? rng.int(1, maxWeight) : undefined;
    edges.push(weight === undefined ? { id: key, from, to } : { id: key, from, to, weight });
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
