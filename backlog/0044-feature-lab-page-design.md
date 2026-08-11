---
id: 0044
title: Designed Feature Lab pages
status: inbox
priority:
effort:
zone: D
depends_on:
cluster:
created: 2026-08-11
refined_at:
---

## Idea
The generated Feature Lab pages are "only html doc and looks pale" compared to the
hand-authored artifact that prototyped the concept — which had a real visual identity,
animations and working demos. Raise the generated pages to a designed reference doc:
all 43 pages, no per-feature hand-authoring.

## Refinement
(not yet scoped — needs a priority and effort, see Notes for the scoping decisions already made)

## Notes
- 2026-08-11: Brainstormed after comparing the hand-authored artifact against the generated
  `backlog/lab/0012.html`. Diagnosis, grounded in the renderer:
  - `lib/theme.mjs` has zero `prefers-color-scheme` — light only, inherited from the board.
  - `lib/render-lab.mjs` has zero `addEventListener` — the pages are entirely static.
  - All six lab sections render through one `[key, label]` loop, so **Constraints** — the
    highest-value section — is styled identically to **Out of scope**.
  - `dependsOn`/`unblocks` render as `<ul>` lists even though `derive.mjs` has already
    computed the full graph (leverage, blocked, cluster siblings).
- 2026-08-11: Key framing — the artifact's best parts were *authored*, not rendered. Its
  bubble-sort player was ~200 lines of bespoke JS for one feature; no generator produces that
  from markdown. And 41 of 43 items have no lab at all, so there is nothing to demo on those
  pages. "Make every lab look like the artifact" conflates two different jobs.
- 2026-08-11: Decided target — **designed reference doc**, not hero-led pitch. A lab is a
  working document you consult while deciding what to build; dense and scannable is the right
  register for that. Artifact-style "showcase" output was considered and deferred as a
  separate concern.
- 2026-08-11: Decided scope — four components, chosen because the first three render data that
  *already exists* in every lab and therefore lift all 43 pages with no per-feature work:
  1. **Constraint cards** — render the `fact → consequence` structure both labs already follow.
  2. **Phase tape with gates** — the Gate column is the most decision-relevant field in a lab
     ("don't proceed until this is true") and currently renders as a table cell.
  3. **Dependency graph** — replace the two bulleted lists with the graph `derive.mjs` computes.
  4. **Mechanism flow toggle** — "current path vs proposed path". Noted as the odd one out:
     unlike the other three it needs new authoring per lab, so it will not light up
     automatically and must degrade gracefully when absent.
  Plus a proper dark theme and type scale, which the generated pages lack entirely.
- 2026-08-11: Rough sizing from the brainstorm was ~1 day for the baseline + components.
  Not confirmed as an `effort` value yet.
- 2026-08-11: Related — 0039 (Embeddable widgets) would let lab pages for *shipped* features
  embed the real app instead of reimplementing it. Doesn't help unbuilt features, so it is an
  adjacency worth noting rather than a dependency.
