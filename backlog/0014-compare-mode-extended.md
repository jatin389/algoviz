---
id: 0014
title: Compare mode, extended
status: ready
priority: P2
effort: M
zone: A
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Sorting already races two algorithms side by side; extend the same pattern to pathfinding — two algorithms solving the same maze at once.

## Refinement
**Goal:** Generalize the sorting compare-mode pattern (Phase 7) to `usePathfinder`, running two generators against the same grid.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** Strong visual payoff, and the pattern to replicate already exists and is proven in sorting.
**Open questions:** Acceptance criteria and UI layout for dual-grid comparison not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
