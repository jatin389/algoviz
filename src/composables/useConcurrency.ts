import { computed, reactive, ref, shallowRef, watch } from 'vue';
import type { ConcurrencyStep, ThreadState } from '@/types';
import { randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useUrlState } from './useUrlState';
import { concurrencyUrlParams } from './urlParams';
import { scenarios, DEFAULT_SCENARIO } from '@/concurrency/scenarios';
import type { ScenarioKey } from '@/concurrency/scenarios';
import { searchSchedules } from '@/concurrency/search';
import type { SearchResult } from '@/concurrency/search';
import { runSchedule, isValidSchedule } from '@/concurrency/execute';
import type { ScheduleOutcome } from '@/concurrency/execute';

/**
 * useConcurrency — the concurrency domain's binding between step snapshots and
 * reactive UI state.
 *
 * Two layers, and keeping them apart is the whole design. The *search* layer
 * (`@/concurrency/search`) decides which interleavings to try and which of them
 * break the invariant; it runs once, up front, and knows nothing about
 * playback. The *playback* layer is then completely ordinary — a chosen
 * schedule is just a linear generator, so `useStepPlayer` drives it exactly as
 * it drives bubble sort, with no changes of any kind.
 *
 * That split is why this domain, despite being about concurrency, needed no
 * concurrency in the player at all.
 */
export function useConcurrency() {
  // ---- User-configurable inputs ---------------------------------------------
  const scenarioKey = ref<ScenarioKey>(DEFAULT_SCENARIO);
  const speed = ref(60);
  const seed = ref(randomSeed());
  /** The interleaving under inspection. Empty until a search has run. */
  const schedule = ref<number[]>([]);

  const scenario = computed(() => scenarios[scenarioKey.value]);

  // ---- Search ----------------------------------------------------------------
  // shallowRef: the result holds thousands of plain schedule arrays that are
  // only ever read, so deep-proxying them would cost a lot and buy nothing.
  const search = shallowRef<SearchResult | null>(null);

  function runSearch() {
    search.value = searchSchedules(scenario.value, { seed: seed.value });
  }

  const violating = computed(() => search.value?.outcomes.filter((o) => o.violates) ?? []);
  const clean = computed(() => search.value?.outcomes.filter((o) => !o.violates) ?? []);

  const selected = computed<ScheduleOutcome | null>(() => {
    if (!search.value || schedule.value.length === 0) return null;
    const key = schedule.value.join(',');
    return search.value.outcomes.find((o) => o.schedule.join(',') === key) ?? null;
  });

  // ---- Live visualization state ---------------------------------------------
  const threads = ref<ThreadState[]>([]);
  const sharedMem = ref<Record<string, number>>({});
  const lockOwners = ref<Record<string, number | null>>({});
  const lastAction = ref<ConcurrencyStep['lastAction']>(null);
  const violatedNow = ref(false);
  const stats = reactive({ executed: 0, total: 0 });

  function idleThreads(): ThreadState[] {
    return scenario.value.createState().threads;
  }

  function resetVisual() {
    const initial = scenario.value.createState();
    threads.value = initial.threads;
    sharedMem.value = { ...initial.shared };
    lockOwners.value = { ...initial.locks };
    lastAction.value = null;
    violatedNow.value = false;
    stats.executed = 0;
    stats.total = schedule.value.length;
  }

  const player = useStepPlayer<ConcurrencyStep>({
    speed,
    createGenerator: () => {
      // No schedule picked yet means there is nothing to replay — the same
      // "refuse to start" contract graph traversal uses for a missing start node.
      if (schedule.value.length === 0) return null;
      resetVisual();
      return runSchedule(scenario.value, schedule.value);
    },
    // Every field copied straight off the snapshot, never accumulated, so
    // scrubbing to step N always paints the same state.
    applyStep: (step, index) => {
      threads.value = step.threads;
      sharedMem.value = step.sharedMem;
      lockOwners.value = step.lockOwners;
      lastAction.value = step.lastAction;
      violatedNow.value = step.violated;
      stats.executed = index + 1;
    },
    clearStep: resetVisual,
  });

  /** Load an interleaving and park the cursor where it first goes wrong. */
  function selectSchedule(next: readonly number[]) {
    if (!isValidSchedule(scenario.value, next)) return false;
    schedule.value = [...next];
    player.reset();

    const outcome = search.value?.outcomes.find((o) => o.schedule.join(',') === next.join(','));
    if (outcome && outcome.violates) {
      // Jumping to the breach rather than to step 0 is the point of the
      // feature: "which interleaving" is only half the answer, "which step"
      // is the other half.
      //
      // `stepForward()` first because `seek()` alone cannot start a run — it
      // only pumps an already-built generator, so seeking straight after
      // reset() would clamp to an empty tape and land back at -1. Stepping
      // once is what calls beginRun(); the seek then pulls the rest.
      player.stepForward();
      player.seek(outcome.firstViolationIndex);
    }
    return true;
  }

  /** Search, then land on the first violating interleaving if there is one. */
  function analyse(keepSchedule = false) {
    runSearch();
    stats.total = 0;

    if (keepSchedule && schedule.value.length > 0 && isValidSchedule(scenario.value, schedule.value)) {
      selectSchedule(schedule.value);
      return;
    }

    const first = violating.value[0] ?? search.value?.outcomes[0];
    if (first) selectSchedule(first.schedule);
    else {
      schedule.value = [];
      resetVisual();
    }
  }

  function randomizeSeed() {
    seed.value = randomSeed();
  }

  // Hydrate before the first search, so a shared link's scenario and seed are
  // in place rather than being overwritten by freshly derived values.
  const { hydrated } = useUrlState(
    concurrencyUrlParams({ scenarioKey, speed, seed, schedule }, () => scenario.value),
  );

  analyse(hydrated.has('sched'));

  // Changing either input invalidates the current search: the schedule refers
  // to a specific scenario's instruction counts, and the seed drives sampling.
  watch(scenarioKey, () => {
    schedule.value = [];
    analyse();
  });
  watch(seed, () => analyse());

  const summary = computed(() => {
    const result = search.value;
    if (!result) return '';
    const violated = result.violatingCount.toLocaleString();
    if (result.mode === 'exhaustive') {
      return `Checked all ${result.checkedCount.toLocaleString()} possible interleavings — ${violated} break the invariant.`;
    }
    const total = Number.isFinite(result.totalCount)
      ? result.totalCount.toLocaleString()
      : 'astronomically many';
    return `Sampled ${result.checkedCount.toLocaleString()} of ${total} possible interleavings — ${violated} of those break the invariant.`;
  });

  return {
    // inputs
    scenarioKey,
    scenario,
    speed,
    seed,
    schedule,
    // search
    search,
    violating,
    clean,
    selected,
    summary,
    // state
    threads,
    sharedMem,
    lockOwners,
    lastAction,
    violatedNow,
    stats,
    idleThreads,
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
    // controls
    analyse,
    selectSchedule,
    randomizeSeed,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
