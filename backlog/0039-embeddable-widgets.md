---
id: 0039
title: Embeddable widgets
status: in-progress
priority: P0
effort: S
zone: D
cluster: alternate-shell
created: 2026-08-09
refined_at: 2026-08-14
---

## Idea
An iframe-able `/embed/sorting?algo=quick&seed=…` route. The existing URL state and hash router already do the hard part. Every blog post or lecture deck that embeds one becomes a discovery channel/backlink rather than a one-time visit.

## Refinement
**Goal:** A minimal-chrome route variant (no nav/header) suitable for iframe embedding, reusing existing `useUrlState` hydration.
**Zone:** D — Instruments
**Effort:** S
**Priority rationale:** Recommended route step 1, paired with the sandbox — cheap given existing URL-state infrastructure, and a genuine growth/discovery lever.
**Scope:** 9 of 11 categories — sorting, searching, dp, pathfinding, graph, mst, hashing, concurrency, sandbox. BST and Heap are excluded: they are the only two categories that never call `useUrlState`, so an embed of them would accept `?seed=` and silently ignore it.
**Param contract:** pass-through, no aliasing. Hashing keeps `strategy`+`fn` and concurrency keeps `scenario` rather than being mapped onto a synthetic `?algo=` — a translation layer would be a second place for the param names to drift.
**Acceptance criteria:**
- `#/embed/<category>` renders the category's ordinary view with no header, tab bar or footer, and hydrates from the same query params the category already uses in the main app.
- The embed is fully interactive: every playback and editing control behaves as it does in the full app.
- A "Powered by AlgoViz" corner link opens the full app in a new tab at the equivalent non-embed route, carrying the reader's current query minus `brand`. `?brand=0` suppresses it.
- `?theme=light|dark` overrides the app-wide dark default; anything else is ignored rather than fatal.
- A non-embeddable category (`bst`, `heap`) and an unknown one both redirect to the front door instead of framing a broken widget — they match the embed route rather than the catch-all, since the embed record is declared first.
- The embed route never reaches the tab bar or the landing grid (it lives in `routes`, never `navRoutes`).
- No regression in the 885 pre-existing tests.
**Open questions:** Closed — scope and param contract decided 2026-08-14, see Notes.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-14: Scoped with user. Codebase research confirmed the item's premise: `useUrlState` reads `router.currentRoute.value.query` and is route-path-agnostic, so it works unchanged under a new route, and hash history means embed deep links cannot 404 on GitHub Pages. Research also found no view renders a page-level heading — chrome lives entirely in `App.vue`, so views drop into a bare shell with nothing to strip. Two findings shaped scope: BST and Heap have no URL state at all (user chose to exclude rather than ship routes whose params do nothing), and param names are not uniform across categories (user chose pass-through over an aliasing layer).
- 2026-08-14: Implemented. Three notes for anyone reading the diff. (1) URL write-back is deliberately left **on** in embed mode — inside an iframe `router.replace` rewrites the frame's own hash, invisible to the host page, and keeping it on is what lets the attribution link carry the reader's current state rather than the author's original; the alternative would have meant adding a `syncUrl` opt-out to eight composables. (2) The chrome gate is a `meta.embed` flag read through a `useIsEmbed()` composable rather than an embed-only special case, so presenter mode (0028, same cluster) can reuse the same bare shell by setting one flag. (3) The sandbox's "came from a shared link" banner needed no change — it keys off `fromSharedLink`, which is `hydrated.has('src')` and therefore already true for any embed carrying code.
- 2026-08-14: Two defects found only by actually framing two embeds in a browser, both invisible to the mount tests as originally written. (1) **Theme leaked across embeds.** `?theme=light` was persisted to `localStorage`, which is per-origin, so a second embed on the same page read it at module init and silently inherited the first one's theme — and the write also overwrote the reader's own preference in the full app. `setDark` now takes `{ persist: false }`, which embeds use; regression test added. (2) **The visualization landed below the fold.** Every view stacks below `lg` (1024px) with the control column first in the DOM, which is fine in the app where you scroll, but a typical post is narrower than that and an iframe's height is fixed — so the reader got a panel of sliders and no algorithm. The embed shell now reverses the stacked order, one scoped rule keyed off the shape all nine views share rather than nine template edits.
- 2026-08-14: Follow-ups deferred, not forgotten. Retrofitting URL state to `useBST`/`useHeap` (both already have a seeded RNG and a `seed(count)` loader, so it is cheap) would unblock their embed routes. `concurrencyUrlParams` and `sandboxUrlParams` still have no codec test coverage — a pre-existing gap that embedding makes more visible. Neither blocks this item.
