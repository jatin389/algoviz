import { snap, done, DIRECTIONS, keyOf, gridHelpers, reconstructPath } from './_utils.js';

/**
 * Breadth-First Search — explores the grid one ring of distance at a time via
 * a FIFO queue. Because every edge has equal weight (1), the first time `end`
 * is popped from the queue the path reconstructed from it is guaranteed
 * shortest.
 *
 * @param {number[][]} grid  0 = open, 1 = wall
 * @param {{row:number, col:number}} start
 * @param {{row:number, col:number}} end
 * @yields snapshot objects (see _utils.js)
 */
export function* bfs(grid, start, end) {
  const { isOpen } = gridHelpers(grid);

  // A walled start/end can never be reached — bail out cleanly rather than
  // ever queueing an invalid cell.
  if (!isOpen(start.row, start.col) || !isOpen(end.row, end.col)) {
    yield done([], []);
    return;
  }

  const cameFrom = new Map();
  const discovered = new Set([keyOf(start.row, start.col)]);
  const visitedOrder = [];
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift();
    visitedOrder.push(current);

    yield snap(visitedOrder, queue, current);

    if (current.row === end.row && current.col === end.col) {
      yield done(visitedOrder, reconstructPath(cameFrom, end));
      return;
    }

    for (const [dr, dc] of DIRECTIONS) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (!isOpen(nr, nc)) continue;
      const nk = keyOf(nr, nc);
      if (discovered.has(nk)) continue;
      discovered.add(nk);
      cameFrom.set(nk, current);
      queue.push({ row: nr, col: nc });
    }
  }

  // Queue exhausted without ever reaching `end` — walled off, terminate clean.
  yield done(visitedOrder, []);
}
