---
id: 0002
title: "New category: Dynamic Programming"
status: done
priority: P2
effort: M
zone: A
created: 2026-08-09
refined_at: 2026-08-13
closed: 2026-08-13
---

## Idea
Knapsack, Longest Common Subsequence, Edit Distance, Coin Change: animate the DP table filling cell by cell, highlighting the recurrence that produced each cell.

## Refinement
**Goal:** A new category following the existing generator/snapshot pattern, where the snapshot is the DP table state at each fill step.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** High teaching value, novel relative to the existing gallery, but a new domain (table rendering, recurrence highlighting) rather than reusing an existing component.
**Open questions:** Acceptance criteria, which 4 algorithms ship first, and table-rendering component design not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-13: Scoped and shipped alongside 0006 and 0008 in one PR. The open question
  ("which 4 algorithms ship first") was answered by shipping eight, chosen to cover six
  distinct input shapes rather than four variations on a grid: Fibonacci, coin change and
  LIS on a single row; knapsack, subset sum, LCS and edit distance on a grid; matrix chain
  filling by diagonal rather than row-major, which is the only one whose fill order is not
  top-to-bottom and is in the set for exactly that reason.
- 2026-08-13: The table-rendering design the refinement flagged as unscoped resolved to SVG
  with geometry from a pure `dpLayout` module, so the provenance arrows are computed from
  arithmetic rather than measured off the DOM — consistent with every other diagram in the
  app. The load-bearing decision is `depsOf`: a pure function per algorithm that the
  generator calls to build its own steps and the table calls again on hover, so a cell
  nobody is filling can still explain itself and the two explanations cannot drift. A test
  sweeps every cell of a completed run to enforce that.
- 2026-08-13: **Follow-up, not blocking:** hover is pointer-only. Cells carry title and
  aria-label text naming the tone in words, so nothing is colour-only, but there is no
  keyboard caret over the table the way `GridCanvas` has one. 900 focusable cells needs its
  own interaction design and test file.
- 2026-08-13: **Follow-up, not blocking:** `DpStep.chosen` is a single cell, which
  under-states matrix chain, whose branch is a split point spanning two cells. The inspector
  rows and the substituted `explain` string name the split explicitly, so nothing is wrong on
  screen, but the field cannot express it.
- 2026-08-13: **Follow-up, not blocking:** the table panel is sized for the largest table the
  input cap allows, so a single-row algorithm (Fibonacci, coin change, LIS) renders one thin
  strip at the top of a very tall, mostly empty panel. Sizing the panel to the table's actual
  aspect ratio would fix it; the SVG viewBox already carries the numbers needed.
