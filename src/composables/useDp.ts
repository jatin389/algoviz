import { computed, reactive, ref, watch } from 'vue';
import { algorithms, DP_MAX_STEPS, bindSpec, validateInput } from '@/algorithms/dp';
import type {
  DpAlgoKey,
  DpCell,
  DpDep,
  DpInput,
  DpInputKind,
  DpTableData,
} from '@/algorithms/dp';
import { dpCues } from '@/algorithms/dp/dpCues';
import { pseudocode } from '@/algorithms/dp/pseudocode';
import { source, sourceMap } from '@/algorithms/dp/source';
import { NO_CUES } from '@/audio/cues';
import type { DpStep } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import type { Rng } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useAudioCues } from './useAudioCues';

/**
 * The scalar half of a `DpStep` — everything except the table itself, which is
 * big enough to deserve its own ref (the same split `useHashTable` makes for
 * its bucket array). Declared explicitly because the all-null initializers
 * below would otherwise infer as plain `null`.
 *
 * NAMING. `view.cursor` is a *cell* and the player's `cursor` is a *step
 * index*. Both keep the name their own file gave them: this one mirrors
 * `DpStep.cursor` field for field so `applyStep` reads as a straight copy, and
 * the other mirrors `StepPlayer.cursor`, which every view already binds to
 * `PlaybackScrubber`. Renaming either would break one of those two mirrors,
 * and a mirror that has to be mentally translated is worth less than a name
 * collision that is namespaced away by the `view.` prefix.
 */
interface DpView {
  cursor: DpCell | null;
  deps: DpDep[];
  chosen: DpCell | null;
  path: DpCell[];
  explain: string | null;
  result: string | null;
  cellsFilled: number;
}

export interface UseDpOptions {
  /**
   * Whether this instance drives the shared audio engine. Mirrors `useSorter`'s
   * option of the same name, and exists for the same reason: two instances
   * ticking into one engine make a muddle, not a duet.
   */
  audio?: boolean;
}

/** The registry entry a fresh view opens on: the smallest honest example. */
const DEFAULT_ALGO: DpAlgoKey = 'fib';

/**
 * A canonical string for one input, used by `DpInputPanel` to decide whether an
 * incoming `input` prop actually says something its text fields do not already
 * say (see the draft-resync note there).
 *
 * It lives here rather than in the panel because it is also the shape the URL
 * codec wants — see the `TODO(url)` on the return value — and having the two
 * drift apart would mean a link that reproduces an input the panel then
 * immediately rewrites.
 */
export function dpInputSignature(input: DpInput): string {
  switch (input.kind) {
    case 'scalar':
      return `scalar:${input.n}`;
    case 'coins':
      return `coins:${input.coins.join(',')}:${input.amount}`;
    case 'sequence':
      return `sequence:${input.values.join(',')}`;
    case 'items':
      return `items:${input.items.map((it) => `${it.weight}/${it.value}`).join(',')}:${input.capacity}`;
    case 'strings2':
      return `strings2:${input.a}:${input.b}`;
    case 'chain':
      return `chain:${input.dims.join(',')}`;
  }
}

/**
 * Six letters rather than twenty-six: a random pair of words over a big
 * alphabet almost never shares a character, and an LCS table of all zeros with
 * one lonely diagonal is a table that teaches nothing. A small alphabet
 * produces the interesting mix of matches and mismatches that makes the
 * diagonal-versus-max branch visible.
 */
const WORD_ALPHABET = 'ABCDEF';

function randomWord(rng: Rng, minLength: number, maxLength: number): string {
  const length = rng.int(minLength, maxLength);
  return Array.from({ length }, () => WORD_ALPHABET[rng.int(0, WORD_ALPHABET.length - 1)]).join('');
}

/**
 * A reproducible input for a given input kind.
 *
 * Every range here sits comfortably inside both the shared 900-cell budget and
 * each algorithm's own `validate`, because a "randomize" button that can hand
 * back an input the Run button then refuses is worse than no button at all. The
 * ceilings are deliberately well below the caps rather than at them: the point
 * of the shuffle is a table you can read at a glance, not the largest one the
 * budget allows.
 */
export function randomInput(kind: DpInputKind, rng: Rng): DpInput {
  switch (kind) {
    case 'scalar':
      // Well short of fib's own limit of 40 — past ~25 the row is wider than
      // the panel and the interesting part (how fast the values climb) has
      // already happened.
      return { kind: 'scalar', n: rng.int(10, 22) };

    case 'coins': {
      // Walked upward from 1 with a random gap rather than sampled-and-retried:
      // coin change rejects duplicates, so sampling would need a retry loop
      // with no bound, and this way the coins come out distinct by construction
      // *and* sorted — which is the order the branch arrows read most naturally
      // in, smallest coin first.
      const coins: number[] = [];
      let next = 1;
      for (let i = 0; i < 3; i++) {
        coins.push(next);
        next += rng.int(1, 4);
      }
      return { kind: 'coins', coins, amount: rng.int(9, 18) };
    }

    case 'sequence':
      return {
        kind: 'sequence',
        values: Array.from({ length: rng.int(7, 10) }, () => rng.int(1, 30)),
      };

    case 'items': {
      const count = rng.int(3, 6);
      return {
        kind: 'items',
        items: Array.from({ length: count }, () => ({
          weight: rng.int(1, 7),
          value: rng.int(1, 12),
        })),
        capacity: rng.int(7, 14),
      };
    }

    case 'strings2':
      return { kind: 'strings2', a: randomWord(rng, 5, 7), b: randomWord(rng, 5, 7) };

    case 'chain':
      // Multiples of five so the cost figures stay round enough to read in a
      // 34px cell, and 4..6 dimensions so the triangle is small enough that the
      // diagonal fill order is watchable rather than a blur.
      return { kind: 'chain', dims: Array.from({ length: rng.int(4, 6) }, () => rng.int(1, 8) * 5) };
  }
}

/** An all-`null` table of the given shape: what the view shows before a run. */
function emptyTable(rows: number, cols: number): DpTableData {
  return Array.from({ length: rows }, () => new Array<number | null>(cols).fill(null));
}

/**
 * useDp — dynamic programming's binding between step snapshots and reactive UI
 * state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is what is genuinely DP-specific: which algorithm is selected, the input
 * it runs on, and what a `DpStep` means when painted onto the table.
 *
 * ONE INPUT REF, NOT SIX. The category spans six unrelated input shapes, and
 * the obvious alternative was a `Record<DpInputKind, DpInput>` holding a live
 * draft per kind so that leaving Fibonacci for LCS and coming back restored the
 * `n` you had typed. It lost on two counts: it is a second copy of the state
 * that nothing on screen ever shows (five of the six slots are always
 * invisible), and the URL codec would then have to decide whether a link
 * carries one input or six — for which the only defensible answer is one, which
 * is what this is. Switching *within* a kind still preserves the input, which
 * is the case `types.ts` actually cares about: knapsack and subset-sum share
 * the `items` editor precisely so you can run both over the same item list.
 */
export function useDp(options: UseDpOptions = {}) {
  const { audio = true } = options;
  const cues = useAudioCues();

  // ---- User-configurable inputs ---------------------------------------------
  const algoKey = ref<DpAlgoKey>(DEFAULT_ALGO);
  /** The dataset. Always of the kind the selected algorithm asks for — see below. */
  const input = ref<DpInput>(algorithms[DEFAULT_ALGO].defaults);
  const speed = ref(60); // 1..100, higher = faster
  /** Reproduces a shuffled input exactly: same seed + same algorithm = same dataset. */
  const seed = ref(randomSeed());

  // ---- Live visualization state ---------------------------------------------
  const table = ref<DpTableData>([]);
  const view = reactive<DpView>({
    cursor: null,
    deps: [],
    chosen: null,
    path: [],
    explain: null,
    result: null,
    cellsFilled: 0,
  });
  /** The cell the pointer is over, or null. Set by `DpTable`, read by `hoverDeps`. */
  const hoverCell = ref<DpCell | null>(null);

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  /**
   * The selected spec with the current input already applied.
   *
   * Every derived value below reads this rather than calling `spec.axes(input)`
   * itself, which is the whole reason `bindSpec` exists: a spec and an input of
   * the wrong kind is the one unsound pairing in the category, and binding once
   * means there is exactly one place it could ever be formed.
   */
  const bound = computed(() => bindSpec(currentAlgo.value, input.value));

  const axes = computed(() => bound.value.axes);
  const dims = computed(() => bound.value.dims);
  const recurrence = computed(() => bound.value.recurrence);
  const naiveCalls = computed(() => bound.value.naiveCalls);

  /**
   * Why the current input cannot run, or null.
   *
   * `validateInput` layers the shared cell budget over the algorithm's own
   * rules, so this one string covers both "enter at least one coin" and "that
   * table would be 40 x 40 = 1600 cells". `DpInputPanel` runs the same function
   * before it emits, so an invalid input normally never gets this far — this is
   * the belt to that panel's braces, and the thing `createGenerator` consults
   * before handing anything to a generator.
   */
  const inputError = computed(() => validateInput(currentAlgo.value, input.value));
  const canRun = computed(() => inputError.value === null);

  /**
   * The dependencies of the hovered cell, computed from the *displayed* table.
   *
   * This is the payoff of `DpSpec.depsOf` being pure and taking a table: the
   * arrows drawn during the fill and the arrows drawn on hover come out of one
   * function, so they cannot disagree about where a cell came from. It also
   * means hovering works on a table nobody has run yet — every dependency is
   * then simply `null`-valued, which is the honest answer to "what would this
   * cell read".
   *
   * The shape guard is not paranoia: `depsOf` indexes the table directly, and
   * during the tick where an input has changed but `clearStep` has not yet
   * rebuilt the table, the two genuinely disagree.
   */
  const hoverDeps = computed<DpDep[]>(() => {
    const cell = hoverCell.value;
    if (cell === null) return [];

    const { rows, cols } = dims.value;
    const grid = table.value;
    if (grid.length !== rows || (grid[0]?.length ?? 0) !== cols) return [];
    if (cell.row < 0 || cell.row >= rows || cell.col < 0 || cell.col >= cols) return [];

    return bound.value.depsOf(cell.row, cell.col, grid);
  });

  /** Everything `DpStats` shows. Read off the snapshot, never accumulated. */
  const stats = computed(() => ({
    cellsFilled: view.cellsFilled,
    fillable: dims.value.fillable,
    rows: dims.value.rows,
    cols: dims.value.cols,
    naiveCalls: naiveCalls.value,
    /**
     * How many recursive calls the finished table replaces, per cell it costs.
     *
     * Measured against `fillable` rather than the live `cellsFilled`, which was
     * the first version: that one divides by zero on the first step and then
     * falls from astronomical to its true value as the table fills, which draws
     * the eye to a number that is meaningless until the run ends. This one is a
     * property of the *input* and holds still while the table fills beside it,
     * which is what makes it comparable between two algorithms.
     */
    speedup: dims.value.fillable > 0 ? naiveCalls.value / dims.value.fillable : 0,
  }));

  function resetVisual() {
    // A right-shaped table of nulls rather than `[]`: the grid, its headers and
    // its scroll extent should all be on screen before the first Run, so that
    // pressing Run animates a table the user has already seen the shape of
    // instead of conjuring one.
    table.value = emptyTable(dims.value.rows, dims.value.cols);
    view.cursor = null;
    view.deps = [];
    view.chosen = null;
    view.path = [];
    view.explain = null;
    view.result = null;
    view.cellsFilled = 0;
  }

  const player = useStepPlayer<DpStep>({
    speed,
    createGenerator: () => {
      resetVisual();
      // Refusing here rather than letting a generator loose on a bad input is
      // what `StepPlayer`'s nullable return is for — the run simply never
      // starts, and `inputError` is already on screen explaining why.
      if (!canRun.value) return null;
      return bound.value.generator();
    },

    // Every field is copied straight off the snapshot rather than accumulated,
    // so showing step N produces the same table however the cursor got there —
    // forward tick, backward scrub, or a drag of the history slider. The table
    // is assigned wholesale because the generator already handed us a private
    // copy (see `_utils.ts`'s snapshot contract); mutating cells in place would
    // be both slower to reason about and wrong under a backward scrub.
    applyStep: (step) => {
      table.value = step.table;
      view.cursor = step.cursor;
      view.deps = step.deps;
      view.chosen = step.chosen;
      view.path = step.path;
      view.explain = step.explain;
      view.result = step.result;
      view.cellsFilled = step.cellsFilled;
    },

    clearStep: resetVisual,

    // Passing `undefined` rather than a callback with an internal `if audio`
    // lets the player's `?.` short-circuit at zero per-tick cost. `algoKey` is
    // read at fire time so the resolver always matches whatever is running.
    onAdvance: audio ? (step) => cues.play(dpCues[algoKey.value]?.(step) ?? NO_CUES) : undefined,

    /**
     * The arithmetic, spelled out because `useStepPlayer` asks callers to
     * (see its MAX_BUFFERED_STEPS note, lines 23-30): every step carries a full
     * copy of the table, inputs are capped at `rows x cols <= 900`, and the fill
     * emits one step per fillable cell — so the worst case is ~900 cells copied
     * ~900 times, plus a traceback bounded by `rows + cols` (<= 60 at this cap).
     * That is ~7 MB of payload, the same order as the sorting worst case the
     * default already tolerates.
     *
     * DP_MAX_STEPS (2000) is that worst case plus 2x headroom, and comes from
     * `_utils.ts` so the number sits next to the cell budget it is derived from
     * rather than being restated here where the two could drift apart.
     */
    maxSteps: DP_MAX_STEPS,
  });

  /**
   * Install a new input. Refused mid-run, like every other dataset edit.
   *
   * Resetting is not optional: the tape holds snapshots of a table with the old
   * shape, so a scrub backwards after an edit would paint cells that the new
   * axes have no headers for.
   */
  function setInput(next: DpInput) {
    if (!player.canEdit.value) return;
    input.value = next;
    player.reset();
  }

  /** Build a fresh reproducible input for the selected algorithm's input kind. */
  function randomizeInput() {
    setInput(randomInput(currentAlgo.value.kind, createRng(seed.value)));
  }

  /** Pick a new random seed and shuffle the input from it. */
  function randomizeSeed() {
    seed.value = randomSeed();
    randomizeInput();
  }

  /** Set by `DpTable`'s hover handlers; drives `hoverDeps` and nothing else. */
  function setHoverCell(cell: DpCell | null) {
    hoverCell.value = cell;
  }

  /**
   * Switching algorithms re-seeds the input when — and only when — the new
   * algorithm speaks a different input kind, and always drops the tape.
   *
   * Living here rather than in the view (which is where `SearchView` keeps its
   * equivalent) because it is not cosmetic: the table's *shape* changes with the
   * algorithm, so leaving the previous run's snapshots on the tape would let a
   * scrub repaint a table the current axes cannot label. A view that forgot to
   * wire this up would look fine until someone touched the history slider.
   */
  watch(algoKey, (key) => {
    if (algorithms[key].kind !== input.value.kind) input.value = algorithms[key].defaults;
    player.reset();
  });

  /** The pseudocode line responsible for the step on screen; null when untagged. */
  const activeLine = computed(() => player.current.value?.line ?? null);

  /** Hand-written pseudocode for the running algorithm. Total by construction here. */
  const pseudocodeLines = computed<readonly string[]>(() => pseudocode[algoKey.value]);

  /** The running generator's own file, for the code panel's source mode. */
  const sourceCode = computed(() => source[algoKey.value]);

  /**
   * Source lines (0-based) responsible for the step on screen. One tag can sit
   * on several yields, so this is a list. Derived off the snapshot like
   * `activeLine`, never accumulated, so it stays correct under a backward scrub
   * or an arbitrary seek.
   */
  const activeSourceLines = computed(() => {
    const line = player.current.value?.line;
    if (line === undefined) return [];
    return sourceMap(algoKey.value).get(line) ?? [];
  });

  /** True when this algorithm has cue mappings; drives the UI hint. */
  const hasSoundCues = computed(() => algoKey.value in dpCues);

  // Paint the empty table for the default algorithm so the view has the right
  // grid on mount. No URL hydration here by design — see the note below.
  resetVisual();

  return {
    // ---- inputs ----
    //
    // TODO(url): `algoKey`, `input`, `speed` and `seed` are the shareable
    // surface. Wiring them is a separate workstream, so this composable
    // deliberately does NOT call `useUrlState` or import
    // `composables/urlParams.ts` — two files concurrent work also owns. When it
    // is wired, the three scalars follow the existing `searcherUrlParams` shape
    // exactly (`algo`, `speed`, `seed`, via `decodeKey`/`decodeInt`/
    // `decodeSeed`), and `input` needs a codec of its own, since it is the only
    // ref here that is not a scalar.
    //
    // Suggested encoding: `dpInputSignature` above, which is already exactly
    // this — the literal input, never an index into anything, so a link keeps
    // meaning the same run forever:
    //
    //     in=coins:1,3,4:11        in=strings2:AGGTAB:GXTXAYB
    //     in=items:2/3,3/4,4/5:9   in=chain:40,20,30,10,30
    //
    // `:` `,` and `/` are all legal unescaped in a query value (RFC 3986
    // sub-delims), so the parameter stays readable in a pasted link. Decode by
    // splitting on the leading kind tag, and drop the whole parameter unless
    // (a) the tag is a `DpInputKind`, (b) it matches the selected algorithm's
    // `kind`, and (c) `validateInput` returns null for the result — a
    // half-valid input must never reach a generator, which is the same rule
    // `DpInputPanel` enforces on the typing path.
    algoKey,
    input,
    speed,
    seed,

    // ---- state ----
    currentAlgo,
    axes,
    dims,
    recurrence,
    naiveCalls,
    inputError,
    canRun,
    table,
    view,
    hoverCell,
    hoverDeps,
    stats,
    activeLine,
    pseudocodeLines,
    sourceCode,
    activeSourceLines,
    hasSoundCues,

    // ---- playback ----
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
    truncated: player.truncated,
    current: player.current,
    canStepBack: player.canStepBack,
    canStepForward: player.canStepForward,

    // ---- controls ----
    setInput,
    randomizeInput,
    randomizeSeed,
    setHoverCell,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
