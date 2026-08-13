import { describe, it, expect } from 'vitest';
import type { GraphEdge, GraphModel, GraphNode, MstStep } from '@/types';
import { generateGraph } from '@/algorithms/graph/graphModel';
import { createRng } from '@/utils/rng';
import { algorithms } from './index';
import type { MstAlgoKey } from './index';
import { kruskal } from './kruskal';
import { prim } from './prim';
import { pseudocode } from './pseudocode';
import { edgeKey, edgeWeight } from './_utils';

/** Both MST generators, keyed the way the registry keys them. */
const MST_GENERATORS = { kruskal, prim } satisfies Record<
  MstAlgoKey,
  (graph: GraphModel, root?: number) => Generator<MstStep, void, undefined>
>;

const MST_KEYS = Object.keys(MST_GENERATORS) as MstAlgoKey[];

/**
 * Build a GraphModel by hand. `generateGraph` always lays a ring first, so it
 * can only ever produce connected graphs — the disconnected cases below have
 * to be constructed explicitly, which is exactly why they need testing.
 */
function buildGraph(nodeCount: number, spec: Array<[number, number, number]>): GraphModel {
  const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    label: `N${i}`,
    x: 0,
    y: 0,
  }));

  const edges: GraphEdge[] = spec.map(([from, to, weight]) => ({
    id: edgeKey(from, to),
    from,
    to,
    weight,
  }));

  const adjacency = new Map<number, number[]>(nodes.map((node) => [node.id, []]));
  for (const edge of edges) {
    adjacency.get(edge.from)!.push(edge.to);
    adjacency.get(edge.to)!.push(edge.from);
  }

  return { nodes, edges, adjacency };
}

function run(key: MstAlgoKey, graph: GraphModel, root?: number): MstStep[] {
  return [...MST_GENERATORS[key](graph, root)];
}

function finalStep(key: MstAlgoKey, graph: GraphModel, root?: number): MstStep {
  const steps = run(key, graph, root);
  return steps[steps.length - 1];
}

/** Naive component count over the raw edge list — no disjoint set involved. */
function componentCount(graph: GraphModel): number {
  const seen = new Set<number>();
  let count = 0;
  for (const node of graph.nodes) {
    if (seen.has(node.id)) continue;
    count += 1;
    const stack = [node.id];
    while (stack.length > 0) {
      const at = stack.pop()!;
      if (seen.has(at)) continue;
      seen.add(at);
      for (const neighbor of graph.adjacency.get(at) ?? []) stack.push(neighbor as number);
    }
  }
  return count;
}

/** Does the accepted edge set contain a cycle? Checked by plain DFS, not by DSU. */
function hasCycle(graph: GraphModel, acceptedIds: readonly string[]): boolean {
  const accepted = new Set(acceptedIds);
  const adjacency = new Map<number, number[]>(graph.nodes.map((n) => [n.id, []]));
  for (const edge of graph.edges) {
    if (!accepted.has(edge.id)) continue;
    adjacency.get(edge.from)!.push(edge.to);
    adjacency.get(edge.to)!.push(edge.from);
  }

  const seen = new Set<number>();
  for (const node of graph.nodes) {
    if (seen.has(node.id)) continue;
    const stack: Array<[number, number | null]> = [[node.id, null]];
    while (stack.length > 0) {
      const [at, parent] = stack.pop()!;
      if (seen.has(at)) return true;
      seen.add(at);
      for (const neighbor of adjacency.get(at) ?? []) {
        if (neighbor === parent) continue;
        if (seen.has(neighbor)) return true;
        stack.push([neighbor, at]);
      }
    }
  }
  return false;
}

// ---- Fixtures ---------------------------------------------------------------

// The textbook worked example: a unique MST of weight 1+2+3+4 = 10.
const knownGraph = buildGraph(5, [
  [0, 1, 1],
  [0, 2, 7],
  [1, 2, 5],
  [1, 3, 4],
  [2, 3, 6],
  [2, 4, 2],
  [3, 4, 3],
]);

// Three components: {0,1,2}, {3,4} and the isolated 5.
const disconnectedGraph = buildGraph(6, [
  [0, 1, 4],
  [1, 2, 1],
  [0, 2, 9],
  [3, 4, 2],
]);

const singleNodeGraph = buildGraph(1, []);
const emptyGraph = buildGraph(0, []);

// Every edge the same weight: the tie-break must still be deterministic, and
// both algorithms must still produce V-1 edges.
const flatGraph = buildGraph(6, [
  [0, 1, 3],
  [1, 2, 3],
  [2, 3, 3],
  [3, 4, 3],
  [4, 5, 3],
  [5, 0, 3],
  [0, 3, 3],
]);

describe('MST — Kruskal against Prim', () => {
  it('reach the same total weight on the same connected weighted graph, across many seeds', () => {
    // The single strongest correctness check available: two entirely different
    // strategies (many merging trees vs one growing tree) must agree on the
    // total, and they can only agree by both being right.
    for (let seed = 1; seed <= 60; seed++) {
      for (const nodeCount of [4, 7, 12]) {
        const graph = generateGraph(nodeCount, createRng(seed), { weighted: true, maxWeight: 30 });

        const byKruskal = finalStep('kruskal', graph);
        const byPrim = finalStep('prim', graph);

        expect(byPrim.totalWeight, `seed ${seed}, n ${nodeCount}`).toBe(byKruskal.totalWeight);
        expect(byPrim.acceptedEdges).toHaveLength(byKruskal.acceptedEdges.length);
      }
    }
  });

  it('agree regardless of which node Prim starts from', () => {
    const graph = generateGraph(10, createRng(2468), { weighted: true, maxWeight: 25 });
    const target = finalStep('kruskal', graph).totalWeight;

    for (const node of graph.nodes) {
      expect(finalStep('prim', graph, node.id).totalWeight).toBe(target);
    }
  });

  it('agree on a disconnected graph, where neither can produce a spanning tree', () => {
    const byKruskal = finalStep('kruskal', disconnectedGraph);
    const byPrim = finalStep('prim', disconnectedGraph);

    expect(byPrim.totalWeight).toBe(byKruskal.totalWeight);
    expect(byPrim.components).toBe(byKruskal.components);
  });

  it('find the known minimum on the worked example', () => {
    for (const key of MST_KEYS) {
      expect(finalStep(key, knownGraph).totalWeight, key).toBe(10);
    }
  });
});

describe.each(MST_KEYS)('MST invariants — %s', (key) => {
  it('accepts exactly V - 1 edges on a connected graph', () => {
    for (let seed = 1; seed <= 25; seed++) {
      const graph = generateGraph(9, createRng(seed), { weighted: true });
      const final = finalStep(key, graph);

      expect(final.components).toBe(1);
      expect(final.acceptedEdges).toHaveLength(graph.nodes.length - 1);
    }
  });

  it('accepts V - components edges on a disconnected graph, and says so', () => {
    const final = finalStep(key, disconnectedGraph);
    const components = componentCount(disconnectedGraph);

    expect(components).toBe(3);
    expect(final.components).toBe(components);
    expect(final.acceptedEdges).toHaveLength(disconnectedGraph.nodes.length - components);
    // The terminal step must not claim a spanning tree it did not build.
    expect(final.explain).toContain('disconnected');
    expect(final.explain).toContain('forest');
  });

  it('produces an acyclic accepted set that spans every reachable node', () => {
    for (const graph of [knownGraph, disconnectedGraph, flatGraph]) {
      const final = finalStep(key, graph);

      expect(hasCycle(graph, final.acceptedEdges)).toBe(false);

      // Spanning: contracting the accepted edges must leave exactly as many
      // pieces as the graph itself has components — i.e. every node that could
      // be reached, was.
      const reachableComponents = componentCount(graph);
      const touched = new Set<number>();
      for (const id of final.acceptedEdges) {
        const edge = graph.edges.find((e) => e.id === id)!;
        touched.add(edge.from);
        touched.add(edge.to);
      }
      // Isolated nodes have no edge to be touched by, so they are excluded.
      const nonIsolated = graph.nodes.filter((n) => (graph.adjacency.get(n.id) ?? []).length > 0);
      for (const node of nonIsolated) expect(touched.has(node.id)).toBe(true);
      expect(final.components).toBe(reachableComponents);
    }
  });

  it('accepts and rejects each edge at most once, and never both', () => {
    const graph = generateGraph(11, createRng(4711), { weighted: true });
    const final = finalStep(key, graph);

    const accepted = new Set(final.acceptedEdges);
    const rejected = new Set(final.rejectedEdges);

    expect(accepted.size).toBe(final.acceptedEdges.length);
    expect(rejected.size).toBe(final.rejectedEdges.length);
    for (const id of accepted) expect(rejected.has(id)).toBe(false);
  });

  it('reports a total weight that is the sum of its own accepted edges', () => {
    const graph = generateGraph(10, createRng(1234), { weighted: true });
    const final = finalStep(key, graph);

    const sum = final.acceptedEdges
      .map((id) => edgeWeight(graph.edges.find((e) => e.id === id)!))
      .reduce((a, b) => a + b, 0);

    expect(final.totalWeight).toBe(sum);
  });

  it('never shrinks the accepted set and never raises the component count', () => {
    const steps = run(key, generateGraph(10, createRng(8080), { weighted: true }));

    for (let i = 1; i < steps.length; i++) {
      expect(steps[i].acceptedEdges.length).toBeGreaterThanOrEqual(
        steps[i - 1].acceptedEdges.length,
      );
      expect(steps[i].components).toBeLessThanOrEqual(steps[i - 1].components);
      expect(steps[i].totalWeight).toBeGreaterThanOrEqual(steps[i - 1].totalWeight);
    }
  });

  it('terminates with exactly one done step, and it is last', () => {
    const steps = run(key, generateGraph(8, createRng(99), { weighted: true }));
    expect(steps.filter((s) => s.done)).toHaveLength(1);
    expect(steps[steps.length - 1].done).toBe(true);
    expect(steps[steps.length - 1].consideringEdge).toBeNull();
  });

  it('copes with a single node and with no nodes at all', () => {
    for (const graph of [singleNodeGraph, emptyGraph]) {
      const final = finalStep(key, graph);
      expect(final.done).toBe(true);
      expect(final.acceptedEdges).toEqual([]);
      expect(final.totalWeight).toBe(0);
    }
  });

  it('is deterministic on tied weights', () => {
    const first = finalStep(key, flatGraph).acceptedEdges;
    const second = finalStep(key, flatGraph).acceptedEdges;
    expect(second).toEqual(first);
    expect(first).toHaveLength(flatGraph.nodes.length - 1);
  });
});

describe.each(MST_KEYS)('pseudocode tagging — %s', (key) => {
  it('tags every step with a line that indexes into its own pseudocode entry', () => {
    const lines = pseudocode[key];
    expect(lines).toBeDefined();

    for (const graph of [knownGraph, disconnectedGraph, flatGraph]) {
      for (const step of run(key, graph)) {
        expect(step.line, `${key} step untagged`).toBeTypeOf('number');
        expect(step.line!).toBeGreaterThanOrEqual(0);
        expect(step.line!).toBeLessThan(lines!.length);
      }
    }
  });

  it('tags the terminal step with the final pseudocode line', () => {
    const lines = pseudocode[key]!;
    for (const graph of [knownGraph, disconnectedGraph, singleNodeGraph]) {
      expect(finalStep(key, graph).line).toBe(lines.length - 1);
    }
  });

  it('reserves the final pseudocode line for the terminal step alone', () => {
    const lines = pseudocode[key]!;
    const steps = run(key, knownGraph);
    for (const step of steps.slice(0, -1)) {
      expect(step.line).not.toBe(lines.length - 1);
    }
  });
});

describe('MST snapshot immutability', () => {
  it.each(MST_KEYS)('%s — mutating a yielded snapshot does not affect later steps', (key) => {
    const graph = generateGraph(9, createRng(31415), { weighted: true });
    const steps = run(key, graph);
    expect(steps.length).toBeGreaterThan(4);

    const laterAccepted = steps.map((s) => [...s.acceptedEdges]);
    const laterParents = steps.map((s) => [...s.forest.parent]);

    // Vandalise one recorded step in every way a consumer plausibly could.
    const victim = steps[2];
    victim.acceptedEdges.push('vandal');
    victim.rejectedEdges.push('vandal');
    victim.queue.length = 0;
    victim.forest.parent[0] = 999;
    victim.forest.findPath.push(999);

    for (let i = 0; i < steps.length; i++) {
      if (i === 2) continue;
      expect(steps[i].acceptedEdges).toEqual(laterAccepted[i]);
      expect(steps[i].forest.parent).toEqual(laterParents[i]);
    }
  });
});

describe('registry', () => {
  it('exposes exactly the three category keys', () => {
    expect(Object.keys(algorithms)).toEqual(['dsu', 'kruskal', 'prim']);
  });

  it('marks each entry with the driver shape its generator needs', () => {
    expect(algorithms.dsu.mode).toBe('dsu');
    expect(algorithms.kruskal.mode).toBe('mst');
    expect(algorithms.prim.mode).toBe('mst');
  });

  it('has pseudocode written for every registered key', () => {
    for (const key of Object.keys(algorithms) as Array<keyof typeof algorithms>) {
      expect(pseudocode[key], key).toBeDefined();
      expect(pseudocode[key]!.length).toBeGreaterThan(1);
    }
  });
});
