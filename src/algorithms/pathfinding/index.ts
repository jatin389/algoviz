import type { AlgorithmFn, AlgorithmMeta, Coord, Grid, PathStep } from '@/types';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { dijkstra } from './dijkstra';
import { astar } from './astar';
import { bellmanFord } from './bellmanFord';
import { floydWarshall } from './floydWarshall';

export type PathFn = AlgorithmFn<PathStep, [Grid, Coord, Coord]>;
export type PathAlgorithm = AlgorithmMeta<PathFn>;

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
//
// `satisfies` rather than a `: Record<string, ...>` annotation: the annotation
// would widen `keyof typeof algorithms` to `string`, and the whole point of
// the property names is that they *are* the algorithm keys.
export const algorithms = {
  bfs: {
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
  bellmanFord: {
    name: 'Bellman-Ford',
    generator: bellmanFord,
    description:
      'Sweeps the entire edge list over and over, letting better distances trickle one hop further per pass, until a whole pass changes nothing. It reaches the same answer as Dijkstra far more slowly and with no priority queue at all — watch the frontier collapse and rebuild to see where one pass ends and the next begins. Unlike the four searches above it never stops early at the goal: it has no way to know a distance is final until the sweeps settle, so it always solves for every reachable cell.',
    complexity: {
      // O(V*E) with E ~ 4V. Best is the two passes it takes when one sweep
      // already settles everything; average tracks the path depth rather than
      // the cell count, which is why it is nowhere near the worst case here.
      best: 'O(rows×cols)',
      average: 'O((rows+cols)×rows×cols)',
      worst: 'O((rows×cols)²)',
      space: 'O(rows×cols)',
    },
  },
  floydWarshall: {
    name: 'Floyd-Warshall',
    generator: floydWarshall,
    description:
      'The all-pairs algorithm: instead of searching, it fills a full every-cell-to-every-cell distance table by letting each cell in turn act as an intermediate stop. The single amber cell marching through the grid is that pivot; the answer to this particular query is one row of the table, read out at the end. Genuinely cubic — it does roughly 30 million relaxations on this grid to answer a question BFS answers in 375 — and it is here to show that shape, not to compete.',
    complexity: {
      // No best/worst split: the pivot loop is oblivious. It runs every pass
      // over every pair regardless of the walls, the goal, or how early the
      // answer was actually settled.
      best: 'O((rows×cols)³)',
      average: 'O((rows×cols)³)',
      worst: 'O((rows×cols)³)',
      space: 'O((rows×cols)²)',
    },
  },
} satisfies Record<string, PathAlgorithm>;

/**
 * Literal union of the registry keys:
 * 'bfs' | 'dfs' | 'dijkstra' | 'astar' | 'bellmanFord' | 'floydWarshall'
 */
export type PathAlgoKey = keyof typeof algorithms;
