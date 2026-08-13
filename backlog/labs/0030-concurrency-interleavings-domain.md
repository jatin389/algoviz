---
id: 0030
lab_status: planned
researched_at: 2026-08-12
closes: Acceptance criteria; which concurrency bugs ship first; interleaving-enumeration algorithm
---

## Implementation revision — 2026-08-12

Built as planned; the two-layer split held up exactly as predicted, and
`useStepPlayer` needed zero changes. Three things worth recording.

**The mutex scenario breaks in 36 of 70 interleavings, not 60.** The earlier
figure came from a sketch in which `acquire` unconditionally entered the
critical section. The shipped scenario is faithful to the actual bug: `acquire`
acts on the *stale* observation recorded by `check`, so a thread that saw the
lock busy does not enter. That is the whole time-of-check-to-time-of-use
mechanism, and modelling it correctly changes the count. The hand-authored lab
page was corrected to run the same model, so the explainer and the app now
agree.

**`seek()` cannot start a run, which the "jump to the breach" feature depends
on.** `useStepPlayer.seek()` only pumps an already-built generator; `beginRun()`
is reached exclusively through `run()` and `stepForward()`. Seeking straight
after `reset()` therefore clamps to an empty tape and silently lands back at
-1 — the verdict text was right while the visualisation never moved. Fixed by
stepping once before seeking. Worth knowing for any future caller that wants to
open a run at an arbitrary step.

**Both invariant timings earned their place.** The racy counter is only wrong
once every thread has written, and the mutex breach has *healed* by the final
step — checking it at the end would report a clean run. A single fixed timing
would have made one of the two scenarios undetectable, which is the strongest
argument for having shipped two rather than one.

## Verdict

Two decisions this lab was built to close are settled: v1 ships exactly **two scenarios** — a
racy counter increment (lost-update bug) and a mutex/critical-section violation (mutual-exclusion
bug) — chosen because both stay small enough to enumerate every possible interleaving, not just
sample some of them. And the search itself is a **hybrid**: compute the interleaving count
analytically (cheap), check exhaustively when that count is small, fall back to seeded random
sampling when it isn't, and always tell the user which mode ran ("checked all 20" vs. "sampled
2,000 of ~10^11").

The part that wasn't visible from the idea: **this needs zero changes to `useStepPlayer`
itself.** Every existing domain drives exactly one generator through the player — confirmed, no
domain in this codebase interleaves multiple sequences today — so the natural fear was that
concurrency would need the same kind of player surgery item 0038 needs for its sandbox. It
doesn't. The interleaving *search* is a separate layer that runs entirely before the player is
ever touched; once one candidate schedule is chosen, it's just an ordinary linear sequence of
steps, fed into `useStepPlayer<ConcurrencyStep>` exactly like a sort or a graph traversal. The
new work is the search layer and a new multi-actor view — not the player.

## Constraints

**Every existing domain drives exactly one `Generator` through `useStepPlayer`**
(`useGraphTraversal.ts`, `usePathfinder.ts` each call `createGenerator` once, returning one
algorithm generator; `PathStep`/`GraphStep` hold single `current`/`frontier` fields, not
per-actor arrays). Consequence: "several interleaved step sequences" cannot be threaded through
the player directly — the interleaving has to be resolved into one linear tape *before* playback,
which is exactly what the two-layer split (search, then play) does.

**The seeded RNG already exposes a "choose one of N" primitive, but it's never been used in
production.** `Rng.pick<T>()` exists in `src/utils/rng.ts`'s public API; grepping the whole `src`
tree, it's called only from `rng.test.ts`. Consequence: using it for real (to pick a random valid
interleaving during sampling) is a first-time production use of an existing API, not new
plumbing — lower risk than it sounds.

**`useUrlState` already supports arbitrary multi-field state.** `pathfinderUrlParams` alone
carries 5 independent keys with their own encode/decode. Consequence: adding `scenario` and a
directly-encoded `schedule` (the literal thread-pick sequence, not an index into a results list)
is pure reuse of an existing pattern, not new infrastructure. Encoding the sequence itself,
rather than an index, matters: a results-list index would silently point at a different
interleaving if the search/sort logic changes later, while the literal sequence always
reproduces the same schedule.

**Adding a whole new domain is mechanically cheap.** Confirmed against how BST/Heap were added:
one entry in the `navRoutes` array (`src/router/index.ts`) plus one new view file is the entire
"new domain" surface — no other central registry exists. Consequence: none of the effort in this
item is routing/registration; all of it is the search layer and the new multi-thread view.

**Interleaving counts blow up fast past a small number of threads/instructions.** A racy counter
(2 threads × 3 instructions each) has `C(6,3) = 20` interleavings. Dining philosophers (5
threads) has more possible interleavings than is sane to enumerate. Consequence: this is exactly
why v1 is scoped to two small, exhaustively-checkable scenarios — anything requiring real
sampling-only coverage is deliberately deferred, so v1 never has to defend an incomplete search
result ("found in 1 of 2,000 samples") for its flagship bugs.

## Architecture

```
src/concurrency/
  types.ts                 ConcurrencyStep, ThreadState, Scenario
  scenarios/
    racyCounter.ts         2 threads x [read, increment-local, write]
    mutexViolation.ts      2 threads x [check-lock, acquire, critical-op, release] (non-atomic check+acquire)
  search.ts                 multinomial threshold check, exhaustive enumerator, seeded sampler
  toGenerator.ts             turns a chosen thread-pick sequence into a Generator<ConcurrencyStep>
src/composables/useConcurrency.ts   runs search on scenario+seed, exposes candidates, wraps useStepPlayer for the selected schedule
src/components/concurrency/ThreadLanes.vue   one lane per thread (pc/status) + shared-mem panel + lock-owner panel
src/views/ConcurrencyView.vue        scenario picker, candidate-schedule results list, embeds the standard player UI
```

**Snapshot shape.**
```ts
interface ThreadState {
  id: number;
  pc: number;                              // index into this thread's own instruction list
  status: 'ready' | 'running' | 'blocked' | 'done';
  locals: Record<string, number>;
}
interface ConcurrencyStep {
  threads: ThreadState[];
  sharedMem: Record<string, number>;
  lockOwners: Record<string, number | null>;
  lastAction: { threadId: number; instruction: string } | null;
  violated: boolean;                       // invariant status as of this exact step
  done: boolean;
}
```
`violated` is checked after *every* step, not just at the end — this is what lets the UI jump to
the exact step a schedule first goes wrong, addressing the idea's "scrub to the exact
interleaving that broke it" at both granularities: which schedule (out of the candidates), and
which step within it.

**Search layer.** Given a scenario's per-thread instruction counts, the total interleaving count
is a multinomial coefficient, computed in log-space (sum of log-factorials, so it never overflows
even for scenarios far bigger than v1 ships) purely to compare against a threshold. Below the
threshold: a recursive backtracking enumerator picks, at each step, any not-yet-done thread's
next instruction, producing every valid interleaving; each is executed and checked against the
scenario's `invariant(step)` at every step, and violating schedules are collected. At or above the
threshold: `createRng(seed)` plus the now-real-use `pick()` draws a fixed N (e.g. 2,000) random
valid interleavings instead, same per-schedule checking. Both v1 scenarios fall well under the
threshold by construction, so v1 only ever exercises the exhaustive path in production — the
sampling path exists and is unit-tested, but its first scenario is a future item, not v1.

**Playback.** A chosen schedule is just a thread-id sequence, e.g. `[0,1,0,1,0,1]`. `toGenerator`
replays it as a plain `function*` yielding one `ConcurrencyStep` per instruction — indistinguishable,
from `useStepPlayer`'s point of view, from any built-in algorithm's generator. Zero changes to
`useStepPlayer` itself.

**Two scenarios, two invariant classes.** Racy counter: invariant checked once, at the end
(`sharedMem.counter === 2`) — a lost-update/value bug. Mutex violation: invariant checked at
every step (`threads.filter(t => t.status === 'in-critical-section').length <= 1`) — a
mutual-exclusion/timing bug. Shipping both means v1 proves the mechanism generalizes across
"wrong final value" and "wrong at some point in the middle," not just one.

## Phases

| # | Deliverable | Gate |
|---|---|---|
| 0 | Feasibility spike: multinomial threshold check + exhaustive enumerator as pure functions | Enumerating the racy-counter scenario by hand produces exactly the expected violating-schedule count, cross-checked analytically. Go/no-go on the core algorithm before any UI |
| 1 | Scenario data + invariant checkers for both scenarios, pure/testable | Both scenarios' expected violating/clean schedule counts match hand-computed expectations |
| 2 | Search layer: threshold check, exhaustive path, seeded sampling path | Exhaustive path exercised by both real scenarios; sampling path exercised by unit tests with an artificially lowered threshold, independent of real scenario scale |
| 3 | `toGenerator` + `useConcurrency` wrapping `useStepPlayer<ConcurrencyStep>` | Confirms zero changes needed to `useStepPlayer` itself — existing scrub/seek/speed controls work unmodified on a concurrency schedule |
| 4 | `ThreadLanes.vue` — thread lanes + shared-mem panel + lock-owner panel | The one genuinely new visual component; no existing view to crib from |
| 5 | Candidate-schedule list + scenario picker + URL state (`scenario`, `seed`, `schedule`) | A shared link reproduces the exact same schedule, not just the same scenario/seed |
| 6 | Router entry + mode labeling ("checked all N" vs. "sampled N of ~M") + first-violation-step highlight | Feature-complete for both v1 scenarios |

Phase 0 carries the algorithmic risk; phase 4 carries the UI risk (genuinely new rendering, no
precedent). Phases 1–3 and 5–6 are comparatively mechanical once those two land. No new
dependencies.

## Risks

| Risk | Mitigation |
|---|---|
| Enumeration threshold picked wrong — too high causes main-thread jank on the exhaustive path, too low needlessly downgrades a small scenario to "sampled" | Benchmark both real v1 scenario sizes locally, set the threshold with real headroom (e.g. 10x the larger scenario's exact count), revisit only when a bigger scenario is actually added |
| Sampling can miss a real violation by chance (false negative) once a scenario is pushed through that path | Doesn't bite v1 — both shipped scenarios are exhaustive by design. Explicitly flagged as pre-existing tech debt for whichever future item (producer-consumer, dining philosophers) first needs the sampling path for real |
| "Scrub to the exact interleaving" is ambiguous — picking a schedule vs. stepping within one | Support both: a candidate-schedule list for the former, a highlighted first-violation step (via `violated`) for the latter |
| A shared URL could silently point at a different interleaving if search/sort logic changes later | Encode the literal thread-pick sequence in the URL, not an index into a results list |
| `ThreadLanes.vue` has no existing component to crib from — genuinely new multi-actor rendering | Phase 4 is scoped alone, isolated from the search-layer work, so its risk doesn't block or get tangled with phases 0-3 |

## Out of scope

**Producer-consumer, dining philosophers, semaphore counting** — deferred. Would require the
sampling path to run for real (not just be unit-tested), and dining philosophers specifically
needs a structurally different check: deadlock/liveness ("no thread can proceed"), not a
value/mutual-exclusion check.

**Deadlock detection** — a different kind of invariant entirely from what v1's two scenarios
need; out of scope until a deadlock-capable scenario is in scope.

**Web Worker-ing the search itself** — v1's exhaustive counts are small enough to run
synchronously on the main thread. Revisit only if a future scenario's search becomes slow enough
to matter.

**Partial-order reduction** (skipping interleavings that are equivalent by commutativity) — a
real technique used in real model checkers, but added complexity not justified until scenario
sizes actually require it over plain exhaustive/sampled search.

**Relationship to 0031 (Database internals):** shares the `interleaving-domains` cluster and the
same underlying search-layer pattern (schedule search, then linear playback). This lab's
`search.ts` is written generically enough (scenario = instruction lists + invariant checker) that
0031's isolation-anomaly scenarios should be able to reuse it directly rather than reimplementing
schedule search — worth confirming when 0031 is planned, not assumed here.
