---
id: 0042
title: Step narration
status: ready
priority: P1
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
A running text log — "compared a[3]=5 and a[4]=3, swapped" — generated from each step snapshot. Gives screen-reader accessibility, a copy-pasteable trace, and searchable step text from one feature. Almost nothing in this space is accessible today, and the app already has the `line`/pseudocode tagging to hang it on.

## Refinement
**Goal:** A per-category "describe this step" function turning a snapshot into a sentence, rendered as a live-updating, screen-reader-friendly log alongside the visualization.
**Zone:** D — Instruments
**Effort:** S
**Priority rationale:** Recommended route step 3; cheap, and closes a real accessibility gap that's a genuine differentiator versus other visualizers in this space.
**Open questions:** Acceptance criteria and narration copy templates per category not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
