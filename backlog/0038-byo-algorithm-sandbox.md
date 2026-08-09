---
id: 0038
title: Bring-your-own-algorithm sandbox
status: ready
priority: P0
effort: L
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
An in-browser editor (CodeMirror) plus a Web Worker: users write a generator yielding the app's own step-snapshot shape, and it renders through the existing player/view machinery. Converts AlgoViz from a fixed gallery into an actual tool — flagged as the single biggest multiplier of anything researched, since every future visualization becomes something a user can also build themselves.

## Refinement
**Goal:** Platform capability — a sandboxed code editor that runs a user-authored generator against the existing `useStepPlayer` contract, safely (Web Worker isolation).
**Zone:** D — Instruments
**Effort:** L
**Priority rationale:** Recommended route step 1; highest-leverage single investment since it multiplies the value of every other visualization, existing or future.
**Open questions:** Sandboxing/security approach, which snapshot shape(s) it targets first, and acceptance criteria not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
