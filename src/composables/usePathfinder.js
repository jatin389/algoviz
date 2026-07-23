import { ref, reactive, computed } from 'vue';
import { algorithms } from '../algorithms/pathfinding/index.js';

const ROWS = 15;
const COLS = 25;

const key = (row, col) => `${row},${col}`;

/**
 * usePathfinder — the pathfinding playback engine.
 *
 * Mirrors useSorter's shape: it owns all playback state and drives a
 * pathfinding generator forward one step at a time on a timer. Generators are
 * pure and know nothing about walls or Vue; this composable is the bridge
 * between grid-search snapshots and reactive UI state.
 *
 * Walls are owned here, not by the generators — they're static input the user
 * edits between runs, so they never appear in a step snapshot (see
 * algorithms/pathfinding/_utils.js).
 *
 * Status machine: idle -> running <-> paused -> done, with reset returning to
 * idle. Same as useSorter, walls/start/end may only change while `canEdit`.
 */
export function usePathfinder() {
  // ---- User-configurable inputs ---------------------------------------------
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref('bfs');
  const walls = reactive(new Set()); // Set<"row,col">
  const start = reactive({ row: Math.floor(ROWS / 2), col: 0 });
  const end = reactive({ row: Math.floor(ROWS / 2), col: COLS - 1 });

  // ---- Live visualization state ---------------------------------------------
  const status = ref('idle'); // idle | running | paused | done
  const visited = ref([]);
  const frontier = ref([]);
  const path = ref([]);
  const stats = reactive({ visitedCount: 0, pathLength: 0, elapsedMs: 0 });

  // ---- Internal (non-reactive) machinery ------------------------------------
  let generator = null;
  let timer = null;
  let startTs = 0;

  // Same speed -> delay mapping as useSorter, so both views feel consistent.
  const delayMs = computed(() => Math.max(4, Math.round(204 - speed.value * 2)));

  const isRunning = computed(() => status.value === 'running');
  const isPaused = computed(() => status.value === 'paused');
  const isDone = computed(() => status.value === 'done');
  // Walls/start/end/algorithm may only change while nothing is playing.
  const canEdit = computed(() => status.value === 'idle' || status.value === 'done');

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  function isStartCell(row, col) {
    return start.row === row && start.col === col;
  }

  function isEndCell(row, col) {
    return end.row === row && end.col === col;
  }

  /** Materialize the current walls Set into the 0/1 grid generators expect. */
  function buildGrid() {
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
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
    stats.elapsedMs = 0;
  }

  function toggleWall(row, col) {
    if (!canEdit.value) return;
    if (isStartCell(row, col) || isEndCell(row, col)) return;
    const k = key(row, col);
    if (walls.has(k)) walls.delete(k);
    else walls.add(k);
    // A finished run's highlight/path overlay refers to the old layout —
    // drop it the moment the grid structure changes so nothing stale lingers.
    if (status.value === 'done') reset();
  }

  function clearWalls() {
    if (!canEdit.value) return;
    walls.clear();
    reset();
  }

  /** Refuse to overwrite the end cell or an existing wall — pick another spot. */
  function placeStart(row, col) {
    if (!canEdit.value) return;
    if (isEndCell(row, col)) return;
    if (walls.has(key(row, col))) return;
    start.row = row;
    start.col = col;
    reset();
  }

  /** Refuse to overwrite the start cell or an existing wall — pick another spot. */
  function placeEnd(row, col) {
    if (!canEdit.value) return;
    if (isStartCell(row, col)) return;
    if (walls.has(key(row, col))) return;
    end.row = row;
    end.col = col;
    reset();
  }

  /** Roughly `density` of non-start/non-end cells become walls. */
  function randomizeWalls(density = 0.25) {
    if (!canEdit.value) return;
    walls.clear();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (isStartCell(row, col) || isEndCell(row, col)) continue;
        if (Math.random() < density) walls.add(key(row, col));
      }
    }
    reset();
  }

  function applyStep(step) {
    visited.value = step.visited;
    frontier.value = step.frontier;
    path.value = step.path;
    stats.visitedCount = step.visited.length;
    stats.pathLength = step.path.length;
    stats.elapsedMs = Date.now() - startTs;
  }

  function tick() {
    if (status.value !== 'running') return;
    const { value, done: exhausted } = generator.next();
    if (exhausted || !value) {
      finish();
      return;
    }
    applyStep(value);
    if (value.done) {
      finish();
      return;
    }
    timer = setTimeout(tick, delayMs.value);
  }

  function finish() {
    clearTimer();
    status.value = 'done';
  }

  /** Start a new run, or resume from a paused state. */
  function run() {
    if (status.value === 'running') return;

    if (status.value === 'paused') {
      status.value = 'running';
      // Keep elapsed timing roughly continuous across the pause.
      startTs = Date.now() - stats.elapsedMs;
      tick();
      return;
    }

    resetHighlights();
    resetStats();
    generator = currentAlgo.value.generator(buildGrid(), { ...start }, { ...end });
    startTs = Date.now();
    status.value = 'running';
    tick();
  }

  function pause() {
    if (status.value !== 'running') return;
    clearTimer();
    status.value = 'paused';
  }

  /** Stop playback and clear any in-progress highlight state. */
  function reset() {
    clearTimer();
    generator = null;
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
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
    // state
    status,
    visited,
    frontier,
    path,
    stats,
    // derived
    delayMs,
    isRunning,
    isPaused,
    isDone,
    canEdit,
    currentAlgo,
    // controls
    toggleWall,
    clearWalls,
    placeStart,
    placeEnd,
    randomizeWalls,
    run,
    pause,
    reset,
  };
}
