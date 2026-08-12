---
id: 0049
title: GraphStep result channels (witness edge, node colours)
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
`GraphStep` can only describe a traversal, so graph algorithms that compute a
*property* have nowhere to put their answer. Give it real channels for a result:
the edge that proves a cycle, and a per-node colour map.

Split out of 0010, which shipped cycle detection and bipartite check against this
limitation.

## Notes
- 2026-08-12: Found while implementing 0010's graph slice.

  **The constraint:** `GraphStep` (`src/types/steps.ts`) is exactly
  `{ visited, frontier, current, done }` — no witness field, no per-node colour,
  no ordering output. It is traversal-shaped.

  **The workaround currently in the codebase** (documented at the site in
  `cycleDetection.ts`): the verdict rides a convention on the terminal step's
  `current` — `null` when the sweep found nothing, and the already-visited node
  the back edge closes on when it did. It mirrors the existing "current is null
  on the terminal snapshot" rule in `bfsTraversal`/`dfsTraversal`, and it renders
  for free because `GraphCanvas` already paints `current`. It works, but it is a
  convention rather than a contract, and it overloads a field that means
  something else on every non-terminal step.

  **What is actually lost today:** bipartite check cannot show its 2-colouring —
  the defining visual of the algorithm. Users see the traversal mechanics and a
  pass/fail verdict, but never the red/blue partition that explains *why*.

  **Suggested shape:** add `cycleEdge: [NodeId, NodeId] | null` and
  `colors: Map<NodeId, 0 | 1>` (or a plain record) to `GraphStep`, then teach
  `GraphCanvas.vue` to paint node colours and highlight the witness edge rather
  than just the witness node. Both fields optional so existing traversals are
  unaffected.

  **Related:** `PathStep` has the same class of problem — Floyd-Warshall's
  over-cap refusal (`FW_MAX_NODES`) is indistinguishable from "no path exists"
  because there is no message channel. `useStepPlayer` already exposes a
  `truncated` ref the views do not render, which may be the right slot. Worth
  deciding whether this item covers both step types or just graph.
