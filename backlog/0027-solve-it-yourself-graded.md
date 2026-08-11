---
id: 0027
title: Solve it yourself, then get graded
status: ready
priority: P3
effort: M
zone: B
cluster: sequence-diff
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
For pathfinding: let the user manually click out a path before running BFS/A*, then score their route against optimal and show exactly where they diverged. Turns a passive demo into a game.

## Refinement
**Goal:** A manual-path-entry mode on `GridCanvas.vue` that records clicks, then diffs against the BFS/A* result.
**Zone:** B — Off the map
**Effort:** M
**Priority rationale:** Fun differentiator but scoped to one category only; behind broader-reach items.
**Open questions:** Acceptance criteria and scoring rules not yet defined.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
