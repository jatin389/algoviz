---
id: 0009
title: "New category: AVL / Red-Black Tree"
status: ready
priority: P3
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Rotations after insert, built directly on the existing `useBST` driver pattern rather than a new one.

## Refinement
**Goal:** Extend the existing BST driver with rotation logic rather than building a new animation engine.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** Reuses existing infrastructure, but a denser topic than higher-priority items — someday.
**Open questions:** Acceptance criteria and whether AVL and Red-Black ship together or separately — not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
