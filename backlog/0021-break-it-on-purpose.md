---
id: 0021
title: Break it on purpose
status: ready
priority: P2
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Let users inject a bug into a known algorithm — a flipped comparison, a dropped swap, an off-by-one — and watch it fail or blow up to O(n²). Turns the visualizer into a debugging trainer instead of a demonstration reel; pairs naturally with the existing code panel.

## Refinement
**Goal:** A set of pre-defined "mutations" per algorithm the user can toggle on, feeding a mutated generator into the existing step player.
**Zone:** B — Off the map
**Effort:** M
**Priority rationale:** Genuine differentiator versus other DSA visualizers, but requires authoring mutation variants per algorithm.
**Open questions:** Acceptance criteria and which algorithms get mutation sets first — not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
