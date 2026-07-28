import { ref, reactive, computed } from 'vue';
import { algorithms } from '@/algorithms/pathfinding';
import type { PathAlgoKey } from '@/algorithms/pathfinding';
import type { Coord, Grid, PathStep } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useUrlState } from './useUrlState';
import { pathfinderUrlParams, coordRef } from './urlParams';

const ROWS = 15;
const COLS = 25;

const key = (row: number, col: number) => `${row},${col}`;

/**
 * usePathfinder — pathfinding's binding between step snapshots and reactive UI state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is the part that is genuinely pathfinding-specific: the grid (walls,
 * start, end), and what a `PathStep` means when painted onto the grid.
 *
 * Walls are owned here, not by the generators — they're static input the user
 * edits between runs, so they never appear in a step snapshot (see
 * algorithms/pathfinding/_utils.ts).
 */
export function usePathfinder() {
  // ---- User-configurable inputs ---------------------------------------------
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref<PathAlgoKey>('bfs');
  const walls = reactive(new Set<string>()); // keys are "row,col"
  const start = reactive<Coord>({ row: Math.floor(ROWS / 2), col: 0 });
  const end = reactive<Coord>({ row: Math.floor(ROWS / 2), col: COLS - 1 });
  const seed = ref(randomSeed());

  // Hydrate from the URL before anything reads start/end/seed: unlike the
  // other categories there's no explicit generate() here, but GridCanvas
  // paints start/end on first render, so hydration still has to land before
  // that first paint rather than in onMounted.
  //
  // Walls are deliberately NOT part of the URL: a 375-cell bitmask would need
  // a versioned base64+RLE format to be worth the complexity. Hand-painted
  // walls do not survive a share link. `randomizeWalls` is fully
  // deterministic given `seed`, so a *randomized* maze still reproduces.
  useUrlState(
    pathfinderUrlParams(
      { algoKey, speed, seed, start: coordRef(start), end: coordRef(end) },
      { rows: ROWS, cols: COLS },
    ),
  );

  // ---- Live visualization state ---------------------------------------------
  const visited = ref<Coord[]>([]);
  const frontier = ref<Coord[]>([]);
  const path = ref<Coord[]>([]);

  // `elapsedMs` deliberately does NOT live here. It is a property of playback,
  // not of the algorithm, and a running accumulation in applyStep would
  // silently corrupt itself the moment a user scrubs backwards.
  const stats = reactive({ visitedCount: 0, pathLength: 0 });

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  function isStartCell(row: number, col: number) {
    return start.row === row && start.col === col;
  }

  function isEndCell(row: number, col: number) {
    return end.row === row && end.col === col;
  }

  /** Materialize the current walls Set into the 0/1 grid generators expect. */
  function buildGrid() {
    const grid: Grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    for (const wallKey of walls) {
      const [row, col] = wallKey.split(',').map(Number);
      grid[row][col] = 1;
    }
    return grid;
  }

  function resetHighlights() {
    visited.value = [];
    frontier.value = [];
    path.value = [];
  }

  function resetStats() {
    stats.visitedCount = 0;
    stats.pathLength = 0;
  }

  const player = useStepPlayer<PathStep>({
    speed,
    createGenerator: () => {
      resetHighlights();
      resetStats();
      // The walls Set is materialized into the 0/1 grid at run start, so edits
      // mid-run cannot affect an in-flight generator.
      return currentAlgo.value.generator(buildGrid(), { ...start }, { ...end });
    },
    // Every field is copied straight off the snapshot rather than accumulated,
    // so showing step N produces the same grid however the cursor got there.
    applyStep: (step) => {
      visited.value = step.visited;
      frontier.value = step.frontier;
      path.value = step.path;
      stats.visitedCount = step.visited.length;
      stats.pathLength = step.path.length;
    },
    clearStep: () => {
      resetHighlights();
      resetStats();
    },
  });

  function toggleWall(row: number, col: number) {
    if (!player.canEdit.value) return;
    if (isStartCell(row, col) || isEndCell(row, col)) return;
    const k = key(row, col);
    if (walls.has(k)) walls.delete(k);
    else walls.add(k);
    // A finished run's highlight/path overlay refers to the old layout —
    // drop it the moment the grid structure changes so nothing stale lingers.
    if (player.isDone.value) player.reset();
  }

  function clearWalls() {
    if (!player.canEdit.value) return;
    walls.clear();
    player.reset();
  }

  /** Refuse to overwrite the end cell or an existing wall — pick another spot. */
  function placeStart(row: number, col: number) {
    if (!player.canEdit.value) return;
    if (isEndCell(row, col)) return;
    if (walls.has(key(row, col))) return;
    start.row = row;
    start.col = col;
    player.reset();
  }

  /** Refuse to overwrite the start cell or an existing wall — pick another spot. */
  function placeEnd(row: number, col: number) {
    if (!player.canEdit.value) return;
    if (isStartCell(row, col)) return;
    if (walls.has(key(row, col))) return;
    end.row = row;
    end.col = col;
    player.reset();
  }

  /** Roughly `density` of non-start/non-end cells become walls. */
  function randomizeWalls(density = 0.25) {
    if (!player.canEdit.value) return;
    // Fresh Rng per call: a long-lived instance would keep advancing, so
    // randomizing twice with the same seed would silently stop reproducing.
    const rng = createRng(seed.value);
    walls.clear();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (isStartCell(row, col) || isEndCell(row, col)) continue;
        if (rng.next() < density) walls.add(key(row, col));
      }
    }
    player.reset();
  }

  return {
    // dimensions
    rows: ROWS,
    cols: COLS,
    // inputs
    speed,
    algoKey,
    walls,
    start,
    end,
    seed,
    // state
    visited,
    frontier,
    path,
    stats,
    currentAlgo,
    // playback
    status: player.status,
    isRunning: player.isRunning,
    isPaused: player.isPaused,
    isDone: player.isDone,
    canEdit: player.canEdit,
    delayMs: player.delayMs,
    elapsedMs: player.elapsedMs,
    stepCount: player.stepCount,
    cursor: player.cursor,
    bufferedCount: player.bufferedCount,
    fullyBuffered: player.fullyBuffered,
    current: player.current,
    canStepBack: player.canStepBack,
    canStepForward: player.canStepForward,
    // controls
    toggleWall,
    clearWalls,
    placeStart,
    placeEnd,
    randomizeWalls,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
