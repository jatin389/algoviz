---
name: lab-creator
description: Hand-author a bespoke, single-page HTML Feature Lab for ONE backlog item — a designed explainer with real interactive demos, not a generated document. Use when the user says "create labs for NNNN", "create a lab for <feature>", "update labs for NNNN", "rebuild the lab page for NNNN", or asks for a feature to be explained visually/interactively as a page. Reads that item's task markdown, its research lab markdown, and the surrounding conversation, then writes a self-contained page to backlog/original_labs/. Do NOT use for the generated per-item pages under backlog/lab/ — those come from `npm run backlog:board` and are a different artifact.
---

# Lab Creator

## Why this exists

`backlog/lab/*.html` is generated for all 45 items by one renderer. It can only show
structure that every lab shares, so it reads like a document — correct, dense, impersonal.

This skill produces the opposite thing: **one page, authored for one feature**, where the
layout, the diagrams and the interactive demos are chosen because they suit *that* feature.
A generator cannot do this. A working bubble-sort player, a preset picker that resizes a
video frame, a before/after mechanism toggle — each is bespoke code written because the
feature called for it.

Both outputs coexist. The generated page is the reference; this is the explainer.

## Inputs

For item `NNNN`, read in this order and use all of them:

1. `backlog/NNNN-*.md` — the task: title, priority, effort, zone, dependencies, refinement, notes.
2. `backlog/labs/NNNN-*.md` — the research lab, if one exists: verdict, constraints, flows,
   architecture, phases, risks, out of scope. **This is the primary source.**
3. **The conversation.** Reasoning that never made it into the markdown often belongs on the
   page. If the user just spent an hour deciding something, that decision is the story.
4. The actual codebase, when a claim needs grounding — file paths and line numbers make a
   page credible.

If neither markdown file exists, say so and stop. Don't invent a feature.

## Output

Write one self-contained file: **`backlog/original_labs/NNNN-slug.html`**

- Complete HTML document — `<!DOCTYPE html>`, `<head>`, inline `<style>` and `<script>`.
- Zero external requests. No CDN, no webfonts, no remote images. It must work over `file://`.
- Slug matches the task file's slug.
- Never publish as an Artifact. This writes a file.

After writing, run `npm run backlog:board` so the board picks up the link (see *Board linking*).

## The design system — follow this exactly

This is the visual identity the user approved. Do not redesign it per feature; vary the
*content and demos*, not the palette and type.

```css
:root{
  --bg:#F8F9FB; --surface:#FFFFFF; --surface-2:#F0F2F6;
  --border:#E3E6EC; --border-strong:#CDD3DD;
  --text:#14181F; --text-soft:#5B6472; --text-faint:#8B93A1;
  --accent:#3557E0; --accent-strong:#2544C2; --accent-soft:#EAEEFF; --accent-ink:#26399E;
  --warn:#B45309; --warn-soft:#FCF0DF; --warn-ink:#8A4008;
  --shadow: 0 1px 2px rgba(20,24,31,.04), 0 10px 28px -14px rgba(20,24,31,.14);
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
  --r-sm:8px; --r-md:12px; --r-lg:18px; --r-full:999px;
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px; --sp-6:32px; --sp-7:48px; --sp-8:72px;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){ /* dark set below */ } }
:root[data-theme="dark"]{ /* same dark set */ }
:root[data-theme="light"]{ /* same light set */ }
```

Dark set — define these token-for-token in all three dark/light blocks:

```css
--bg:#0B0D12; --surface:#14171F; --surface-2:#1B1F29;
--border:#262B36; --border-strong:#343B49;
--text:#F1F3F7; --text-soft:#A7B0BF; --text-faint:#6B7280;
--accent:#7C93FF; --accent-strong:#9AACFF; --accent-soft:#1B2440; --accent-ink:#C4CFFF;
--warn:#F0A155; --warn-soft:#332211; --warn-ink:#F6C088;
--shadow: 0 1px 2px rgba(0,0,0,.4), 0 14px 32px -16px rgba(0,0,0,.55);
```

**Typography.** System sans (`--sans`) for everything — headings, body, UI. Mono (`--mono`)
*only* for code identifiers, file paths and tabular figures. No serif. No display face. The
restraint is the point; an earlier serif+mono pairing was rejected as dated.

- `h1`: `clamp(32px,5vw,46px)`, weight 700, `letter-spacing:-0.015em`, `text-wrap:balance`, max ~15ch
- `h2`: `clamp(24px,3vw,30px)` · `h3`: 16px · body: 16px/1.6 · small: 13–14px
- `.eyebrow`: 12.5px, weight 700, `letter-spacing:.07em`, uppercase, `color:var(--accent)`
- `p`: `max-width:62ch`, `color:var(--text-soft)`. `.lede`: 18px, `max-width:56ch`

**Layout.**
- `.container{max-width:1040px;margin:0 auto;padding:0 clamp(20px,5vw,32px)}`
- Sticky top bar: `position:sticky;top:0;z-index:50`, `backdrop-filter:blur(10px)`,
  background `color-mix(in srgb,var(--bg) 86%,transparent)`, 1px bottom border.
  Wordmark left (`<b>Feature</b> <span>/ lab</span>`), pill nav right.
- Pill nav buttons: 13.5px, `border-radius:var(--r-full)`, padding `8px 13px`;
  active = `background:var(--accent-soft);color:var(--accent-ink)`. Driven by
  `IntersectionObserver` scroll-spy with `rootMargin:'-20% 0px -70% 0px'`.
- Sections are full-bleed `.stripe` bands, `padding:var(--sp-8) 0`, **alternating** with
  `.stripe.tint{background:var(--surface-2)}`. This alternation is what stops the page
  reading as one long document.
- `.stripe-head{max-width:640px;margin-bottom:var(--sp-6)}` — eyebrow, then `h2`, then a lede.
- Cards: `background:var(--surface)`, `1px solid var(--border)`, `border-radius:var(--r-lg)`,
  `padding:var(--sp-6)`, `box-shadow:var(--shadow)`. Pair them in
  `.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5)}`, collapsing at 720px.

**Explicitly avoid** — these were tried and rejected: grid-paper or textured backgrounds;
serif display faces; coloured left-border accent rails on cards; emoji as section markers;
a left sidebar rail; numbered `01/02/03` markers unless the content is genuinely sequential.

## Page structure

Vary this to fit the feature — it is a starting shape, not a template.

1. **Hero.** Eyebrow, an `h1` that states the *thesis* (not the feature name — "Record the
   tape, not the screen" beats "Export feature"), a lede, and a row of mono chips naming the
   real files involved.
2. **The constraints.** Usually the strongest section. Take them from the lab's `## Constraints`
   and render as cards. If a constraint is a hard *no*, mark it — a `✕` chip in `--warn`.
3. **One interactive demo per major idea.** See below.
4. **Mechanism flows**, if the lab has `## Flows` — before/after, as a toggle or side by side.
5. **Phases**, from `## Phases` — clickable chips revealing each gate.
6. **Risks**, from `## Risks` — paired risk/mitigation rows.
7. **Footer** — item id, branch, source markdown paths.

## Interactivity — the part that matters

**A lab page with no working demo has failed.** At least one thing must actually run.

Choose demos from the feature, not from a list. Precedents worth reusing:

- **Algorithm/step features** → a miniature working player. Precompute the step tape in JS,
  render bars/nodes as DOM with CSS transitions, wire play/pause/step/scrub, and show state
  changing. If the feature's claim is "this is correct even when you scrub backwards", the
  demo must *let the user scrub backwards and see it hold*.
- **Output/format features** → preset chips that resize a live preview element, so aspect
  ratio and safe areas are visible rather than described.
- **Before/after mechanisms** → a two-state toggle swapping stacked flow diagrams, where an
  impossible hop renders as `╳` in `--warn`.
- **Phased plans** → chips that reveal the gate on click.
- **Quizzes/prediction** → an overlay that asks before revealing, then marks correct/incorrect.

Rules: vanilla JS in one IIFE, no libraries. Respect
`matchMedia('(prefers-reduced-motion: reduce)')` for anything animated. Every control gets a
visible `:focus-visible`. Wide content scrolls in its own `overflow-x:auto` container so the
body never scrolls sideways.

## Writing the copy

- Lead with what was *discovered*, not what is planned. "There is no `<canvas>` anywhere in
  this app" is the story; "we will add export" is not.
- Name real files and line numbers. `useSorter.ts:122` is worth a paragraph of hedging.
- State impossibilities plainly and say what follows from them.
- No marketing voice. This explains a decision to someone who has to build it.

## Board linking

`backlog/board.html` is generated — **never hand-edit it**. The generator already looks for
`backlog/original_labs/NNNN-*.html` and, when one exists, renders an extra link on that item's
card. So the only step is:

```bash
npm run backlog:board
```

Commit the new page together with the regenerated `board.html` and `lab/*.html`.

## "create labs for NNNN"

1. Resolve `NNNN`; read the task file, the lab file, and the relevant conversation.
2. If `backlog/original_labs/NNNN-*.html` already exists, say so and treat it as an update.
3. Decide the thesis, the sections, and — deliberately — **which demos to build**. Say what
   you picked and why before writing a large file.
4. Write the page. Run `npm run backlog:board`. Report the path and what's interactive.

## "update labs for NNNN"

1. Read the existing page **in full** before changing it — never blind-overwrite work that may
   contain hand-tuned demos.
2. Re-read the markdown and diff it mentally against the page: what changed, what's now stale?
3. Preserve working demos unless the change invalidates them. Rewrite prose freely.
4. Same filename, same URL. Regenerate the board.

## Scope discipline

One page per invocation. Do not batch-create labs for several items — each is an authored
piece, and doing five at once produces five templated pages, which is the exact failure this
skill exists to avoid.
