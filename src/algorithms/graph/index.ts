import type { AlgorithmFn, AlgorithmMeta, GraphStep, NodeId, TimeSpaceComplexity } from '@/types';
import { bfsTraversal } from './bfsTraversal';
import { dfsTraversal } from './dfsTraversal';
import { cycleDetection } from './cycleDetection';
import { bipartiteCheck } from './bipartiteCheck';

// Topological sort is deliberately NOT registered here. It is only defined
// on a directed acyclic graph, and every adjacency map this codebase
// produces (see graphModel.ts) is undirected — each edge is inserted in both
// directions, so any pair of adjacent nodes already forms a 2-cycle. There is
// nowhere in this app that builds a directed graph for it to run against, and
// it has no meaningful start node either. Forcing it into this registry
// would mean either quietly reinterpreting the undirected adjacency as if it
// were directed (dishonest — it would report a "cycle" on nearly every
// generated graph) or shipping an algorithm that is unreachable/untestable
// against real app data. Both are worse than not shipping it: it needs an
// actual directed-graph model (and probably its own generator signature
// without a start node) before it belongs here.

export type GraphFn = AlgorithmFn<GraphStep, [Map<NodeId, NodeId[]>, NodeId]>;

/**
 * Graph traversals report `{ time, space }` rather than best/average/worst:
 * BFS and DFS are O(V + E) regardless of input, so a single `time` is more
 * honest than repeating the same bound three times.
 */
export type GraphAlgorithm = AlgorithmMeta<GraphFn, TimeSpaceComplexity>;

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
//
// `satisfies` rather than a `: Record<string, ...>` annotation: the annotation
// would widen `keyof typeof algorithms` to `string`, and the whole point of
// the property names is that they *are* the algorithm keys.
export const algorithms = {
  bfs: {
    name: 'BFS Traversal',
    generator: bfsTraversal,
    description:
      'Explores the graph level by level from the start node, visiting every neighbor of the current node before moving deeper, using a queue to track the frontier.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
  },
  dfs: {
    name: 'DFS Traversal',
    generator: dfsTraversal,
    description:
      'Explores as far as possible down one branch from the start node before backtracking, using a stack to track nodes still waiting to be explored.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
  },
  'cycle-detection': {
    name: 'Cycle Detection',
    generator: cycleDetection,
    description:
      'Walks the graph depth-first looking for an edge back to an already-visited node other than the one just arrived from — undirected only, and sweeps every component, not just the one the start node reaches, since a cycle elsewhere still counts.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
  },
  'bipartite-check': {
    name: 'Bipartite Check',
    generator: bipartiteCheck,
    description:
      'Attempts to 2-colour the graph breadth-first, alternating colour with every hop; finds no valid colouring exists the moment an edge connects two same-coloured nodes. Checks every component, since one component alone being bipartite says nothing about the rest.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
  },
} satisfies Record<string, GraphAlgorithm>;

/** Literal union of the registry keys: 'bfs' | 'dfs' | 'cycle-detection' | 'bipartite-check' */
export type GraphAlgoKey = keyof typeof algorithms;
