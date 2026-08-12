---
id: 0001
title: Landing page
status: done
priority: P0
effort: M
zone: A
created: 2026-08-09
refined_at: 2026-08-12
closed: 2026-08-12
---

## Idea
Right now the router redirects straight into `/sorting` — there's no front door. Add a `/` landing view: a category grid (cards linking to each visualizer with a one-line pitch + complexity badge), a short "how this works" blurb, and a "continue where you left off" pick sourced from localStorage.

## Refinement
**Goal:** Fix the "this is just one page" first impression with minimal new architecture — a new route + view, no changes to existing categories.
**Zone:** A — Extend the map
**Effort:** S
**Priority rationale:** Cheapest, highest-visibility fix; also the literal complaint that kicked off this whole research pass.
**Open questions:** ~~Acceptance criteria and exact card content not yet defined~~ — closed in the 2026-08-12 scoping pass below.

### Scoping pass (2026-08-12)

**Effort revised S → M.** The grid and blurb are presentation-only, but "continue
where you left off" needs persistence that does not exist yet (see decision 1),
which is new behaviour rather than a new view.

**Decisions:**
1. **Full scope, including resume.** Nothing in the app records a last-visited
   route today — `localStorage` is used only by `useTheme.ts` and
   `useAudioCues.ts`. A `useLastVisited` composable is new work, modelled on
   `useTheme`'s pattern (module-level ref, `STORAGE_KEY` const, try/catch around
   every `localStorage` call so private mode degrades instead of throwing).
2. **Card content lives in `navRoutes.meta`.** Extends the existing `meta.label`
   with `pitch`. `src/router/index.ts` already states the tab bar is derived from
   this array "rather than duplicating it" — a second content module would
   reintroduce exactly the duplication that comment rules out.
3. **Count badge, not a complexity badge.** The original idea called for a
   complexity badge per card, but `complexity` is defined per *algorithm*
   (`src/algorithms/index.ts` et al.), not per category — bubble sort and merge
   sort sit in the same category with different complexities, so no single value
   is truthful. The badge shows the category's algorithm count instead, derived
   from each registry's `algorithms` record. BST and Heap export no such registry
   (they are operation-driven), so those two cards render without a badge.
4. **`/` becomes a real route**; the catch-all redirects to `/` rather than
   `/sorting`, so an unrecognised URL lands on the front door.

**Acceptance criteria:**
- [ ] Visiting `/` renders the landing view, not a redirect into `/sorting`.
- [ ] A card grid derived from `navRoutes` links to all six categories, each with
      a one-line pitch; the four categories with an `algorithms` registry also
      show an algorithm-count badge.
- [ ] A short "how this works" blurb explains the generator/step-snapshot model.
- [ ] Visiting a category records it; returning to `/` offers a "continue where
      you left off" card. Absent or unreadable storage renders no resume card and
      throws nothing.
- [ ] An unrecognised URL redirects to `/`.
- [ ] Adding a future category to `navRoutes` makes it appear on the landing grid
      with no edit to the landing view.
- [ ] `npm run lint`, `npm run test`, `npm run build` all pass.

**Out of scope:** no changes to any existing category view; no per-algorithm deep
links from cards (category-level only).

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-12: Scoped (acceptance criteria added, effort S→M), built and shipped in
  PR #26, squash-merged to `main` as `c92d7e5`. All seven acceptance criteria met;
  389 tests pass, 9 of them new for `useLastVisited`. Live at the site root.
- 2026-08-12: **Follow-up, not blocking:** the six card pitch lines and the intro
  blurb are first-draft copy. The pitches lead with the verb you perform, which
  reads well for Sorting/Pathfinding but leaves BST and Heap sounding like API
  docs; the blurb argues the generator-trace point, which targets a skeptical
  engineer rather than a first-time learner. Worth a rewrite once the landing
  page's intended audience is settled.
