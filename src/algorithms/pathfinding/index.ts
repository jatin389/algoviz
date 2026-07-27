import type { AlgorithmFn, AlgorithmMeta, Coord, Grid, PathStep } from '@/types';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { dijkstra } from './dijkstra';
import { astar } from './astar';

export type PathFn = AlgorithmFn<PathStep, [Grid, Coord, Coord]>;
export type PathAlgorithm = AlgorithmMeta<PathFn>;

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
export const algorithms = {
  bfs: {
    key: 'bfs',
    name: 'BFS',
    generator: bfs,
    description:
      'Explores the grid ring by ring using a FIFO queue. Guarantees the shortest path on this unweighted grid, since every step costs the same.',
    complexity: {
      best: 'O(rows×cols)',
      average: 'O(rows×cols)',
      worst: 'O(rows×cols)',
      space: 'O(rows×cols)',
    },
  },
  dfs: {
    key: 'dfs',
    name: 'DFS',
    generator: dfs,
    description:
      'Dives down one path as far as possible before backtracking. Finds *a* connected path to the goal but does NOT guarantee the shortest one.',
    complexity: {
      best: 'O(rows×cols)',
      average: 'O(rows×cols)',
      worst: 'O(rows×cols)',
      space: 'O(rows×cols)',
    },
  },
  dijkstra: {
    key: 'dijkstra',
    name: 'Dijkstra',
    generator: dijkstra,
    description:
      'Settles the unvisited cell with the smallest known distance each round (uniform edge weight of 1). This implementation selects that cell with a plain array scan rather than a binary heap, so it is honestly O((rows×cols)²) worst case, not the idealized heap-backed O(E log V).',
    complexity: {
      best: 'O((rows×cols)²)',
      average: 'O((rows×cols)²)',
      worst: 'O((rows×cols)²)',
      space: 'O(rows×cols)',
    },
  },
  astar: {
    key: 'astar',
    name: 'A*',
    generator: astar,
    description:
      'Like Dijkstra, but prioritizes cells by distance-so-far plus a Manhattan-distance estimate to the goal, so it usually expands far fewer cells. Still selects the next cell via a plain array scan, so the worst case remains O((rows×cols)²), same as this Dijkstra implementation — the heuristic helps in practice, not in the asymptotic bound.',
    complexity: {
      best: 'O(rows×cols)',
      average: 'O((rows×cols)²)',
      worst: 'O((rows×cols)²)',
      space: 'O(rows×cols)',
    },
  },
} satisfies Record<string, PathAlgorithm>;

/** Literal union of the registry keys: 'bfs' | 'dfs' | 'dijkstra' | 'astar' */
export type PathAlgoKey = keyof typeof algorithms;

// Ordered list for iterating in the UI (buttons, dropdowns).
export const algorithmList: PathAlgorithm[] = Object.values(algorithms);
