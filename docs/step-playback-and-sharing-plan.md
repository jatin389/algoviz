# AlgoViz — Step Playback, Reproducibility & Sharing

Implementation plan for six features. Status: approved, not yet started.

## Context

AlgoViz renders algorithms as generators yielding immutable step snapshots, driven one step per timer tick by a composable per category. The architecture is sound, but six gaps limit it as a teaching tool:

1. **The pathfinding grid is mouse-only.** `GridCanvas.vue` binds `@mousedown`/`@mouseenter` and nothing else, with non-focusable `<div>` cells — so walls cannot be drawn on a tablet at all, despite the README promising tablet support, and cannot be edited by keyboard.
2. **Playback is one-way.** Run/pause/reset only. You cannot step back to the moment quicksort chose a bad pivot.
3. **No pseudocode.** Nothing connects the animation to the algorithm's actual control flow.
4. **Runs are not reproducible.** Seven bare `Math.random()` call sites mean "why did it do *that*" is unanswerable.
5. **No shareable state.** Algorithm, size, speed and dataset live only in memory.
6. **No comparison.** Two algorithms cannot be watched on the same input.

Underneath all of this sits the real blocker: **there is no shared player abstraction.** `useSorter`, `useSearcher`, `usePathfinder` and `useGraphTraversal` each contain a verbatim-duplicated `tick`/`finish`/`clearTimer`/`pause`/`delayMs` loop; `useBST`/`useHeap` carry a second duplicated variant. Adding history buffering feature-by-feature would mean writing it four times. So the plan extracts the player first, then builds everything on top of it.

**Outcome:** every animated category gains step-back/scrub, seeded reproducibility and shareable URLs from one implementation; sorting additionally gains a pseudocode panel and a side-by-side race; the pathfinding grid becomes usable by touch and keyboard.

## Decisions taken

| Question | Decision | Rationale |
|---|---|---|
| Buffering | **Lazy — append on tick, never drain ahead** | The generator is being advanced anyway, so the tape costs nothing extra. Eager draining would block on ~10k array copies before frame 1. `skipToEnd()` gives the one thing eager buys, on demand. |
| History storage | **Plain non-reactive `TStep[]` closure var + `bufferedCount` ref** | A `ref([])` tape would deep-proxy ~10k step objects each holding a 100-element array. Only the *displayed* step ever gets proxied. |
| `elapsedMs` | **Accumulated time spent in `running`**, frozen while paused or scrubbing | Replaces the `startTs = Date.now() - stats.elapsedMs` hack. Scrubbing back does not rewind it — elapsed measures the animation, not the algorithm position. |
| Status machine | **Unchanged 4-state `AlgoStatus`** | Scrub back from `done` → `paused`; scrub forward to terminal with generator exhausted → `done`. No new state, so `canEdit` and all four stats panels are untouched. |
| `stats.steps` / `stats.elapsedMs` | **Deleted from every `stats` reactive; sourced from the player** | `stats.steps += 1` inside `applyStep` is the likeliest bug in this plan once scrubbing exists. Deleting the incremental field is the honest fix, not guarding it. |
| BST/Heap | **Do not adopt the player** — they take `useStepDelay` only | Justified in Phase 2. |
| PRNG | **mulberry32** | 8 lines, one uint32 of state, all `Math.imul`/`>>>` so it is bit-identical across engines. |
| URL sync | **One-way hydrate-on-call + one-way debounced `router.replace`** | No `watch(route.query)` reader, so router loops are structurally impossible. Views unmount on tab switch (no `<KeepAlive>`), so every mount rehydrates. |
| Pseudocode registry | **`Partial<Record<SortAlgoKey, Pseudocode>>`** | Makes the 6-algorithm gap explicit in the type; adding one later is a registry entry and zero code changes. |

---

## Phase 0 — Test harness + pure utilities

Zero risk; unblocks everything.

**Dev deps:** `jsdom@^24`, `@vue/test-utils@^2.4`.

**No Vitest config change.** Vitest already loads `vite.config.ts`, which is why the existing 165 tests resolve `@/types` — verified. Component tests opt into jsdom per-file with a `// @vitest-environment jsdom` docblock. Do *not* add a `test` block to `vite.config.ts`: it imports `defineConfig` from `'vite'`, whose type has no `test` key.

**Created — `src/utils/rng.ts`** (no Vue imports; safe for `graphModel.ts` to consume):

```ts
export interface Rng {
  next(): number;                                  // [0, 1)
  int(minInclusive: number, maxInclusive: number): number;
  pick<T>(items: readonly T[]): T | undefined;
}
export function createRng(seed: number): Rng;      // mulberry32; seed coerced to uint32
export function randomSeed(): number;              // the ONLY Math.random left in the app
export function parseSeed(raw: string | null | undefined): number | null;
```

**Created — `src/utils/parseArray.ts`:**

```ts
export interface ParseArrayOptions { min?: number; max?: number; maxLength?: number } // 1 / 999 / 200
export interface ParsedArray { values: number[]; error: string | null }
export function parseArrayInput(raw: string, options?: ParseArrayOptions): ParsedArray; // never throws
```

**Created — `src/utils/urlCodec.ts`** — shared decoders reused by all categories in Phase 5:

```ts
export function decodeInt(raw: string, min: number, max: number): number | undefined; // clamps in range
export function decodeKey<R extends object>(registry: R, raw: string): Extract<keyof R, string> | undefined;
export function encodeCoord(c: Coord): string;                       // "3,7"
export function decodeCoord(raw: string, rows: number, cols: number): Coord | undefined;
export function encodeNumberList(v: readonly number[]): string;
export function decodeNumberList(raw: string, o?: ParseArrayOptions): number[] | undefined;
```

`decodeKey` leans on the literal key unions the registries already preserve via `satisfies`.

**Created — `src/composables/useStepDelay.ts`** — the one `speed → delay` mapping, currently copy-pasted into all six drivers:

```ts
export function useStepDelay(speed: Ref<number>): ComputedRef<number> {
  return computed(() => Math.max(4, Math.round(204 - speed.value * 2)));
}
```

**Tests:** `rng.test.ts` (same seed → bit-identical 1000-draw sequence; `int` never escapes range and hits both endpoints; `parseSeed` rejects `''`/`'abc'`/`Infinity`, normalizes negatives), `parseArray.test.ts` (comma/space/newline/mixed separators, empty, non-numeric token, clamping, length cap, trailing comma), `urlCodec.test.ts` (round-trip every codec; `decodeInt('1e9', 10, 100) === 100`; `decodeKey(algorithms, 'nonsense') === undefined`).

---

## Phase 1 — GridCanvas: Pointer Events + roving tabindex

Independent of every other phase. **Props and emits stay identical**, so `usePathfinder.ts` and `PathfindingView.vue` are untouched.

**Modified — `src/components/pathfinding/GridCanvas.vue`:**

1. Type the mode: `const mode = ref('wall')` currently infers `Ref<string>` → `type GridMode = 'wall' | 'start' | 'end'; const mode = ref<GridMode>('wall')`.
2. **Reuse `AvButton`.** Replace the hand-rolled 3-button `v-for` block (lines 141–162) with `<AvButton variant="toggle" :active="mode === option.value" :disabled="!canEdit">`. The `toggle` variant's class strings already match and it already emits `aria-pressed` — deletes ~15 lines of duplicated Tailwind.
3. **Rows for the a11y tree.** `cells` becomes `ComputedRef<GridCell[][]>`, each row wrapped in `<div role="row" class="contents">`. Tailwind's `contents` (`display: contents`) leaves the CSS grid layout byte-identical while giving `role="grid"` real rows.
4. **Pointer Events.** `@mousedown.prevent`/`@mouseenter` → `@pointerdown.prevent`/`@pointerenter`; the window `mouseup` listener → `pointerup` + `pointercancel`. Critically:

```ts
function onPointerDown(e: PointerEvent, cell: GridCell) {
  // Release implicit pointer capture so `pointerenter` fires on SIBLING cells
  // during a touch drag exactly as it does for mouse. Without this, every move
  // event stays targeted at the originating cell and drag-paint dies.
  (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  activate(cell);
}
```

`activate(cell)` holds the existing mode dispatch and `paintAdding` logic verbatim. Add `touch-none` to the grid container **only when `canEdit`**, so a finger drag paints while editable and the grid stays scroll-transparent while a search runs.

5. **Roving tabindex.** Each cell renders `role="gridcell"`, `:data-key="cell.key"`, `:tabindex="isFocused(cell) ? 0 : -1"`, and an `:aria-label` like `"Row 3, column 5, wall"`. Arrow keys clamp without wrapping; Home/End jump within a row; Space (`.prevent`, so the page does not scroll) and Enter call the same `activate(cell)` as pointerdown. Focus moves via `gridEl.querySelector('[data-key="r,c"]')?.focus()` — one typed line instead of fiddly `:ref` callbacks under a nested `v-for`. Pointer interaction also updates `focused` so tabbing back in resumes where the user last acted.
6. `aria-describedby` on the grid pointing at the existing help paragraph, retitled: *"Drag or press Space to draw walls. Arrow keys move, Enter places. Switch mode to relocate start/end."*

**Test — `src/components/pathfinding/GridCanvas.test.ts`** (jsdom + `@vue/test-utils`): arrows move focus and clamp at all four edges; exactly one cell has `tabindex="0"` at all times; Enter/Space emit `toggle-wall` with the focused coord; in start/end mode they emit `place-start`/`place-end`; `canEdit: false` emits nothing.

*Not tested:* pointer drag-paint. jsdom has no hit-testing or real pointer capture, so the test would assert the mock. Verify by hand on a touch device.

---

## Phase 2 — `useStepPlayer` + refactor of the four run/pause composables

**Behavior-preserving — no new UI ships here.** The app must look and behave identically after this phase; that is the gate for everything downstream.

**Created — `src/composables/useStepPlayer.ts`:**

```ts
/** Safety valve, not a memory budget. Realistic worst case is bubble at n=100
 *  (~10k steps x ~1.3 KB ~= 13 MB); this stops a runaway generator pinning the tab. */
export const MAX_BUFFERED_STEPS = 50_000;
/** One seek() never pumps the generator more than this synchronously. */
const SEEK_PUMP_LIMIT = 2_000;

export interface StepPlayerOptions<TStep extends { done: boolean }> {
  speed: Ref<number>;                                    // owned by caller; views keep v-model:speed
  createGenerator: () => StepGenerator<TStep> | null;    // null refuses to start (e.g. graph w/o start node)
  /** Fan one snapshot onto reactive state.
   *  MUST BE IDEMPOTENT AND ABSOLUTE — called on forward ticks, backward scrubs
   *  and arbitrary seeks. Never `+=` here; derive from `index` or from `step`. */
  applyStep: (step: TStep, index: number) => void;
  clearStep: () => void;                                 // restore pre-run visuals; called by reset() and at cursor -1
  maxSteps?: number;
}

export interface StepPlayer<TStep extends { done: boolean }> {
  status: Readonly<Ref<AlgoStatus>>;
  isRunning: ComputedRef<boolean>; isPaused: ComputedRef<boolean>;
  isDone: ComputedRef<boolean>;    canEdit: ComputedRef<boolean>;
  delayMs: ComputedRef<number>;
  elapsedMs: Readonly<Ref<number>>;
  cursor: Readonly<Ref<number>>;              // index of displayed step; -1 before the first
  stepCount: ComputedRef<number>;             // cursor + 1 — what stats panels label "Steps"
  bufferedCount: Readonly<Ref<number>>;
  fullyBuffered: Readonly<Ref<boolean>>;
  truncated: Readonly<Ref<boolean>>;          // maxSteps aborted the run
  current: ComputedRef<TStep | null>;         // powers the pseudocode line highlight
  canStepBack: ComputedRef<boolean>; canStepForward: ComputedRef<boolean>;
  run(): void; pause(): void; reset(): void;
  stepForward(): void; stepBack(): void; seek(index: number): void; skipToEnd(): void;
}

export function useStepPlayer<TStep extends { done: boolean }>(
  options: StepPlayerOptions<TStep>,
): StepPlayer<TStep>;
```

Internals — the point of the extraction:

```ts
const history: TStep[] = [];    // deliberately NOT reactive — see Risks #2
let generator: StepGenerator<TStep> | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let accumulatedMs = 0;
let runningSince: number | null = null;
```

- `run()` — from `idle`: clear the tape, `cursor = -1`, `generator = createGenerator()` (bail on null), tick. From `paused`: just tick — **no special resume branch**, because elapsed is now an accumulator.
- `tick()` — if `cursor < bufferedCount - 1`, advance over an already-buffered step (this is what makes resume-after-scrub *replay* instead of re-generating). Otherwise pull `generator.next()`, push, advance. Terminal step or exhaustion → `finish()`.
- `seek(i)` — clamps to `[-1, bufferedCount - 1 + SEEK_PUMP_LIMIT]`; pumps only if `i >= bufferedCount`; pauses first if running. Landing on `-1` calls `clearStep()`; landing on the terminal step with the generator exhausted sets `done`, else `paused`.
- `pause()`/`finish()` — `clearTimer()` then fold `Date.now() - runningSince` into `accumulatedMs`.
- `onScopeDispose(clearTimer)` preserves the documented timer-leak fix.

`TStep extends { done: boolean }` is satisfied by all six step interfaces, so no `isTerminal` option is needed.

**Modified — `src/composables/useSorter.ts`** (the reference adaptation the other three copy). Deletes `tick`, `finish`, `clearTimer`, `pause`, `run`'s resume branch, `delayMs`, the four status computeds, `onScopeDispose`, `resetStats`, and the `generator`/`timer`/`startTs` locals — roughly 90 of 200 lines:

```ts
export interface UseSorterOptions {
  /** Second instances (compare mode) must not fight the primary over the query string. */
  syncUrl?: boolean;
}

export function useSorter(options: UseSorterOptions = {}) {
  const seed = ref(randomSeed());                       // Phase 4
  const baseArray = ref<number[]>([]);                  // was a private `let`; exposed for compare mode
  const stats = reactive({ comparisons: 0, swaps: 0 }); // `steps`/`elapsedMs` removed

  const player = useStepPlayer<SortStep>({
    speed,
    createGenerator: () => {
      array.value = [...baseArray.value];
      resetHighlights(); stats.comparisons = 0; stats.swaps = 0;
      return currentAlgo.value.generator([...baseArray.value]);
    },
    applyStep: (step) => {
      array.value = step.array;
      highlights.comparing = step.comparing;
      highlights.swapping = step.swapping;
      highlights.sorted = step.sorted;
      stats.comparisons = step.comparisons;   // absolute, from the snapshot
      stats.swaps = step.swaps;               // absolute, from the snapshot
    },
    clearStep: () => { /* restore baseArray, clear highlights, zero stats */ },
  });

  /** Install a caller-supplied dataset (custom array input, compare-mode mirroring). */
  function setArray(values: number[]): void;

  return { /* inputs + state as today, plus: */
    seed, baseArray, setArray,
    status: player.status, isRunning: player.isRunning, isPaused: player.isPaused,
    isDone: player.isDone, canEdit: player.canEdit,
    delayMs: player.delayMs, elapsedMs: player.elapsedMs, stepCount: player.stepCount,
    cursor: player.cursor, bufferedCount: player.bufferedCount, fullyBuffered: player.fullyBuffered,
    canStepBack: player.canStepBack, canStepForward: player.canStepForward,
    run: player.run, pause: player.pause, reset: player.reset,
    stepForward: player.stepForward, stepBack: player.stepBack,
    seek: player.seek, skipToEnd: player.skipToEnd,
  };
}
```

Deliberately **keep the `applyStep`/`clearStep` callback shape** rather than deriving `array`/`highlights` as computeds off `player.current`. Computeds read more elegantly but would turn `highlights` into a `ComputedRef`, forcing `sorter.highlights.value.comparing` across four views and four chart components.

**`useSearcher.ts`** — same treatment; `createGenerator` also resets `foundIndex`, `applyStep` assigns `step.foundIndex` (already absolute).

**`usePathfinder.ts`** — same; `createGenerator` returns `currentAlgo.value.generator(buildGrid(), {...start}, {...end})`. All its `applyStep` writes are already absolute. Wall/start/end editors keep their `canEdit` double-gate and `reset()` calls.

**`useGraphTraversal.ts`** — same; `createGenerator` returns `null` when `startId === null`, replacing the early-return guard in `run()`. **`stats.steps += 1` is deleted** — the one genuinely incremental `applyStep` in the codebase.

**Views — the `steps`/`elapsedMs` re-source.** `StatsDisplay`/`SearchStats`/`PathfindingStats`/`GraphStats` keep their prop names unchanged (verified: `StatsDisplay` takes `steps`/`elapsedMs` as props); only the source expression moves, two bindings per view:

```
:steps="sorter.stats.steps"          →  :steps="sorter.stepCount.value"
:elapsed-ms="sorter.stats.elapsedMs" →  :elapsed-ms="sorter.elapsedMs.value"
```

in `SortingView.vue`, `SearchView.vue`, `GraphView.vue`; `PathfindingView.vue` has `elapsed-ms` only.

### Why `useBST`/`useHeap` do *not* adopt the player

1. Their driver is **per-operation and fire-and-forget** — `status` cycles `idle→running→done` on every insert, not once per session. There is no "run" for a tape to belong to.
2. **No pause**, so the entire status-machine half is dead weight, and their `canEdit` means something different (`status !== 'running'`, not `idle || done`).
3. **`reset()` means something different** — it destroys the data structure, not "return to this run's start".
4. Neither tracks `elapsedMs`.
5. `seed(count)` drains generators synchronously with no animation, which the player has no concept of.

Adopting it would mean bending `useStepPlayer` with `pausable: false`/`resettable: false` flags — exactly the "one abstraction, two shapes" smell this refactor exists to remove. What they genuinely share is `delayMs`, so **both adopt `useStepDelay(speed)`**, killing the 6-way duplicated formula. `driveGenerator` stays. Seeded RNG (Phase 4) and URL state (Phase 5) still land in both; those are orthogonal.

**Test — `src/composables/useStepPlayer.test.ts`** (node env, `vi.useFakeTimers()` + `vi.setSystemTime()`, every body inside `effectScope().run(...)` so `onScopeDispose` has an owner). Fixture is a counting generator so `next()` calls can be asserted:

- `idle → running → paused → running → done`; `pause()` from `idle`/`done` is a no-op.
- `cursor`/`bufferedCount` grow in lockstep; `stepCount === cursor + 1`.
- **`stepBack()` makes zero additional `next()` calls** — the core of the design.
- Resuming after a scrub-back replays buffered steps with zero new `next()` calls until the cursor catches up.
- `seek(bufferedCount + 50)` pumps exactly 50 additional `next()` calls.
- **Round-trip idempotence:** record `applyStep` payloads forward, `seek(0)`, `seek(last)`, assert an identical payload sequence — the regression net for the `+=` bug class.
- Scrub back from `done` → `paused`; scrub forward to terminal with generator exhausted → `done`.
- `elapsedMs` advances only while running, freezes across a pause, does **not** rewind on `stepBack()`.
- `maxSteps` aborts, sets `truncated`, leaves status `done`.
- `reset()` empties the tape and calls `clearStep()`.

*Not worth testing:* the four per-category `applyStep` bodies in isolation — straight field copies, and the round-trip test covers the only interesting property.

---

## Phase 3 — Scrub UI

**Created — `src/components/PlaybackScrubber.vue`**, composed entirely from existing primitives:

```ts
defineProps<{ cursor: number; bufferedCount: number; fullyBuffered: boolean;
              canStepBack: boolean; canStepForward: boolean; disabled?: boolean }>();
defineEmits<{ seek: [index: number]; 'step-back': []; 'step-forward': []; 'skip-to-end': [] }>();
```

`AvPanel title="History"` shell; an `AvSlider label="Step"` with `:min="0"`, `:max="Math.max(0, bufferedCount - 1)"`, `:model-value="cursor"` and a `suffix` of `` ` / ${bufferedCount - 1}` `` — the suffix trick renders "412 / 7,318" with no new primitive, and the `:model-value` + relay pattern is the one `ControlsPanel` already uses to work around `AvSlider`'s required `defineModel`. Three `AvButton variant="quiet"` in a `grid grid-cols-3 gap-2`: ◀ Step, Step ▶, Skip to end.

**Placement:** left column of each view, directly under the controls panel. Rejected: inlining into each of the four `*Controls.vue`, which would thread 5 props and 4 emits through four files.

**Modified:** `SortingView.vue`, `SearchView.vue`, `PathfindingView.vue`, `GraphView.vue` — one `<PlaybackScrubber>` block each.

**Why the slider max is `bufferedCount - 1`:** `AvSlider` binds `:value` + `@input`, so it emits on every drag frame. If the slider could address unbuffered steps, one flick right would pump ~10k generator steps synchronously in a single frame. Capping to what has actually played is both the safe implementation and the more honest UX; "Skip to end" is the explicit unbounded drain.

---

## Phase 4 — Seeded RNG + custom array input

**Every `Math.random` call site, replaced:**

| Site | Replacement |
|---|---|
| `useSorter.ts:62` | `createRng(seed.value)` built fresh inside `generate()`; `rng.int(1, 99)` |
| `useSearcher.ts:69` | same, inside `generate()` |
| `useSearcher.ts:90` (`pickPresentTarget`) | see note |
| `usePathfinder.ts:131` (`randomizeWalls`) | fresh `createRng(seed.value)` per call → same seed + density + start + end reproduces the maze exactly |
| `useBST.ts:105`, `useHeap.ts:123` (`seed(count)`) | fresh `createRng(seedRef.value)` per call |
| `graphModel.ts:50-51` | signature → `generateGraph(nodeCount = 10, rng: Rng = createRng(randomSeed()))`; the default param keeps `graph.test.ts` compiling unchanged |

**The Rng instance must be constructed fresh inside each function, never held across calls** — otherwise "same seed" would not reproduce on a second `generate()`.

**`pickPresentTarget`/`pickMissingTarget`:** the *initial* target chosen during `generate()` uses the run-scoped seeded rng, so a seed alone reproduces the whole searching configuration. The two quick-pick **buttons** use `createRng(randomSeed())` — genuinely random — because their result is captured in `target`, which is separately URL-encoded. This keeps `randomSeed()` as the app's single documented entropy source.

**Created — `src/components/ui/AvTextField.vue`:**

```ts
defineProps<{ label: string; placeholder?: string; error?: string | null;
              disabled?: boolean; monospace?: boolean }>();
const model = defineModel<string>({ required: true });
```

Justified over more inline `<input>`s: `SearchControls.vue` already hand-rolls one, and this phase adds three more (custom array, seed, target).

**Created — `src/components/DatasetPanel.vue`** (sorting + searching):

```ts
defineProps<{ seed: number; custom: string; error: string | null; canEdit: boolean }>();
defineEmits<{ 'update:seed': [value: number]; 'update:custom': [value: string];
              apply: []; randomize: [] }>();
```

`AvPanel title="Dataset"` with two `AvTextField`s and two `AvButton variant="quiet"`s (Apply, New seed). **Parsing lives in the view** — it calls `parseArrayInput` then `sorter.setArray(values)` — so the component stays a dumb renderer, consistent with every other component in the repo.

**Modified:** `SortingView.vue`, `SearchView.vue` (add the panel to the left column); `SearchControls.vue` (its inline target `<input>` becomes `AvTextField`).

**Test:** determinism added to the existing `src/algorithms/graph/graph.test.ts` — `generateGraph(10, createRng(7))` twice yields identical `edges`; different seeds diverge.

*Not worth testing:* the composables' `generate()` wiring — asserting "does useSorter call rng.int" means asserting a mock. The PRNG determinism tests plus the graph test cover the property that matters.

---

## Phase 5 — URL-encoded state

**Created — `src/composables/useUrlState.ts`:**

```ts
export interface UrlParamSpec<V> {
  ref: Ref<V>;
  encode: (value: V) => string | null;      // null OMITS the param (e.g. value === default)
  decode: (raw: string) => V | undefined;   // undefined rejects, keeping the current value
  debounceMs?: number;
}
export type UrlParamSpecs<T extends Record<string, unknown>> = { [K in keyof T]: UrlParamSpec<T[K]> };

/** Hydrate refs from the hash query once, then write back on change via router.replace.
 *  Call from INSIDE a category composable, BEFORE its initial generate(). */
export function useUrlState<T extends Record<string, unknown>>(specs: UrlParamSpecs<T>): void;
```

- **Hydration** reads `router.currentRoute.value.query` synchronously at call time — *not* `onMounted`, which fires after `generate()`. A `decode` returning `undefined` is silently skipped and the ref keeps its default.
- **Write-back**: one `watch` over all spec refs, `flush: 'post'`. Clones `route.query`, **deletes** every owned key, assigns only non-null `encode` results — so foreign keys survive. Calls `router.replace({ query })` only when the serialization actually differs.
- **Debounce**: a single coalescing trailing timer at `max(debounceMs)` across dirty params, cleared by `onScopeDispose`.
- **Never assign `undefined`** into the query object; some vue-router versions render a bare `?key`.

**Per-category param sets:**

| Composable | Keys |
|---|---|
| `useSorter` | `algo`, `size`, `speed`, `seed`, `data` (custom array; wins over `seed`+`size` on read) |
| `useSearcher` | `algo`, `size`, `speed`, `seed`, `target` |
| `usePathfinder` | `algo`, `speed`, `seed`, `density`, `start`, `end` |
| `useGraphTraversal` | `algo`, `speed`, `seed`, `nodes`, `start` |
| `useBST` / `useHeap` | `speed` (+ `mode` for heap) |
| `SortingView` (compare) | `cmp`, `algo2` — owned by the view, since sorter B runs `syncUrl: false` |

`speed` and `size` get `debounceMs: 250`; everything else 0.

**Hand-drawn pathfinding walls are explicitly out of scope for URL encoding.** A 375-cell bitmask needs base64+RLE and a versioned format. Instead `randomizeWalls` is fully deterministic given `seed` + `density` + `start` + `end`, all of which *are* encoded, so a randomized maze reproduces exactly. Document that hand-painted walls do not survive a share link.

**Malformed input — never throw, never redirect, always self-heal:** `algo=nonsense` ignored; `size=abc` ignored; `size=1e9` **clamped** to 100 (numeric decoders clamp rather than reject — more forgiving for a shared link); `seed=-1` normalized via `>>> 0`; `data=1,2,x` ignored in favor of the seeded array. Because write-back runs on the first change after hydration, a mangled link repairs itself on first interaction.

**Hash history + `/algoviz/` base:** final shape is `https://<user>.github.io/algoviz/#/sorting?algo=quick&size=60&speed=80&seed=1839274611`. The base lives entirely before the `#`, so nothing base-specific is needed — `route.query` parses inside the hash and `router.replace({ query })` writes back there, with no `404.html` fallback step in `deploy.yml`. One gotcha: a future "copy link" button must use `window.location.href`, never a path assembled from `import.meta.env.BASE_URL`.

**Test — `src/composables/urlParams.test.ts`.** Extract each category's spec map into a pure exported factory (e.g. `sorterUrlParams(refs)`) so codecs are testable without a router: `decode(encode(v)) === v` for every valid value; `decode` returns `undefined` for each malformed form; defaults encode to `null`; the merge preserves foreign keys and deletes owned keys whose `encode` returned `null`.

*Not worth testing:* the `router.replace` write-back path — driving a real router plus a debounce timer through jsdom to verify a one-line object merge is a poor effort ratio.

---

## Phase 6 — Pseudocode panel

**`src/types/steps.ts`** — add to `SortStep`:

```ts
/** 0-based index into this algorithm's entry in `algorithms/pseudocode.ts`.
 *  Optional: untagged generators omit it and the panel renders with no highlight. */
line?: number;
```

**`src/algorithms/_utils.ts`** — `snap()` and `done()` each gain a **trailing optional** `line?: number`, so all 10 existing generators compile untouched and the 6 untagged ones keep working:

```ts
export const snap = (
  array: readonly number[], comparing: number[], swapping: number[],
  sorted: ReadonlySet<number>, comparisons: number, swaps: number,
  /** 0-based pseudocode line; omit for untagged generators. */
  line?: number,
): SortStep => ({ array: [...array], comparing, swapping, sorted: [...sorted],
                  comparisons, swaps, line, done: false });

export const done = (
  array: readonly number[], comparisons: number, swaps: number, line?: number,
): SortStep => ({ /* …, line, done: true */ });
```

**Created — `src/algorithms/pseudocode.ts`:**

```ts
export type Pseudocode = readonly string[];   // indentation is literal leading spaces

/** Partial by design: the mechanism is generic, the content is not yet written for
 *  every sort. A missing entry renders the panel's empty state.
 *  INVARIANT: every `line` a generator yields must index into its entry here. */
export const pseudocode: Partial<Record<SortAlgoKey, Pseudocode>> = {
  bubble: ['for i = 0 to n - 2', '  for j = 0 to n - 2 - i',
           '    if a[j] > a[j + 1]', '      swap a[j], a[j + 1]', 'done'],
  insertion: [/* … */], quick: [/* … */], merge: [/* … */],
};
```

Co-located with the generators, not under `components/`, because the line numbers must stay in lockstep with the yield sites — one file lets a reviewer check the numbering at once, mirroring the existing `_utils.ts`/`index.ts` pattern.

**Created — `src/components/PseudocodePanel.vue`:**

```ts
defineProps<{ lines: readonly string[];        // empty renders the "not yet available" state
              activeLine?: number | null;      // 0-based; null = no highlight
              title?: string }>();
```

`AvPanel` shell; a `font-mono text-xs whitespace-pre` list with a right-aligned gutter number (`index + 1`), the active row painted with the app's existing `bg-amber-400/20` "comparing" idiom.

**Modified:** `bubbleSort.ts`, `insertionSort.ts`, `quickSort.ts`, `mergeSort.ts` — add the trailing `line` argument at each yield site (3, 3, 4, 3 sites; quick's are inside the `yield*`-delegated `qsort`, merge's inside `msort`). `useSorter.ts` exposes `const activeLine = computed(() => player.current.value?.line ?? null)`. `SortingView.vue` renders the panel in the **left column, below the controls/scrubber** — 340px of narrow text-oriented panels fits pseudocode's measure without competing with the chart for width, and on mobile the single-column stack puts it after the controls, which reads correctly. A third `lg` column was rejected: the app has no `xl` breakpoint anywhere and 3 columns inside `max-w-6xl` would squeeze the chart below usability at 100 bars.

**Test** added to `src/algorithms/algorithms.test.ts`, reusing its existing `runToCompletion` helper: for every key in `pseudocode`, every step of a full run satisfies `step.line === undefined || (step.line >= 0 && step.line < pseudocode[key].length)`. Cheap, and it catches the classic "edited the pseudocode, forgot to renumber the yields" regression — the only failure mode here that is not immediately visible.

*Not worth testing:* `PseudocodePanel` rendering — a class-string mapping; a snapshot test would rot on every Tailwind tweak.

**Also update `README.md`** (lines 40–88): it still describes `.js` filenames and the pre-router architecture, and its step-snapshot block omits `line`. It is the document a reviewer checks the invariant against.

---

## Phase 7 — Side-by-side comparison mode

**`src/components/BarChart.vue`** — two new optional props; single-chart rendering stays byte-identical:

```ts
title?: string;        // default 'Visualization'; compare mode passes the algorithm name
showLegend?: boolean;  // default true; the second chart hides it so the legend appears once
```

The hardcoded `Visualization` heading becomes `{{ title }}`, and the legend `<div>` gets `v-if="showLegend"`.

**`src/components/ControlsPanel.vue`** — add a `compare?: boolean` prop, an `'update:compare': [value: boolean]` emit and a `runBoth: []` emit. One `AvButton variant="toggle"` labelled "Compare two algorithms" above the playback grid; when `compare` is on, Run emits `runBoth`.

**`src/views/SortingView.vue`** — the substance:

```ts
const compare = ref(false);
const sorterA = useSorter();
const sorterB = useSorter({ syncUrl: false });   // must not fight A over `algo`

useUrlState({                                     // the view owns the compare-only params
  cmp:   { ref: compare,         encode: (on) => (on ? '1' : null), decode: (r) => r === '1' },
  algo2: { ref: sorterB.algoKey, encode: (k) => k, decode: (r) => decodeKey(algorithms, r) },
});

// One dataset, two players. `baseArray` is exposed by useSorter for exactly this.
watch([() => sorterA.baseArray.value, compare],
      () => { if (compare.value) sorterB.setArray([...sorterA.baseArray.value]); },
      { immediate: true });
watch(sorterA.speed, (v) => { sorterB.speed.value = v; }, { immediate: true });
watch(compare, (on) => { if (!on) sorterB.reset(); });

function runBoth() { sorterA.run(); sorterB.run(); }
```

Right column when `compare` is on: a `grid gap-4 lg:grid-cols-2` holding two `StatsDisplay` and two `BarChart`s (B with `:show-legend="false"`, both with `:title="…currentAlgo.value.name"`). Left column gains a second `AvAlgorithmSelector` bound to `sorterB.algoKey` with `title="Compare against"`, rendered `v-if="compare"` — full reuse, zero new components.

The two players tick independently at the same `delayMs`, so they do **not** stay in step-for-step lockstep — different algorithms emit different step counts for the same array. That is correct, and it is the point of the feature.

*Not worth testing:* the compare wiring — three watchers and a template branch; a component test would assert Vue's own reactivity.

---

## Risks and gotchas

1. **Non-idempotent `applyStep` — the highest-probability bug in this plan.** Any `+=` inside `applyStep` silently corrupts the moment a user scrubs backwards; `useGraphTraversal` has `stats.steps += 1` today. *Mitigation:* delete `steps`/`elapsedMs` from every `stats` reactive and source them from the player (not "guard" them); document the requirement on `StepPlayerOptions.applyStep`; the round-trip test is the regression net.
2. **Step-array aliasing into the reactive graph.** `snap()` copies the array so buffered steps never mutate, but `applyStep` does `array.value = step.array`, putting the *same object* in both tape and `ref` — and reading it from a template wraps it in a proxy. *Mitigation:* keep `history` a plain non-reactive closure array (never `ref`/`reactive`/`shallowRef`), so only the displayed step's array is ever proxied. Do **not** "fix" this by copying in `applyStep` — that doubles allocation churn per frame for nothing.
3. **Memory.** Worst realistic case is bubble/insertion at n=100 fully reversed: ~9.9k steps × (100-element array + a ~50-element `sorted`) ≈ 13 MB; compare mode doubles it. Acceptable, but mitigate with `MAX_BUFFERED_STEPS`, `history.length = 0` in both `reset()` and `generate()`, and a comment stating the measured number so a future n=1000 slider change does not sneak past.
4. **Synchronous seek storms** — see Phase 3. Slider max is `bufferedCount - 1`; `seek()` enforces `SEEK_PUMP_LIMIT`; unbounded draining only via "Skip to end".
5. **`onScopeDispose` outside a component** warns in Vue. Every `useStepPlayer` test body must be wrapped in `effectScope().run(...)`.
6. **`router.replace` with `undefined` query values** renders `?key` on some vue-router versions. Build the merged query by omission.
7. **Pending debounce timer after unmount** can clobber the next view's freshly-hydrated query — same class of bug as the documented timer leak, in a new place. `onScopeDispose` must clear it.
8. **Hydration ordering.** `useUrlState` must be called inside the category composable *before* its trailing `generate()`, or the seed arrives after the first dataset is built and a shared link produces the wrong array. Corollary: with `data=` present, hydration calls `setArray(parsed)` *instead of* `generate()`.
9. **`touch-none` blocks page scroll over the grid.** Deliberate, gated on `canEdit`; worth a line in the help text.
10. **Implicit pointer capture.** Without `releasePointerCapture`, touch drag-paint silently does nothing past the first cell. The one Phase 1 detail no test will catch.
11. **`display: contents`** on the `role="row"` wrappers is required to keep the flat CSS grid intact; Safari <15.4 had a11y-tree bugs with it. Acceptable here, and it is why rows are `contents` rather than a nested grid.
12. **`exactOptionalPropertyTypes` is off**, so `{ line: undefined }` is assignable to `line?: number`. If it is ever enabled, `snap()`/`done()` must switch to conditional spreading. Noted, not pre-handled.
13. **`noUnusedParameters` is on** — `applyStep: (step, _index) => …` must use the underscore (tsc and ESLint's `argsIgnorePattern: '^_'` both accept it).
14. **Two `useSorter` instances both writing `algo`.** Compare mode's second instance must be `syncUrl: false`, or the write-back watchers fight over the query string.
15. **CI gate ordering.** `deploy.yml` runs `lint:check` → `type-check` → `test` → `build`, and `vue-tsc` type-checks test files (they are inside `tsconfig.app.json`'s `include`). A `@vue/test-utils` type error fails the deploy even though Vitest would transpile past it — so add the dev deps in Phase 0, where it surfaces immediately.

---

## Dependency graph

```
Phase 0  utils + test deps ──┬─→ Phase 2  useStepPlayer ──┬─→ Phase 3  scrub UI
                             │                            └─→ Phase 6  pseudocode (needs player.current)
                             ├─→ Phase 4  seeded RNG ─────┬─→ Phase 5  URL state (needs seed + codecs)
                             │                            └─→ Phase 7  compare (needs setArray + shared seed)
                             └─→ Phase 1  GridCanvas  (independent — ships anytime after 0)
```

Phase 2 is the only phase with no user-visible change; verifying the app behaves identically after it is the gate for everything downstream.

---

## Verification

**Per phase — must stay green throughout:**

```bash
npm run lint:check && npm run type-check && npm run test
```

The existing 165 tests must keep passing at every phase boundary; Phase 2 in particular must not change a single existing assertion.

**Manual, via the dev server:**

- **Phase 1** — resize to a mobile viewport and drag across the grid to confirm touch painting; tab into the grid and drive it with arrows + Space; confirm exactly one cell is tabbable; confirm the page still scrolls while a search is running.
- **Phase 2** — run all six categories and confirm behavior is visually identical to `main`: run, pause mid-flight, resume, reset, switch algorithms while done. Watch the Steps and Elapsed cells specifically, since their source moved.
- **Phase 3** — run bubble at n=100 to ~50%, pause, scrub back to 0 and forward again, confirm the bars and the Comparisons/Swaps cells track the tape exactly and never drift. Resume from a scrubbed-back position and confirm playback continues rather than restarting.
- **Phase 4** — note the seed, hit New seed, type the original back, Generate, confirm a bit-identical array. Same for a randomized maze in pathfinding. Paste a malformed custom array and confirm an inline error rather than a crash.
- **Phase 5** — configure a run, copy the URL, open it in a fresh tab, confirm the identical dataset. Then hand-mangle each param (`algo=nonsense`, `size=1e9`, `seed=-1`, `data=1,2,x`) and confirm the app self-heals. Confirm no navigation-loop warnings in the console while dragging the speed slider.
- **Phase 6** — step through bubble one step at a time and confirm the highlighted line matches what the bars are doing at every step; switch to an untagged sort and confirm the panel renders its empty state cleanly.
- **Phase 7** — enable compare, race quick vs bubble, confirm both charts start from an identical array, that only one legend renders, and that disabling compare resets sorter B. Confirm `algo2`/`cmp` round-trip through the URL while `algo` is not double-written.

**Final gate:** `npm run build` succeeds, and `npm run preview` serves a working app under the `/algoviz/` base with the hash router intact.
