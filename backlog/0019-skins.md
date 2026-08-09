---
id: 0019
title: Skins
status: ready
priority: P1
effort: M
zone: B
cluster: output-adapter
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
The same generator renders as book spines, race cars, a hand of cards, or people lining up by height — a picker, zero changes to any algorithm's logic. Exploits the fact that step-snapshot logic (`array`/`comparing`/`swapping`/`sorted`) already knows nothing about `BarChart.vue`.

## Refinement
**Goal:** Extract a renderer interface so `SortingView` can swap `BarChart` for alternate visual renderings of the same `SortStep` snapshot.
**Zone:** B — Off the map
**Effort:** M
**Priority rationale:** Most on-brand idea given how the architecture is already decoupled; high novelty-to-effort ratio.
**Open questions:** Acceptance criteria and which skins ship first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
