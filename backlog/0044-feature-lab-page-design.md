---
id: 0044
title: Designed Feature Lab pages
status: ready
priority: P0
effort: M
zone: D
depends_on:
cluster: lab-presentation
created: 2026-08-11
refined_at: 2026-08-11
---

## Idea
The generated Feature Lab pages are "only html doc and looks pale" compared to the
hand-authored artifact that prototyped the concept — which had a real visual identity,
animations and working demos. Raise the generated pages to a designed reference doc:
all 44 pages, no per-feature hand-authoring.

## Refinement
**Goal:** Make `backlog/lab/*.html` read as designed reference documents rather than dumped
markdown, by rendering structure that is already present in the data but currently flattened
into uniform prose.

**Zone:** D — Instruments

**Scope — four changes, all generator-side:**
1. **Dark theme + type scale.** `lib/theme.mjs` has zero `prefers-color-scheme`; both page
   types are light-only. One token set, consumed by board and lab pages alike so they cannot
   drift.
2. **Constraint cards.** Both existing labs write constraints as `fact → consequence`. Render
   that structure instead of paragraphs, and make Constraints visually distinct from the other
   five sections — today all six render through one `[key, label]` loop, so the highest-value
   section looks identical to *Out of scope*.
3. **Phase tape with gates.** The `Gate` column states "don't proceed until this is true" and
   currently renders as a plain table cell. Surface it as the emphasized element.
4. **Dependency graph.** `lib/derive.mjs` already computes `dependsOn`, inverted `unblocks`,
   `leverage`, `blocked` and cluster siblings; `render-lab.mjs` renders two `<ul>`s. Show the
   graph.

**Acceptance criteria:**
- All 44 lab pages honour the viewer's colour-scheme preference, including the `data-theme`
  override, in both directions.
- Constraints, Phases and Relationships each render through a dedicated component, not the
  generic section loop.
- Unresearched items visibly improve too — the gap view is a designed page, not a blank one.
- Zero per-feature authoring: no lab markdown needs editing for any of this to take effect.
- `npm run backlog:board` remains deterministic (re-running leaves the tree clean apart from
  the timestamp) and adds **no npm dependencies**.
- Board and lab pages import the same token set from `lib/theme.mjs`.

**Priority rationale:** P0 per user. The lab layer only earns its keep if people actually read
the pages, and today they don't invite reading.

**Effort:** M — roughly a day. Estimate carried over from the 2026-08-11 brainstorm; adjust
freely.

**Open questions:**
- Does the **board** page also adopt the dark theme, or only lab pages? Shared `theme.mjs`
  makes "both" the path of least resistance, but it changes an existing surface.
- Does the dependency graph render as inline SVG or as a CSS/DOM layout? Affects nothing
  architecturally; pick whichever stays legible in both themes.

## Notes
- 2026-08-11: Brainstormed after comparing the hand-authored artifact against the generated
  `backlog/lab/0012.html`. Diagnosis, grounded in the renderer:
  - `lib/theme.mjs` has zero `prefers-color-scheme` — light only, inherited from the board.
  - `lib/render-lab.mjs` has zero `addEventListener` — the pages are entirely static.
  - All six lab sections render through one `[key, label]` loop.
  - `dependsOn`/`unblocks` render as `<ul>` lists despite the full graph being computed.
- 2026-08-11: Key framing — the artifact's best parts were *authored*, not rendered. Its
  bubble-sort player was ~200 lines of bespoke JS for one feature; no generator produces that
  from markdown. And 42 of 44 items have no lab at all, so there is nothing to demo on those
  pages. "Make every lab look like the artifact" conflates two different jobs.
- 2026-08-11: Decided target — **designed reference doc**, not hero-led pitch. A lab is a
  working document you consult while deciding what to build; dense and scannable is the right
  register. Artifact-style "showcase" output considered and deferred as a separate concern.
- 2026-08-11: The mechanism flow toggle was originally part of this item and has been split
  out to **0045**. It was the odd one out: the other three components render data that already
  exists, so they lift all 44 pages for free, whereas the flow toggle needs new authoring per
  lab and would stay dark on every page nobody had written it for. Splitting keeps this item's
  "zero per-feature authoring" acceptance criterion honest.
- 2026-08-11: Related — 0039 (Embeddable widgets) would let lab pages for *shipped* features
  embed the real app instead of reimplementing it. Doesn't help unbuilt features, so it is an
  adjacency worth noting rather than a dependency.
- 2026-08-11: This item was checked against the lab gate and does **not** need a lab — the
  renderer has been read, the data is all present, and there are no load-bearing unknowns.
  That is the gate working correctly, not being skipped.
