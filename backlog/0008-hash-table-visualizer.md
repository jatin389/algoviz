---
id: 0008
title: "New category: Hash Table"
status: done
priority: P2
effort: M
zone: A
created: 2026-08-09
refined_at: 2026-08-13
closed: 2026-08-13
---

## Idea
Insertion with collision resolution — chaining vs. open addressing — visualizing bucket state and load factor as it climbs.

## Refinement
**Goal:** New category with a bucket-array snapshot shape; common interview topic, good teaching payoff.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** High relevance for the engineering-student audience specifically named as this project's goal.
**Open questions:** Acceptance criteria and whether both collision strategies ship at once — not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-13: Scoped and shipped alongside 0002 and 0006 in one PR. The open question
  ("whether both collision strategies ship at once") was answered as four: separate chaining
  plus linear probing, quadratic probing and double hashing, all with tombstones and an
  animated resize/rehash rather than an instantaneous one — watching every key find its new
  home is the point of showing a resize at all.
- 2026-08-13: The load factor the idea asked to make visible is charted against the threshold
  that triggers the resize, so the climb has something to climb toward. Four selectable hash
  functions ship, including a deliberately weak one, so collisions can be forced on demand
  rather than waited for; a `collide` helper generates keys targeting a chosen bucket for the
  same reason.
- 2026-08-13: The headline test is behavioural rather than structural: under a randomised
  operation script the table must agree with a JS `Map` after every operation, for all four
  strategies. That single property covers the tombstone bug (a delete truncating a probe
  sequence that ran through the freed slot) and survival across a resize, both of which are
  also pinned directly.
