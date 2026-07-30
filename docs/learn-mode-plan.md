# Learn Mode — guided walkthrough with narration

**Status:** proposed, not started
**Scope:** one algorithm end-to-end (bubble sort), on generic machinery that a second lesson can adopt without touching the engine.

---

## 1. Goal

Today the app answers _"what is the algorithm doing?"_ — colours change, stats tick up. Learn Mode answers _"why is it doing that, and what happens next?"_

A Learn Mode session is a paced, chaptered run of a single algorithm where every step is accompanied by a sentence of plain-English narration, the run pauses at meaningful boundaries, and the learner is occasionally asked to predict the next move before it happens.

Non-goals for this plan: multi-algorithm courses, progress persistence across sessions, user accounts, authored video.

## 2. What already exists (and what it costs us)

| Asset | File | Usable as-is? |
|---|---|---|
| Deterministic step tape with `seek()` | `src/composables/useStepPlayer.ts` | Yes — the backbone |
| `onAdvance` side-effect hook | `useStepPlayer.ts:~` (options) | Partly — fires **forward only** |
| Per-step → pseudocode line tag (`SortStep.line`) | `src/types/steps.ts`, `src/algorithms/pseudocode.ts` | Yes, for sorting |
| Step → cue resolver pattern | `src/algorithms/sortCues.ts` | Yes — narration copies this shape |
| Code highlighting panel | `src/components/CodePanel.vue` | Yes, already domain-agnostic |
| URL state hydration | `src/composables/useUrlState.ts`, `urlParams.ts` | Yes |
| Seeded RNG | `src/utils/rng.ts` | Yes — lessons must be reproducible |

Three gaps that shape the design:

- **`onAdvance` is not enough.** It fires only on forward advance, by design (so audio cues don't re-fire on scrub). Narration must be correct when the learner drags the scrubber backwards, so narration cannot live in `onAdvance` — it must be a **pure function of the current step**, recomputed by a `computed`.
- **Narration often needs the previous step.** "5 and 3 were compared — 5 is larger, so they swap" needs both snapshots. `useStepPlayer` keeps `history` in a closure and does not expose it.
- **Pseudocode covers sorting only, 4 of 10 algorithms.** Search, pathfinding, graph, BST and heap have no line tags. Narration is therefore designed to work *without* `line`, using it only as an optional enrichment.

Also noted for later: `useBST` and `useHeap` do **not** use `useStepPlayer` — they hand-roll their own `driveGenerator`. Learn Mode deliberately does not cover them in this plan (see §9).

## 3. Content model

Three layers, all pure data / pure functions, all unit-testable with no DOM.

### 3.1 Narration — the per-step layer

```ts
// src/learn/types.ts
export type NarrationTone = 'neutral' | 'compare' | 'action' | 'milestone' | 'result';

export interface Narration {
  /** One sentence, present tense, <= ~140 chars. Rendered and optionally spoken. */
  text: string;
  tone: NarrationTone;
  /** Data indices the sentence talks about; the stage can pulse these. */
  emphasis?: readonly number[];
  /** Optional pseudocode line to co-highlight. Falls back to step.line. */
  refLine?: number;
  /** Stable id so the voice layer can avoid re-speaking an unchanged sentence. */
  key: string;
}

export interface NarrationContext<TStep> {
  step: TStep;
  prev: TStep | null;
  index: number;
  total: number | null;   // null while the tape is still being built
}

export type Narrator<TStep> = (ctx: NarrationContext<TStep>) => Narration;
```

`Narrator` must be **pure and total** — same context in, same sentence out, never throws, always returns something. That is what makes scrubbing work and what makes it trivially testable.

### 3.2 Chapters — the structural layer

Chapters are derived by predicate, never by hardcoded index, because step counts vary with input size and seed.

```ts
export interface Chapter<TStep> {
  id: string;
  title: string;          // "Pass 2 — bubbling 8 toward the end"
  summary: string;        // one line shown when the chapter opens
  /** True on the first step that belongs to this chapter. Evaluated in order. */
  startsAt: (ctx: NarrationContext<TStep>) => boolean;
}
```

Resolution is a single forward scan over the tape producing `chapterStarts: number[]`, memoised and invalidated on `reset()`. Clicking a chapter in the rail calls `player.seek(chapterStarts[i])`.

For bubble sort, chapters are dynamic rather than a fixed list: a `chapterizer` function is the more natural fit, since the number of passes depends on the input.

```ts
export type Chapterizer<TStep> = (ctx: NarrationContext<TStep>) => { id: string; title: string; summary: string } | null;
```

Returning non-null means "a new chapter starts here". A lesson supplies **either** a static `chapters[]` or a `chapterize` function; the resolver normalises both to the same `chapterStarts` shape.

### 3.3 Checkpoints — the interaction layer

```ts
export interface Checkpoint<TStep> {
  id: string;
  when: (ctx: NarrationContext<TStep>) => boolean;
  kind: 'pause' | 'predict';
  prompt: string;
  /** kind === 'predict' only */
  options?: readonly { id: string; label: string }[];
  answerId?: string;
  explain?: string;
}
```

`pause` = "stop and let this sink in", `predict` = a two-to-four option multiple choice answered *before* the next step is revealed. Each checkpoint fires at most once per run; resolved ids are tracked in a `Set` cleared by `reset()`.

### 3.4 The lesson

```ts
export interface Lesson<TStep> {
  id: string;                    // 'bubble'
  category: 'sorting';           // widened as other families are added
  algoKey: string;               // key into the algorithm registry
  title: string;
  intro: string;                 // shown before the run starts
  outro: string;                 // shown on completion
  /** Reproducible starting data — a fixed seed and size, not a random one. */
  fixture: { size: number; seed: number };
  /** Playback pace ceiling; Learn Mode is unwatchable at speed 100. */
  pace: { defaultSpeed: number; maxSpeed: number };
  narrate: Narrator<TStep>;
  chapters?: readonly Chapter<TStep>[];
  chapterize?: Chapterizer<TStep>;
  checkpoints?: readonly Checkpoint<TStep>[];
}
```

Registry mirrors `src/algorithms/index.ts`: `src/learn/lessons/index.ts` exports `lessons: Record<string, AnyLesson>` so the route param validates through the existing `decodeKey` codec (which already guards prototype pollution).

## 4. Engine changes

Three small, additive changes to `useStepPlayer`. Each is independently useful and independently testable.

**(a) Expose the previous step.**
```ts
previous: ComputedRef<TStep | null>;   // history[cursor - 1] ?? null
stepAt(index: number): TStep | null;   // read-only tape access, no pumping
```
No behaviour change; `history` stays a non-reactive closure array. `previous` reads `bufferedCount` to stay reactive without proxying snapshots.

**(b) Optional auto-pause predicate.**
```ts
shouldPause?: (step: TStep, index: number) => boolean;
```
Checked inside `tick()` **after** `applyStep`/`onAdvance` and **before** scheduling the next `setTimeout`. On true it sets `status = 'paused'` and does not schedule. This is ~6 lines and avoids the race you get from watching `cursor` externally (the next timeout is already queued by then).

**(c) Nothing else.** Narration, chapters and checkpoints all live outside the player, driven by `current`/`previous`/`cursor`.

## 5. `useLearnMode`

A thin composable that composes an existing category driver rather than replacing it — so bubble sort in Learn Mode is the same `useSorter` the normal view uses, just with a lesson bound to it.

```ts
// src/composables/useLearnMode.ts
export function useLearnMode(lesson: Ref<AnyLesson>, driver: SorterDriver) {
  return {
    // narration
    narration: ComputedRef<Narration | null>,      // pure, correct after scrub
    // structure
    chapters:  ComputedRef<ResolvedChapter[]>,
    activeChapterIndex: ComputedRef<number>,
    seekToChapter(i: number): void,
    // interaction
    activeCheckpoint: Ref<ResolvedCheckpoint | null>,
    answerCheckpoint(optionId: string): void,       // records correct/incorrect, resumes
    dismissCheckpoint(): void,
    // session
    phase: Ref<'intro' | 'running' | 'checkpoint' | 'outro'>,
    progress: ComputedRef<number>,                  // 0..1, for the rail
    score: Ref<{ asked: number; correct: number }>,
    restart(): void,
  };
}
```

Key behaviours:

- `narration` is `computed(() => lesson.value.narrate({ step: driver.current, prev: driver.previous, index: driver.cursor, total }))`. Scrub-safe by construction.
- Checkpoints are wired via the player's new `shouldPause`, so the pause is atomic with the step that triggered it.
- On entering Learn Mode the driver's `size`/`seed` are forced to `lesson.fixture` and its speed clamped to `lesson.pace`. Leaving restores nothing — Learn Mode lives on its own route, so there is no state to restore.
- `restart()` calls `driver.generate()` + clears resolved-checkpoint ids + resets `score`.

## 6. Voice

`src/composables/useNarrationVoice.ts` — a singleton mirroring `useAudioCues.ts` exactly (module-level `enabled`/`rate` refs, `localStorage` persistence, lazily constructed, no-ops when `speechSynthesis` is absent so jsdom tests stay silent).

```ts
speak(n: Narration): void;   // cancels any in-flight utterance if n.key changed
stop(): void;
```

Notes:
- **Off by default.** Autoplaying speech is hostile; the toggle sits next to the existing sound-cue toggle.
- Voice is driven by a `watch` on `narration.key`, not on text, so identical consecutive sentences don't stutter.
- Voice is suppressed while `document.hidden`, matching the audio engine.
- **Independently of voice**, narration is mirrored into an `aria-live="polite"` region so screen readers get it. This is the accessibility path and is always on.
- Voice list/selection is deliberately out of scope — `speechSynthesis.getVoices()` is famously flaky across browsers and adds a settings surface for little gain in v1.

## 7. UI

All new components are dumb (props in, events out), consistent with the house rule that views own the wiring.

| Component | Responsibility |
|---|---|
| `src/components/learn/NarrationPanel.vue` | The sentence, toned styling, voice toggle, live region |
| `src/components/learn/ChapterRail.vue` | Chapter list with active marker + progress; click to seek |
| `src/components/learn/CheckpointCard.vue` | Prompt, options, correct/incorrect reveal, continue |
| `src/components/learn/LessonIntro.vue` | Intro/outro card with start & restart |
| `src/views/LearnView.vue` | Wires `useSorter` + `useLearnMode` + the above |

Layout follows the existing two-column grid (`lg:grid-cols-[minmax(0,340px)_1fr]`): left column gets `ChapterRail` → `ControlsPanel` (speed clamped) → `PlaybackScrubber` → `CodePanel`; right column gets `NarrationPanel` above `StatsDisplay` + `BarChart`, with `CheckpointCard` overlaying the stage when active.

Route: `/learn/:lessonId?` added to `src/router/index.ts`, defaulting to the first registered lesson. URL state via the existing helpers: `?lesson=bubble&step=12&voice=1`, using the `hydrated` Set pattern so a shared `step` isn't clobbered by the initial `generate()`.

## 8. Phasing

Each phase is a shippable commit with tests green.

| # | Deliverable | Files |
|---|---|---|
| 0 | Player seams: `previous`, `stepAt`, `shouldPause` + tests | `useStepPlayer.ts`, `useStepPlayer.test.ts` |
| 1 | Content model + registry, no UI | `src/learn/types.ts`, `src/learn/resolve.ts`, `src/learn/lessons/index.ts` |
| 2 | Bubble sort lesson: narrator, chapterizer, 3 checkpoints, fully unit tested | `src/learn/lessons/bubbleSort.ts`, `bubbleSort.test.ts` |
| 3 | `useLearnMode` + tests (fake timers, `effectScope`) | `src/composables/useLearnMode.ts`, `.test.ts` |
| 4 | UI components + `LearnView` + route | `src/components/learn/*`, `src/views/LearnView.vue`, `router/index.ts` |
| 5 | Voice + live region | `useNarrationVoice.ts`, `NarrationPanel.vue` |
| 6 | URL state, entry point from `SortingView`, README | `urlParams.ts`, `README.md` |
| 7 | Second lesson (insertion sort) — the generality proof | `src/learn/lessons/insertionSort.ts` |

Phase 7 is the real acceptance test of the design: if adding insertion sort requires touching anything outside `src/learn/lessons/`, the abstraction is wrong and should be fixed before merging phases 1–6.

## 9. Deliberately out of scope

- **BST and heap lessons.** They bypass `useStepPlayer` entirely (`useBST.ts`, `useHeap.ts` each hand-roll `driveGenerator`), have no history tape and cannot pause or scrub. Narrating them requires either a second `shouldPause`-style hook in both files or migrating them onto a generalised player — a decision `docs/step-playback-and-sharing-plan.md` already made against. Revisit only if a lesson is actually wanted there.
- **Pathfinding / graph / search lessons.** Mechanically supported by this design (their drivers all use `useStepPlayer`), but each needs its own authored narrator. Additive, no engine work.
- **Extending `pseudocode.ts` to the remaining 6 sort algorithms.** Nice-to-have, orthogonal, tracked separately.

## 10. Testing

Follows house conventions: `vitest`, `effectScope().run()` wrappers, fake timers with `vi.useRealTimers()` in `afterEach`, semantic `data-*` attributes over Tailwind class assertions, instrumented fixtures over mocks.

Specific invariants worth asserting:

- **Narrator totality:** drain the bubble-sort generator over the standard input table (`random`, `sorted`, `reverse`, `duplicates`, `single`, `two`, `empty`) and assert `narrate()` returns a non-empty `text` for every step, never throws, and `emphasis` indices are always in range. This is the analogue of the existing `line`-in-bounds invariant in `algorithms.test.ts`.
- **Scrub correctness:** run forward to step _n_, `seek(0)`, `seek(n)`, assert the narration is byte-identical. Catches any accidental statefulness in a narrator.
- **Checkpoint idempotency:** a checkpoint that fires at step _k_ does not re-fire after `seek(k-1)` then replay.
- **`shouldPause` atomicity:** assert zero further `.next()` calls on the generator after a pause triggers — reusing the existing `makeCounter` fixture style.
- **Chapter monotonicity:** `chapterStarts` is strictly increasing and starts at 0.

## 11. Risks

| Risk | Mitigation |
|---|---|
| Narration reads as robotic per-step spam at 200 steps | Narrator collapses runs: only re-narrate when the *kind* of thing happening changes; chapters carry the arc. Budget a tuning pass with real text. |
| Speed slider makes narration unreadable | Clamp to `lesson.pace.maxSpeed`; Learn Mode defaults to a slow pace. |
| Scope creep into a quiz/LMS product | Checkpoints are capped at ~3 per lesson, score is session-only, nothing persists. |
| Abstraction fits bubble sort only | Phase 7 exists precisely to catch this before the UI ossifies. |
