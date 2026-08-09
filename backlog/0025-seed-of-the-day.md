---
id: 0025
title: Seed-of-the-day
status: ready
priority: P1
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Derive a deterministic seed from the date (seeding is already the app's whole reproducibility model) so everyone gets the same dataset today — "quicksort took 41 comparisons on today's array, beat that with a different pivot rule."

## Refinement
**Goal:** A date → seed function reusing `utils/rng.ts`'s existing seeded mulberry32, wired into a "today's challenge" entry point.
**Zone:** B — Off the map
**Effort:** S
**Priority rationale:** Cheap given the reproducibility model already exists; strong retention/engagement hook.
**Open questions:** Acceptance criteria and where "today's seed" surfaces in the UI not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
