---
id: 0045
title: Mechanism flow diagrams on lab pages
status: inbox
priority:
effort:
zone: D
depends_on: 0044
cluster: lab-presentation
created: 2026-08-11
---

## Idea
Generalize the Live/Export toggle from the hand-authored Feature Lab artifact into something
any lab can declare: a "current path vs proposed path" diagram showing how a mechanism works
today and how the feature would change it. In the artifact this was three stacked flows —
render, audio, narration — that swapped together when you flipped between Live view and
Export capture, and it carried more of the design than any prose did.

## Refinement
(not yet scoped — needs a priority, effort, an authoring format, and acceptance criteria)

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
