---
id: 0031
title: "New domain: Database internals"
status: ready
priority: P1
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
B+tree page splits, join-strategy races (nested loop vs. hash vs. merge), WAL and crash recovery, and isolation anomalies as two interleaved transactions you can step — dirty read, non-repeatable read, phantom, write skew. Existing tools in this space are scattered vendor blog widgets and research prototypes, not a coherent app.

## Refinement
**Goal:** A new domain sharing the interleaving-explorer machinery planned for Concurrency (0030), applied to two-transaction isolation anomalies as the flagship feature.
**Zone:** C — New territories
**Effort:** L
**Priority rationale:** Alternate/companion route-step-2 candidate to Concurrency; same reusable machinery, strong working-engineer relevance.
**Open questions:** Acceptance criteria and which anomalies/join strategies ship first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
