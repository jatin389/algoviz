import { ref, reactive, computed } from 'vue';
import { generateGraph } from '@/algorithms/graph/graphModel';
import { algorithms } from '@/algorithms/graph';
import type { GraphAlgoKey } from '@/algorithms/graph';
import type { GraphModel, GraphStep, NodeId } from '@/types';
import type { GraphTone } from '@/components/graph/tones';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useUrlState } from './useUrlState';
import { graphUrlParams } from './urlParams';

const DEFAULT_NODE_COUNT = 10;

/** The three node buckets the diagram paints; `current` is the node just popped. */
interface TraversalHighlights {
  visited: NodeId[];
  frontier: NodeId[];
  current: NodeId | null;
}

/**
 * useGraphTraversal — graph traversal's binding between step snapshots and
 * reactive UI state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is the part that is genuinely traversal-specific: the graph, the
 * chosen start node, and what a `GraphStep` means when painted onto the
 * diagram.
 */
export function useGraphTraversal() {
  // ---- User-configurable inputs ---------------------------------------------
  const graph = ref<GraphModel>({ nodes: [], edges: [], adjacency: new Map() });
  const algoKey = ref<GraphAlgoKey>('bfs');
  const startId = ref<NodeId | null>(null);
  const speed = ref(60); // 1..100, higher = faster
  const seed = ref(randomSeed());

  // ---- Live visualization state ---------------------------------------------
  const highlights = reactive<TraversalHighlights>({ visited: [], frontier: [], current: null });

  // `steps` and `elapsedMs` deliberately do NOT live here. They are properties
  // of playback, not of the algorithm, and a running `steps += 1` in applyStep
  // would silently corrupt itself the moment a user scrubs backwards.
  const stats = reactive({ visitedCount: 0, totalNodes: 0 });

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  // GraphCanvas is a dumb renderer that only understands GraphTone (see
  // tones.ts) — it has no idea what "visited"/"frontier"/"current" mean for
  // this particular algorithm family. These two computeds are the one place
  // that translates traversal's own vocabulary into that shared one, so the
  // rest of this file (and GraphView.vue) can keep talking about
  // visited/frontier/current, which is what every generator in
  // algorithms/graph already yields.
  //
  // Precedence mirrors exactly what GraphCanvas.vue computed inline before
  // this refactor: current > visited > frontier > idle. An id absent from
  // the map renders 'idle', so nothing below the first matching branch needs
  // to be written explicitly.
  const nodeTone = computed<Map<NodeId, GraphTone>>(() => {
    const tones = new Map<NodeId, GraphTone>();
    const visitedSet = new Set(highlights.visited);
    const frontierSet = new Set(highlights.frontier);
    for (const node of graph.value.nodes) {
      if (node.id === highlights.current) tones.set(node.id, 'current');
      else if (visitedSet.has(node.id)) tones.set(node.id, 'visited');
      else if (frontierSet.has(node.id)) tones.set(node.id, 'frontier');
    }
    return tones;
  });

  // An edge is 'visited' only once BOTH endpoints are — matching the old
  // `edgeIsVisited` in GraphCanvas.vue exactly — because a half-visited edge
  // (one endpoint reached, one still ahead) is still an edge the traversal
  // hasn't finished crossing, not a completed step of it.
  const edgeTone = computed<Map<string, GraphTone>>(() => {
    const tones = new Map<string, GraphTone>();
    const visitedSet = new Set(highlights.visited);
    for (const edge of graph.value.edges) {
      if (visitedSet.has(edge.from) && visitedSet.has(edge.to)) tones.set(edge.id, 'visited');
    }
    return tones;
  });

  function resetHighlights() {
    highlights.visited = [];
    highlights.frontier = [];
    highlights.current = null;
  }

  function resetStats() {
    stats.visitedCount = 0;
    stats.totalNodes = graph.value.nodes.length;
  }

  const player = useStepPlayer<GraphStep>({
    speed,
    // No start node picked yet means there is nothing to traverse; returning
    // null tells useStepPlayer to refuse to start, same as the old early
    // return at the top of run().
    createGenerator: () => {
      if (startId.value === null) return null;
      resetHighlights();
      resetStats();
      return currentAlgo.value.generator(graph.value.adjacency, startId.value);
    },
    // Every field is copied straight off the snapshot rather than accumulated,
    // so showing step N produces the same highlights however the cursor got there.
    applyStep: (step) => {
      highlights.visited = step.visited;
      highlights.frontier = step.frontier;
      highlights.current = step.current;
      stats.visitedCount = step.visited.length;
    },
    clearStep: () => {
      resetHighlights();
      resetStats();
    },
  });

  /**
   * Build a fresh random graph and return to a clean idle state.
   *
   * `keepStart` exists for the one call made straight after URL hydration: a
   * shared link's start node must survive, or the link does not reproduce what
   * was shared. It is honoured only if that node exists in the new graph.
   */
  function generate(keepStart = false) {
    // Fresh Rng per call: a long-lived instance would keep advancing, so
    // regenerating with the same seed would silently stop being reproducible.
    graph.value = generateGraph(DEFAULT_NODE_COUNT, createRng(seed.value));
    const keep = keepStart && startId.value !== null && graph.value.adjacency.has(startId.value);
    if (!keep) startId.value = graph.value.nodes[0]?.id ?? null;
    player.reset();
  }

  /** Let the user click a node to pick where the traversal starts. */
  function setStart(id: NodeId) {
    if (!player.canEdit.value) return;
    if (!graph.value.adjacency.has(id)) return;
    startId.value = id;
  }

  // Hydrate from the URL BEFORE the initial generate(): a shared seed must be
  // in place before the first graph is built, or the link reproduces the
  // wrong graph.
  const { hydrated } = useUrlState(graphUrlParams({ algoKey, speed, seed, startId }));

  // Seed an initial graph so the UI has something to show on mount, keeping a
  // start node that came from a shared link rather than overwriting it.
  generate(hydrated.has('start'));

  return {
    // inputs
    graph,
    algoKey,
    startId,
    speed,
    seed,
    // state
    highlights,
    nodeTone,
    edgeTone,
    stats,
    currentAlgo,
    // playback
    status: player.status,
    isRunning: player.isRunning,
    isPaused: player.isPaused,
    isDone: player.isDone,
    canEdit: player.canEdit,
    delayMs: player.delayMs,
    elapsedMs: player.elapsedMs,
    stepCount: player.stepCount,
    cursor: player.cursor,
    bufferedCount: player.bufferedCount,
    fullyBuffered: player.fullyBuffered,
    current: player.current,
    canStepBack: player.canStepBack,
    canStepForward: player.canStepForward,
    // controls
    generate,
    setStart,
    run: player.run,
    pause: player.pause,
    reset: player.reset,
    stepForward: player.stepForward,
    stepBack: player.stepBack,
    seek: player.seek,
    skipToEnd: player.skipToEnd,
  };
}
