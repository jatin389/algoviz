---
id: 0017
title: Dataset presets
status: ready
priority: P1
effort: S
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Nearly-sorted, reverse-sorted, few-unique-values, real-world-ish presets — shows *why* insertion sort shines on nearly-sorted data instead of just asserting it in a complexity card.

## Refinement
**Goal:** A preset picker in `DatasetPanel.vue` generating arrays with specific structural properties, on top of the existing seeded RNG.
**Zone:** A — Extend the map
**Effort:** S
**Priority rationale:** Cheap, and meaningfully improves the core sorting teaching story with minimal new code.
**Open questions:** Exact preset list and generation rules not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
