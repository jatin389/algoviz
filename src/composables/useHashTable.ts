import { computed, reactive, ref, watch } from 'vue';
import { algorithms, DEFAULT_STRATEGY } from '@/algorithms/hashtable';
import type { HashStrategyKey } from '@/algorithms/hashtable';
import { DEFAULT_HASH_FN, normalizeCapacity } from '@/algorithms/hashtable/hashFns';
import type { HashFnKey } from '@/algorithms/hashtable/hashFns';
import { effectiveThreshold } from '@/algorithms/hashtable/table';
import { collidingKeys, randomKeys } from '@/algorithms/hashtable/collide';
import { hashPseudocode } from '@/algorithms/hashtable/pseudocode';
import { source, sourceMap } from '@/algorithms/hashtable/source';
import { hashCues } from '@/algorithms/hashtable/hashCues';
import type { HashBucket, HashOp, HashOpKind, HashPhase, HashStep } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useAudioCues } from './useAudioCues';
import { useUrlState } from './useUrlState';
import { hashUrlParams } from './urlParams';

/**
 * The scalar half of a `HashStep` — everything except the bucket array, which
 * is big enough to deserve its own ref. Declared explicitly because the
 * all-null initializers below would otherwise infer as plain `null`.
 */
interface HashView {
  capacity: number;
  size: number;
  loadFactor: number;
  op: HashOpKind | null;
  key: string | null;
  hash: number | null;
  homeIndex: number | null;
  probeIndex: number | null;
  probeSeq: number[];
  phase: HashPhase;
  explain: string | null;
}

/** The phases that conclude an operation. Counting them counts finished ops. */
const OUTCOME_PHASES: ReadonlySet<HashPhase> = new Set<HashPhase>([
  'inserted',
  'updated',
  'found',
  'not-found',
  'deleted',
]);

/** How many keys the bulk loader and the collision button add per press. */
export const BULK_LOAD_COUNT = 8;
export const COLLISION_COUNT = 3;

export interface UseHashTableOptions {
  /**
   * Whether this instance drives the shared audio engine. Matches `useSorter`'s
   * option of the same name, so a future side-by-side comparison of two
   * strategies can mute the challenger rather than have both tick into one
   * engine.
   */
  audio?: boolean;
}

function emptyBuckets(capacity: number): HashBucket[] {
  return Array.from({ length: capacity }, () => ({ entries: [], state: 'empty' as const }));
}

/**
 * useHashTable — hashing's binding between step snapshots and reactive UI state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is what is genuinely hash-specific: the op script the user composes, the
 * table configuration a run is built from, and what a `HashStep` means when
 * painted onto the bucket grid.
 *
 * The op script is this domain's dataset. A hash table with no history shows
 * nothing worth seeing — collisions need neighbours, tombstones need a prior
 * delete, a resize needs enough inserts to earn one — so what the user edits is
 * a *program*, the way the concurrency view's dataset is a schedule.
 */
export function useHashTable(options: UseHashTableOptions = {}) {
  const { audio = true } = options;
  const cues = useAudioCues();

  // ---- User-configurable inputs ---------------------------------------------
  const strategyKey = ref<HashStrategyKey>(DEFAULT_STRATEGY);
  const hashFnKey = ref<HashFnKey>(DEFAULT_HASH_FN);
  /** Requested capacity; the table rounds it up to a power of two. */
  const capacity = ref(8);
  /** Requested load-factor ceiling; the table floors and caps it per strategy. */
  const threshold = ref(0.75);
  const speed = ref(60);
  /** Reproduces a bulk load exactly: same seed + same count = same keys. */
  const seed = ref(randomSeed());
  /**
   * The operation script, in execution order.
   *
   * Deliberately a plain `Ref<HashOp[]>` of the shared `HashOp` type rather than
   * a richer local shape. "Bulk load" and "force a collision" are *authoring*
   * actions — they expand into ordinary inserts the moment they are pressed —
   * so the script never needs to hold anything a URL codec would have to invent
   * an encoding for.
   */
  const script = ref<HashOp[]>([]);

  const startCapacity = computed(() => normalizeCapacity(capacity.value));
  /** The threshold actually enforced — open addressing cannot exceed 0.9. */
  const activeThreshold = computed(() => effectiveThreshold(strategyKey.value, threshold.value));
  const currentAlgo = computed(() => algorithms[strategyKey.value]);

  // Hydrate from the URL BEFORE the first bucket array is built below: the grid
  // on screen is sized from `startCapacity`, so a shared capacity arriving even
  // one line later would leave the view showing a table of the wrong width
  // until something else happened to reset it.
  //
  // Nothing here derives a value from the hydrated ones — the script starts
  // empty and no dataset is generated on mount — so unlike `useSearcher` there
  // is no clobbering to guard against and the returned `hydrated` set is unused.
  useUrlState(hashUrlParams({ strategyKey, hashFnKey, capacity, threshold, speed, seed, script }));

  // ---- Live visualization state ---------------------------------------------
  const buckets = ref<HashBucket[]>(emptyBuckets(startCapacity.value));
  const view = reactive<HashView>({
    capacity: startCapacity.value,
    size: 0,
    loadFactor: 0,
    op: null,
    key: null,
    hash: null,
    homeIndex: null,
    probeIndex: null,
    probeSeq: [],
    phase: 'idle',
    explain: null,
  });

  // `steps` and `elapsedMs` deliberately do NOT live here — they are properties
  // of playback, not of the table.
  const stats = reactive({ probes: 0, collisions: 0, resizes: 0, opsDone: 0 });

  /**
   * `opsDone` is the one number on the panel that no single snapshot carries,
   * and `applyStep` is required to be absolute — it runs on backward scrubs and
   * arbitrary seeks, so a `+= 1` in there would drift the moment anyone touched
   * the history slider.
   *
   * So it is precomputed instead: as each snapshot comes off the generator,
   * `completedAt[i]` records how many operations had finished by step i. That
   * table is a pure function of the generator's output and nothing else — the
   * cursor never touches it — so reading `completedAt[index]` in `applyStep` is
   * as absolute as reading `step.probes`.
   *
   * Plain array, never a ref: nothing renders it, and wrapping thousands of
   * numbers in a reactive proxy would buy nothing.
   */
  let completedAt: number[] = [];

  function* tally(inner: Generator<HashStep, void, undefined>) {
    let completed = 0;
    for (const step of inner) {
      if (OUTCOME_PHASES.has(step.phase)) completed += 1;
      completedAt.push(completed);
      yield step;
    }
  }

  function resetVisual() {
    buckets.value = emptyBuckets(startCapacity.value);
    view.capacity = startCapacity.value;
    view.size = 0;
    view.loadFactor = 0;
    view.op = null;
    view.key = null;
    view.hash = null;
    view.homeIndex = null;
    view.probeIndex = null;
    view.probeSeq = [];
    view.phase = 'idle';
    view.explain = null;
    stats.probes = 0;
    stats.collisions = 0;
    stats.resizes = 0;
    stats.opsDone = 0;
  }

  const player = useStepPlayer<HashStep>({
    speed,
    createGenerator: () => {
      resetVisual();
      completedAt = [];
      // The script is copied, so editing it mid-run cannot rewrite the run that
      // is already playing — the tape would then disagree with the generator.
      const ops = script.value.map((op) => ({ ...op }));
      return tally(
        currentAlgo.value.generator(ops, {
          hashFnKey: hashFnKey.value,
          capacity: capacity.value,
          threshold: threshold.value,
        }),
      );
    },
    // Every field is copied straight off the snapshot rather than accumulated,
    // so showing step N produces the same table however the cursor got there.
    applyStep: (step, index) => {
      buckets.value = step.buckets;
      view.capacity = step.capacity;
      view.size = step.size;
      view.loadFactor = step.loadFactor;
      view.op = step.op;
      view.key = step.key;
      view.hash = step.hash;
      view.homeIndex = step.homeIndex;
      view.probeIndex = step.probeIndex;
      view.probeSeq = step.probeSeq;
      view.phase = step.phase;
      view.explain = step.explain;
      stats.probes = step.probes;
      stats.collisions = step.collisions;
      stats.resizes = step.resizes;
      stats.opsDone = completedAt[index] ?? 0;
    },
    clearStep: resetVisual,
    // Passing `undefined` rather than a callback with an internal `if audio`
    // lets the player's `?.` short-circuit at zero per-tick cost.
    onAdvance: audio ? (step) => cues.play(hashCues(step)) : undefined,
  });

  /** Mean probes per completed operation; 0 before anything has finished. */
  const avgProbes = computed(() => (stats.opsDone === 0 ? 0 : stats.probes / stats.opsDone));

  // ---- Script authoring ------------------------------------------------------
  //
  // Every mutator resets playback. Editing the script while a tape exists would
  // leave the scrubber addressing steps produced by a program that no longer
  // exists, which reads as the visualization lying rather than as an edit.

  /** Keys the script already mentions — what the key generators avoid re-offering. */
  function scriptKeys(): Set<string> {
    return new Set(script.value.map((op) => op.key));
  }

  function setScript(ops: readonly HashOp[]) {
    script.value = ops.map((op) => ({ ...op }));
    player.reset();
  }

  function addOp(kind: HashOpKind, key: string) {
    if (key === '') return;
    script.value = [...script.value, { kind, key }];
    player.reset();
  }

  function removeOp(index: number) {
    script.value = script.value.filter((_, i) => i !== index);
    player.reset();
  }

  function clearScript() {
    script.value = [];
    player.reset();
  }

  /** Append `count` seeded random inserts. */
  function bulkLoad(count = BULK_LOAD_COUNT) {
    const keys = randomKeys(createRng(seed.value), count, scriptKeys());
    script.value = [...script.value, ...keys.map((key): HashOp => ({ kind: 'insert', key }))];
    player.reset();
  }

  /**
   * Append inserts for keys that are guaranteed to land in the same bucket.
   *
   * Returns the bucket they collide in, which the caller reports — the whole
   * point is that the collision is announced in advance rather than spotted
   * afterwards. Note it is resolved against the STARTING capacity: a resize
   * later in the script will scatter these keys again, which is itself worth
   * watching.
   */
  function forceCollision(count = COLLISION_COUNT, bucket?: number): number {
    const found = collidingKeys(
      count,
      {
        hashFnKey: hashFnKey.value,
        capacity: capacity.value,
        exclude: scriptKeys(),
      },
      bucket,
    );
    script.value = [...script.value, ...found.keys.map((key): HashOp => ({ kind: 'insert', key }))];
    player.reset();
    return found.bucket;
  }

  function randomizeSeed() {
    seed.value = randomSeed();
  }

  // Any of these four invalidates the recorded run: they change where keys
  // land, not merely how the result looks. Watched here rather than in the view
  // because a view that remembered three of the four would leave the scrubber
  // addressing a run that no longer matches its own controls — and this is
  // exactly the kind of invariant that should not be re-derived per caller.
  watch([strategyKey, hashFnKey, capacity, threshold], () => player.reset());

  // ---- Code panel ------------------------------------------------------------

  /** The pseudocode line responsible for the step on screen; null when untagged. */
  const activeLine = computed(() => player.current.value?.line ?? null);
  const pseudocodeLines = computed(() => hashPseudocode[strategyKey.value]);
  const sourceCode = computed(() => source[strategyKey.value]);

  /**
   * Source lines (0-based) responsible for the step on screen. Derived off the
   * snapshot like `activeLine`, never accumulated, so it stays correct under a
   * backward scrub or an arbitrary seek.
   */
  const activeSourceLines = computed(() => {
    const line = player.current.value?.line;
    if (line === undefined) return [];
    return sourceMap(strategyKey.value).get(line) ?? [];
  });

  return {
    // inputs
    //
    // The shareable state of this view, mirrored into the query as `strategy`,
    // `fn`, `cap`, `thr`, `speed`, `seed` and `ops` — see `hashUrlParams`. The
    // script is spelled out literally (`ops=icat-sdog-dcat`), which is what
    // `HashOpBuilder`'s alphanumeric-key rule makes unambiguous.
    strategyKey,
    hashFnKey,
    capacity,
    threshold,
    speed,
    seed,
    script,
    // derived configuration
    startCapacity,
    activeThreshold,
    currentAlgo,
    // state
    buckets,
    view,
    stats,
    avgProbes,
    // code panel
    activeLine,
    pseudocodeLines,
    sourceCode,
    activeSourceLines,
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
    setScript,
    addOp,
    removeOp,
    clearScript,
    bulkLoad,
    forceCollision,
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
