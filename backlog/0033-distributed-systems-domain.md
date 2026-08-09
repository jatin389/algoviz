---
id: 0033
title: "New domain: Distributed systems"
status: ready
priority: P2
effort: L
zone: C
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Raft leader election and log replication, consistent hashing ring (add a node, watch what rebalances), vector clocks, quorum reads/writes, partition tolerance, plus rate limiters (token bucket, leaky bucket, sliding window) that people implement at work directly.

## Refinement
**Goal:** A new domain, likely the most complex to build given multi-node state; rate limiters are the cheap, high-value entry point within it.
**Zone:** C — New territories
**Effort:** L
**Priority rationale:** Directly job-relevant content, but the hardest domain to visualize well (multi-node coordination) — sequenced behind simpler high-value domains.
**Open questions:** Acceptance criteria; likely starts with rate limiters before Raft/consistent hashing — not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
