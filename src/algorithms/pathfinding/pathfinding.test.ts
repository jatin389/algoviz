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

  it('bfs, dijkstra, and astar all find equally-shortest paths on the open grid', () => {
    const lengths = (['bfs', 'dijkstra', 'astar'] as PathAlgoKey[]).map((key) => {
      const steps = runToCompletion(algorithms[key].generator, openGrid, openStart, openEnd);
      return steps[steps.length - 1].path.length;
    });
    expect(lengths[1]).toBe(lengths[0]);
    expect(lengths[2]).toBe(lengths[0]);
  });

  it('bfs, dijkstra, and astar all find equally-shortest paths on the detour grid', () => {
    const lengths = (['bfs', 'dijkstra', 'astar'] as PathAlgoKey[]).map((key) => {
      const steps = runToCompletion(algorithms[key].generator, detourGrid, detourStart, detourEnd);
      return steps[steps.length - 1].path.length;
    });
    expect(lengths[1]).toBe(lengths[0]);
    expect(lengths[2]).toBe(lengths[0]);
  });

  it('dfs finds a valid path without asserting it is shortest', () => {
    const steps = runToCompletion(algorithms.dfs.generator, detourGrid, detourStart, detourEnd);
    const last = steps[steps.length - 1];
    expect(isValidPath(last.path, detourGrid, detourStart, detourEnd)).toBe(true);
  });
});
