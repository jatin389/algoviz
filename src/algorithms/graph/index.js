import { bfsTraversal } from './bfsTraversal.js';
import { dfsTraversal } from './dfsTraversal.js';

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
};

// Ordered list for iterating in the UI (buttons, dropdowns).
export const algorithmList = Object.values(algorithms);
