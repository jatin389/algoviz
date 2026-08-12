---
id: 0038
title: Bring-your-own-algorithm sandbox
status: ready
priority: P0
effort: L
zone: D
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
**Isolation:** Web Worker running inside a `sandbox="allow-scripts"` iframe (no `allow-same-origin`) — mandatory, not optional, because sandbox code is shareable via URL from day one and auto-runs in the recipient's browser. GitHub Pages has no server to set COOP/COEP headers, so the sandbox attribute's opaque-origin isolation is the only route available. See lab for the full architecture.
**Target snapshot shape (v1):** `SortStep` only — the one shape with a reusable view (`BarChart`); the other five shapes are out of scope for v1.
**Acceptance criteria:**
- A user can write a `function*` in the editor, targeting `SortStep`, and run it — output renders through the existing `BarChart` view via the same scrub/seek UI as built-in algorithms.
- Execution happens inside a Web Worker hosted in a sandboxed iframe; the app's own DOM/storage/cookies are unreachable from user code.
- A runaway/infinite-looping snippet is caught by a step/time budget and force-terminated without freezing the tab.
- The five existing categories (sort/search/path/graph/BST, minus BST/heap already covered) show zero behavioral regression after the `StepSource` refactor that this feature requires of `useStepPlayer`.
- A sandbox snippet is shareable via URL; opening a shared link auto-runs the code with a visible (non-blocking) "running community-authored code" indicator.
**Open questions:** Closed — see `backlog/labs/0038-byo-algorithm-sandbox.md` for the full sandboxing architecture, phased build plan, and risk mitigations.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-12: Brainstormed with user. Codebase research found `useStepPlayer` drives a local generator synchronously with no isolation seam today, and snapshot shapes are per-category with no runtime discrimination — `SortStep` is the only one with a reusable view. User decided: sandbox code is shareable via URL from day one, and isolation is Web Worker + sandboxed iframe (not Worker-only), since GitHub Pages can't set isolation headers for any lighter-weight route. Full writeup in the lab.
