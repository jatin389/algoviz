import { snap, done, DIRECTIONS, keyOf, gridHelpers, reconstructPath } from './_utils.js';

/**
 * Dijkstra's algorithm — repeatedly settles the unvisited cell with the
 * smallest known distance from `start`, then relaxes its neighbors. Every
 * open-to-open edge has weight 1, so on an unweighted grid this settles cells
 * in the same order (and finds the same shortest path) as BFS — it's included
 * here as a faithful demonstration of the general algorithm rather than a
 * shortcut.
 *
 * Honest complexity note: the "smallest known distance" cell is selected via
 * a plain O(unsettled) array scan each round, NOT a binary heap. That makes
 * this O((rows*cols)^2) worst case, not the idealized O(E log V) a heap-backed
 * priority queue would give — grid sizes here are small enough that the
 * simpler scan is perfectly fine in practice.
 *
 * @param {number[][]} grid  0 = open, 1 = wall
 * @param {{row:number, col:number}} start
 * @param {{row:number, col:number}} end
 * @yields snapshot objects (see _utils.js)
 */
export function* dijkstra(grid, start, end) {
  const { isOpen } = gridHelpers(grid);

  if (!isOpen(start.row, start.col) || !isOpen(end.row, end.col)) {
    yield done([], []);
    return;
  }

  const startKey = keyOf(start.row, start.col);
  const dist = new Map([[startKey, 0]]);
  const cameFrom = new Map();
  const settled = new Set();
  const unsettled = new Map([[startKey, start]]); // key -> cell, awaiting settlement
  const visitedOrder = [];

  while (unsettled.size > 0) {
    // Array-scan for the unsettled cell with the smallest known distance.
    let currentKey = null;
    let current = null;
    let currentDist = Infinity;
    for (const [k, cell] of unsettled) {
      const d = dist.get(k);
      if (d < currentDist) {
        currentDist = d;
        currentKey = k;
        current = cell;
      }
    }

    unsettled.delete(currentKey);
    settled.add(currentKey);
    visitedOrder.push(current);

    yield snap(visitedOrder, [...unsettled.values()], current);

    if (current.row === end.row && current.col === end.col) {
      yield done(visitedOrder, reconstructPath(cameFrom, end));
      return;
    }

    for (const [dr, dc] of DIRECTIONS) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (!isOpen(nr, nc)) continue;
      const nk = keyOf(nr, nc);
      if (settled.has(nk)) continue;

      const candidateDist = currentDist + 1;
      if (candidateDist < (dist.get(nk) ?? Infinity)) {
        dist.set(nk, candidateDist);
        cameFrom.set(nk, current);
        unsettled.set(nk, { row: nr, col: nc });
      }
    }
  }

  // Every reachable cell settled without ever reaching `end` — walled off.
  yield done(visitedOrder, []);
}
