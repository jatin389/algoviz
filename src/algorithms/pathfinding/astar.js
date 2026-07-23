import { snap, done, DIRECTIONS, keyOf, gridHelpers, reconstructPath } from './_utils.js';

// Manhattan distance — admissible for 4-directional movement since it never
// overestimates the true remaining cost (each step covers at most 1 row or
// column of distance).
function heuristic(row, col, end) {
  return Math.abs(row - end.row) + Math.abs(col - end.col);
}

/**
 * A* — like Dijkstra, but orders the open set by `gScore + heuristic` instead
 * of `gScore` alone, so it expands cells that look promising toward `end`
 * first rather than expanding uniformly outward in every direction.
 *
 * Honest complexity note: exactly like dijkstra.js, the "smallest fScore"
 * cell is selected via a plain O(open) array scan each round, not a binary
 * heap. The heuristic still typically shrinks the number of cells that get
 * expanded before `end` is reached, but it does not change the asymptotic
 * cost of this selection step — worst case is still O((rows*cols)^2), same
 * as the Dijkstra implementation here.
 *
 * @param {number[][]} grid  0 = open, 1 = wall
 * @param {{row:number, col:number}} start
 * @param {{row:number, col:number}} end
 * @yields snapshot objects (see _utils.js)
 */
export function* astar(grid, start, end) {
  const { isOpen } = gridHelpers(grid);

  if (!isOpen(start.row, start.col) || !isOpen(end.row, end.col)) {
    yield done([], []);
    return;
  }

  const startKey = keyOf(start.row, start.col);
  const gScore = new Map([[startKey, 0]]);
  const fScore = new Map([[startKey, heuristic(start.row, start.col, end)]]);
  const cameFrom = new Map();
  const settled = new Set();
  const open = new Map([[startKey, start]]); // key -> cell, awaiting settlement
  const visitedOrder = [];

  while (open.size > 0) {
    // Array-scan for the open cell with the smallest fScore.
    let currentKey = null;
    let current = null;
    let currentF = Infinity;
    for (const [k, cell] of open) {
      const f = fScore.get(k) ?? Infinity;
      if (f < currentF) {
        currentF = f;
        currentKey = k;
        current = cell;
      }
    }

    open.delete(currentKey);
    settled.add(currentKey);
    visitedOrder.push(current);

    yield snap(visitedOrder, [...open.values()], current);

    if (current.row === end.row && current.col === end.col) {
      yield done(visitedOrder, reconstructPath(cameFrom, end));
      return;
    }

    const currentG = gScore.get(currentKey);

    for (const [dr, dc] of DIRECTIONS) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (!isOpen(nr, nc)) continue;
      const nk = keyOf(nr, nc);
      if (settled.has(nk)) continue;

      const tentativeG = currentG + 1;
      if (tentativeG < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, tentativeG);
        fScore.set(nk, tentativeG + heuristic(nr, nc, end));
        cameFrom.set(nk, current);
        open.set(nk, { row: nr, col: nc });
      }
    }
  }

  // Every reachable cell settled without ever reaching `end` — walled off.
  yield done(visitedOrder, []);
}
