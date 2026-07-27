import { ref, reactive, computed, onScopeDispose } from 'vue';
import { generateGraph } from '@/algorithms/graph/graphModel';
import { algorithms } from '@/algorithms/graph';
import type { GraphAlgoKey } from '@/algorithms/graph';
import type { AlgoStatus, GraphModel, GraphStep, NodeId, StepGenerator } from '@/types';

const DEFAULT_NODE_COUNT = 10;

/** The three node buckets the diagram paints; `current` is the node just popped. */
interface TraversalHighlights {
  visited: NodeId[];
  frontier: NodeId[];
  current: NodeId | null;
}

/**
 * useGraphTraversal — the animation engine for the graph traversal vertical.
 *
 * Mirrors useSorter.ts/useSearcher.ts: it owns all playback state and drives a
 * traversal generator forward one step at a time on a timer. The generators
 * are pure and know nothing about Vue; this composable is the single bridge
 * between traversal snapshots and reactive UI state.
 *
 * Status machine: idle -> running <-> paused -> done, with reset/generate
 * returning to idle.
 */
export function useGraphTraversal() {
  // ---- User-configurable inputs ---------------------------------------------
  const graph = ref<GraphModel>({ nodes: [], edges: [], adjacency: new Map() });
  const algoKey = ref<GraphAlgoKey>('bfs');
  const startId = ref<NodeId | null>(null);
  const speed = ref(60); // 1..100, higher = faster

  // ---- Live visualization state ---------------------------------------------
  const status = ref<AlgoStatus>('idle');
  const highlights = reactive<TraversalHighlights>({ visited: [], frontier: [], current: null });
  const stats = reactive({ visitedCount: 0, totalNodes: 0, steps: 0, elapsedMs: 0 });

  // ---- Internal (non-reactive) machinery ------------------------------------
  let generator: StepGenerator<GraphStep> | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let startTs = 0;

  // Map the 1..100 speed slider onto a per-step delay in ms.
  // Higher speed -> smaller delay. Range ~ [4ms, 202ms].
  const delayMs = computed(() => Math.max(4, Math.round(204 - speed.value * 2)));

  const isRunning = computed(() => status.value === 'running');
  const isPaused = computed(() => status.value === 'paused');
  const isDone = computed(() => status.value === 'done');
  // Controls that mutate the dataset (or the chosen start node) may only
  // change while nothing is playing.
  const canEdit = computed(() => status.value === 'idle' || status.value === 'done');

  const currentAlgo = computed(() => algorithms[algoKey.value]);

  function resetHighlights() {
    highlights.visited = [];
    highlights.frontier = [];
    highlights.current = null;
  }

  function resetStats() {
    stats.visitedCount = 0;
    stats.totalNodes = graph.value.nodes.length;
    stats.steps = 0;
    stats.elapsedMs = 0;
  }

  /** Build a fresh random graph and return to a clean idle state. */
  function generate() {
    clearTimer();
    generator = null;
    graph.value = generateGraph(DEFAULT_NODE_COUNT);
    startId.value = graph.value.nodes[0]?.id ?? null;
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

  /** Let the user click a node to pick where the traversal starts. */
  function setStart(id: NodeId) {
    if (!canEdit.value) return;
    if (!graph.value.adjacency.has(id)) return;
    startId.value = id;
  }

  function applyStep(step: GraphStep) {
    highlights.visited = step.visited;
    highlights.frontier = step.frontier;
    highlights.current = step.current;
    stats.visitedCount = step.visited.length;
    stats.steps += 1;
    stats.elapsedMs = Date.now() - startTs;
  }

  function tick() {
    if (status.value !== 'running') return;
    // Runtime no-op: tick is only reachable once run() has assigned a
    // generator. It exists so `generator` narrows to non-null below.
    if (!generator) return;
    const { value, done: exhausted } = generator.next();
    if (exhausted || !value) {
      finish();
      return;
    }
    applyStep(value);
    if (value.done) {
      finish();
      return;
    }
    timer = setTimeout(tick, delayMs.value);
  }

  function finish() {
    clearTimer();
    status.value = 'done';
  }

  /** Start a new run, or resume from a paused state. */
  function run() {
    if (status.value === 'running') return;
    if (startId.value === null) return;

    if (status.value === 'paused') {
      status.value = 'running';
      // Keep elapsed timing roughly continuous across the pause.
      startTs = Date.now() - stats.elapsedMs;
      tick();
      return;
    }

    resetHighlights();
    resetStats();
    generator = currentAlgo.value.generator(graph.value.adjacency, startId.value);
    startTs = Date.now();
    status.value = 'running';
    tick();
  }

  function pause() {
    if (status.value !== 'running') return;
    clearTimer();
    status.value = 'paused';
  }

  /** Stop playback and clear any in-progress highlights. */
  function reset() {
    clearTimer();
    generator = null;
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  // Seed an initial graph so the UI has something to show on mount.
  generate();

  // Stop the timer chain if the owning component unmounts mid-run; otherwise
  // tick() keeps recursing against a detached view forever.
  onScopeDispose(clearTimer);

  return {
    // inputs
    graph,
    algoKey,
    startId,
    speed,
    // state
    status,
    highlights,
    stats,
    // derived
    delayMs,
    isRunning,
    isPaused,
    isDone,
    canEdit,
    currentAlgo,
    // controls
    generate,
    setStart,
    run,
    pause,
    reset,
  };
}
