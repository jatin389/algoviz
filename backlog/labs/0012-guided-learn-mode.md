---
id: 0012
lab_status: planned
researched_at: 2026-08-09
closes: Which algorithms get scripts first; the authoring format for scripted stops
---

## Verdict

Guided mode is not "the step player plus tooltips." The load-bearing discovery is that the
obvious integration point — `useStepPlayer`'s `onAdvance` callback — **cannot carry narration**,
because it fires only on forward advance. That is correct for sound cues (which must not
re-fire when the user scrubs backwards) and wrong for narration, which has to be right at
whatever step the learner lands on.

So narration is written as a **pure function of the current step**, not a side effect:
`Narrator(step, prev, index) → sentence`, recomputed by a `computed`. That one decision
answers the item's open question about authoring format — the format is a pure function plus
two small data types, not a script of hardcoded stops — and it makes the whole feature
unit-testable in node with no DOM.

First algorithm is **bubble sort** (already carries pseudocode line tags and sound cues, and
its repeated-pass structure maps cleanly onto chapters). Second is **insertion sort**, whose
only purpose is to prove the abstraction generalises.

## Constraints

**`onAdvance` fires forward-only, by design.** Used today at `useSorter.ts:122` to play sound
cues; the forward-only behaviour is deliberate so cues don't retrigger on scrub. Narration
cannot reuse it. Consequence: narration must be derived, not emitted.

**Narration often needs the previous step** ("5 and 3 were compared — 5 is larger, so they
swap"). `useStepPlayer` keeps `history` in a non-reactive closure array and does not expose it.
Consequence: the player needs a read-only `previous` and `stepAt(i)`.

**Auto-pause cannot be done from outside the player.** Watching `cursor` externally races —
by the time a watcher runs, the next `setTimeout` is already queued. Consequence: pausing must
be checked inside `tick()`, before scheduling, via a `shouldPause` predicate.

**Pseudocode tagging covers sorting only, and only 4 of 10 sort algorithms.** `pseudocode.ts`
has entries for bubble, insertion, quick and merge; search, pathfinding, graph, BST and heap
have no registry at all. Consequence: narration is designed to work *without* `line`, treating
it as optional enrichment. This is the coupling to **0010**.

**`useBST` and `useHeap` bypass `useStepPlayer` entirely.** Each hand-rolls its own
`driveGenerator`; they have no history tape and cannot pause or scrub.
`docs/step-playback-and-sharing-plan.md` already decided against unifying them. Consequence:
those two categories are out of scope here, not merely deprioritised.

## Flows

| Path | Today | With this change |
|---|---|---|
| Narration | step advances → `onAdvance` → **side effect** ╳ correct after scrub | `current` step → `computed` → **pure `Narrator`** → sentence |
| Pausing | `tick()` → `applyStep` → `setTimeout` next step | `tick()` → `applyStep` → **`shouldPause`** → hold before scheduling |
| Voice | — ╳ nothing reads the step aloud | `Narration.key` → `speechSynthesis` + **`aria-live`** |

The narration row is the discovery: `onAdvance` fires forward-only, so anything hung off it is
wrong the moment the learner scrubs back. Deriving instead of emitting is what makes the
sentence correct at any step, and testable with no DOM.

## Architecture

Three pure layers, all testable with no DOM.

**Narration — per step.**
```ts
export type Narrator<TStep> = (ctx: NarrationContext<TStep>) => Narration;
// Narration = { text, tone, emphasis?, refLine?, key }
// NarrationContext = { step, prev, index, total }
```
`Narrator` must be pure and total: same context in, same sentence out, never throws, always
returns something. That is what makes scrubbing correct and testing trivial.

**Chapters — structural.** Derived by predicate, never by hardcoded index, because step counts
vary with input size and seed. A lesson supplies either a static `chapters[]` or a
`chapterize()` function; both normalise to a `chapterStarts: number[]` computed by one forward
scan, memoised and invalidated on `reset()`.

**Checkpoints — interaction.** `{ id, when, kind: 'pause' | 'predict', prompt, options?, answerId?, explain? }`.
Each fires at most once per run; resolved ids live in a `Set` cleared by `reset()`.

**Engine changes** — three small additive seams on `useStepPlayer`, each independently useful:
`previous`, `stepAt(index)`, and `shouldPause?: (step, index) => boolean` checked inside
`tick()` after `applyStep`/`onAdvance` and before the next `setTimeout` (~6 lines).

**`useLearnMode(lesson, driver)`** composes an existing category driver (`useSorter`) rather
than replacing it, exposing `narration`, `chapters`, `activeChapterIndex`, `seekToChapter`,
`activeCheckpoint`, `answerCheckpoint`, `phase`, `progress`, `score`, `restart`.

**Voice** — `useNarrationVoice.ts` mirrors `useAudioCues.ts` exactly: module-level singleton,
`localStorage` persistence, lazily constructed, no-ops when `speechSynthesis` is absent so
jsdom tests stay silent. Off by default. Independently of voice, narration is always mirrored
into an `aria-live="polite"` region — that is the accessibility path.

**Layout** follows the existing two-column grid on a new `/learn/:lessonId?` route, with lesson
content in `src/learn/lessons/` behind a registry mirroring `src/algorithms/index.ts`.

## Phases

| # | Deliverable | Gate |
|---|---|---|
| 0 | `previous`, `stepAt`, `shouldPause` on `useStepPlayer` + tests | Zero further `.next()` calls after a pause triggers |
| 1 | Content model + registry, no UI | Types compile; registry validates through `decodeKey` |
| 2 | Bubble sort lesson: narrator, chapterizer, 3 checkpoints | Narrator totality across the standard input table |
| 3 | `useLearnMode` + tests (fake timers, `effectScope`) | Scrub correctness: forward to n, seek(0), seek(n) → identical narration |
| 4 | UI components + `LearnView` + route | Renders; components stay dumb (props in, events out) |
| 5 | Voice + `aria-live` region | Silent in jsdom; no stutter on repeated sentences |
| 6 | URL state, entry point from `SortingView`, README | `?lesson=bubble&step=12` restores mid-lesson |
| 7 | Second lesson (insertion sort) | **If it touches anything outside `src/learn/lessons/`, the abstraction is wrong — fix before shipping the UI** |

## Risks

| Risk | Mitigation |
|---|---|
| Narration reads as robotic per-step spam at 200 steps | Narrator collapses runs — re-narrate only when the *kind* of event changes; chapters carry the arc. Budget a tuning pass with real text |
| Speed slider outruns readability | Clamp to `lesson.pace.maxSpeed`; Learn Mode defaults to a slow pace regardless of the global slider |
| Scope creep into a quiz/LMS product | Checkpoints capped at ~3 per lesson; score is session-only; nothing persists |
| Abstraction fits bubble sort only | Phase 7 exists precisely to catch this before the UI ossifies |

## Out of scope

**BST and heap lessons** — they bypass `useStepPlayer`, have no history tape, and cannot pause
or scrub. Supporting them needs either a second `shouldPause`-style hook in both files or a
generalised player, a decision already made against.

**Pathfinding / graph / search lessons** — mechanically supported (their drivers all use
`useStepPlayer`), but each needs its own authored narrator. Additive, no engine work.

**Extending `pseudocode.ts` to the remaining 6 sort algorithms** — that is 0010's job, and this
lab is designed not to block on it.

**Voice selection UI** — `speechSynthesis.getVoices()` is flaky across browsers and adds a
settings surface for little gain in v1.
