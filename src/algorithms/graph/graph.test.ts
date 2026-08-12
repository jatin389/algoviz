import { describe, it, expect } from 'vitest';
import type { GraphFn, GraphAlgoKey } from './index';
import { algorithms } from './index';
import { generateGraph } from './graphModel';
import { createRng } from '@/utils/rng';
import type { GraphStep, NodeId } from '@/types';

// Fixed adjacency fixtures built directly here (not via generateGraph) so
// traversal assertions stay fully deterministic regardless of seeding —
// generateGraph itself is exercised for determinism in the describe block below.
function buildAdjacency(nodeIds: NodeId[], edges: Array<[NodeId, NodeId]>): Map<NodeId, NodeId[]> {
  const adjacency = new Map<NodeId, NodeId[]>(nodeIds.map((id) => [id, []]));
  for (const [a, b] of edges) {
    adjacency.get(a)!.push(b);
    adjacency.get(b)!.push(a);
  }
  return adjacency;
}

function runToCompletion(
  generator: GraphFn,
  adjacency: Map<NodeId, NodeId[]>,
  startId: NodeId,
): GraphStep[] {
  const steps: GraphStep[] = [];
  for (const step of generator(adjacency, startId)) steps.push(step);
  return steps;
}

// A single connected ring: every node reachable from every other node.
const ringAdjacency = buildAdjacency(
  [0, 1, 2, 3, 4],
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
  ],
);

// Two disconnected components: {0,1,2} and {3,4,5}.
const disconnectedAdjacency = buildAdjacency(
  [0, 1, 2, 3, 4, 5],
  [
    [0, 1],
    [1, 2],
    [3, 4],
    [4, 5],
  ],
);

// A single node with zero edges at all.
const isolatedAdjacency = buildAdjacency([0], []);

// A tree: connected and acyclic, the baseline "no cycle" case.
const treeAdjacency = buildAdjacency(
  [0, 1, 2, 3, 4],
  [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
  ],
);

// A 4-cycle: even-length, so it 2-colours cleanly (bipartite).
const squareAdjacency = buildAdjacency(
  [0, 1, 2, 3],
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
);

// Two disconnected components: {0,1,2} is an acyclic/bipartite path, but
// {3,4,5} is a triangle — both cyclic and an odd cycle (non-bipartite).
// Used to prove cycle-detection and bipartite-check both sweep every
// component rather than stopping at the one the start node reaches.
const disconnectedTriangleAdjacency = buildAdjacency(
  [0, 1, 2, 3, 4, 5],
  [
    [0, 1],
    [1, 2],
    [3, 4],
    [4, 5],
    [5, 3],
  ],
);

// bfs/dfs are the only registered algorithms shaped like a pure single-start
// traversal: `visited` accumulates exactly (and only) the start's reachable
// component, and every step's `current` is non-null until the very last
// flush. cycle-detection and bipartite-check are whole-graph algorithms that
// deliberately sweep every component (see their own files for why), so they
// get their own describe blocks below instead of being asserted against
// these traversal-only expectations.
const TRAVERSAL_KEYS: GraphAlgoKey[] = ['bfs', 'dfs'];

describe('graph traversal generators', () => {
  for (const key of TRAVERSAL_KEYS) {
    const { name, description, generator } = algorithms[key];
    describe(name, () => {
      it('visits every node in a connected ring exactly once', () => {
        const steps = runToCompletion(generator, ringAdjacency, 0);
        const last = steps[steps.length - 1];

        expect(last.done).toBe(true);
        expect(last.visited).toHaveLength(5);
        expect(new Set(last.visited).size).toBe(5);
        expect([...last.visited].sort((a, b) => (a as number) - (b as number))).toEqual([
          0, 1, 2, 3, 4,
        ]);
      });

      it('only visits nodes reachable from the start in a disconnected graph', () => {
        const steps = runToCompletion(generator, disconnectedAdjacency, 0);
        const last = steps[steps.length - 1];

        expect(last.done).toBe(true);
        expect(last.visited).toHaveLength(3);
        expect(new Set(last.visited).size).toBe(3);
        for (const id of last.visited) {
          expect([0, 1, 2]).toContain(id);
        }
        for (const id of [3, 4, 5]) {
          expect(last.visited).not.toContain(id);
        }
      });

      it('is symmetric when started from the other component', () => {
        const steps = runToCompletion(generator, disconnectedAdjacency, 3);
        const last = steps[steps.length - 1];

        expect(last.visited).toHaveLength(3);
        expect(new Set(last.visited).size).toBe(3);
        for (const id of last.visited) {
          expect([3, 4, 5]).toContain(id);
        }
      });

      it('never crashes on a start node with zero neighbors', () => {
        expect(() => runToCompletion(generator, isolatedAdjacency, 0)).not.toThrow();

        const steps = runToCompletion(generator, isolatedAdjacency, 0);
        const last = steps[steps.length - 1];
        expect(last.done).toBe(true);
        expect(last.visited).toEqual([0]);
      });

      it('yields a monotonically growing visited list', () => {
        const steps = runToCompletion(generator, ringAdjacency, 0);
        let prevLength = 0;
        for (const s of steps) {
          expect(s.visited.length).toBeGreaterThanOrEqual(prevLength);
          prevLength = s.visited.length;
        }
      });

      it('never mutates a previously yielded visited array in place', () => {
        const steps = runToCompletion(generator, ringAdjacency, 0);
        for (let i = 0; i < steps.length - 1; i++) {
          expect(steps[i].visited).not.toBe(steps[i + 1].visited);
        }
      });

      it(`registers complete metadata under "${key}"`, () => {
        expect(name).not.toBe('');
        expect(description).not.toBe('');
        expect(typeof generator).toBe('function');
      });
    });
  }
});

// cycle-detection and bipartite-check are whole-graph algorithms (see their
// own files for why): their result is encoded as "terminal step's `current`
// is null when the whole graph checks out clean, or names a witness node
// when it doesn't" rather than the traversal-only shape asserted above, so
// they get their own describe blocks instead of joining TRAVERSAL_KEYS.
describe('Cycle Detection', () => {
  const { generator } = algorithms['cycle-detection'];

  it('finds a cycle in a connected ring', () => {
    const steps = runToCompletion(generator, ringAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).not.toBeNull();
  });

  it('reports no cycle in a tree, having visited every node', () => {
    const steps = runToCompletion(generator, treeAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).toBeNull();
    expect(last.visited).toHaveLength(5);
    expect(new Set(last.visited).size).toBe(5);
  });

  it('finds a cycle in a component the start node cannot reach', () => {
    // Start in {0,1,2} (acyclic); the cycle lives in {3,4,5}.
    const steps = runToCompletion(generator, disconnectedTriangleAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).not.toBeNull();
    expect([3, 4, 5]).toContain(last.current);
  });

  it('never crashes on a start node with zero neighbors', () => {
    expect(() => runToCompletion(generator, isolatedAdjacency, 0)).not.toThrow();

    const steps = runToCompletion(generator, isolatedAdjacency, 0);
    const last = steps[steps.length - 1];
    expect(last.done).toBe(true);
    expect(last.current).toBeNull();
  });
});

describe('Bipartite Check', () => {
  const { generator } = algorithms['bipartite-check'];

  it('confirms two disjoint paths are bipartite, having visited every node', () => {
    const steps = runToCompletion(generator, disconnectedAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).toBeNull();
    expect(last.visited).toHaveLength(6);
    expect(new Set(last.visited).size).toBe(6);
  });

  it('confirms an even cycle is bipartite', () => {
    const steps = runToCompletion(generator, squareAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).toBeNull();
  });

  it('finds an odd cycle is not bipartite', () => {
    const steps = runToCompletion(generator, ringAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).not.toBeNull();
  });

  it('finds a colour conflict in a component the start node cannot reach', () => {
    // Start in {0,1,2} (bipartite path); the odd cycle lives in {3,4,5}.
    const steps = runToCompletion(generator, disconnectedTriangleAdjacency, 0);
    const last = steps[steps.length - 1];

    expect(last.done).toBe(true);
    expect(last.current).not.toBeNull();
    expect([3, 4, 5]).toContain(last.current);
  });

  it('never crashes on a start node with zero neighbors', () => {
    expect(() => runToCompletion(generator, isolatedAdjacency, 0)).not.toThrow();

    const steps = runToCompletion(generator, isolatedAdjacency, 0);
    const last = steps[steps.length - 1];
    expect(last.done).toBe(true);
    expect(last.current).toBeNull();
  });
});

describe('graph algorithm registry metadata', () => {
  it('every registered algorithm (including whole-graph ones) has complete metadata', () => {
    for (const key of Object.keys(algorithms) as GraphAlgoKey[]) {
      const { name, description, generator } = algorithms[key];
      expect(name).not.toBe('');
      expect(description).not.toBe('');
      expect(typeof generator).toBe('function');
    }
  });
});

describe('generateGraph seeding', () => {
  it('produces identical nodes and edges when called twice with the same seed', () => {
    // A fresh Rng per call is required: reusing one instance across calls
    // would advance its state and break this exact reproducibility guarantee.
    const first = generateGraph(10, createRng(7));
    const second = generateGraph(10, createRng(7));

    expect(first.nodes).toEqual(second.nodes);
    expect(first.edges).toEqual(second.edges);
  });

  it('produces different edge sets for different seeds', () => {
    const first = generateGraph(10, createRng(7));
    const second = generateGraph(10, createRng(12345));

    expect(first.edges).not.toEqual(second.edges);
  });
});
