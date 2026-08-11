---
id: 0045
title: Mechanism flow diagrams on lab pages
status: ready
priority: P1
effort: M
zone: D
depends_on: 0044
cluster: lab-presentation
created: 2026-08-11
refined_at: 2026-08-11
---

## Idea
Generalize the Live/Export toggle from the hand-authored Feature Lab artifact into something
any lab can declare: a "current path vs proposed path" diagram showing how a mechanism works
today and how the feature would change it. In the artifact this was three stacked flows —
render, audio, narration — that swapped together when you flipped between Live view and
Export capture, and it carried more of the design than any prose did.

## Refinement
**Goal:** Let a lab show how a mechanism works today beside how the feature would change it,
in a format that stays readable as raw markdown.

**Zone:** D — Instruments

**Authoring format — a markdown table, not a custom syntax.** Three candidates were considered:
a fenced mini-DSL, a table, and sub-headings plus lists. The table wins on the contract 0044
established rather than on looks:
- `sections.mjs`'s `parseTable` already exists and is tested — **zero new parsing**.
- `renderInline` already handles `**bold**` and backticks inside cells.
- It degrades perfectly: a legible table even where the flow component never fires, which is
  the same fallback rule every other lab component follows.
- It reviews cleanly in a diff. A fenced DSL would not.

Shape:
```markdown
## Flows

| Path | Today | With this change |
|---|---|---|
| Render | `BarChart` (DOM) → CSS transitions → **screen** | seeded generator → offscreen canvas → **encoder** → `.mp4` |
| Narration | `speechSynthesis.speak()` ╳ `MediaStreamTrack` | burned-in captions + `.srt` |
```
Cells split on `→` into nodes; `╳` marks an impossible hop; `**bold**` marks the node that
carries the point. No new markers to learn — all four already render as plain markdown.

**Presentation: side by side, not toggled** (user, 2026-08-11). This deliberately reverses the
artifact's Live/Export switch. 0044 settled that labs are reference documents rather than
pitches, and a toggle hides half the information behind a click — wrong for a page you consult
while deciding. Side-by-side also means the component needs **no JavaScript**.

**Schema: `## Flows` is a counted seventh section** (user, 2026-08-11). Consequence, accepted
deliberately: the completeness meter becomes /7 and both existing labs drop to 6/7 until their
flows are written. That is the point — a flow diagram is expected in a complete deep lab, and
the meter should say so rather than quietly excusing its absence.

**Acceptance criteria:**
- A lab with a `## Flows` table renders it as a side-by-side mechanism diagram; nodes, the
  impossible-hop marker and bold emphasis are all visually distinct.
- A `## Flows` section that isn't a table, or a table with unexpected columns, falls back to
  the generic markdown renderer — same `null`-means-fall-back contract as `parseConstraints`
  and `parseTable`.
- Completeness is /7 across board and lab pages, with no place left hardcoding 6.
- Flows authored for **0012** and **0015**, returning both to 7/7.
- Still zero JavaScript beyond the theme toggle, no new npm dependencies, generator stays
  deterministic.

**Priority rationale:** P1 per user — the mechanism diagram carried more of the artifact's
explanation than any of its prose did.

**Effort:** M — table parsing and `renderInline` are reused, but the schema change touches the
completeness maths in several places and two labs need authoring. Estimate mine; adjust freely.

**Open questions:** none blocking. Minor: whether a `╳` hop should also grey the downstream
nodes, decidable while building.

## Notes
- 2026-08-11: Split out of 0044 at the user's request. It was the odd one out among that
  item's four components: constraint cards, the phase tape and the dependency graph all render
  data that *already exists* in every lab, so they lift all 44 pages with no per-feature work.
  A flow diagram is different — someone has to author the two paths for each lab, so it would
  ship dark on every page nobody had written it for. Keeping it here lets 0044 hold a clean
  "zero per-feature authoring" acceptance criterion.
- 2026-08-11: The two existing labs both have natural content for this and are the obvious
  first authors:
  - **0015** — render path (DOM/SVG → screen, vs. seeded generator → offscreen canvas →
    encoder → file), audio path (master gain → `ctx.destination`, vs. `OfflineAudioContext` →
    AAC mux), and narration path (`speechSynthesis` → ✕ `MediaStreamTrack`, vs. burned-in
    captions).
  - **0012** — `onAdvance` → side effect, vs. `computed` → pure `Narrator`.
- 2026-08-11: Open design question worth resolving before building — what the authoring format
  is. Candidates: a fenced block inside the lab markdown, a table of node/arrow rows, or a
  small YAML-ish list. It has to stay readable as raw markdown, since the `.md` file is the
  source of truth and gets reviewed in diffs.
- 2026-08-11: Depends on 0044 only in the weak sense that it renders into the same page and
  should use its token set and component vocabulary. Not worth starting before 0044 lands.
