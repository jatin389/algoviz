---
id: 0047
title: Weighted grids for pathfinding
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
Give grid cells a movement cost instead of the current binary open/wall, so
Dijkstra, A* and Bellman-Ford have something to actually be *about*. On today's
uniform grid every edge weighs 1, which is why Bellman-Ford and Floyd-Warshall
find exactly what BFS finds.

Split out of 0010, which listed "weighted grids" in its description. It was
investigated during that work and deliberately not built — it is a bigger change
than the one line suggests.

## Notes
- 2026-08-12: Scoping investigation done as part of 0010 (not a full lab). Findings:

  **The model is friendlier than expected.** `Grid` is `number[][]` (`0 = open,
  1 = wall`, `src/types/steps.ts`), but it is a *throwaway projection*: the user
  edits `walls = reactive(new Set<string>())` in `usePathfinder.ts`, and
  `buildGrid()` materialises the `Grid` per run. The 0/1 encoding is read in
  exactly one place — `gridHelpers().isOpen` in `_utils.ts`. `GridCanvas.vue`
  never receives a `Grid` at all, only the walls Set.

  **Recommended approach:** widen the *encoding*, not the type —
  `0 = open, 1 = wall, n > 1 = open with cost n`. Every existing fixture stays
  literally valid. Add `costAt()` to `gridHelpers`. The `{ wall, cost }[][]`
  cell-object alternative is more self-describing but touches every fixture and
  every `=== 1` comparison, and allocates rows×cols objects per run — not worth
  it for one integer.

  **Call sites to change:** `types/steps.ts`; `_utils.ts` `gridHelpers`; the
  `+ 1` cost literals in `dijkstra.ts`, `astar.ts`, `bellmanFord.ts` and
  Floyd-Warshall's unit-edge init; `usePathfinder.ts` (weights model,
  `buildGrid`, `randomizeWalls`, wall-mode controls); `GridCanvas.vue`
  (`GridMode`/`MODE_LABELS`, the `cellClass` precedence chain, `cellState`/
  `cellLabel`, legend); `GridCanvas.test.ts` (hardcoded prop set);
  `pathfinding.test.ts` (`makeOpenGrid`, fixtures, `isValidPath`'s `=== 1`).

  **The biggest cost is not any of those.** Weights change what the *existing*
  algorithms mean. BFS is only optimal on a uniform grid, yet its registry
  description promises "Guarantees the shortest path", and the
  `bfs/dijkstra/astar find equally-shortest paths` tests stop holding. That is
  design work, not a mechanical edit, and it is the strongest argument for
  scoping this separately. Suggested resolution: keep BFS/DFS unweighted on
  purpose and make that contrast the lesson.

  **URL compatibility is a non-issue, but there is a different trap.**
  `pathfinderUrlParams` writes only `algo`, `speed`, `seed`, `start`, `end` —
  no wall param, no version field. The "versioned base64+RLE format" mentioned
  in `usePathfinder.ts` describes a design that was *considered and rejected*
  ("Hand-painted walls do not survive a share link"), so no existing share link
  encodes grid contents and none can break. `useUrlState` is additively safe by
  construction. **The real hazard is `seed`:** `randomizeWalls` draws exactly one
  `rng.next()` per non-start/end cell in row-major order, so if weight generation
  draws from that same Rng, every existing `?seed=` link silently reproduces a
  different maze. Mitigation: generate weights from a separately constructed
  `createRng(seed ^ CONSTANT)`.

  **Rough estimate:** 2-3 days. ~0.5d encoding + `costAt` + four call sites +
  tests; ~1d GridCanvas brush/rendering/legend/a11y + test prop churn; ~0.5d
  usePathfinder weights + split RNG stream; ~0.5-1d the BFS/DFS honesty problem;
  +0.5d optional URL serialisation.
