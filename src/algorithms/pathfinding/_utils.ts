// Shared step-snapshot helpers + grid plumbing used by every pathfinding
// generator. Mirrors the sibling sorting `_utils.js` (snap()/done()), adapted
// to grid state.
//
// Walls are deliberately NOT part of the snapshot: they are static input the
// composable owns directly (the user paints them between runs), so they never
// change mid-algorithm and don't belong in the per-step contract. Generators
// only report what the *algorithm* is doing.
//
// Snapshot shape:
//   {
//     visited:  {row,col}[]      // every cell popped/expanded so far (accumulates, never shrinks)
//     frontier: {row,col}[]      // fringe/queue/open-set contents AT THIS STEP (replaced each yield)
//     current:  {row,col}|null   // the cell just expanded; null on the terminal snapshot
//     path:     {row,col}[]      // empty until the terminal snapshot, then start..end inclusive
//     done:     boolean          // true only on the terminal snapshot
//   }

import type { Coord, Grid, PathStep } from '@/types';

/**
 * Build an intermediate snapshot. Arrays are copied so a consumer holding onto
 * one step never sees it mutate underneath them.
 */
export const snap = (
  visited: readonly Coord[],
  frontier: readonly Coord[],
  current: Coord | null,
): PathStep => ({
  visited: [...visited],
  frontier: [...frontier],
  current,
  path: [],
  done: false,
});

/**
 * Build the terminal snapshot. `path` is empty when start/end are unreachable
 * — callers must still treat this as a clean completion, never a thrown error.
 */
export const done = (visited: readonly Coord[], path: readonly Coord[]): PathStep => ({
  visited: [...visited],
  frontier: [],
  current: null,
  path: [...path],
  done: true,
});

// 4-directional movement only — no diagonals.
export const DIRECTIONS: readonly (readonly [number, number])[] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const keyOf = (row: number, col: number): string => `${row},${col}`;

/**
 * Read-only helpers over a 0/1 grid (0 = open, 1 = wall). Shared by every
 * generator so bounds/wall checks live in exactly one place.
 */
export function gridHelpers(grid: Grid) {
  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;

  const inBounds = (row: number, col: number) => row >= 0 && row < rows && col >= 0 && col < cols;
  const isOpen = (row: number, col: number) => inBounds(row, col) && grid[row][col] === 0;

  return { rows, cols, inBounds, isOpen };
}

/**
 * Walk a `cameFrom` parent map backward from `end` to reconstruct the path a
 * search found, returning it in start -> end order.
 */
export function reconstructPath(cameFrom: Map<string, Coord>, end: Coord): Coord[] {
  const path = [end];
  let currentKey = keyOf(end.row, end.col);
  while (cameFrom.has(currentKey)) {
    const prev = cameFrom.get(currentKey)!;
    path.push(prev);
    currentKey = keyOf(prev.row, prev.col);
  }
  return path.reverse();
}
