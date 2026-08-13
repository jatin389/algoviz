---
id: 0030
title: "New domain: Concurrency & interleavings"
status: in-progress
priority: P0
effort: L
zone: C
cluster: interleaving-domains
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Race conditions, mutex/semaphore, producer-consumer, dining philosophers. The killer feature is an interleaving explorer: enumerate schedules from a seed, show which ones violate the invariant, let the user scrub to the exact interleaving that broke it. The seeded RNG makes each bug a shareable URL. Flagged as the strongest idea researched — the thing working engineers genuinely can't picture, with no good existing tool for it.

## Refinement
**Goal:** A new domain where the snapshot is `{ threads: [{pc, locals}], sharedMem, lockOwners }`, built on the same generic step-player engine, with an interleaving-enumeration layer as the differentiator.
**Zone:** C — New territories
**Effort:** L
**Priority rationale:** Recommended route step 2 — same reusable machinery as DB isolation anomalies (0031), most underserved topic found in research, highest audience overlap with working engineers (not just students).
**v1 scenarios:** Racy counter increment (lost-update bug, invariant checked at the end) and a mutex/critical-section violation (mutual-exclusion bug, invariant checked at every step) — both small enough to enumerate every possible interleaving, not just sample some. Producer-consumer, dining philosophers, and semaphore counting are deferred; dining philosophers specifically needs a different (deadlock/liveness) checker, not just a bigger version of the same one.
**Enumeration algorithm:** Hybrid. Compute the interleaving count analytically (multinomial coefficient in log-space); below a threshold, check every interleaving exhaustively; at or above it, fall back to seeded random sampling via the RNG's existing (if previously unused) `pick()` primitive. Both v1 scenarios stay under the threshold, so v1 only exercises the exhaustive path in production. The UI always states which mode ran. See lab for the full search-layer design.
**Acceptance criteria:**
- Picking a scenario (racy counter or mutex violation) and a seed produces a list of candidate interleavings, each labeled as exhaustively checked ("checked all N") or sampled ("sampled N of ~M").
- Selecting a violating candidate plays it back through the existing step-player UI (scrub/seek/speed) with zero changes to `useStepPlayer` itself — the schedule is just a linear generator like any other domain's.
- The exact step where the invariant first breaks is visibly highlighted within a selected schedule, not just which schedule is flagged.
- A shared URL (`scenario`, `seed`, `schedule`) reproduces the exact same interleaving on load — the literal thread-pick sequence is encoded directly, not an index into a results list that could reorder later.
- The mutex-violation scenario demonstrates a genuinely different invariant class from the racy counter (at-every-step mutual exclusion vs. end-state value check), not a cosmetic variant of the same bug.
**Open questions:** Closed — see `backlog/labs/0030-concurrency-interleavings-domain.md` for the full search-layer design, phased build plan, and risk mitigations.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-12: Implemented. The two-layer split held: `useStepPlayer` needed zero changes, exactly as the lab predicted. Three implementation findings written up in the lab's "Implementation revision" section: the mutex scenario breaks in 36 of 70 interleavings (not 60 — the earlier sketch let `acquire` enter unconditionally instead of acting on the stale check, which is the actual TOCTOU mechanism); `useStepPlayer.seek()` cannot start a run, so "jump to the breach" needs a `stepForward()` first; and both invariant timings proved necessary, since the mutex breach has healed by the final step while the counter bug is only visible there.
- 2026-08-12: Brainstormed with user. Codebase research found every existing domain drives exactly one generator through `useStepPlayer` (no multi-actor precedent), but confirmed this doesn't require player surgery — the interleaving search resolves to one linear schedule *before* playback, so `useStepPlayer` needs zero changes. User decided: v1 ships racy-counter + mutex-violation scenarios (both exhaustively checkable), search uses a hybrid exhaustive/sampled approach with the mode always shown in the UI. Full writeup in the lab.
