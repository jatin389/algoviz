---
id: 0019
lab_status: planned
researched_at: 2026-08-19
closes: Acceptance criteria; which skins ship first
---

## Verdict

"Skins" is not one abstraction, it is two. Bars, book spines and people all encode a value as
**magnitude** (something's height); race cars encode it as **horizontal position** along a
track, and a hand of cards encodes it as a **printed rank glyph** with no size channel at all.
An interface shaped like `BarChart`'s current props — which bakes `maxValue` straight into a
height calculation — only serves the first group. The interface that serves all five is
**values plus a pre-baked per-index `AlgoTone`**, with each skin owning its own geometry inside
a shared shell. That move already exists once in this codebase for a different renderer
(`src/components/graph/tones.ts`'s header literally makes the skins argument: `GraphCanvas`
"must not know which algorithm produced the state it's drawing"), and — as of the theme-system
merge that landed on `main` while this lab was being written (`55ef028`, "Design system and
eight themes") — it now exists **generically**, in `src/theme/tones.ts`. `BarChart.vue` already
consumes it: `colorClass` returns `TONE_MARK.active | .probe | .settled | .idle`, and its legend
is built with `toneLegend([...])`. So the tone half of this lab's original proposal is done, and
better than proposed: skins don't need a new tone module, they need a new *consumer* of the
existing one.

Two things this lab changes from the original idea capture, both load-bearing:

**Element identity is deferred, on purpose, and permanently absent from v1's contract.**
`SortStep.array` carries values only, duplicates are the common case (not an edge case — see
Constraints), and no honest key can be derived from values alone once the algorithm can move two
equal elements past each other. Race cars are the skin that most wants identity ("a swap should
look like two cars swapping lanes") and the one this lab explicitly declines to give it, because
the two ways to buy it — a derived key that lies about stability, or an `ids` field added to
`SortStep` — both cost more than they're worth for a picker whose whole pitch is *zero changes
to any algorithm's logic*.

**The colour-based substitute this lab initially proposed for identity — a continuous
value→hue map — is now wrong and was dropped.** `TONE_MARK` carries a texture and outline
channel alongside fill; four of the eight shipped themes (Monochrome, Terminal, Paper, and
forced-colors) turn those channels on and carry state as *pattern*, not hue, specifically so the
product is legible without colour. An inline `hsl()` painted by a skin bypasses that system
entirely and would be the one place in the app invisible in exactly the themes built to need it
least. If Race Cars wants a per-value channel beyond position, it has to be non-colour (see
Constraints) — this lab leaves it a labelled experiment for Phase 5, not a commitment.

## Constraints

**`src/theme/tones.ts` already is the tone abstraction this item set out to build — a skin
consumes it, it does not reinvent it.** It exports `AlgoTone` (`idle | probe | active | settled
| rejected | trace | blocked`), `TONE_MARK` (the DOM data-mark class, fill + texture + outline
together), `TONE_FILL`/`TONE_STROKE` for SVG, and `toneLegend()`. Consequence: a skin registry
needs no tone module of its own — it needs one small mapping function,
`sortTone(step, index): AlgoTone`, encoding the existing precedence
(`swapping→active, comparing→probe, sorted→settled, else idle`) exactly once, and every skin
consumes `AlgoTone` values, never raw classes.

**`AvLegend` now takes tones, not classes** (`items: LegendItem[]`, resolved internally via
`TONE_MARK[item.tone]`). Consequence: a skin cannot invent its own swatch colour even if it
wanted to — the legend and the marks are structurally incapable of disagreeing, which is a
constraint worth preserving, not working around.

**`applyStep` must be idempotent and absolute** (`useStepPlayer.ts:52-59` — never accumulate,
because `seek` re-applies an arbitrary snapshot for backward scrubbing). Consequence: a skin
renders purely as a function of the current `SortStep`; no animation may be load-bearing for
correctness, and any motion whose absence would make a scrubbed frame look wrong is a bug, not a
missing polish pass. `onAdvance` (`:62-75`) is the only hook that fires exclusively on forward
play — currently spoken for by audio cues — and it is a *player* concern, not a *renderer* one;
reaching for it inside a skin is out of scope here.

**`SortStep.array` carries values only, and duplicates are the common case.** `useSorter`
generates each element as `rng.int(1, 99)` at `size` ∈ [10, 100] (`useSorter.ts`), so at the
default n=45 over 99 distinct values a collision is close to certain, and at n=100 it is a
pigeonhole certainty. Consequence: no key derived purely from value is stable under a swap of
equal elements, and a scheme that tracks "the second occurrence of value 7" silently reassigns
identity the moment two 7s cross — which is exactly the case a stability demonstration (the
motivating use for identity, and `AlgorithmMeta.stable` already exists) would need to be
truthful. All five skins ship with index-keyed `v-for` and no `TransitionGroup`; see Verdict.

**Step delay is `[4ms, 202ms]` (`useStepDelay.ts`, `max(4, 204 - speed*2)`), decoupled from the
bar's fixed `duration-150` CSS transition.** Consequence: above roughly speed 30 the incumbent's
own transitions already overlap each other. Any skin whose motion takes longer than the bar's
150ms makes an existing (if minor) rough edge worse, not new — a reason to keep each skin's own
transition near that budget rather than treat it as a free variable.

**`AvRulerRail` is the app's new cross-view signature element**, explicitly documented as such
in its own header ("one form repeated across every indexed view so eight palettes read as one
product") and already mounted under `BarChart`'s bars. Consequence: a skin either keeps the rail
(cheapest, and consistent with every other indexed view in the app) or deliberately replaces it
with an equivalent index reference and says so — silently dropping it would make Skins the one
feature that breaks the coherence the design-system merge just spent 10 commits building.

**Tailwind classes must be whole literals, including inside `.ts` modules** — `tailwind.config.js`'s
`content` glob covers `src/**/*.{vue,js,ts}`, and `theme/tones.ts`'s own header states the rule
explicitly: *"a `bg-tone-${tone}` built at runtime never reaches Tailwind's scanner… these
tables are literal by necessity, not by style."* Consequence: a skin registry stores complete
class strings (inherited for free by consuming `TONE_MARK`/`TONE_FILL` — nothing new to enforce
there); anything a skin wants to vary continuously (a spine's exact height, a car's exact
position) must go through `:style` with a numeric value, never an interpolated class.

**`maxValue` is not on `SortStep` — it is a renderer input the view supplies and pins per
dataset** (`useSorter.ts`: `maxValue.value = Math.max(...baseArray.value, 1)`, updated only on
`generate()`/`setArray()`, never per-step), specifically so counting/radix sort's zero-filled
placeholder slots mid-run don't shrink the scale before the true max lands. Consequence: every
magnitude skin (Bars, Spines, People) takes `maxValue` as a prop exactly as `BarChart` does
today; Cards, which has no size channel, still receives it for API uniformity but is not
required to use it for anything beyond an optional accessible label.

**`BarChart.vue` has no dedicated test today**, and neither does `SearchBarChart.vue` (its
near-duplicate — `showLabels` and the bar-geometry block are effectively copy-pasted, now
sharing `TONE_MARK`/`toneLegend` but not the geometry). Consequence: the refactor that pulls a
shell out of `BarChart` has no regression net unless one is written first — Phase 0 exists
solely to close that gap before anything moves.

**`sorting` is an embeddable category, and `EmbedView` mounts it with zero embed-specific
wrapping** (`router/index.ts`: `NOT_EMBEDDABLE = new Set(['bst','heap'])`, so `sorting` is not
excluded; `EmbedView.vue`: `<component :is="view" />`, no embed-only shell around the category
view). Consequence: whatever picker this item adds is reachable inside every embed of sorting,
and whatever it persists is persisted *by* embeds sharing an origin — the same hazard `useTheme`
already solved for the theme picker via an explicit `persist: false` path read off `?theme=`.
Skins follows the same rule: URL only, no `localStorage`, in v1.

**`AvAlgorithmSelector` cannot be reused for the skin picker.** It is generic over
`Record<TKey, AnyAlgorithmMeta>` and unconditionally renders a `complexity` table and a `stable`
pill — neither of which a skin has a value for. Consequence: the picker is a new, small
component, not a generic-parameter trick on an existing one; `AvButton`'s existing selector
variant is the right primitive to build it from.

## Flows

| Path | Today | With this change |
|---|---|---|
| Render | `SortStep` → `useSorter.highlights` → `BarChart` (3 `Set`s + `colorClass`) → bars | `SortStep` → `useSorter.highlights` → `sortTone(index)` → `SortStage` → **chosen skin component** |
| Tone resolution | precedence written once, inside `BarChart` | precedence written once, inside `SortStage` — skins never see raw `comparing`/`swapping`/`sorted` |
| Legend | `toneLegend([...])` hardcoded per component (`BarChart`, `SearchBarChart` each declare their own) | `toneLegend([...])` owned by `SortStage`, passed to `AvLegend` once, reused across all five skins |
| Picker state | — ╳ no picker exists | `SortingView` ref → `?skin=` via `useUrlState` → `decodeKey(sortSkins, raw)` |
| Identity | index-keyed `v-for`, values only | unchanged — index-keyed `v-for`, values only (deliberate no-op, see Verdict) |

## Architecture

```
src/components/sorting/
  skins/
    types.ts        SortSkinItem { index, value, tone: AlgoTone, key }
                     SortSkinProps { items: readonly SortSkinItem[]; maxValue: number; showLabels: boolean }
    index.ts         sortSkins = {...} satisfies Record<string, SortSkinSpec>; SortSkinKey; DEFAULT_SKIN
    scale.ts         barHeightPercent(value, max) — pure, unit-tested (dpLayout.ts precedent)
    BarsSkin.vue      the incumbent bars, unchanged pixel output
    SpinesSkin.vue    book-spine shelf — same height encoding as Bars
    PeopleSkin.vue    head+body sprite, scaled by the same heightPercent
    CarsSkin.vue      n lanes, value = horizontal position
    CardsSkin.vue     printed rank glyph, no magnitude channel
  SortStage.vue       AvPanel + heading + AvLegend + AvRulerRail + tone-baking + <component :is>
  SkinPicker.vue      AvPanel + AvButton grid + selected skin's description
```

`sortTone(step, index): AlgoTone` (a plain function, not a class) lives in `skins/index.ts`
next to the registry and is the **one** place the four-way precedence is written:
```ts
function sortTone(h: { comparing: number[]; swapping: number[]; sorted: number[] }, i: number): AlgoTone {
  if (h.swapping.includes(i)) return 'active';
  if (h.comparing.includes(i)) return 'probe';
  if (h.sorted.includes(i)) return 'settled';
  return 'idle';
}
```
(`SortStage` builds the three `Set`s exactly as `BarChart` does today, for the same O(1)-at-100
reason, and calls this per index inside one `computed`.)

Registry idiom matches `src/algorithms/index.ts:16-21,108-111` verbatim — `satisfies
Record<string, SortSkinSpec>`, not a `: Record<...>` annotation, so `keyof typeof sortSkins`
stays the literal key union `decodeKey` needs:
```ts
export interface SortSkinSpec {
  name: string;
  description: string;
  component: Component;
  encoding: 'magnitude' | 'position' | 'glyph';
  /** Above this n the picker shows an inline crowding note. Unset for Bars/Spines/People. */
  maxComfortableN?: number;
}

export const sortSkins = {
  bars:   { name: 'Bars',        encoding: 'magnitude', component: BarsSkin,   description: '…' },
  spines: { name: 'Book spines', encoding: 'magnitude', component: SpinesSkin, description: '…' },
  people: { name: 'People',      encoding: 'magnitude', component: PeopleSkin, description: '…' },
  cars:   { name: 'Race cars',   encoding: 'position',  component: CarsSkin,   description: '…', maxComfortableN: 40 },
  cards:  { name: 'Cards',       encoding: 'glyph',      component: CardsSkin, description: '…', maxComfortableN: 30 },
} satisfies Record<string, SortSkinSpec>;

export type SortSkinKey = keyof typeof sortSkins;
export const DEFAULT_SKIN: SortSkinKey = 'bars';
```
Component objects sit in a plain module-level literal, never wrapped in `reactive()` — the repo
uses `markRaw` nowhere and this registry doesn't need it either, but it's worth a one-line
header comment warning against ever putting `sortSkins` inside a `reactive()` call.

`SortStage.vue` takes **exactly `BarChart`'s current props plus `skin`** —
`{ array, comparing, swapping, sorted, maxValue, title?, showLegend?, skin? }` — so all four
existing call sites migrate by renaming the tag and adding one prop:
`SortingView.vue:183,202,223` and `SandboxView.vue:99`. It owns the `AvPanel` shell, the
heading, `AvLegend`, and `AvRulerRail`; the mounted skin owns **only its own interior geometry**
and receives nothing that would let it reach outside that box. That boundary is deliberate and
should be treated as load-bearing from Phase 1 onward — a skin needing a prop `SortSkinProps`
doesn't have is a signal that the shell drew the line in the wrong place, not that the interface
needs an escape hatch.

**Per-skin geometry notes** (each is a real design decision, not a placeholder):
- **Spines** keeps the height encoding — it exists to prove the shell/skin boundary at near-zero
  risk before Cards and Cars each break a different assumption. Spine width stays uniform; only
  height varies.
- **People** scales the whole sprite by `barHeightPercent`, sizing the head as a percentage of
  column *width* (not height), so it degrades gracefully at n=100 into "a bar with a rounded
  top" rather than producing a sub-pixel head at a fixed size.
- **Cars** puts value on the **horizontal axis** and index on rows; `maxValue` changes meaning
  from "tallest bar" to "track length", and counting/radix's zero-filled placeholder slots pile
  every car at the start line rather than rendering as flat bars — documented as an accepted,
  visible quirk rather than special-cased away. Declares `maxComfortableN: 40`; below that a
  labelled experiment may explore a non-colour per-value channel (e.g. a car body pattern/shape
  keyed to `value % 4`) as a *legibility* aid, not an identity mechanism — separate from, and
  weaker than, the deferred identity question in Verdict.
- **Cards** drops magnitude and prints the value as a rank glyph plus a suit-like colour class
  derived from `value % 4` (via `TONE_*`-consistent literals, not raw hex); `showLabels` is
  advisory everywhere else but Cards ignores it and always prints, since the label *is* the
  encoding. Declares `maxComfortableN: 30`.

## Phases

| # | Deliverable | Gate |
|---|---|---|
| 0 | DOM-parity test written against the **current, unmodified** `BarChart.vue` | Test green on this branch before any file under `src/components/sorting/` is touched |
| 1 | `skins/types.ts`, `sortTone()`, `SortStage.vue`, `skins/BarsSkin.vue`; all four call sites (`SortingView.vue:183,202,223`, `SandboxView.vue:99`) migrated | Phase-0 test passes unchanged against `SortStage` with `skin` omitted; visual and DOM output identical to `main` |
| 2 | `sortSkins` registry (Bars only), `SkinPicker.vue`, `?skin=` wired into `SortingView`'s existing `useUrlState` call | `?skin=bars` is omitted from the URL (it's the default); `?skin=zzz` falls back to Bars without a console error; nothing appears under the app's `localStorage` key after switching; an `/embed/sorting?skin=…` link round-trips |
| 3 | `SpinesSkin.vue` | Two skins selectable; switching mid-run leaves `cursor`, `status`, `stats`, `elapsedMs` unchanged; scrubbing back to step N under Spines matches stepping forward to N |
| 4 | `CardsSkin.vue` | A 30-card sorted hand and a 30-card shuffled hand are visually distinguishable at a glance without reading digits; n=45 shows the crowding note and does not overflow or scroll |
| 5 | `CarsSkin.vue` | A single bubble-sort swap at n=20 is legible frame-to-frame with index-only keys (the resolution experiment named in Verdict); n=100 degrades to a labelled note, not a broken layout; a counting-sort start-line pile-up is visible and undocumented-as-a-bug nowhere in the UI (it's expected) |
| 6 | `PeopleSkin.vue`; accessibility pass across all five (`role="img"` + a step-describing `aria-label` on `SortStage`, matching `DpTable`'s existing pattern) | All five skins pass the same `SortStage`-level contract test; a keyboard-only user can reach and operate the picker |

Ordered by increasing risk: if Cars (Phase 5) fails its gate, Phases 1–4 still ship a complete,
shippable four-skin feature.

## Risks

| Risk | Mitigation |
|---|---|
| The `BarChart` extraction silently changes the incumbent's pixel output, and there is no existing test to catch it | Phase 0 exists solely for this — write the parity test first, against the untouched component; move class references via `TONE_MARK`, never re-derive new literals |
| A skin builds a Tailwind class at runtime and the rule is never emitted | Registry and every skin store whole literals only (inherited from `TONE_MARK`/`TONE_FILL` for tones); anything continuous goes through `:style` with a numeric value — call this out explicitly in code review, since the failure is silent at build time |
| Cards/Cars are illegible at high n and ship anyway | `maxComfortableN` + an inline crowding note in the picker; Bars remains the un-removable default; not a hard block — a learner is allowed to see the mess and switch back |
| Skins read as a gimmick that obscures the algorithm rather than illuminating it | Picker orders by pedagogical fidelity (Bars, Spines, People, Cars, Cards); default never changes; every skin keeps the same `AlgoTone` vocabulary so the legend transfers unchanged |
| Element identity gets smuggled in "just for Cars" and drags `SortStep` (and every generator, the sandbox contract, 0015's future frame renderers) along with it | Named as an explicit non-goal in Verdict and Out of scope; any PR touching `SortStep` for a rendering reason is out of scope by definition, full stop |
| `AvRulerRail` gets silently dropped by a new skin, breaking the cross-view visual coherence the theme-system merge just built | Called out as a Constraint; each skin's PR must state whether it keeps or intentionally replaces the rail |
| A skin needs a prop `SortSkinProps` doesn't have, and the shell grows an escape hatch per skin | Treat the three-field interface as closed; a skin needing more is a sign it needs an internal `computed`, not a shell change — require sign-off from a second skin's real need before widening it |
| Skin persisted to `localStorage` leaks across two embeds sharing an origin, or overrides an embed author's explicit `?skin=` | URL-only in v1, matching `useTheme`'s existing `persist: false` precedent for exactly this hazard |

## Out of scope

**Element identity, derived keys, `TransitionGroup`, FLIP, or any per-element move animation.**
Index-keyed `v-for` throughout; see Verdict and Constraints for why this is a deliberate,
load-bearing choice rather than a placeholder.

**Any change to `SortStep`, the sort generators, `pseudocode.ts`, or the sandbox contract.**

**Skins for any category other than sorting.** No pathfinding, graph, DP, hash-table, tree,
concurrency or search skins. `SearchBarChart.vue`'s duplicated geometry is named as an adjacent
opportunity (a future `scale.ts` extraction could serve both) but is not touched here.

**A skin picker inside `SandboxView`.** It migrates to `SortStage` in Phase 1 (its only
alternative is a second, duplicate bar renderer — see Constraints), with `skin` left at its
default and no picker rendered — a one-prop difference from the sorting view, not a fork.

**Persisting the chosen skin to `localStorage`, or a cross-category `useSkin()` singleton.**
URL-only in v1, for the embed reason stated in Constraints. Revisit only if a later item
specifically wants a returning-visitor default, seeded *before* `useUrlState` hydration so a
shared link still wins.

**Per-chart skins in compare mode.** Both charts render the same skin; a race is only meaningful
on identical presentation, matching the file's own existing rationale for sharing one dataset.

**A shared renderer interface with 0015 (Export a run) or 0023 (Sonification).** 0015's own lab
already reversed the assumed dependency (`backlog/labs/0015-export-a-run.md:139-142`): export
builds its own canvas frame renderers, `(ctx, step, opts) => void`, independent of anything
here. A DOM/Vue skin and a canvas frame renderer have no honest shared implementation — what
they can share is the `AlgoTone` vocabulary and the `sortTone()` precedence function, plus a
future canvas-flavoured colour table if 0015 wants one, the same third-flavour move
`theme/tones.ts` already makes for DOM vs. SVG. Building that shared color table is 0015's task,
not this one's.

**User-authored or plugin skins** (0043 territory) — the registry is a closed module literal on
purpose, so `keyof typeof sortSkins` stays a real literal union.
