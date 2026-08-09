---
id: 0022
title: Adversarial input / complexity cliff
status: ready
priority: P2
effort: M
zone: B
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Let users construct or auto-search the worst-case input for an algorithm and watch the operation counter and timer diverge live against the theoretical Big-O curve — makes the complexity cliff a felt experience, not a static badge.

## Refinement
**Goal:** An "adversarial mode" that either lets users hand-edit an array or runs a small search for inputs maximizing comparisons/swaps, then overlays actual vs. theoretical curves.
**Zone:** B — Off the map
**Effort:** M
**Priority rationale:** Strong teaching payoff on Big-O intuition, but the search/construction logic is nontrivial.
**Open questions:** Acceptance criteria and search strategy for adversarial inputs not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
