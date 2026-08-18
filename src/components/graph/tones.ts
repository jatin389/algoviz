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
//
// The graph-facing names stay — they are what the algorithms actually mean —
// but the colours now come from the app-wide AlgoTone vocabulary rather than
// from literals held here. Two graph tones can share one AlgoTone: MST's
// 'considering' IS a probe and its 'accepted' IS settled, which is a fact
// about the algorithms, not a coincidence of palette.

import {
  TONE_FILL,
  TONE_STROKE,
  toneLegend,
  type AlgoTone,
  type LegendItem,
} from '@/theme/tones';

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

/** How each graph-facing tone maps onto the app-wide state vocabulary. */
const AS_ALGO_TONE: Record<GraphTone, AlgoTone> = {
  idle: 'idle',
  frontier: 'probe',
  current: 'active',
  visited: 'settled',
  considering: 'probe',
  accepted: 'settled',
  rejected: 'rejected',
};

export const NODE_TONE_CLASS: Record<GraphTone, string> = {
  idle: TONE_FILL.idle,
  frontier: TONE_FILL.probe,
  current: TONE_FILL.active,
  visited: TONE_FILL.settled,
  considering: TONE_FILL.probe,
  accepted: TONE_FILL.settled,
  rejected: TONE_FILL.rejected,
};

export const EDGE_TONE_CLASS: Record<GraphTone, string> = {
  idle: TONE_STROKE.idle,
  frontier: TONE_STROKE.probe,
  current: TONE_STROKE.active,
  visited: TONE_STROKE.settled,
  considering: TONE_STROKE.probe,
  accepted: TONE_STROKE.settled,
  rejected: TONE_STROKE.rejected,
};

/**
 * The default legend for a traversal. Derived from the tone map rather than
 * written out as a parallel list of swatch classes, so it cannot drift from
 * what NODE_TONE_CLASS actually paints — which is what the old hand-mirrored
 * version was already at risk of doing.
 */
export const DEFAULT_TRAVERSAL_LEGEND: LegendItem[] = toneLegend([
  { tone: AS_ALGO_TONE.idle, label: 'Unvisited' },
  { tone: AS_ALGO_TONE.frontier, label: 'Frontier' },
  { tone: AS_ALGO_TONE.current, label: 'Current' },
  { tone: AS_ALGO_TONE.visited, label: 'Visited' },
]);

export { AS_ALGO_TONE };
