import { ref, reactive, computed } from 'vue';
import { algorithms } from '@/algorithms';
import type { SortAlgoKey } from '@/algorithms';
import { source, sourceMap } from '@/algorithms/source';
import type { SortStep } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useUrlState } from './useUrlState';
import { sorterUrlParams } from './urlParams';

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
export interface UseSorterOptions {
  /**
   * Whether this instance mirrors itself into the URL. Compare mode's second
   * sorter must opt out: two instances writing `algo` would fight over the
   * query string on every algorithm change.
   */
  syncUrl?: boolean;
}

export function useSorter(options: UseSorterOptions = {}) {
  const { syncUrl = true } = options;

  // ---- User-configurable inputs ---------------------------------------------
  const size = ref(45); // number of bars (10..100)
  const speed = ref(60); // 1..100, higher = faster
  const algoKey = ref<SortAlgoKey>('bubble');
  /** Reproduces the dataset exactly: same seed + same size = same bars. */
  const seed = ref(randomSeed());

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

  // Fresh Rng per call: a long-lived instance would keep advancing, so
  // regenerating twice with the same seed would silently stop reproducing.
  function randomArray(n: number) {
    const rng = createRng(seed.value);
    return Array.from({ length: n }, () => rng.int(1, 99));
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

  /** Rebuild the dataset from the current seed and return to a clean idle state. */
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

  /** The pseudocode line responsible for the step on screen; null when untagged. */
  const activeLine = computed(() => player.current.value?.line ?? null);

  /** The running generator's own file, for the code panel's source mode. */
  const sourceCode = computed(() => source[algoKey.value]);

  /**
   * Source lines (0-based) responsible for the step on screen; empty when the
   * generator is untagged. One tag can legitimately sit on several yields, so
   * this is a list rather than a single line.
   *
   * Derived off the snapshot like `activeLine`, never accumulated, so it stays
   * correct under a backward scrub or an arbitrary seek.
   */
  const activeSourceLines = computed(() => {
    const line = player.current.value?.line;
    if (line === undefined) return [];
    return sourceMap(algoKey.value).get(line) ?? [];
  });

  /** Pick a new random seed and rebuild from it. */
  function randomizeSeed() {
    seed.value = randomSeed();
    generate();
  }

  // Hydrate from the URL BEFORE the initial generate(): a shared seed or
  // size must be in place before the first dataset is built, or the link
  // reproduces the wrong array.
  if (syncUrl) useUrlState(sorterUrlParams({ algoKey, size, speed, seed }));

  // Seed an initial dataset so the UI has something to show on mount.
  generate();

  return {
    // inputs
    size,
    speed,
    algoKey,
    seed,
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
    activeLine,
    sourceCode,
    activeSourceLines,
    canStepBack: player.canStepBack,
    canStepForward: player.canStepForward,
    // controls
    generate,
    randomizeSeed,
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
