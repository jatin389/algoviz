---
id: 0006
title: "New category: Union-Find + Kruskal's MST"
status: done
priority: P2
effort: M
zone: A
created: 2026-08-09
refined_at: 2026-08-13
closed: 2026-08-13
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
- 2026-08-13: Scoped and shipped alongside 0002 and 0008 in one PR. The open question
  ("whether Union-Find ships standalone or only as Kruskal's support structure") was
  answered as both: a standalone disjoint-set mode driven by a user-composed union/find
  script, plus Kruskal and Prim. Prim was added for contrast — comparing its total weight
  against Kruskal's across many seeds is the strongest correctness check available here, and
  is now a test.
- 2026-08-13: Reused the existing graph model as the refinement intended, rather than forking
  a weighted one. `GraphEdge` gained an optional `weight` and `generateGraph` a `weighted`
  option that draws from the same seeded RNG, so one seed still reproduces a graph including
  its weights, and every existing traversal is untouched. `GraphCanvas` was refactored to
  generic tone maps in the same change, which is what let one canvas serve both traversal and
  MST without either category knowing about the other.
- 2026-08-13: Standalone DSU is run-driven rather than operation-driven — a deliberate
  departure from the neighbouring BST/Heap pattern. Composing a script and pressing Run buys
  scrubbing, step-back and a shareable link from `useStepPlayer` for free, none of which the
  BST driver has.
- 2026-08-13: **Follow-up, not blocking:** Borůvka's algorithm would be a natural fourth
  entry — it is the one classic MST algorithm the category now omits, and the disjoint-set
  structure it needs is already here.
