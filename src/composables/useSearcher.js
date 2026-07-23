import { ref, reactive, computed } from 'vue';
import { algorithms } from '../algorithms/search/index.js';

/**
 * useSearcher — the animation engine for the search vertical.
 *
 * It owns all playback state and drives a search generator forward one step
 * at a time on a timer. The generators are pure and know nothing about Vue;
 * this composable is the single bridge between algorithm snapshots and
 * reactive UI state. Components stay dumb: they render `array` + `highlights`
 * and call the exposed controls.
 *
 * Status machine: idle -> running <-> paused -> done, with reset/generate
 * returning to idle.
 */
export function useSearcher() {
  // ---- User-configurable inputs ---------------------------------------------
  const size = ref(20); // number of bars (10..50)
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref('binary');
  const target = ref(0); // value being searched for

  // ---- Live visualization state ---------------------------------------------
  const status = ref('idle'); // idle | running | paused | done
  const array = ref([]); // current bar values (sorted ascending)
  const highlights = reactive({ low: null, high: null, mid: null, checking: null });
  const foundIndex = ref(null); // null until a run concludes with a match
  const stats = reactive({ comparisons: 0, steps: 0, elapsedMs: 0 });

  // ---- Internal (non-reactive) machinery ------------------------------------
  let generator = null;
  let timer = null;
  let startTs = 0;
  let baseArray = []; // the pristine sorted array a run starts from

  // Map the 1..100 speed slider onto a per-step delay in ms.
  // Higher speed -> smaller delay. Range ~ [4ms, 202ms].
  const delayMs = computed(() => Math.max(4, Math.round(204 - speed.value * 2)));

  const isRunning = computed(() => status.value === 'running');
  const isPaused = computed(() => status.value === 'paused');
  const isDone = computed(() => status.value === 'done');
  // Controls that mutate the dataset may only change while nothing is playing.
  const canEdit = computed(() => status.value === 'idle' || status.value === 'done');

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  // The bar scale is fixed per dataset, not recomputed per frame.
  const maxValue = ref(1);

  function randomSortedArray(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 99) + 1).sort(
      (a, b) => a - b,
    );
  }

  function resetHighlights() {
    highlights.low = null;
    highlights.high = null;
    highlights.mid = null;
    highlights.checking = null;
  }

  function resetStats() {
    stats.comparisons = 0;
    stats.steps = 0;
    stats.elapsedMs = 0;
  }

  /** Set the target to a value guaranteed to exist in the current dataset. */
  function pickPresentTarget() {
    if (baseArray.length === 0) return;
    target.value = baseArray[Math.floor(Math.random() * baseArray.length)];
  }

  /** Set the target to a value guaranteed absent from the current dataset. */
  function pickMissingTarget() {
    const present = new Set(baseArray);
    // Values 1..99 populate the dataset, so scanning 0..100 always finds a gap.
    for (let candidate = 0; candidate <= 100; candidate++) {
      if (!present.has(candidate)) {
        target.value = candidate;
        return;
      }
    }
    target.value = -1; // unreachable given the 1..99 generation range
  }

  /** Produce a fresh random sorted dataset and return to a clean idle state. */
  function generate() {
    clearTimer();
    generator = null;
    baseArray = randomSortedArray(size.value);
    array.value = [...baseArray];
    maxValue.value = Math.max(...baseArray, 1);
    resetHighlights();
    resetStats();
    foundIndex.value = null;
    status.value = 'idle';
    pickPresentTarget();
  }

  function applyStep(step) {
    array.value = step.array;
    highlights.low = step.low;
    highlights.high = step.high;
    highlights.mid = step.mid;
    highlights.checking = step.checking;
    foundIndex.value = step.foundIndex;
    stats.comparisons = step.comparisons;
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
    foundIndex.value = null;
    generator = currentAlgo.value.generator([...baseArray], target.value);
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
    foundIndex.value = null;
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
    target,
    // state
    status,
    array,
    highlights,
    foundIndex,
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
    pickPresentTarget,
    pickMissingTarget,
    run,
    pause,
    reset,
  };
}
