---
id: 0006
title: "New category: Union-Find + Kruskal's MST"
status: ready
priority: P2
effort: M
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Visualize path compression and union-by-rank, then Kruskal's minimum spanning tree, reusing the existing graph model directly.

## Refinement
**Goal:** New category built on top of the existing `GraphModel`/graph components rather than a new rendering primitive.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** Reuses existing graph infrastructure, so cheaper than it looks; decent teaching value (interview-common topic).
**Open questions:** Acceptance criteria and whether Union-Find ships standalone or only as Kruskal's support structure — not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
