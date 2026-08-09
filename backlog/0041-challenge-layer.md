---
id: 0041
title: Challenge layer
status: ready
priority: P1
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
LearnGitBranching became the canonical way people learn git through levels with verified goal states, not animation quality — "reach this heap in ≤5 ops," "craft an input making quicksort O(n²)," "fix the sabotaged generator." Deterministic seeds make grading trivial here.

## Refinement
**Goal:** A challenge/level definition format (goal state + verification function) layered on top of existing generators and the seeded RNG.
**Zone:** D — Instruments
**Effort:** M
**Priority rationale:** Recommended route step 3; proven playbook from a comparable successful tool, and deterministic seeding makes grading cheap to implement.
**Open questions:** Acceptance criteria, level-authoring format, and which challenges ship first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
