import type { AlgorithmFn, AlgorithmMeta, GraphStep, NodeId, TimeSpaceComplexity } from '@/types';
import { bfsTraversal } from './bfsTraversal';
import { dfsTraversal } from './dfsTraversal';

export type GraphFn = AlgorithmFn<GraphStep, [Map<NodeId, NodeId[]>, NodeId]>;

/**
 * Graph traversals report `{ time, space }` rather than best/average/worst:
 * BFS and DFS are O(V + E) regardless of input, so a single `time` is more
 * honest than repeating the same bound three times.
 */
export type GraphAlgorithm = AlgorithmMeta<GraphFn, TimeSpaceComplexity>;

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
export const algorithms = {
  bfs: {
    key: 'bfs',
    name: 'BFS Traversal',
    generator: bfsTraversal,
    description:
      'Explores the graph level by level from the start node, visiting every neighbor of the current node before moving deeper, using a queue to track the frontier.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
  },
  dfs: {
    key: 'dfs',
    name: 'DFS Traversal',
    generator: dfsTraversal,
    description:
      'Explores as far as possible down one branch from the start node before backtracking, using a stack to track nodes still waiting to be explored.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
  },
} satisfies Record<string, GraphAlgorithm>;

/** Literal union of the registry keys: 'bfs' | 'dfs' */
export type GraphAlgoKey = keyof typeof algorithms;

// Ordered list for iterating in the UI (buttons, dropdowns).
export const algorithmList: GraphAlgorithm[] = Object.values(algorithms);
