import { describe, it, expect } from 'vitest';
import type { Coord, Grid, PathStep } from '@/types';
import type { PathAlgoKey, PathFn } from './index';
import { algorithms } from './index';

// Drive a generator to completion and return the sequence of snapshots.
function runToCompletion(generator: PathFn, grid: Grid, start: Coord, end: Coord): PathStep[] {
  const steps: PathStep[] = [];
  for (const step of generator(grid, start, end)) steps.push(step);
  return steps;
}

function makeOpenGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

// A path is valid if it starts at `start`, ends at `end`, never touches a
// wall, and every consecutive pair of cells is 4-directionally adjacent.
function isValidPath(path: Coord[], grid: Grid, start: Coord, end: Coord): boolean {
  if (path.length === 0) return false;
  const first = path[0];
  const last = path[path.length - 1];
  if (first.row !== start.row || first.col !== start.col) return false;
  if (last.row !== end.row || last.col !== end.col) return false;

  for (let i = 0; i < path.length; i++) {
    const { row, col } = path[i];
    if (grid[row][col] === 1) return false;
    if (i > 0) {
      const prev = path[i - 1];
      const stepDistance = Math.abs(prev.row - row) + Math.abs(prev.col - col);
      if (stepDistance !== 1) return false;
    }
  }
  return true;
}

const openGrid = makeOpenGrid(5, 5);
const openStart: Coord = { row: 0, col: 0 };
const openEnd: Coord = { row: 4, col: 4 };

// A wall column blocks every row but one, forcing any path to detour through
// the single gap at row 4 rather than crossing straight through.
const detourGrid = (() => {
  const grid = makeOpenGrid(5, 7);
  for (let row = 0; row < 4; row++) grid[row][3] = 1;
  return grid;
})();
const detourStart: Coord = { row: 0, col: 0 };
const detourEnd: Coord = { row: 0, col: 6 };

// A full wall column with no gap anywhere completely separates start from end.
const unreachableGrid = (() => {
  const grid = makeOpenGrid(5, 5);
  for (let row = 0; row < 5; row++) grid[row][2] = 1;
  return grid;
})();
const unreachableStart: Coord = { row: 0, col: 0 };
const unreachableEnd: Coord = { row: 0, col: 4 };

const countOpenCells = (grid: Grid) =>
  grid.reduce((total, row) => total + row.filter((cell) => cell === 0).length, 0);

// The shortest-path length BFS finds, used as the reference answer everywhere
// below. Comparing against BFS rather than a hardcoded array asserts the
// property that actually matters (optimality) instead of one particular
// tie-break among many equally short routes.
function shortestLength(grid: Grid, start: Coord, end: Coord): number {
  const steps = runToCompletion(algorithms.bfs.generator, grid, start, end);
  return steps[steps.length - 1].path.length;
}

/** Every algorithm that is supposed to return a genuinely optimal path. */
const OPTIMAL_KEYS: PathAlgoKey[] = ['bfs', 'dijkstra', 'astar', 'bellmanFord', 'floydWarshall'];

describe('pathfinding algorithm generators', () => {
  for (const key of Object.keys(algorithms) as PathAlgoKey[]) {
    const { name, description, generator } = algorithms[key];
    describe(name, () => {
      it(`registers complete metadata under "${key}"`, () => {
        expect(name).not.toBe('');
        expect(description).not.toBe('');
        expect(typeof generator).toBe('function');
      });

      it('accumulates visited monotonically and marks only the last snapshot done', () => {
        const steps = runToCompletion(generator, openGrid, openStart, openEnd);
        let prevCount = 0;
        steps.forEach((step, i) => {
          expect(step.visited.length).toBeGreaterThanOrEqual(prevCount);
          prevCount = step.visited.length;
          if (i < steps.length - 1) expect(step.done).toBe(false);
        });
        expect(steps[steps.length - 1].done).toBe(true);
      });

      it('finds a valid connected path on the open grid', () => {
        const steps = runToCompletion(generator, openGrid, openStart, openEnd);
        const last = steps[steps.length - 1];
        expect(isValidPath(last.path, openGrid, openStart, openEnd)).toBe(true);
      });

      it('finds a valid connected path around the wall on the detour grid', () => {
        const steps = runToCompletion(generator, detourGrid, detourStart, detourEnd);
        const last = steps[steps.length - 1];
        expect(isValidPath(last.path, detourGrid, detourStart, detourEnd)).toBe(true);
      });

      it('terminates cleanly with done:true and an empty path when unreachable', () => {
        const steps = runToCompletion(generator, unreachableGrid, unreachableStart, unreachableEnd);
        const last = steps[steps.length - 1];
        expect(last.done).toBe(true);
        expect(last.path).toEqual([]);
      });

      it('handles start === end trivially', () => {
        const steps = runToCompletion(generator, openGrid, openStart, openStart);
        const last = steps[steps.length - 1];
        expect(last.done).toBe(true);
        expect(last.path).toEqual([{ row: openStart.row, col: openStart.col }]);
      });
    });
  }

  it.each(OPTIMAL_KEYS)('%s finds a genuinely shortest path on the open grid', (key) => {
    const steps = runToCompletion(algorithms[key].generator, openGrid, openStart, openEnd);
    const last = steps[steps.length - 1];
    expect(isValidPath(last.path, openGrid, openStart, openEnd)).toBe(true);
    expect(last.path.length).toBe(shortestLength(openGrid, openStart, openEnd));
  });

  it.each(OPTIMAL_KEYS)('%s finds a genuinely shortest path on the detour grid', (key) => {
    const steps = runToCompletion(algorithms[key].generator, detourGrid, detourStart, detourEnd);
    const last = steps[steps.length - 1];
    expect(isValidPath(last.path, detourGrid, detourStart, detourEnd)).toBe(true);
    expect(last.path.length).toBe(shortestLength(detourGrid, detourStart, detourEnd));
  });

  it('dfs finds a valid path without asserting it is shortest', () => {
    const steps = runToCompletion(algorithms.dfs.generator, detourGrid, detourStart, detourEnd);
    const last = steps[steps.length - 1];
    expect(isValidPath(last.path, detourGrid, detourStart, detourEnd)).toBe(true);
  });

  // ---- Bellman-Ford: the relaxation passes have to be visible ---------------
  //
  // These are the assertions that would fail if bellmanFord were quietly
  // reimplemented as a BFS clone that happens to return the same path.

  describe('Bellman-Ford relaxation structure', () => {
    it('solves for every reachable cell instead of stopping at the goal', () => {
      // A goal one step from the start, so BFS's early exit is worth almost the
      // whole grid — the widest possible gap between "search" and "solve for
      // every destination".
      const nearGoal: Coord = { row: 0, col: 1 };
      const finalVisited = (key: PathAlgoKey) => {
        const steps = runToCompletion(algorithms[key].generator, openGrid, openStart, nearGoal);
        return steps[steps.length - 1].visited.length;
      };

      // Every open cell is reachable, so a converged Bellman-Ford has a
      // distance for all of them however close the goal happened to be.
      expect(finalVisited('bellmanFord')).toBe(countOpenCells(openGrid));
      expect(finalVisited('bfs')).toBeLessThan(finalVisited('bellmanFord'));
    });

    it('empties its frontier at each pass boundary while visited keeps growing', () => {
      const steps = runToCompletion(
        algorithms.bellmanFord.generator,
        detourGrid,
        detourStart,
        detourEnd,
      );
      // Intermediate steps only: the terminal snapshot always has an empty
      // frontier, which would be a false positive for a pass boundary.
      const passes = steps.slice(0, -1);

      // A pass restarts its frontier from empty, so the first relaxation of a
      // new pass reports exactly one cell after the previous pass reported many.
      const boundaries = passes.filter(
        (step, i) => i > 0 && step.frontier.length === 1 && passes[i - 1].frontier.length > 1,
      );
      expect(boundaries.length).toBeGreaterThanOrEqual(1);

      // The frontier resets, but the set of cells with a known distance cannot.
      passes.forEach((step, i) => {
        if (i > 0) expect(step.visited.length).toBeGreaterThanOrEqual(passes[i - 1].visited.length);
        for (const cell of step.frontier) {
          expect(step.visited).toContainEqual(cell);
        }
      });
    });
  });

  // ---- Floyd-Warshall: the pivot sweep has to be visible --------------------

  describe('Floyd-Warshall pivot sweep', () => {
    it('makes every open cell the pivot exactly once, in row-major order', () => {
      const steps = runToCompletion(
        algorithms.floydWarshall.generator,
        detourGrid,
        detourStart,
        detourEnd,
      );
      const openCount = countOpenCells(detourGrid);

      // One snapshot per pivot, plus the terminal one. No early exit: the
      // sweep runs to the end however early the answer was settled.
      expect(steps).toHaveLength(openCount + 1);

      const pivots = steps.slice(0, -1).map((step) => step.current);
      const expectedPivots: Coord[] = [];
      for (let row = 0; row < detourGrid.length; row++) {
        for (let col = 0; col < detourGrid[row].length; col++) {
          if (detourGrid[row][col] === 0) expectedPivots.push({ row, col });
        }
      }
      expect(pivots).toEqual(expectedPivots);

      // The pivot is always the head of the frontier, so it is what the grid
      // paints amber as it marches.
      steps.slice(0, -1).forEach((step, i) => {
        expect(step.frontier[0]).toEqual(expectedPivots[i]);
      });
    });

    // Floyd-Warshall is the one generator in this app whose cost is cubic in
    // the grid size, and `skipToEnd()` drains a generator synchronously — so
    // "does it finish" is a real correctness property here, not a micro-benchmark.
    // These numbers are what justify shipping it at all; if usePathfinder's
    // ROWS/COLS ever grow, this is where that decision gets re-litigated.
    it('stays interactive at the app default grid size (15x25)', () => {
      const ROWS = 15;
      const COLS = 25;
      const bigGrid = makeOpenGrid(ROWS, COLS);
      const bigStart: Coord = { row: Math.floor(ROWS / 2), col: 0 };
      const bigEnd: Coord = { row: Math.floor(ROWS / 2), col: COLS - 1 };

      const startedAt = performance.now();
      const steps = runToCompletion(algorithms.floydWarshall.generator, bigGrid, bigStart, bigEnd);
      const elapsedMs = performance.now() - startedAt;

      // 375 pivots + the terminal snapshot — comfortably inside useStepPlayer's
      // 50k buffer cap, and the same order of magnitude as BFS's 375 steps, so
      // playback lasts about as long rather than crawling.
      expect(steps).toHaveLength(ROWS * COLS + 1);
      expect(steps[steps.length - 1].path).toHaveLength(COLS);

      // Measured ~95ms; 2s leaves enormous headroom for a loaded CI box while
      // still failing loudly if this ever regresses into a multi-second freeze.
      expect(elapsedMs).toBeLessThan(2_000);
    });

    it('takes its turn on pivots that cannot help, because it is oblivious', () => {
      // The right-hand component is unreachable from the start, yet its cells
      // still get their pass — an early-exiting search would never touch them.
      const steps = runToCompletion(
        algorithms.floydWarshall.generator,
        unreachableGrid,
        unreachableStart,
        unreachableEnd,
      );
      const pivots = steps.slice(0, -1).map((step) => step.current!);
      expect(pivots.some((cell) => cell.col > 2)).toBe(true);

      // ...and it still reports only the start's own component as reached.
      const last = steps[steps.length - 1];
      expect(last.visited.every((cell) => cell.col < 2)).toBe(true);
    });
  });
});
