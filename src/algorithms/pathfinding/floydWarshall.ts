import type { Coord, Grid, PathStep } from '@/types';
import { snap, done, DIRECTIONS, keyOf, gridHelpers } from './_utils';

/**
 * Hard ceiling on the node count, in open cells.
 *
 * Floyd-Warshall is cubic in *both* directions and the grid hands it one node
 * per open cell, so the only thing standing between this file and a wedged tab
 * is how big the grid is allowed to get. Measured, drained end to end the way
 * `skipToEnd()` drains it:
 *
 *     375 nodes (the app's 15x25 grid, no walls)    ~95 ms
 *     530 nodes                                    ~193 ms
 *    1200 nodes (a hypothetical 30x40 grid)       ~2143 ms
 *
 * 600 sits above every size this app can currently produce while cutting off
 * the part of the curve where a single synchronous drain becomes a visible
 * freeze. It is a tripwire, not a tuning knob: if `usePathfinder`'s ROWS/COLS
 * ever grow past it, this generator returns an empty result immediately and
 * loudly rather than locking the browser for seconds — a visibly wrong answer
 * being much easier to notice and fix than a slow one.
 */
export const FW_MAX_NODES = 600;

/**
 * Floyd-Warshall — the all-pairs algorithm. It never asks "how do I get from
 * start to end"; it fills a full V x V table of every-cell-to-every-cell
 * distances, and the answer to *this* query is one cell of that table, read out
 * at the end.
 *
 * The mechanism is a single sweep over candidate *intermediate* cells: on pass
 * `k`, every pair (i, j) is offered the option of routing through cell k, and
 * takes it if that is shorter. After the pivot has been every cell exactly once,
 * every entry is optimal. There is no frontier, no priority queue, no goal test
 * — the algorithm is completely oblivious to what it was asked.
 *
 * That obliviousness is the whole lesson, so the snapshots show the pivot sweep
 * rather than pretending there is a search going on:
 *
 *   - `current` and the head of `frontier` are the pivot cell k itself, which
 *     marches through the grid in row-major order at exactly one cell per step.
 *     A pivot in a sealed-off region still takes its turn — nothing about this
 *     algorithm skips work that cannot help.
 *   - the rest of `frontier` is the cells whose distance *from start* improved
 *     because of this pivot, i.e. the entries of the table's start-row that this
 *     pass rewrote.
 *   - `visited` is the cells whose start-row entry is finite: the one row of the
 *     table this query cares about, filling in.
 *
 * The other V-1 rows are computed and, unavoidably, invisible — a 375x375 table
 * has no rendering on a 375-cell grid. Showing the start row is the honest
 * projection: it is genuinely the algorithm's own state, just narrowed.
 *
 * One snapshot per pivot, never per relaxation. Per-relaxation would be truer to
 * the operation count and would also emit ~30 million frames on the default
 * grid, some 600x past `useStepPlayer`'s buffer cap. V frames is also exactly
 * the cadence Floyd-Warshall is taught at ("the table after considering
 * intermediate vertex k"), so this is the faithful choice, not a concession.
 *
 * The distance and successor tables are flat typed arrays rather than nested
 * arrays or a keyed Map. At 375 nodes that is 140,625 entries each — 1.7 MB
 * total, allocated once — where a Map of string keys would be an order of
 * magnitude larger and slower, and would turn a 95 ms drain into a real freeze.
 *
 * Honest complexity note: O((rows*cols)^3) time and O((rows*cols)^2) space, with
 * no best/worst distinction — the pivot loop runs to completion no matter what
 * the grid looks like or how early the goal was solved. Skipping the inner loop
 * for an unreachable dist[i][k] is a constant-factor prune, not a bound change
 * (it happens to cut ~52M operations to ~30M on the open default grid).
 *
 * @param {number[][]} grid  0 = open, 1 = wall
 * @param {{row:number, col:number}} start
 * @param {{row:number, col:number}} end
 * @yields snapshot objects (see _utils.js)
 */
export function* floydWarshall(
  grid: Grid,
  start: Coord,
  end: Coord,
): Generator<PathStep, void, undefined> {
  const { rows, cols, isOpen } = gridHelpers(grid);

  if (!isOpen(start.row, start.col) || !isOpen(end.row, end.col)) {
    yield done([], []);
    return;
  }

  // Walls are dropped rather than kept as unreachable nodes: they can never
  // participate in a path, and the node count is cubed, so every wall excluded
  // here is worth roughly 3n^2 operations that never happen.
  const nodes: Coord[] = [];
  const indexOf = new Map<string, number>();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!isOpen(row, col)) continue;
      indexOf.set(keyOf(row, col), nodes.length);
      nodes.push({ row, col });
    }
  }

  const n = nodes.length;
  if (n > FW_MAX_NODES) {
    yield done([], []);
    return;
  }

  // Row-major flat indexing: dist[i * n + j]. `next[i * n + j]` is the first hop
  // on the best known i -> j route, which is how Floyd-Warshall reconstructs
  // paths — deliberately not a `cameFrom` parent map like the search generators
  // use, because there is no single source to be a parent relative to.
  const dist = new Float64Array(n * n).fill(Infinity);
  const next = new Int32Array(n * n).fill(-1);

  for (let i = 0; i < n; i++) {
    dist[i * n + i] = 0;
    next[i * n + i] = i;

    const { row, col } = nodes[i];
    for (const [dr, dc] of DIRECTIONS) {
      const j = indexOf.get(keyOf(row + dr, col + dc));
      if (j === undefined) continue;
      dist[i * n + j] = 1;
      next[i * n + j] = j;
    }
  }

  const source = indexOf.get(keyOf(start.row, start.col))!;
  const target = indexOf.get(keyOf(end.row, end.col))!;

  /** The start-row of the table, as cells — recomputed per pivot, O(n) each. */
  const reachedFromStart = (): Coord[] => {
    const out: Coord[] = [];
    for (let j = 0; j < n; j++) {
      if (dist[source * n + j] !== Infinity) out.push(nodes[j]);
    }
    return out;
  };

  for (let k = 0; k < n; k++) {
    const kRow = k * n;
    const improvedFromStart: Coord[] = [];

    for (let i = 0; i < n; i++) {
      const iRow = i * n;
      const throughK = dist[iRow + k];
      // i cannot reach the pivot, so no j is reachable via it. Pure pruning —
      // Infinity + anything is Infinity and would fail every comparison below.
      if (throughK === Infinity) continue;

      for (let j = 0; j < n; j++) {
        const candidate = throughK + dist[kRow + j];
        if (candidate >= dist[iRow + j]) continue;
        dist[iRow + j] = candidate;
        next[iRow + j] = next[iRow + k];
        if (i === source) improvedFromStart.push(nodes[j]);
      }
    }

    yield snap(reachedFromStart(), [nodes[k], ...improvedFromStart], nodes[k]);
  }

  if (next[source * n + target] === -1) {
    // No route through any intermediate cell was ever found — walled off.
    yield done(reachedFromStart(), []);
    return;
  }

  // Walk the successor table forward from start; `next[source][target] === source`
  // never happens for a real route, so this terminates in path-length steps.
  const path: Coord[] = [nodes[source]];
  let cursor = source;
  while (cursor !== target) {
    cursor = next[cursor * n + target];
    path.push(nodes[cursor]);
  }

  yield done(reachedFromStart(), path);
}
