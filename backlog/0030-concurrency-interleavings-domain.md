---
id: 0030
title: "New domain: Concurrency & interleavings"
status: ready
priority: P0
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
**Open questions:** Acceptance criteria, which concurrency bugs ship first, and interleaving-enumeration algorithm not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
