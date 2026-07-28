import { ref, reactive, computed } from 'vue';
import { algorithms } from '@/algorithms/search';
import type { SearchAlgoKey } from '@/algorithms/search';
import type { SearchStep } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import type { Rng } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useUrlState } from './useUrlState';
import { searcherUrlParams } from './urlParams';

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
  /** Reproduces the dataset exactly: same seed + same size = same array. */
  const seed = ref(randomSeed());
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

  // Fresh Rng per call: a long-lived instance would keep advancing, so
  // regenerating twice with the same seed would silently stop reproducing.
  function randomSortedArray(n: number) {
    const rng = createRng(seed.value);
    return Array.from({ length: n }, () => rng.int(1, 99)).sort((a, b) => a - b);
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

  /**
   * Set the target to a value guaranteed to exist in the current dataset.
   *
   * Defaults to genuine randomness because the quick-pick button should give a
   * different target each press. `generate()` passes a seeded source instead,
   * so a seed reproduces the whole configuration — array *and* target.
   */
  function pickPresentTarget(rng: Rng = createRng(randomSeed())) {
    if (baseArray.length === 0) return;
    target.value = baseArray[rng.int(0, baseArray.length - 1)];
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

  /**
   * Rebuild the sorted dataset from the current seed and return to idle.
   *
   * `keepTarget` exists for the one call made straight after URL hydration: a
   * shared link's target must survive, or the link does not actually reproduce
   * what was shared. Every other caller wants a fresh target, since a new
   * dataset may not contain the old one.
   */
  function generate(keepTarget = false) {
    baseArray = randomSortedArray(size.value);
    array.value = [...baseArray];
    maxValue.value = Math.max(...baseArray, 1);
    player.reset();
    if (!keepTarget) pickPresentTarget(createRng(seed.value));
  }

  /** Install a caller-supplied dataset (custom array input). */
  function setArray(values: number[]) {
    if (values.length === 0) return;
    baseArray = [...values].sort((a, b) => a - b);
    array.value = [...baseArray];
    size.value = baseArray.length;
    maxValue.value = Math.max(...baseArray, 1);
    player.reset();
    pickPresentTarget(createRng(seed.value));
  }

  /** Pick a new random seed and rebuild from it. */
  function randomizeSeed() {
    seed.value = randomSeed();
    generate();
  }

  // Hydrate from the URL BEFORE the initial generate(): a shared seed, size
  // or target must be in place before the first dataset is built, or the
  // link reproduces the wrong array.
  const { hydrated } = useUrlState(searcherUrlParams({ algoKey, size, speed, seed, target }));

  // Seed an initial dataset so the UI has something to show on mount, keeping
  // a target that came from a shared link rather than overwriting it.
  generate(hydrated.has('target'));

  return {
    // inputs
    size,
    speed,
    algoKey,
    seed,
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
    randomizeSeed,
    setArray,
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
