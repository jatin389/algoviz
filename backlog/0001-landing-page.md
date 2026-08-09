---
id: 0001
title: Landing page
status: ready
priority: P0
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Right now the router redirects straight into `/sorting` — there's no front door. Add a `/` landing view: a category grid (cards linking to each visualizer with a one-line pitch + complexity badge), a short "how this works" blurb, and a "continue where you left off" pick sourced from localStorage.

## Refinement
**Goal:** Fix the "this is just one page" first impression with minimal new architecture — a new route + view, no changes to existing categories.
**Zone:** A — Extend the map
**Effort:** S
**Priority rationale:** Cheapest, highest-visibility fix; also the literal complaint that kicked off this whole research pass.
**Open questions:** Acceptance criteria and exact card content not yet defined — scope in a dedicated pass before starting.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
