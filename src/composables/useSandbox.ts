import { computed, reactive, ref, shallowRef } from 'vue';
import type { SortStep } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useUrlState } from './useUrlState';
import { sandboxUrlParams } from './urlParams';
import { runSandbox, replaySteps, SandboxError } from '@/sandbox/runSandbox';
import type { SandboxRunHandle, SandboxRunResult } from '@/sandbox/runSandbox';
import {
  SANDBOX_DEFAULT_SIZE,
  SANDBOX_DEFAULT_SPEED,
  STARTER_SOURCE,
  MAX_SANDBOX_STEPS,
} from '@/sandbox/contract';

/**
 * useSandbox — binds a user-authored snippet to the same playback machinery
 * every built-in category uses.
 *
 * The division of labour is the point: `@/sandbox/*` owns *getting steps out
 * of untrusted code safely*, and this file owns *what a `SortStep` means on
 * screen* — which is the identical job `useSorter` does, against the identical
 * snapshot shape. `useStepPlayer` is used completely unmodified, because by
 * the time it sees anything the tape is a plain in-memory array.
 */

export type SandboxPhase = 'idle' | 'executing' | 'ready' | 'error';

/**
 * A run that produced nothing still has a story, and *why* it produced nothing
 * is the most useful thing the sandbox ever reports.
 *
 * The watchdog case especially: a snippet that loops without ever reaching a
 * `yield` cannot be caught by the worker's own budgets, because those are
 * checked between yields. Only the parent's silence timer catches it. Saying
 * "never yielded a snapshot" there would describe the symptom and hide the
 * mechanism that saved the tab.
 */
function emptyRunMessage(outcome: SandboxRunResult): string {
  switch (outcome.reason) {
    case 'watchdog':
      return 'Force-stopped: the snippet stopped responding without yielding anything — that is what a loop with no yield inside it looks like. The worker was terminated; this page was never blocked.';
    case 'step-budget':
    case 'time-budget':
      return 'Stopped at the budget before the snippet yielded a single snapshot.';
    case 'cancelled':
      return 'Cancelled before the snippet yielded anything.';
    default:
      return outcome.rejected > 0
        ? `Every snapshot was rejected. First problem: ${outcome.firstRejectReason}`
        : 'The snippet ran but never yielded a snapshot. Use `yield` to draw a frame.';
  }
}

export function useSandbox() {
  // ---- User-configurable inputs ---------------------------------------------
  const source = ref(STARTER_SOURCE);
  const size = ref(SANDBOX_DEFAULT_SIZE);
  const speed = ref(SANDBOX_DEFAULT_SPEED);
  const seed = ref(randomSeed());

  // ---- Execution state -------------------------------------------------------
  const phase = ref<SandboxPhase>('idle');
  const error = ref<string | null>(null);
  const lastRun = ref<SandboxRunResult | null>(null);

  // shallowRef: the tape can hold thousands of snapshots, each with an array
  // copy. Deep reactivity would proxy every one of them for no benefit, since
  // only the step under the cursor is ever rendered — the same reasoning that
  // keeps useStepPlayer's own history non-reactive.
  const steps = shallowRef<SortStep[]>([]);

  let active: SandboxRunHandle | null = null;

  // ---- Live visualization state ---------------------------------------------
  const baseArray = ref<number[]>([]);
  const array = ref<number[]>([]);
  const highlights = reactive<{ comparing: number[]; swapping: number[]; sorted: number[] }>({
    comparing: [],
    swapping: [],
    sorted: [],
  });
  const stats = reactive({ comparisons: 0, swaps: 0 });
  const maxValue = ref(1);

  function resetHighlights() {
    highlights.comparing = [];
    highlights.swapping = [];
    highlights.sorted = [];
  }

  function resetStats() {
    stats.comparisons = 0;
    stats.swaps = 0;
  }

  // Fresh Rng per call, so the same seed always rebuilds the same input.
  function buildInput() {
    const rng = createRng(seed.value);
    baseArray.value = Array.from({ length: size.value }, () => rng.int(1, 99));
    array.value = [...baseArray.value];
    recomputeMax();
  }

  /**
   * The bar scale is fixed for the whole run, scanned once over the collected
   * tape rather than per frame. A snippet is free to invent values the input
   * never held (a counting sort's tally, a shuffled placeholder), so keying
   * the scale off the input alone would let a bar overflow its own chart.
   */
  function recomputeMax() {
    let max = 1;
    for (const value of baseArray.value) if (value > max) max = value;
    for (const step of steps.value) {
      for (const value of step.array) if (value > max) max = value;
    }
    maxValue.value = max;
  }

  const player = useStepPlayer<SortStep>({
    speed,
    createGenerator: () => {
      if (steps.value.length === 0) return null;
      array.value = [...baseArray.value];
      resetHighlights();
      resetStats();
      return replaySteps(steps.value);
    },
    // Absolute, never accumulated — so scrubbing to step N always paints the
    // same thing however the cursor got there.
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

  /** Discard a collected tape, returning the chart to the untouched input. */
  function clearTape() {
    steps.value = [];
    player.reset();
    recomputeMax();
  }

  function regenerate() {
    cancel();
    buildInput();
    clearTape();
    phase.value = 'idle';
    error.value = null;
    lastRun.value = null;
  }

  function randomizeSeed() {
    seed.value = randomSeed();
    regenerate();
  }

  /**
   * Execute the snippet in the sandbox and, if it produced anything, play it.
   *
   * Note that a run cut short by a budget is still a *result*, not an error:
   * the steps collected before the cut are worth watching, and seeing where an
   * accidental infinite loop got to is the fastest way to understand it.
   */
  async function execute() {
    cancel();
    error.value = null;
    lastRun.value = null;
    phase.value = 'executing';
    steps.value = [];
    player.reset();

    const handle = runSandbox({ code: source.value, input: baseArray.value });
    active = handle;

    try {
      const outcome = await handle.result;
      if (active !== handle) return; // superseded by a newer run

      steps.value = outcome.steps;
      lastRun.value = outcome;
      recomputeMax();

      if (outcome.steps.length === 0) {
        phase.value = 'error';
        error.value = emptyRunMessage(outcome);
        return;
      }

      phase.value = 'ready';
      player.run();
    } catch (thrown) {
      if (active !== handle) return;
      phase.value = 'error';
      error.value =
        thrown instanceof SandboxError ? thrown.message : 'The sandbox failed to start.';
    } finally {
      if (active === handle) active = null;
    }
  }

  function cancel() {
    if (active) {
      active.cancel();
      active = null;
    }
  }

  function resetSource() {
    source.value = STARTER_SOURCE;
  }

  // Hydrate from the URL BEFORE the first input is built, so a shared seed
  // reproduces the exact dataset the snippet was written against.
  const { hydrated } = useUrlState(sandboxUrlParams({ source, size, speed, seed }));

  /** True when this view was opened from someone else's link. */
  const fromSharedLink = hydrated.has('src');

  buildInput();

  const truncated = computed(
    () => lastRun.value !== null && lastRun.value.reason !== 'complete' && steps.value.length > 0,
  );

  const stopLabel = computed(() => {
    const run = lastRun.value;
    if (!run) return null;
    switch (run.reason) {
      case 'complete':
        return null;
      case 'step-budget':
        return `Stopped at the ${MAX_SANDBOX_STEPS.toLocaleString()}-step budget — the snippet never finished.`;
      case 'time-budget':
        return 'Stopped at the time budget — the snippet was still running.';
      case 'watchdog':
        return 'Force-stopped: the sandbox went silent, which is what a loop that never yields looks like.';
      case 'cancelled':
        return 'Cancelled.';
      default:
        return null;
    }
  });

  return {
    // inputs
    source,
    size,
    speed,
    seed,
    // execution
    phase,
    error,
    lastRun,
    truncated,
    stopLabel,
    stepsCollected: computed(() => steps.value.length),
    fromSharedLink,
    // visualization state
    array,
    baseArray,
    highlights,
    stats,
    maxValue,
    // playback
    status: player.status,
    isRunning: player.isRunning,
    isPaused: player.isPaused,
    isDone: player.isDone,
    canEdit: player.canEdit,
    elapsedMs: player.elapsedMs,
    stepCount: player.stepCount,
    cursor: player.cursor,
    bufferedCount: player.bufferedCount,
    fullyBuffered: player.fullyBuffered,
    current: player.current,
    canStepBack: player.canStepBack,
    canStepForward: player.canStepForward,
    activeLine: computed(() => player.current.value?.line ?? null),
    // controls
    execute,
    cancel,
    regenerate,
    randomizeSeed,
    resetSource,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
