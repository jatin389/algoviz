# Feature Lab — the depth layer on top of the backlog

**Status:** design + first implementation
**Applies to:** `backlog/`, `.claude/skills/backlog/`, `docs/`

---

## 1. The gap this closes

The backlog answers **"what could we build, and in what order?"** It does that well: 43 items, four zones, priorities, effort estimates, a filterable board.

It does not answer **"do we actually know how to build this?"** — and right now, the honest answer for all 43 items is *no*.

Every item carries `status: ready`. Every item's refinement ends with some variant of *"acceptance criteria not yet scoped."* A representative sample:

| Item | Its own open question |
|---|---|
| 0038 BYO sandbox (**P0**) | "Sandboxing/security approach, which snapshot shape(s) it targets first… not yet scoped" |
| 0030 Concurrency (**P0**) | "…interleaving-enumeration algorithm not yet scoped" |
| 0015 Export a run | "Format choice (GIF vs. WebM vs. still image), library/approach… not yet scoped" |
| 0036 Memory hierarchy | "whether the loop-order demo runs real benchmarked JS or a simulated model not yet decided" |

These are not missing checklists. They are **load-bearing unknowns** — the kind where the answer changes the architecture, the dependency list, or whether the feature is feasible at all. 0038 is a P0 whose entire viability rests on an unanswered security question.

So `ready` is overloaded. It means "triaged," and the skill's own gate — *"do not start it… starting unscoped work is exactly the failure mode this whole system exists to prevent"* — cannot actually fire, because every item claims to be past it.

**Feature Lab is the missing state.** A lab is the research artifact that turns a triaged idea into something you can hand to an implementer.

## 2. What a lab is

A lab is one markdown file per backlog item that records **what we found out**, not what we hope to do. Its defining property: a lab must *close* at least one of its item's open questions, or it isn't a lab yet.

Two labs already exist in this repo, written before the concept had a name:

- `docs/learn-mode-plan.md` → backlog **0012** (Guided "Learn" mode)
- `docs/export-video-plan.md` → backlog **0015** (Export a run)

They are the shape proof. The export plan answered 0015's load-bearing question outright — format is MP4 via `mediabunny`+WebCodecs, GIF via `gifenc`, `ffmpeg.wasm` ruled out because its `SharedArrayBuffer` requirement needs COOP/COEP headers this static site doesn't set — and it did so by finding two facts no amount of brainstorming would have produced:

1. There is no `<canvas>` anywhere in the app. `BarChart` and `GridCanvas` are DOM; `GraphCanvas` and `TreeDiagram` are SVG. `canvas.captureStream()` has nothing to capture.
2. `speechSynthesis` output cannot be routed to a `MediaStreamTrack`, so narration can never be muxed into an export.

**That is the unit of value a lab produces: a discovered constraint that changes the plan.** Everything else in a lab — architecture, phases, risks — follows from constraints.

## 3. Why "visualize every feature in detail" means all 43, not just the researched ones

The instinct is to build lab pages only for items that have been researched. That's backwards.

Every item gets a lab page. Pages for unresearched items render as a **research gap view**: the item's open questions, its dependencies, what a lab would need to answer, and a completeness meter reading zero. Emptiness is the most useful thing the page can show, because it makes the difference between *0015 (researched, constraints known, phases defined)* and *0038 (P0, unresearched, security approach unknown)* impossible to miss.

The board currently sorts by priority, which renders those two items as near-identical cards. They are not near-identical. One is buildable tomorrow; the other could fail on contact with the sandboxing problem.

## 4. What the backlog knows but cannot show

Three kinds of structure exist in the corpus today and are invisible to the board because they live in prose:

**Zones.** Every item has one, and they partition cleanly — A "Extend the map" (18), B "Off the map" (10), C "New territories" (9), D "Instruments" (6). But `zone` sits inside the `## Refinement` body as `**Zone:** A — Extend the map`, not in frontmatter, so the board cannot filter or group by it.

**Dependencies.** Real, hard, and stated in the prose:
- 0031 (DB internals) *"shares the interleaving-explorer machinery planned for Concurrency (0030)"* — it cannot be designed independently.
- 0042 (Step narration) hangs off pseudocode `line` tagging, which 0010 says covers only 4 of 10 sort algorithms.
- 0015 and 0023 (export, sonification) both want an output-adapter abstraction that 0019 (Skins) is the proposal to build.
- 0035 and 0036 explicitly *opt out* of `useStepPlayer`, which is why they're the cheapest items in Zone C.

**Leverage.** 0042 is S-effort and P1 — a small, mid-priority item. It is also a prerequisite-reducer for four others (0012, 0013, 0024, 0026), because "snapshot → sentence" is the shared substrate under guided narration, quiz prompts, personality quips, and narrated diffs. Nothing in the board surfaces that. Sorting by priority actively buries it.

A lab layer that records `depends_on` in frontmatter makes all three machine-readable, and lets the board show what it currently hides.

## 5. Schema

### 5.1 Task frontmatter — three additions

```yaml
zone: A                  # A | B | C | D — promoted out of the Refinement prose
depends_on: 0019, 0010   # comma-separated ids; hard or strong-soft prerequisites only
cluster: output-adapter  # optional; names a shared-substrate group
```

`unblocks` is deliberately **not** stored. It is derived by inverting `depends_on`, so the two can never drift out of sync.

The existing `splitFrontmatter` in `generate-board.mjs` is a line-based `key: value` parser with no YAML array support. Comma-separated strings are chosen to fit it exactly — no parser change, no new dependency.

### 5.2 Lab file — `backlog/labs/NNNN-slug.md`

Long-form research lives in its own file so task files stay skimmable cards.

```markdown
---
id: 0015
lab_status: planned         # unresearched | researching | planned
researched_at: 2026-08-09
closes: Format choice; library/approach
---

## Verdict
The bottom line in one paragraph: what we now know that we didn't, and what it
means for the plan. Written last, read first.

## Constraints
Discovered facts about this codebase that shape or block the design. The
highest-value section — each entry is a fact plus its consequence.

## Architecture
Module layout, contracts, key types.

## Phases
| # | Deliverable | Gate |

## Risks
| Risk | Mitigation |

## Out of scope
What this lab deliberately does not cover, and why.
```

`closes` is a semicolon-separated list of open questions this lab answered, quoted from the task's `Open questions` line. It is what makes lab completion checkable rather than a matter of opinion.

### 5.3 Derived by the generator, never stored

| Field | Derivation |
|---|---|
| `unblocks` | inverse of every other item's `depends_on` |
| `leverage` | count of items this one unblocks |
| `labStatus` | `unresearched` when no lab file exists |
| `completeness` | how many of the six lab sections are non-empty |
| `blocked` | true when any `depends_on` target is itself unresearched |

## 6. Generator architecture

`backlog/generate-board.mjs` is a 754-line monolith: parsing, derivation, HTML, CSS and client JS in one file. Adding lab rendering inline would push it past 1,200 and duplicate the card/pill/badge vocabulary. Per the repo's own guideline — *"favor small, composable units… extract shared logic into reusable utilities instead of duplicating it"* — it gets split first.

```
backlog/
  generate-board.mjs      # thin entry point: load → derive → write board + labs
  lib/
    parse.mjs             # splitFrontmatter, extractSection, parseTaskFile,
                          # parseLabFile, parseDoneTable
    derive.mjs            # graph inversion, leverage, completeness, counts, sort
    theme.mjs             # the single CSS token block + shared component CSS
    components.mjs        # escapeHtml, pill, badge, effortBars, statCard, meter
    render-board.mjs      # the index page
    render-lab.mjs        # one detail page per item
  labs/
    0012-guided-learn-mode.md
    0015-export-a-run.md
  board.html              # generated
  lab/
    0001.html … 0043.html # generated, one per item
```

Every module is pure and independently testable: `parse` does no rendering, `derive` does no I/O, `components` emits strings. `theme.mjs` holds one token set consumed by both page types, so a lab page cannot visually drift from the board.

Output stays static, self-contained, committed, and openable with `file://` — the property that made the board useful in the first place.

## 7. What the pages show

**Board (`board.html`)** — gains, without losing anything it has:
- a **Zone** filter and grouping, now that zone is frontmatter
- a **Lab** filter: researched / unresearched
- a leverage marker on items that unblock others
- a "blocked by an unresearched item" marker
- each card links to its lab page

**Lab page (`lab/NNNN.html`)** — one per item:
- header: title, zone, priority, effort, lab status, completeness meter
- **Verdict** and **Constraints** first, since those are the research output
- Architecture / Phases / Risks when present
- **Relationships**: depends-on and unblocks, as links to sibling lab pages
- **Open questions**, with the ones the lab closed struck through
- for unresearched items: the gap view — what's unanswered, what it's coupled to, and what a lab would need to establish

## 8. Skill changes

`.claude/skills/backlog/SKILL.md` has drifted from practice and needs three corrections regardless of this work:

1. It documents neither `board.html`, `npm run backlog:board`, nor the `effort` field — all of which are in active use. A fresh session following the skill literally would produce task files missing `effort` and never regenerate the board.
2. Its `Backlogs.md` format example omits the **Effort** column the real file has.
3. Zones exist in every item and are undocumented.

Then the lab workflow is added: a `researching` status between `ready` and `in-progress`, the rule that starting an unresearched item requires a heads-up (restoring the gate the skill already intends), and the instruction to regenerate the board and lab pages after any change — which is what makes the whole thing a living document rather than a snapshot.

## 9. Explicitly not doing

- **Not writing 43 labs.** Two exist. The rest render as gap views until someone researches them. Writing speculative labs would recreate the exact problem this fixes — text that looks like knowledge but isn't.
- **Not auto-deriving dependencies from prose.** They're backfilled once from the corpus analysis and maintained by hand. A regex over English would be confidently wrong.
- **Not adding a build dependency.** No graph library, no markdown renderer, no bundler. Same zero-dependency Node script, same committed HTML.
- **Not touching `src/`.** This is repo tooling; the app is unaffected.
