---
name: backlog
description: Manage this repo's backlog of ideas and tasks — capturing new ideas with zero friction, brainstorming/refining them into scoped work, prioritizing, and deciding what to work on next. Use this whenever the user wants to jot an idea down for later ("note this for later", "add this to the backlog", "let's deal with that after this"), asks what to work on next, wants to start the next item, asks how many tasks are open/pending, wants to triage or prioritize the backlog, or wants to brainstorm/refine/scope a task. Also trigger when the user surfaces a future-facing idea mid-task without saying the word "backlog" explicitly (e.g. thinking out loud about an improvement while working on something unrelated) — capture it rather than letting it get lost. Refuses to let unrefined, unscoped items get started without a heads-up.
---

# Backlog

## Why this exists

Ideas show up mid-task, when you least want to stop and scope them out. This skill exists to make capture nearly free — a raw idea should take one line and zero decisions — while keeping a hard line between "I wrote this down" and "this is actually ready to work on." The most important behavior here is that line: don't let work start on something that hasn't been thought through, even if the user asks to "just start on the next thing."

## File layout

```
backlog/
  Backlogs.md       # index of active items, grouped by status
  DONE.md           # index of closed items (done or dropped)
  0001-slug.md      # one file per task, id-prefixed, holds the actual content
  0002-slug.md
  ...
```

If `backlog/` doesn't exist in this repo yet, create it the first time this skill runs: `Backlogs.md` and `DONE.md` with the empty templates shown below. Nothing else is needed to bootstrap.

## Statuses

- **inbox** — just captured. A title, maybe a one-line description. Not scoped, no priority yet.
- **ready** — refined: has acceptance criteria and a priority (P0–P3). Safe to start.
- **in-progress** — being worked on right now.
- **done** / **dropped** — closed. Lives in `DONE.md`, not `Backlogs.md`, so the active view stays focused on live work.

A task only ever has one status at a time, and it lives in exactly one table across `Backlogs.md`/`DONE.md` that matches it.

## Zones (optional)

Zone classifies *where* an idea sits relative to the product's current shipped scope — a different axis from priority (urgency) and effort (size). It's most useful after a broad idea-generation/research pass (like the one that produced the current backlog); a routine one-line inbox capture usually doesn't need one.

Current zones:
- **A — Extend the map**: deepens or completes something the product already does. Lower risk, compounds on existing surface area.
- **B — Off the map**: a creative departure from the standard playbook for this kind of product — novel framings/modes/mechanics that aren't just "more of the same."
- **C — New territories**: an entirely new domain/subject area beyond the product's current scope. Highest novelty, usually highest effort.
- **D — Instruments**: platform/infrastructure work that isn't a feature itself but multiplies the value of other features (tooling, extensibility, meta-capabilities).

This list is open-ended — a later research pass can introduce Zone E, F, and so on. Any new zone letter must be documented here, with a one-line description, before it's ever used; this section is the single source of truth for what each letter means, so never invent an undocumented zone letter on a task file or in `Backlogs.md`.

When zones are in use, record `zone: <letter>` in the task file's frontmatter and add a Zone column to the relevant table in `Backlogs.md`.

## `Backlogs.md` format

Three sections, each a table. Skip a section's table rows (but keep the heading) when it's empty.

```markdown
# Backlog

## Inbox
Captured but not yet scoped. Refine these before starting them.

| ID | Title | Description |
|----|-------|--------------|
| 0007 | Add dark mode toggle | |
| 0008 | Investigate slow scrub on Safari | user reported laggy timeline drag on iOS |

## Ready
Scoped and prioritized. Pull from here when starting new work. Sort by priority; within a priority, row order is queue order.

| ID | Priority | Effort | Zone | Title | Description |
|----|----------|--------|------|-------|--------------|
| 0003 | P1 | M | A | Seeded RNG follow-up | revisit after revert of #14 |

## In Progress

| ID | Priority | Title | Description |
|----|----------|-------|--------------|
| 0005 | P0 | Compare mode perf fix | |
```

Description is optional in every row — leave the cell empty rather than inventing one. Title alone is a complete inbox entry.

## `DONE.md` format

```markdown
# Done / Dropped

| ID | Resolution | Title | Closed |
|----|-----------|-------|--------|
| 0002 | done | Add scrub bar | 2026-07-30 |
| 0004 | dropped | Explore WASM renderer | 2026-08-01 |
```

## Task file format (`backlog/NNNN-slug.md`)

```markdown
---
id: 0007
title: Add dark mode toggle
status: inbox
priority:
effort:
zone:
created: 2026-08-09
refined_at:
---

## Idea
Raw capture, in the user's own words as much as possible.

## Refinement
(filled in when the task is scoped: goal, acceptance criteria, subtasks, open questions)

## Notes
(running brainstorm log — timestamp entries as the conversation develops)
```

`priority`, `effort`, and `refined_at` stay blank until the task moves to `ready`. `zone` is optional even then — set it only when the idea's relationship to the product's current scope is relevant (see "Zones (optional)" below); a plain one-line inbox capture may never get one. When it closes, add `closed: <date>` and set `status` to `done` or `dropped` — but leave the file at its original path. Only the index *row* moves to `DONE.md`; the file itself doesn't move, so links and history stay stable.

## Assigning IDs and slugs

Next ID = highest existing ID across `backlog/*.md` (excluding `Backlogs.md`/`DONE.md`) + 1, zero-padded to 4 digits. Slug = short kebab-case of the title. Both are internal bookkeeping — don't ask the user for either.

## Workflows

### Capturing a new idea

Trigger: "note this for later", "add to the backlog", "let's deal with that after this", or the user just musing about a future improvement mid-task.

1. Assign the next ID and slug.
2. Create `backlog/NNNN-slug.md` with `status: inbox`, `priority`/`effort`/`zone`/`refined_at` blank, and the idea written into `## Idea` in the user's own words.
3. Add one row to the **Inbox** table in `Backlogs.md` — description only if the user actually gave one, otherwise leave it blank.
4. Confirm in one short line and get back to what you were doing. Don't ask clarifying questions, don't assign a priority, don't start refining unless the user explicitly asks — the whole point of the inbox is that capture costs nothing.

### "What's next?" / "what should I work on?"

1. Read the **Ready** table. If it has rows, sort by priority (P0 first), then by row order for ties, and return the top one along with its file's `## Refinement` summary.
2. If **Ready** is empty, say so plainly and offer to triage the **Inbox** instead — don't silently fall back to picking an inbox item yourself.

### "Start on X" / "start the next item"

1. Resolve the target: either the item the user named, or the result of the "what's next" lookup above.
2. Check its status. **If it's not `ready` — meaning it's still sitting in Inbox with no priority — do not start it.** Say clearly that it hasn't been scoped yet and ask if they want to brainstorm it now. This gate matters more than being helpful in the moment: starting unscoped work is exactly the failure mode this whole system exists to prevent.
3. If it is `ready`, flip its status to `in-progress` — move its row from **Ready** to **In Progress** in `Backlogs.md`, and update `status` in the task file — then proceed with the work.

### "How many tasks are pending?"

Report counts broken down by status — e.g. "3 in the inbox, 2 ready, 1 in progress" — not one combined number. The mix matters more than the total: an inbox-heavy backlog needs triage, a ready-heavy one needs execution.

### Triaging / refining a task

This is a conversation, not a form. Ask about goal, scope boundaries, acceptance criteria, and anything that seems ambiguous — the same way you'd brainstorm any other task with the user. Then:

1. Fill in `## Refinement` in the task file (scope, acceptance criteria, subtasks, open questions).
2. Set `priority` (see scale below) and `refined_at` to today's date, and flip `status` to `ready`. Set `effort` too when it's reasonably clear (see scale below); set `zone` when it's relevant (see "Zones (optional)") — same "ask, don't invent" rule as priority.
3. Move the row from **Inbox** to **Ready** in `Backlogs.md`, adding the priority (and, when set, effort/zone) columns.

Priority scale — ask the user which bucket fits if it's not obvious, rather than guessing:
- **P0** — urgent / blocking something
- **P1** — high value, do soon
- **P2** — normal
- **P3** — nice-to-have / someday

Effort scale — a rough size estimate, not a rigorous one:
- **S** — small
- **M** — medium
- **L** — large

"Let's triage the backlog" means doing this for each inbox item in turn, one at a time, not batch-guessing all of them.

### Completing or dropping a task

1. Set `status: done` (or `dropped`) and `closed: <date>` in the task file's frontmatter. Leave the file where it is.
2. Move its row out of **Ready**/**In Progress** in `Backlogs.md` into the table in `DONE.md`, adding the `Resolution` and `Closed` columns.

## Style notes

- `Backlogs.md` is meant to be opened directly in an editor too, not just read by Claude — keep it skimmable, not just machine-parseable.
- Never invent a priority, zone, or acceptance criteria on the user's behalf. If they're not offered, ask — and never invent a zone *letter* that isn't already documented in "Zones (optional)". Effort is a rougher, lower-stakes estimate; proposing one is fine when it's reasonably clear from context, but don't stick a confident number/letter on something genuinely ambiguous.
- Don't over-ask at capture time. Capture is cheap on purpose; refinement is where the thinking happens.
