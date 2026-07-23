import { snap, done, DIRECTIONS, keyOf, gridHelpers, reconstructPath } from './_utils.js';

/**
 * Depth-First Search — dives down one path as far as it can go before
 * backtracking, using an explicit stack (LIFO) instead of recursion so the
 * traversal stays a flat generator. This does NOT guarantee the shortest
 * path — DFS commits to a direction and only backs off when it's boxed in,
 * so it often finds a much longer route than BFS/Dijkstra/A* would.
 *
 * Neighbors are marked "discovered" the moment they're pushed (not when
 * popped) purely to keep the stack from growing with duplicate entries for
 * the same cell — it doesn't change the fact that this is a valid DFS over
 * the grid.
 *
 * @param {number[][]} grid  0 = open, 1 = wall
 * @param {{row:number, col:number}} start
 * @param {{row:number, col:number}} end
 * @yields snapshot objects (see _utils.js)
 */
export function* dfs(grid, start, end) {
  const { isOpen } = gridHelpers(grid);

  if (!isOpen(start.row, start.col) || !isOpen(end.row, end.col)) {
    yield done([], []);
    return;
  }

  const cameFrom = new Map();
  const discovered = new Set([keyOf(start.row, start.col)]);
  const visitedOrder = [];
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop();
    visitedOrder.push(current);

    yield snap(visitedOrder, stack, current);

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
      stack.push({ row: nr, col: nc });
    }
  }

  // Stack exhausted without ever reaching `end` — walled off, terminate clean.
  yield done(visitedOrder, []);
}
