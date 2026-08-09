---
id: 0040
title: Empirical complexity lab
status: ready
priority: P1
effort: M
zone: D
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Actually measure runtimes across increasing input sizes in the browser, plot measured performance against the theoretical Big-O curve, and expose constant factors — e.g. why insertion sort wins below n≈20, why real-world sorts are hybrids. Turns Big-O from a badge into evidence.

## Refinement
**Goal:** A batch-run mode that executes each algorithm (headless, no animation) across a range of `n`, records timing/op-count, and charts it against the labeled complexity.
**Zone:** D — Instruments
**Effort:** M
**Priority rationale:** Strong pedagogical payoff and reasonably self-contained — doesn't require the step-player UI, just the raw generators already in place.
**Open questions:** Acceptance criteria and charting approach not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
