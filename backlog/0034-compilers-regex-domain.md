---
id: 0034
title: "New domain: Compilers & regex engines"
status: ready
priority: P3
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
Tokenizer → AST → evaluation for a toy expression language, shunting-yard, recursive descent. Plus a regex engine as NFA/DFA where users paste their own pattern and watch catastrophic backtracking blow up — a production debugging tool, not just a lesson.

## Refinement
**Goal:** A new domain; the regex/catastrophic-backtracking half is the standout feature since it's directly useful outside the classroom.
**Zone:** C — New territories
**Effort:** L
**Priority rationale:** Interesting and useful, but a large new domain competing with higher-priority ones (Concurrency, DB, OS); someday.
**Open questions:** Acceptance criteria and whether the toy-language or regex half ships first not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
