---
id: 0039
title: Embeddable widgets
status: ready
priority: P0
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
An iframe-able `/embed/sorting?algo=quick&seed=…` route. The existing URL state and hash router already do the hard part. Every blog post or lecture deck that embeds one becomes a discovery channel/backlink rather than a one-time visit.

## Refinement
**Goal:** A minimal-chrome route variant (no nav/header) suitable for iframe embedding, reusing existing `useUrlState` hydration.
**Zone:** D — Instruments
**Effort:** S
**Priority rationale:** Recommended route step 1, paired with the sandbox — cheap given existing URL-state infrastructure, and a genuine growth/discovery lever.
**Open questions:** Acceptance criteria and which categories get embed routes first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
