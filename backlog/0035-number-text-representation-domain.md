---
id: 0035
title: "New domain: Number & text representation"
status: ready
priority: P1
effort: S
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
IEEE-754 with toggleable bits (the "why is 0.1 + 0.2 !== 0.3" page basically writes its own traffic), two's complement, endianness, UTF-8 byte-level encoding, grapheme clusters vs. code points, base64. Flagged as the cheapest build researched, with disproportionate reach.

## Refinement
**Goal:** A set of small, static (non-generator-driven) interactive widgets rather than the step-player pattern — bit toggles, live-updating derived values.
**Zone:** C — New territories
**Effort:** S
**Priority rationale:** Best cost-to-reach ratio of any domain researched; doesn't need the heavier step-player/interleaving machinery other domains do.
**Open questions:** Acceptance criteria and which representations ship first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
