import { ref, reactive, computed } from 'vue';
import { algorithms } from '@/algorithms/search';
import type { SearchAlgoKey } from '@/algorithms/search';
import type { SearchStep } from '@/types';
import { useStepPlayer } from './useStepPlayer';

// Mirrors the matching fields on SearchStep, which are `number | null` because
// the bounds are cleared once a run terminates. Declared explicitly because the
// all-null initializers below would otherwise infer as plain `null`.
interface SearchHighlights {
  low: number | null;
  high: number | null;
  mid: number | null;
  checking: number | null;
}

/**
 * useSearcher — search's binding between step snapshots and reactive UI state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is the part that is genuinely search-specific: the dataset, the
 * target, and what a `SearchStep` means when painted onto the bars.
 */
export function useSearcher() {
  // ---- User-configurable inputs ---------------------------------------------
  const size = ref(20); // number of bars (10..50)
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref<SearchAlgoKey>('binary');
  const target = ref(0); // value being searched for

  // ---- Live visualization state ---------------------------------------------
  const array = ref<number[]>([]); // current bar values (sorted ascending)
  const highlights = reactive<SearchHighlights>({
    low: null,
    high: null,
    mid: null,
    checking: null,
  });
  const foundIndex = ref<number | null>(null); // null until a run concludes with a match

  // `steps` and `elapsedMs` deliberately do NOT live here. They are properties
  // of playback, not of the algorithm, and a running `steps += 1` in applyStep
  // would silently corrupt itself the moment a user scrubs backwards.
  const stats = reactive({ comparisons: 0 });

  /** The pristine sorted array a run starts from. */
  let baseArray: number[] = [];

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  // The bar scale is fixed per dataset, not recomputed per frame.
  const maxValue = ref(1);

  function randomSortedArray(n: number) {
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

  const player = useStepPlayer<SearchStep>({
    speed,
    createGenerator: () => {
      array.value = [...baseArray];
      resetHighlights();
      resetStats();
      foundIndex.value = null;
      return currentAlgo.value.generator([...baseArray], target.value);
    },
    // Every field is copied straight off the snapshot rather than accumulated,
    // so showing step N produces the same bars however the cursor got there.
    applyStep: (step) => {
      array.value = step.array;
      highlights.low = step.low;
      highlights.high = step.high;
      highlights.mid = step.mid;
      highlights.checking = step.checking;
      foundIndex.value = step.foundIndex;
      stats.comparisons = step.comparisons;
    },
    clearStep: () => {
      array.value = [...baseArray];
      resetHighlights();
      resetStats();
      foundIndex.value = null;
    },
  });

  /** Produce a fresh random sorted dataset and return to a clean idle state. */
  function generate() {
    baseArray = randomSortedArray(size.value);
    array.value = [...baseArray];
    maxValue.value = Math.max(...baseArray, 1);
    player.reset();
    pickPresentTarget();
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
    array,
    highlights,
    foundIndex,
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
    pickPresentTarget,
    pickMissingTarget,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
