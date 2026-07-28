import { ref, reactive, computed } from 'vue';
import { generateGraph } from '@/algorithms/graph/graphModel';
import { algorithms } from '@/algorithms/graph';
import type { GraphAlgoKey } from '@/algorithms/graph';
import type { GraphModel, GraphStep, NodeId } from '@/types';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';

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

  /** Build a fresh random graph and return to a clean idle state. */
  function generate() {
    // Fresh Rng per call: a long-lived instance would keep advancing, so
    // regenerating with the same seed would silently stop being reproducible.
    graph.value = generateGraph(DEFAULT_NODE_COUNT, createRng(seed.value));
    startId.value = graph.value.nodes[0]?.id ?? null;
    player.reset();
  }

  /** Let the user click a node to pick where the traversal starts. */
  function setStart(id: NodeId) {
    if (!player.canEdit.value) return;
    if (!graph.value.adjacency.has(id)) return;
    startId.value = id;
  }

  // Seed an initial graph so the UI has something to show on mount.
  generate();

  return {
    // inputs
    graph,
    algoKey,
    startId,
    speed,
    seed,
    // state
    highlights,
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
