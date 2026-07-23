import { ref, reactive, computed } from 'vue';
import { algorithms } from '../algorithms/index.js';

/**
 * useSorter — the animation engine.
 *
 * It owns all playback state and drives a sorting generator forward one step at
 * a time on a timer. The generators are pure and know nothing about Vue; this
 * composable is the single bridge between algorithm snapshots and reactive UI
 * state. Components stay dumb: they render `array` + `highlights` and call the
 * exposed controls.
 *
 * Status machine: idle -> running <-> paused -> done, with reset/generate
 * returning to idle.
 */
export function useSorter() {
  // ---- User-configurable inputs ---------------------------------------------
  const size = ref(45); // number of bars (10..100)
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref('bubble');

  // ---- Live visualization state ---------------------------------------------
  const status = ref('idle'); // idle | running | paused | done
  const array = ref([]); // current bar values
  const highlights = reactive({ comparing: [], swapping: [], sorted: [] });
  const stats = reactive({ comparisons: 0, swaps: 0, steps: 0, elapsedMs: 0 });

  // ---- Internal (non-reactive) machinery ------------------------------------
  let generator = null;
  let timer = null;
  let startTs = 0;
  let baseArray = []; // the pristine array a run starts from

  // Map the 1..100 speed slider onto a per-step delay in ms.
  // Higher speed -> smaller delay. Range ~ [4ms, 202ms].
  const delayMs = computed(() => Math.max(4, Math.round(204 - speed.value * 2)));

  const isRunning = computed(() => status.value === 'running');
  const isPaused = computed(() => status.value === 'paused');
  const isDone = computed(() => status.value === 'done');
  // Controls that mutate the dataset may only change while nothing is playing.
  const canEdit = computed(() => status.value === 'idle' || status.value === 'done');

  const currentAlgo = computed(() => algorithms[algoKey.value]);
  const maxValue = computed(() => (array.value.length ? Math.max(...array.value) : 1));

  function randomArray(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 99) + 1);
  }

  function resetHighlights() {
    highlights.comparing = [];
    highlights.swapping = [];
    highlights.sorted = [];
  }

  function resetStats() {
    stats.comparisons = 0;
    stats.swaps = 0;
    stats.steps = 0;
    stats.elapsedMs = 0;
  }

  /** Produce a fresh random dataset and return to a clean idle state. */
  function generate() {
    clearTimer();
    generator = null;
    baseArray = randomArray(size.value);
    array.value = [...baseArray];
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

  function applyStep(step) {
    array.value = step.array;
    highlights.comparing = step.comparing;
    highlights.swapping = step.swapping;
    highlights.sorted = step.sorted;
    stats.comparisons = step.comparisons;
    stats.swaps = step.swaps;
    stats.steps += 1;
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

    // Fresh run from the pristine base array.
    array.value = [...baseArray];
    resetHighlights();
    resetStats();
    generator = currentAlgo.value.generator([...baseArray]);
    startTs = Date.now();
    status.value = 'running';
    tick();
  }

  function pause() {
    if (status.value !== 'running') return;
    clearTimer();
    status.value = 'paused';
  }

  /** Stop playback and restore the array to the run's starting point. */
  function reset() {
    clearTimer();
    generator = null;
    array.value = [...baseArray];
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

  // Seed an initial dataset so the UI has something to show on mount.
  generate();

  return {
    // inputs
    size,
    speed,
    algoKey,
    // state
    status,
    array,
    highlights,
    stats,
    // derived
    delayMs,
    isRunning,
    isPaused,
    isDone,
    canEdit,
    currentAlgo,
    maxValue,
    // controls
    generate,
    run,
    pause,
    reset,
  };
}
