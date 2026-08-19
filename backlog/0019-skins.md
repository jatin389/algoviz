---
id: 0019
title: Skins
status: in-progress
priority: P1
effort: M
zone: B
cluster: output-adapter
created: 2026-08-09
refined_at: 2026-08-19
---

## Idea
The same generator renders as book spines, race cars, a hand of cards, or people lining up by height — a picker, zero changes to any algorithm's logic. Exploits the fact that step-snapshot logic (`array`/`comparing`/`swapping`/`sorted`) already knows nothing about `BarChart.vue`.

## Refinement
**Goal:** Extract a renderer interface so `SortingView` can swap `BarChart` for alternate visual renderings of the same `SortStep` snapshot.
**Zone:** B — Off the map
**Effort:** M
**Priority rationale:** Most on-brand idea given how the architecture is already decoupled; high novelty-to-effort ratio.
**Scope:** `SortingView` only. `SandboxView`'s one `BarChart` call site migrates to the same shared shell (unavoidable once `BarChart` is decomposed — see the lab's Constraints) but renders with no picker, defaulted to Bars. No other category gets a skin. Compare mode shares one skin across both charts.
**Skins shipping in v1 (all four from the idea, plus the incumbent as the default):** Bars (incumbent), Book spines, Race cars, Hand of cards, People lining up by height.
**Acceptance criteria:**
- `SortStep` and every file under `src/algorithms/` are unchanged by this work.
- Sorting's precedence (`swapping > comparing > sorted > default`) is expressed in exactly one place in the repo, as an `AlgoTone` resolver, and every skin consumes `AlgoTone` values via the existing `src/theme/tones.ts` — no skin declares its own colour.
- Selecting **Bars** renders output identical to `BarChart.vue` as it exists on `main` today, verified by a test written *before* the refactor moves anything.
- The skin registry is declared with `satisfies Record<string, SortSkinSpec>` so its key type is a literal union, following `src/algorithms/index.ts`'s existing pattern.
- Every skin component receives only `{ items, maxValue, showLabels }` — never raw `comparing`/`swapping`/`sorted` arrays — and renders no panel chrome, heading, or legend of its own.
- A picker offers all five skins with a short description, is usable while playback is running, and switching skins mid-run changes nothing about `cursor`, `status`, `stats`, or `elapsedMs`.
- `?skin=<key>` round-trips through a shared link; `skin=bars` (the default) is omitted from the URL; an unrecognised value falls back to Bars without throwing.
- Nothing is written to `localStorage` when the skin changes, and two embeds of `/embed/sorting` with different `?skin=` values on the same page do not influence each other.
- `SandboxView` renders the Bars skin with no picker shown.
- No skin builds a Tailwind class at runtime; anything continuous (e.g. a race car's track position) is applied via `:style` with a resolved value, never an interpolated class.
- All five skins use index-keyed `v-for`; no element-identity scheme, `TransitionGroup`, or FLIP motion is introduced (see the lab's Verdict for why this is deliberate, not deferred-by-oversight).
- Skins with a declared `maxComfortableN` (Cars: 40, Cards: 30) show an inline crowding note above that count and still render without horizontal overflow at n=100.
- The stage carries a `role` and a step-describing `aria-label` in every skin — `BarChart` has neither today, and this is the one pass that fixes it for all five at once.
- No regression in the 1005 existing test cases across 33 test files (baseline confirmed via `npx vitest run` after merging `main`'s design-system update, commit `55ef028`).
**Open questions:** Acceptance criteria and which skins ship first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
- 2026-08-19: Scoped with user ahead of implementation. User decided: all five skins (Bars + the four named in the idea) ship in v1 rather than a smaller subset; the picker is sorting-only; this pass produces research + scope only, no application code. Wrote `backlog/labs/0019-skins.md` to close the item's load-bearing open questions before starting, per the backlog skill's "Start on X" gate — the item's own goal ("extract a renderer interface") is an architecture proposal, and two siblings in the same `output-adapter` cluster (0015 export, 0023 sonification) already have stated opinions about that abstraction.
- 2026-08-19: While researching, `origin/main` moved 10 commits ahead under this branch ("Design system and eight themes", #35) and was merged in (fast-forward, no conflicts). That merge substantially changed the design: `src/theme/tones.ts` already provides the generic `AlgoTone` vocabulary this item set out to build, and `BarChart.vue` is already wired to it — so the lab's architecture consumes that module rather than building a parallel one. It also invalidated a planned identity substitute: a continuous value→hue colour channel, which would have been invisible in the four shipped themes (Monochrome, Terminal, Paper, forced-colors) that carry state as texture rather than hue. Full detail is in the lab's Verdict and Constraints sections.
- 2026-08-19: Also discovered mid-scoping: "SandboxView keeps BarChart hard-wired" (the scope as first stated) isn't literally achievable once `BarChart` is decomposed into a shell + skin — `SandboxView.vue:99`'s one call site has to move too, or the repo ends up with a second, duplicate bar renderer (exactly the mistake `SearchBarChart.vue` already made once). Revised scope: SandboxView migrates to the same shared shell, defaulted to Bars, with no picker rendered. Recorded above in `**Scope:**` rather than treated as a silent scope-creep.
- 2026-08-19: Implemented, all five skins. Built in two passes: the shared foundation (`src/components/sorting/skins/{types,tone,scale}.ts`, `SortStage.vue`, `SkinPicker.vue`, the registry, `BarsSkin.vue`, and `SortStage.test.ts` as the parity/cross-skin contract net) done directly; the four remaining skins (`SpinesSkin`, `PeopleSkin`, `CarsSkin`, `CardsSkin`) each built by a parallel subagent against a shared written contract (`SortSkinProps` + a `data-testid="sort-skin-item"` / `data-tone` hook every skin must expose), then wired into the registry by hand to avoid concurrent edits to one file. `BarChart.vue` is deleted — nothing referenced it once all four call sites (`SortingView.vue` x3, `SandboxView.vue` x1) migrated to `SortStage`. Four notes for anyone reading the diff:
  1. **Cards also opts out of the shared index rail (`showsRail: false`), not just Cars.** Only Cars was flagged for this in the lab, but a live browser check (`run` skill, headless Chromium) showed Cards wraps into several rows at typical array sizes — the rail's ticks assume one row of columns and lined up with nothing. Caught only by actually looking at a screenshot, not by any test.
  2. **The picker is never disabled**, unlike every other control in `ControlsPanel` — a skin swap is a pure render change with no effect on the generator, the tape, or any stat, so gating it on `canEdit` would be a restriction with no reason behind it. Verified live: switching skins mid-run left `cursor`/`status`/`stats`/`elapsedMs` untouched.
  3. **`skin` lives in `SortingView.vue` itself**, not in `useSorter` or `sorterUrlParams` — same reasoning as `cmp`/`algo2` already there: the rival sorter opts out of `syncUrl`, and a race is only meaningful when both charts share one skin, so one view-owned ref drives both `SortStage` instances.
  4. **URL round-trip, no-localStorage, and the invalid-key fallback were all verified against a real dev server**, not just the test suite — `?skin=cards` restores on a fresh load, `skin=bars` (the default) is omitted, `?skin=not-a-real-skin` falls back to Bars with zero console errors, and `localStorage` never gains a skin key, including on `/embed/sorting`. Test suite: 1031 passing (36 files), up from the 1005 baseline; `vue-tsc --build --force` and `eslint .` both clean.
