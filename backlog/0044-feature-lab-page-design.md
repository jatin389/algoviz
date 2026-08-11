---
id: 0044
title: Designed Feature Lab pages
status: done
priority: P0
effort: M
zone: D
depends_on:
cluster: lab-presentation
created: 2026-08-11
refined_at: 2026-08-11
closed: 2026-08-11
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

**Open questions:** all resolved 2026-08-11 — see *Plan* below.

## Plan
Written 2026-08-11 after reading `render-lab.mjs`, `theme.mjs` and `components.mjs` end to end.

**Precondition verified.** The enhanced components only work if lab prose is machine-readable,
and it is — consistently across both labs: 5 bold-led constraint paragraphs each, all 5
containing `Consequence:`; Phases and Risks are markdown tables (10/11 and 6/8 rows) that
`components.mjs`'s existing `splitTableCells` already handles. No lab markdown needs editing.

**1 — Theme (`lib/theme.mjs`).** Dark tokens defined three ways so the toggle wins in both
directions: `@media (prefers-color-scheme: dark)` guarded as `:root:not([data-theme="light"])`,
then explicit `:root[data-theme="dark"]` and `:root[data-theme="light"]`. Semantic colours get
hand-picked dark variants rather than inversion — `--p0: #c62828` and `--zone-d: #b8590f` are
tuned for a white ground and will muddy otherwise. Type sizes become scale tokens; they are
currently ad hoc (0.72 / 0.78 / 0.82 / 0.9 / 0.94 / 1 / 1.5rem), which is part of why the pages
read unconsidered.

**2 — Section parsers (new `lib/sections.mjs`).** Pure text→structure, no HTML:
`parseConstraints(text)` → `[{lead, body, consequence}] | null`, `parseTable(text)` →
`{headers, rows} | null`. **`null` is the contract** — any lab whose prose doesn't match falls
back to the existing `renderMarkdownSubset`. With only 2 of 45 labs written this matters more
than the components themselves: a future lab in a different style must never render broken.

**3 — Components (`lib/components.mjs`).** `constraintCard()` renders the lead as a heading with
the consequence as a visually distinct callout — the fact→consequence split is the whole value
of the section. `phaseTape()` detects a `Gate` column by header name and emphasises it as a rule
rather than a table cell; no Gate column falls back to a table. `dependencyGraph()` renders
depends-on ← this ← unblocks, with cluster siblings below.

**4 — Wiring (`render-lab.mjs`).** Constraints, Phases and Relationships come out of the generic
`LAB_SECTIONS` loop; Verdict, Architecture and Out of scope stay on it.

**Decisions:**
- **Dark theme covers board *and* lab pages** (user, 2026-08-11). Forking the tokens would lose
  the shared-token property the acceptance criteria exist to protect.
- **A theme toggle is in scope** (user, 2026-08-11). Nothing sets `data-theme` on a `file://`
  page, so without it the override half of the criteria can't be exercised. ~15 lines plus
  `localStorage`; the only JS on the page.
- **Graph renders as CSS/DOM, not inline SVG.** It is small, and DOM keeps it token-driven,
  reflowing, and made of real links with real text. SVG would need manual text metrics and
  wouldn't wrap.
- **`derive.mjs` gains cluster siblings** — it computes the graph today but doesn't expose who
  shares a `cluster`.

**Verification:** run the generator twice and confirm only the timestamp differs; confirm 45
pages; assert dark tokens exist in all three forms; feed a fixture lab with non-matching prose
to prove the fallback fires; confirm no new npm dependencies.

**Deliberately not in this item:** `blocked` currently conflates "waiting on unknown work" with
"waiting on known work" — 0045 reads as blocked by 0044 even though 0044 is unresearched by
design. Real, but scope creep here; capture separately if it bites.

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
- 2026-08-11: **Done.** All six acceptance criteria verified: dark tokens present in all three
  forms on both surfaces; Constraints/Phases/Relationships each render through a dedicated
  component; unresearched pages gained the graph, toggle and a styled gap view; `backlog/labs/`
  has zero diff, so the zero-per-feature-authoring criterion holds literally; `package.json`
  untouched; both renderers import the one `THEME_CSS`. Generator is deterministic — two runs
  differ only in the timestamp.
- 2026-08-11: Degradation was tested with a throwaway fixture lab written in deliberately
  non-matching prose (no bold leads, no phase table, a Risks table with no Gate column). Both
  parsers returned `null` and every section fell back to the generic markdown renderer with the
  page fully intact. Fixture removed after the test. This mattered more than the components:
  43 of 45 labs are still unwritten and may use any style.
- 2026-08-11: The theme agent drew a distinction that wasn't specified and is right —
  text-only tokens (`--accent`, `--p0`–`--p3`, `--leverage`, `--blocked`) were brightened for
  legibility on the dark ground, while fill-only tokens sitting under solid white pill text
  (`--zone-*`, `--lab-*`, `--ready`, `--inbox`) were kept mid-dark so that white text stays
  readable. It also replaced two hardcoded rgba tints with `--leverage-bg`/`--blocked-bg` so no
  colour lives outside the token layer.
