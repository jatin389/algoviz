---
id: 0024
title: Time-travel diff
status: ready
priority: P1
effort: S
zone: B
cluster: sequence-diff
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Full step history is already recorded for scrubbing (`useStepPlayer`'s tape). Let a user pick two arbitrary steps and show a diff of exactly what changed between them — "what did these 50 steps actually accomplish."

## Refinement
**Goal:** A diff view reading two indices off the existing non-reactive `history` tape and rendering the delta — no new recording infrastructure needed.
**Zone:** B — Off the map
**Effort:** S
**Priority rationale:** The underlying data already exists (`useStepPlayer.ts`); this is close to presentation-only.
**Open questions:** Acceptance criteria and diff UI (per-category, since snapshot shapes differ) not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
