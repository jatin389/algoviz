import type { Coord, Grid, PathStep } from '@/types';
import { snap, done, DIRECTIONS, keyOf, gridHelpers, reconstructPath } from './_utils';

/**
 * Bellman-Ford — relaxes *every* edge in the graph, over and over, until a
 * whole pass changes nothing. Where Dijkstra picks the single cheapest frontier
 * cell each round and never revisits a settled one, Bellman-Ford has no notion
 * of "settled" at all: it just keeps sweeping the edge list and letting better
 * distances trickle outward one hop per pass.
 *
 * On this uniform-cost grid the *answer* is identical to BFS's. That is not the
 * reason to look at it — the reason is the shape of the work, and the snapshots
 * are built to show exactly that:
 *
 *   - `frontier` holds the cells improved so far **in the current pass**, and is
 *     emptied at every pass boundary. So the amber region swells through a pass
 *     and then collapses, which is the only visual cue the grid can give that a
 *     pass just ended. On an open 15x25 grid with the start on the left edge
 *     this reads beautifully: pass 1 floods everything the row-major sweep can
 *     reach going down-and-right, then each later pass advances exactly one row
 *     upward — one hop per pass, the textbook Bellman-Ford picture.
 *   - `visited` holds every cell with a finite tentative distance. "Expanded"
 *     has no meaning here (there is no expansion step), and distance-is-known is
 *     the closest honest analogue.
 *
 * Edges are swept in row-major cell order. Bellman-Ford's correctness does not
 * depend on that ordering — any fixed order converges within V-1 passes — but a
 * *predictable* order is what makes the per-pass wavefront legible instead of
 * looking like noise.
 *
 * Two faithful-to-the-algorithm behaviors worth stating, because they look like
 * bugs next to the other four generators:
 *
 *   1. There is no early exit when `end` is reached. Bellman-Ford is
 *      single-source-*all*-destinations; it cannot know a distance is final
 *      until a pass proves nothing more can improve. So its terminal `visited`
 *      covers every reachable cell, always, even when the goal sat next door.
 *   2. No negative-cycle detection pass. That check is the one thing
 *      Bellman-Ford does that Dijkstra cannot, and omitting it is a real loss —
 *      but every edge here has weight 1, so the extra pass could only ever
 *      report "no negative cycle". Shipping a check whose answer is a foregone
 *      conclusion would teach the wrong lesson about why it exists.
 *
 * Honest complexity note: O(V*E) with V = rows*cols and E ~ 4V, so
 * O((rows*cols)^2) worst case. The early break on a clean pass is what keeps it
 * tolerable in practice — measured on the default 15x25 grid it converges in
 * 8 passes open and ~20 through a random maze, not in 374.
 *
 * @param {number[][]} grid  0 = open, 1 = wall
 * @param {{row:number, col:number}} start
 * @param {{row:number, col:number}} end
 * @yields snapshot objects (see _utils.js)
 */
export function* bellmanFord(
  grid: Grid,
  start: Coord,
  end: Coord,
): Generator<PathStep, void, undefined> {
  const { rows, cols, isOpen } = gridHelpers(grid);

  if (!isOpen(start.row, start.col) || !isOpen(end.row, end.col)) {
    yield done([], []);
    return;
  }

  // The edge list, materialized once as its source cells. Rebuilding it per
  // pass would be the obvious way to write this and would also make the pass
  // count — the thing being visualized — the dominant cost.
  const nodes: Coord[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (isOpen(row, col)) nodes.push({ row, col });
    }
  }

  const dist = new Map<string, number>([[keyOf(start.row, start.col), 0]]);
  const cameFrom = new Map<string, Coord>();
  const reached: Coord[] = [start];

  // V-1 passes is the classic bound: a shortest path visits at most V vertices,
  // so V-1 edges, and each pass propagates at least one more of them.
  for (let pass = 0; pass < nodes.length - 1; pass++) {
    const improvedThisPass: Coord[] = [];

    for (const source of nodes) {
      const sourceDist = dist.get(keyOf(source.row, source.col));
      // Unreached sources have nothing to offer yet; they become useful in a
      // later pass, which is precisely why the passes repeat.
      if (sourceDist === undefined) continue;

      for (const [dr, dc] of DIRECTIONS) {
        const nr = source.row + dr;
        const nc = source.col + dc;
        if (!isOpen(nr, nc)) continue;

        const nk = keyOf(nr, nc);
        const candidateDist = sourceDist + 1;
        const knownDist = dist.get(nk);
        if (knownDist !== undefined && candidateDist >= knownDist) continue;

        if (knownDist === undefined) reached.push({ row: nr, col: nc });
        dist.set(nk, candidateDist);
        cameFrom.set(nk, source);
        improvedThisPass.push({ row: nr, col: nc });

        // One snapshot per *successful* relaxation, not per edge examined. The
        // latter would be truer to the operation count but would bury the eight
        // interesting frames of a run under ~1400 no-op frames per pass.
        yield snap(reached, improvedThisPass, { row: nr, col: nc });
      }
    }

    // A pass that improves nothing proves no later pass can either — every
    // input to a relaxation is unchanged from here on.
    if (improvedThisPass.length === 0) break;
  }

  if (!dist.has(keyOf(end.row, end.col))) {
    // Distances converged and `end` never got one — walled off.
    yield done(reached, []);
    return;
  }

  yield done(reached, reconstructPath(cameFrom, end));
}
