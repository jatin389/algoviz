// One shared colour vocabulary for every algorithm that paints onto
// GraphCanvas — traversal (BFS/DFS/cycle-detection/bipartite-check) today,
// MST (Kruskal/Prim) alongside it.
//
// Why a shared enum instead of each vertical inventing its own tone names:
// GraphCanvas is a dumb renderer (see its own header comment) that must not
// know which algorithm produced the state it's drawing. If traversal kept
// passing bespoke `visited`/`frontier`/`current` props while MST invented its
// own `accepted`/`rejected` props, the canvas would need an if/else per
// vertical to decide which prop set is live — exactly the coupling a shared
// `GraphTone` avoids. One `Map<NodeId, GraphTone>` / `Map<edgeId, GraphTone>`
// pair covers both: a vertical that doesn't use a given tone (traversal never
// emits 'accepted') simply never puts it in the map, and any id absent from
// the map renders as 'idle'.

export type GraphTone =
  // Traversal (BFS/DFS/cycle-detection/bipartite-check)
  | 'idle'
  | 'frontier'
  | 'current'
  | 'visited'
  // MST (Kruskal/Prim)
  | 'considering'
  | 'accepted'
  | 'rejected';

/**
 * Node fill classes. The four traversal tones are pinned to the exact
 * classes GraphCanvas.vue used before this refactor — the Graph tab's
 * rendering must stay byte-identical, so these are not "reasonable
 * equivalents", they are the original literals moved here verbatim.
 *
 * The three MST tones are new: 'considering' reuses the 'frontier' amber
 * (both mean "under evaluation right now"), 'accepted' reuses the 'visited'
 * emerald (both mean "settled, part of the result"), and 'rejected' gets a
 * muted rose distinct from 'current's full-strength rose-500 — a rejected
 * edge is a past decision to look past, not something demanding attention
 * the way the traversal cursor does.
 */
export const NODE_TONE_CLASS: Record<GraphTone, string> = {
  idle: 'fill-indigo-500/80 dark:fill-indigo-400/80',
  frontier: 'fill-amber-400',
  current: 'fill-rose-500',
  visited: 'fill-emerald-500',
  considering: 'fill-amber-400',
  accepted: 'fill-emerald-500',
  rejected: 'fill-rose-400/60 dark:fill-rose-500/50',
};

/**
 * Edge stroke classes. 'idle' and 'visited' are pinned to GraphCanvas.vue's
 * original literals for the same reason as above. Edges never actually
 * carried a 'frontier' or 'current' tone in the traversal view (only
 * `edgeIsVisited` existed), so those two entries are filled in for type
 * completeness with the same hue family as the matching node tone, kept
 * ready for a caller that does want to paint an in-progress edge.
 */
export const EDGE_TONE_CLASS: Record<GraphTone, string> = {
  idle: 'stroke-slate-300 dark:stroke-slate-700',
  frontier: 'stroke-amber-400/70',
  current: 'stroke-rose-500',
  visited: 'stroke-emerald-500',
  considering: 'stroke-amber-400',
  accepted: 'stroke-emerald-500',
  rejected: 'stroke-rose-400/50 dark:stroke-rose-500/40',
};

/**
 * The legend GraphCanvas.vue rendered inline before this refactor, extracted
 * verbatim so it can be both the default `legend` prop (keeping the Graph tab
 * unchanged with zero caller-side wiring) and a value the MST view can start
 * from if it wants a similar look. Swatch classes are the `bg-*` counterpart
 * of each tone's `fill-*` class in NODE_TONE_CLASS, since a legend swatch is
 * a small filled square, not an SVG shape with its own `fill` attribute.
 */
export const DEFAULT_TRAVERSAL_LEGEND: { label: string; class: string }[] = [
  { label: 'Unvisited', class: 'bg-indigo-500/80 dark:bg-indigo-400/80' },
  { label: 'Frontier', class: 'bg-amber-400' },
  { label: 'Current', class: 'bg-rose-500' },
  { label: 'Visited', class: 'bg-emerald-500' },
];
