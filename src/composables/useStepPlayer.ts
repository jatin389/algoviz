import { computed, onScopeDispose, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { useStepDelay } from './useStepDelay';
import type { AlgoStatus, StepGenerator } from '@/types';

/**
 * useStepPlayer — the animation engine shared by every continuous category.
 *
 * Before this existed, `useSorter`, `useSearcher`, `usePathfinder` and
 * `useGraphTraversal` each carried their own verbatim copy of the same tick
 * loop, timer field, status machine and delay formula. The only parts that ever
 * genuinely differed were *what a snapshot means* for that category — which is
 * exactly what the `applyStep`/`clearStep` callbacks isolate.
 *
 * It also records every snapshot it pulls, which is what makes stepping
 * backwards possible: generators are one-way, so the only way to show a
 * previous state is to have kept it.
 *
 * Status machine: idle -> running <-> paused -> done, with reset() returning to
 * idle. Scrubbing backwards out of `done` lands in `paused`.
 */

/**
 * Safety valve, not a memory budget. The realistic worst case is bubble or
 * insertion sort at n=100 on a reversed array: ~9.9k steps, each holding a
 * 100-element array copy plus a `sorted` list averaging ~50 — roughly 13 MB.
 * This cap exists so a future change (a larger size slider, a pathological
 * generator) cannot silently pin the tab instead of failing visibly.
 */
export const MAX_BUFFERED_STEPS = 50_000;

/**
 * A single seek() will never pump the generator more than this many steps
 * synchronously. The history slider is capped at `bufferedCount - 1`, so a
 * drag can only scrub through what has already played; `skipToEnd()` is the
 * deliberate, unbounded drain.
 */
const SEEK_PUMP_LIMIT = 2_000;

export interface StepPlayerOptions<TStep extends { done: boolean }> {
  /** Owned by the caller, so views keep binding `v-model:speed` to it directly. */
  speed: Ref<number>;

  /**
   * Build a fresh generator for a new run, resetting whatever pre-run state the
   * category needs. Return null to refuse to start — graph traversal uses this
   * when no start node has been picked yet.
   */
  createGenerator: () => StepGenerator<TStep> | null;

  /**
   * Fan one snapshot out onto reactive state.
   *
   * MUST BE IDEMPOTENT AND ABSOLUTE. It is called on forward ticks, on backward
   * scrubs and on arbitrary seeks, so the same index must always produce the
   * same visible state. Never accumulate here — no `+=`, no push. Derive
   * everything from `step` or from `index`.
   */
  applyStep: (step: TStep, index: number) => void;

  /** Restore the pre-run visual state. Called by reset() and whenever the cursor lands at -1. */
  clearStep: () => void;

  /** Defaults to MAX_BUFFERED_STEPS. */
  maxSteps?: number;
}

export interface StepPlayer<TStep extends { done: boolean }> {
  status: Readonly<Ref<AlgoStatus>>;
  isRunning: ComputedRef<boolean>;
  isPaused: ComputedRef<boolean>;
  isDone: ComputedRef<boolean>;
  /** Dataset edits are only allowed while nothing is mid-playback. */
  canEdit: ComputedRef<boolean>;

  delayMs: ComputedRef<number>;
  /** Accumulated wall-clock time spent running. Frozen while paused or scrubbing. */
  elapsedMs: Readonly<Ref<number>>;

  /** Index of the displayed step; -1 before the first step of a run. */
  cursor: Readonly<Ref<number>>;
  /** `cursor + 1` — what the stats panels label "Steps". */
  stepCount: ComputedRef<number>;
  /** How many snapshots have been recorded for this run so far. */
  bufferedCount: Readonly<Ref<number>>;
  /** True once the generator is exhausted, so `bufferedCount` is the final length. */
  fullyBuffered: Readonly<Ref<boolean>>;
  /** True if `maxSteps` cut the run short. */
  truncated: Readonly<Ref<boolean>>;
  /** The raw snapshot under the cursor; powers the pseudocode line highlight. */
  current: ComputedRef<TStep | null>;
  canStepBack: ComputedRef<boolean>;
  canStepForward: ComputedRef<boolean>;

  run(): void;
  pause(): void;
  reset(): void;
  stepForward(): void;
  stepBack(): void;
  seek(index: number): void;
  /** Drain the generator and land on the terminal step. */
  skipToEnd(): void;
}

export function useStepPlayer<TStep extends { done: boolean }>(
  options: StepPlayerOptions<TStep>,
): StepPlayer<TStep> {
  const maxSteps = options.maxSteps ?? MAX_BUFFERED_STEPS;

  const status = ref<AlgoStatus>('idle');
  const cursor = ref(-1);
  const bufferedCount = ref(0);
  const fullyBuffered = ref(false);
  const truncated = ref(false);
  const elapsedMs = ref(0);

  // Deliberately NOT reactive. Wrapping the tape in ref()/reactive() would make
  // Vue deep-proxy every recorded snapshot — thousands of objects each holding
  // an array copy — for no benefit, since nothing renders the tape itself. Only
  // the step currently under the cursor is ever handed to reactive state.
  let history: TStep[] = [];

  let generator: StepGenerator<TStep> | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  // Elapsed time is accumulated rather than derived from a single start
  // timestamp, so pausing and scrubbing simply stop adding to it.
  let accumulatedMs = 0;
  let runningSince: number | null = null;

  const delayMs = useStepDelay(options.speed);

  const isRunning = computed(() => status.value === 'running');
  const isPaused = computed(() => status.value === 'paused');
  const isDone = computed(() => status.value === 'done');
  const canEdit = computed(() => status.value === 'idle' || status.value === 'done');

  const stepCount = computed(() => cursor.value + 1);
  const current = computed(() => (cursor.value >= 0 ? history[cursor.value] : null));
  const canStepBack = computed(() => cursor.value >= 0);
  const canStepForward = computed(
    () => status.value === 'idle' || cursor.value < bufferedCount.value - 1 || !fullyBuffered.value,
  );

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function startClock() {
    runningSince = Date.now();
  }

  function stopClock() {
    if (runningSince !== null) {
      accumulatedMs += Date.now() - runningSince;
      runningSince = null;
    }
    elapsedMs.value = accumulatedMs;
  }

  function syncClock() {
    elapsedMs.value = accumulatedMs + (runningSince === null ? 0 : Date.now() - runningSince);
  }

  /** Pull one more snapshot from the generator onto the tape. Null once exhausted. */
  function pump(): TStep | null {
    if (!generator) return null;

    if (history.length >= maxSteps) {
      truncated.value = true;
      fullyBuffered.value = true;
      generator = null;
      return null;
    }

    const { value, done: exhausted } = generator.next();
    if (exhausted || !value) {
      fullyBuffered.value = true;
      generator = null;
      return null;
    }

    history.push(value);
    bufferedCount.value = history.length;

    // A terminal snapshot means the tape is complete even though the generator
    // has not been asked for one more value.
    if (value.done) {
      fullyBuffered.value = true;
      generator = null;
    }
    return value;
  }

  /** Move the cursor and repaint. The single place applyStep/clearStep are called. */
  function show(index: number) {
    cursor.value = index;
    if (index < 0) {
      options.clearStep();
      return;
    }
    options.applyStep(history[index], index);
  }

  /** Wipe the tape and build a fresh generator. False if the category refused to start. */
  function beginRun(): boolean {
    clearTimer();
    history = [];
    bufferedCount.value = 0;
    cursor.value = -1;
    fullyBuffered.value = false;
    truncated.value = false;
    accumulatedMs = 0;
    runningSince = null;
    elapsedMs.value = 0;
    generator = options.createGenerator();
    return generator !== null;
  }

  function finish() {
    clearTimer();
    stopClock();
    status.value = 'done';
  }

  function tick() {
    if (status.value !== 'running') return;

    let step: TStep | null;
    if (cursor.value < history.length - 1) {
      // Replaying a stretch the user scrubbed back over: the snapshots already
      // exist, so resuming must not advance the generator past them.
      step = history[cursor.value + 1];
      show(cursor.value + 1);
    } else {
      step = pump();
      if (step === null) {
        finish();
        return;
      }
      show(history.length - 1);
    }

    syncClock();
    if (step.done) {
      finish();
      return;
    }
    timer = setTimeout(tick, delayMs.value);
  }

  function run() {
    if (status.value === 'running') return;

    // Resuming: the tape and the clock carry straight on.
    if (status.value === 'paused') {
      status.value = 'running';
      startClock();
      tick();
      return;
    }

    if (!beginRun()) return;
    status.value = 'running';
    startClock();
    tick();
  }

  function pause() {
    if (status.value !== 'running') return;
    clearTimer();
    stopClock();
    status.value = 'paused';
  }

  function reset() {
    clearTimer();
    generator = null;
    history = [];
    bufferedCount.value = 0;
    cursor.value = -1;
    fullyBuffered.value = false;
    truncated.value = false;
    accumulatedMs = 0;
    runningSince = null;
    elapsedMs.value = 0;
    options.clearStep();
    status.value = 'idle';
  }

  function seek(index: number) {
    if (status.value === 'running') pause();

    let target = Math.max(-1, index);

    // Only pump when the caller is reaching past what has been recorded, and
    // never without a bound — see SEEK_PUMP_LIMIT.
    let pumped = 0;
    while (target >= history.length && generator !== null && pumped < SEEK_PUMP_LIMIT) {
      if (pump() === null) break;
      pumped += 1;
    }

    target = Math.min(target, history.length - 1);
    show(target);

    if (target >= 0 && history[target].done) {
      status.value = 'done';
    } else if (target < 0 && history.length === 0) {
      status.value = 'idle';
    } else {
      status.value = 'paused';
    }
  }

  function stepForward() {
    // Stepping straight from idle is the natural way to read an algorithm one
    // line at a time, so it starts the run rather than requiring Run first.
    if (status.value === 'idle' && !beginRun()) return;
    seek(cursor.value + 1);
  }

  function stepBack() {
    seek(cursor.value - 1);
  }

  function skipToEnd() {
    if (status.value === 'idle' && !beginRun()) return;
    if (status.value === 'running') pause();

    while (generator !== null) {
      if (pump() === null) break;
    }

    show(history.length - 1);
    stopClock();
    status.value = history.length > 0 ? 'done' : 'idle';
  }

  // Stop the timer chain if the owning component unmounts mid-run; otherwise
  // tick() keeps recursing against a detached view forever.
  onScopeDispose(clearTimer);

  return {
    status,
    isRunning,
    isPaused,
    isDone,
    canEdit,
    delayMs,
    elapsedMs,
    cursor,
    stepCount,
    bufferedCount,
    fullyBuffered,
    truncated,
    current,
    canStepBack,
    canStepForward,
    run,
    pause,
    reset,
    stepForward,
    stepBack,
    seek,
    skipToEnd,
  };
}
