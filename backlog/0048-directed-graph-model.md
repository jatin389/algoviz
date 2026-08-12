---
id: 0048
title: Directed graph model
status: inbox
priority:
effort:
zone:
depends_on:
cluster:
created: 2026-08-12
refined_at:
---

## Idea
Let the graph category represent *directed* edges, not just undirected ones.
Today every adjacency map the app builds is undirected, which quietly rules out
a whole family of graph algorithms.

Split out of 0010, which listed topological sort in its description. It could not
be shipped and this is why.

## Notes
- 2026-08-12: Found while implementing 0010's graph slice.

  **The constraint:** `graphModel.ts` builds `adjacency` by pushing both
  `edge.from → edge.to` and `edge.to → edge.from` for every edge, and the test
  fixtures do the same. Nothing in the codebase ever produces a directed
  adjacency map, so *any two adjacent nodes already form a 2-cycle*.

  **What it blocks:**
  - **Topological sort** — only defined on a DAG. On the current undirected data
    it would report a cycle on nearly every generated graph. It also has no
    meaningful start node, while `GraphFn` is
    `AlgorithmFn<GraphStep, [Map<NodeId, NodeId[]>, NodeId]>`, so it likely needs
    a generator signature without one.
  - **Directed cycle detection** — the directed rule (recursion-stack / grey-node)
    is a genuinely different algorithm from the undirected one (back edge to an
    already-visited non-parent) that 0010 shipped. Both are worth showing, and
    the contrast between them is itself a good lesson.
  - Anything downstream that assumes direction: strongly connected components,
    DAG longest path, dependency-resolution framing.

  **Rough shape of the work:** a directed variant of the graph model plus a way
  to author/generate directed fixtures, then decide whether direction is a
  per-graph mode or a per-edge property. Also needs an answer for how
  `GraphCanvas` draws an arrowhead, since edges are currently undirected lines.
