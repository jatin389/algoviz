---
id: 0015
title: Export a run
status: ready
priority: P2
effort: M
zone: A
cluster: output-adapter
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
GIF / WebM / image export via canvas capture. Right now only the configuration is shareable through the URL, never the resulting animation itself.

## Refinement
**Goal:** Capture the rendered visualization (not just its config) as a shareable media file.
**Zone:** A — Extend the map
**Effort:** M
**Priority rationale:** Meaningful sharing upgrade, but adds a new dependency/technique (canvas capture, encoding) not currently in the stack.
**Open questions:** Format choice (GIF vs. WebM vs. still image), library/approach, and acceptance criteria not yet scoped.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
