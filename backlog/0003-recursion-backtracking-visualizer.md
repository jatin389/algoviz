---
id: 0003
title: "New category: Recursion & Backtracking"
status: ready
priority: P3
effort: M
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
N-Queens, Sudoku solver, subset/permutation generation: render the call tree growing live alongside the board/array state. Pairs naturally with the existing "code panel + yield highlight" feature.

## Refinement
**Goal:** New category visualizing recursive call trees, reusing the CodePanel's line-highlight machinery.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** Strong visual payoff but a new visualization primitive (call tree) not yet in the app — someday item until a domain is picked.
**Open questions:** Acceptance criteria and call-tree rendering approach not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
