# Hand-authored Feature Labs

One bespoke, self-contained HTML page per feature, written by the **`lab-creator`** skill
(`.claude/skills/lab-creator/SKILL.md`) — not by `generate-board.mjs`.

Ask for one in chat:

```
create labs for 0044
update labs for 0044
```

## How this differs from `backlog/lab/`

|  | `backlog/lab/NNNN.html` | `backlog/original_labs/NNNN-slug.html` |
|---|---|---|
| Produced by | `npm run backlog:board` | the `lab-creator` skill, by hand |
| Covers | every item, all 45 | only items someone chose to explain |
| Content | whatever the markdown schema holds | whatever suits *that* feature |
| Demos | none — it's a document | working, feature-specific |
| Editing | never hand-edit; regenerate | hand-authored; edit freely |

The generated page is the reference view. These are the explainers — the thing you send
someone who needs to understand a decision, with something on it that actually runs.

## Board linking

`generate-board.mjs` scans this directory and, for any `NNNN*.html` it finds, renders an extra
**Feature Lab →** link on that item's card in `board.html`. Nothing needs registering; drop the
file in and re-run `npm run backlog:board`.

Files here are committed. They are self-contained — no CDN, no webfonts, no external requests —
so they open over `file://` with no build step.
