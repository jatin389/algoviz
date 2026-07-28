import { ref, reactive, computed } from 'vue';
import { algorithms } from '@/algorithms';
import type { SortAlgoKey } from '@/algorithms';
import type { SortStep } from '@/types';
import { useStepPlayer } from './useStepPlayer';

// Declared explicitly because the empty-array initializers below would
// otherwise infer as `never[]` and reject every index written into them.
interface SortHighlights {
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

/**
 * useSorter — sorting's binding between step snapshots and reactive UI state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is the part that is genuinely sorting-specific: the dataset, and what a
 * `SortStep` means when painted onto the bars.
 */
export function useSorter() {
  // ---- User-configurable inputs ---------------------------------------------
  const size = ref(45); // number of bars (10..100)
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref<SortAlgoKey>('bubble');

  // ---- Live visualization state ---------------------------------------------
  const array = ref<number[]>([]); // current bar values
  const highlights = reactive<SortHighlights>({ comparing: [], swapping: [], sorted: [] });

  // `steps` and `elapsedMs` deliberately do NOT live here. They are properties
  // of playback, not of the algorithm, and a running `steps += 1` in applyStep
  // would silently corrupt itself the moment a user scrubs backwards.
  const stats = reactive({ comparisons: 0, swaps: 0 });

  /** The pristine array every run starts from. Exposed so compare mode can mirror it. */
  const baseArray = ref<number[]>([]);

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  // The bar scale is fixed per dataset, not recomputed per frame. Non-comparison
  // sorts (counting/radix) render zero-filled placeholder slots mid-run, which
  // would otherwise shrink the apparent max before the true max value lands.
  const maxValue = ref(1);

  function randomArray(n: number) {
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
  }

  const player = useStepPlayer<SortStep>({
    speed,
    createGenerator: () => {
      array.value = [...baseArray.value];
      resetHighlights();
      resetStats();
      return currentAlgo.value.generator([...baseArray.value]);
    },
    // Every field is copied straight off the snapshot rather than accumulated,
    // so showing step N produces the same bars however the cursor got there.
    applyStep: (step) => {
      array.value = step.array;
      highlights.comparing = step.comparing;
      highlights.swapping = step.swapping;
      highlights.sorted = step.sorted;
      stats.comparisons = step.comparisons;
      stats.swaps = step.swaps;
    },
    clearStep: () => {
      array.value = [...baseArray.value];
      resetHighlights();
      resetStats();
    },
  });

  /** Produce a fresh random dataset and return to a clean idle state. */
  function generate() {
    baseArray.value = randomArray(size.value);
    maxValue.value = Math.max(...baseArray.value, 1);
    player.reset();
  }

  /** Install a caller-supplied dataset (custom input, or compare-mode mirroring). */
  function setArray(values: number[]) {
    if (values.length === 0) return;
    baseArray.value = [...values];
    size.value = values.length;
    maxValue.value = Math.max(...values, 1);
    player.reset();
  }

  // Seed an initial dataset so the UI has something to show on mount.
  generate();

  return {
    // inputs
    size,
    speed,
    algoKey,
    // state
    array,
    baseArray,
    highlights,
    stats,
    maxValue,
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
    generate,
    setArray,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
