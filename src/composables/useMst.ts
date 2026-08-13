import { computed, reactive, ref } from 'vue';
import { algorithms } from '@/algorithms/dsu';
import type { DsuAlgoKey, DsuCategoryStep } from '@/algorithms/dsu';
import { source, sourceMap } from '@/algorithms/dsu/source';
import { pseudocode } from '@/algorithms/dsu/pseudocode';
import { mstCues } from '@/algorithms/dsu/mstCues';
import { generateGraph } from '@/algorithms/graph/graphModel';
import { NO_CUES } from '@/audio/cues';
import type { DsuOp, DsuSnapshot, GraphModel, NodeId } from '@/types';
import type { GraphTone } from '@/components/graph/tones';
import { createRng, randomSeed } from '@/utils/rng';
import { useStepPlayer } from './useStepPlayer';
import { useAudioCues } from './useAudioCues';
import { useUrlState } from './useUrlState';
import { mstUrlParams } from './urlParams';

/**
 * useMst — the union-find / MST category's binding between step snapshots and
 * reactive UI state.
 *
 * All playback (the timer chain, the status machine, the snapshot tape that
 * makes stepping backwards possible) lives in `useStepPlayer`. What remains
 * here is what is genuinely category-specific: the weighted graph, the DSU
 * operation script, and what a `DsuStep` or an `MstStep` means when painted.
 *
 * ONE PLAYER, TWO STEP SHAPES. The category holds three algorithms across two
 * completely different inputs — `dsu` runs a script of operations with no
 * graph at all, `kruskal`/`prim` run on a weighted graph — and it still uses a
 * single `useStepPlayer<DsuStep | MstStep>`. Two players (one per shape) was
 * the first design and it lost badly: every consumer would then need to know
 * which player is live, `canEdit`/`cursor`/`status` would exist twice, and
 * switching algorithms would leave the other player's stale state on screen.
 * Both step types satisfy the player's `{ done: boolean }` bound and both carry
 * a `kind` discriminant, so one player with a narrowing `applyStep` costs a
 * single `if` and keeps one status machine for the whole view.
 *
 * `applyStep` is absolute on both sides of that narrowing — every field is
 * assigned from the snapshot on every call, including the fields the *other*
 * step kind owns. That is what keeps the idempotence contract in
 * `useStepPlayer` (lines 52-59) intact: a scrub backwards from an MST run into
 * a DSU run must not leave accepted edges painted on the canvas.
 */
export interface UseMstOptions {
  /**
   * Whether this instance drives the shared audio engine. Mirrors
   * `useSorter`'s option of the same name, and exists for the same reason: two
   * instances ticking into one engine make a muddle, not a duet.
   */
  audio?: boolean;
}

/** Live MST state. Mirrors the matching fields on `MstStep`. */
interface MstHighlights {
  consideringEdge: string | null;
  acceptedEdges: string[];
  rejectedEdges: string[];
  queue: string[];
  totalWeight: number;
  components: number;
}

const DEFAULT_NODE_COUNT = 8;
export const MST_NODE_MIN = 3;
export const MST_NODE_MAX = 14;
export const MST_MAX_WEIGHT = 20;

/** The forest a DSU run starts from: n singletons, every counter at zero. */
function idleForest(n: number): DsuSnapshot {
  return {
    parent: Array.from({ length: n }, (_, i) => i),
    rank: new Array<number>(n).fill(0),
    setSize: new Array<number>(n).fill(1),
    findPath: [],
    compressed: [],
    finds: 0,
    unions: 0,
    compressions: 0,
    maxDepth: 0,
  };
}

/**
 * A reproducible starter script, so the DSU view has something worth running
 * on first paint instead of an empty list and a disabled Run button.
 *
 * Weighted towards unions early and finds late, because a find over a forest
 * of singletons compresses nothing and teaches nothing — the interesting walk
 * only exists once the unions have built some height.
 */
export function defaultOpScript(nodeCount: number, seed: number): DsuOp[] {
  const rng = createRng(seed);
  const n = Math.max(2, nodeCount);
  const ops: DsuOp[] = [];

  for (let i = 0; i < Math.min(6, n - 1); i++) {
    ops.push({ kind: 'union', a: rng.int(0, n - 1), b: rng.int(0, n - 1) });
  }
  for (let i = 0; i < 3; i++) {
    ops.push({ kind: 'find', a: rng.int(0, n - 1) });
  }
  return ops;
}

export function useMst(options: UseMstOptions = {}) {
  const { audio = true } = options;
  const cues = useAudioCues();

  // ---- User-configurable inputs ---------------------------------------------
  const algoKey = ref<DsuAlgoKey>('kruskal');
  /** Nodes in the graph, and elements in the standalone forest — one control drives both. */
  const nodeCount = ref(DEFAULT_NODE_COUNT);
  const speed = ref(60); // 1..100, higher = faster
  /** Reproduces the graph exactly, weights included: same seed + same count = same graph. */
  const seed = ref(randomSeed());
  /** The DSU operation script, composed in `DsuOpBuilder.vue` and run as one generator. */
  const opScript = ref<DsuOp[]>([]);
  /** Where Prim starts. Ignored by Kruskal, which has no root. */
  const startId = ref<NodeId | null>(null);

  const graph = ref<GraphModel>({ nodes: [], edges: [], adjacency: new Map() });

  // ---- Live visualization state ---------------------------------------------
  const forest = ref<DsuSnapshot>(idleForest(DEFAULT_NODE_COUNT));
  const highlights = reactive<MstHighlights>({
    consideringEdge: null,
    acceptedEdges: [],
    rejectedEdges: [],
    queue: [],
    totalWeight: 0,
    components: DEFAULT_NODE_COUNT,
  });
  /** DSU-only: the operation being executed and the node under the cursor. */
  const activeOp = ref<DsuOp | null>(null);
  const activeNode = ref<number | null>(null);
  /** The step's own sentence, fed straight to `AvStepInspector`. */
  const explain = ref<string | null>(null);

  const currentAlgo = computed(() => algorithms[algoKey.value]);
  const isDsuMode = computed(() => currentAlgo.value.mode === 'dsu');

  /** Edges in the order Kruskal will consider them — what `EdgeList.vue` renders. */
  const sortedEdges = computed(() =>
    [...graph.value.edges].sort((a, b) => {
      const delta = (a.weight ?? 1) - (b.weight ?? 1);
      return delta !== 0 ? delta : a.id.localeCompare(b.id);
    }),
  );

  /**
   * Root of `index` in the current snapshot's parent array.
   *
   * Walks the raw array rather than asking a `DisjointSet`, because the view
   * only ever holds a *snapshot* — the live structure belongs to a generator
   * that has already moved on. Bounded by a visit count so a corrupted array
   * from a hand-edited URL cannot hang a render.
   */
  function rootOf(parent: readonly number[], index: number): number {
    let at = index;
    for (let guard = 0; guard < parent.length && parent[at] !== at; guard++) at = parent[at];
    return at;
  }

  /** Graph node id -> its 0..n-1 DSU slot. `generateGraph` numbers ids that way already. */
  const slotOf = computed(() => new Map(graph.value.nodes.map((node, i) => [node.id, i])));

  // GraphCanvas is a dumb renderer that only understands GraphTone (see
  // tones.ts). These computeds are the one place MST's own vocabulary —
  // considering / accepted / rejected — is translated into it.
  //
  // Precedence is decided > undecided: an edge lands in `acceptedEdges` or
  // `rejectedEdges` on the same step it is still the `consideringEdge`, and on
  // that step the verdict is the thing worth seeing, not the fact that it was
  // being looked at.
  const edgeTone = computed<Map<string, GraphTone>>(() => {
    const tones = new Map<string, GraphTone>();
    for (const id of highlights.rejectedEdges) tones.set(id, 'rejected');
    for (const id of highlights.acceptedEdges) tones.set(id, 'accepted');
    if (highlights.consideringEdge !== null && !tones.has(highlights.consideringEdge)) {
      tones.set(highlights.consideringEdge, 'considering');
    }
    return tones;
  });

  const nodeTone = computed<Map<NodeId, GraphTone>>(() => {
    const tones = new Map<NodeId, GraphTone>();
    const accepted = new Set(highlights.acceptedEdges);

    for (const edge of graph.value.edges) {
      if (!accepted.has(edge.id)) continue;
      tones.set(edge.from, 'accepted');
      tones.set(edge.to, 'accepted');
    }

    // The two endpoints of the edge under the cursor override, so it is
    // obvious which pair the "same set?" question is being asked about.
    const considering = graph.value.edges.find((e) => e.id === highlights.consideringEdge);
    if (considering) {
      tones.set(considering.from, 'considering');
      tones.set(considering.to, 'considering');
    }
    return tones;
  });

  /**
   * Each node's DSU set root, rendered as a badge under it on the canvas.
   *
   * This is the whole bridge between the two panels: the badge is what lets
   * you see that two nodes are already in the same set *before* the edge
   * between them turns red, which is the decision Kruskal is actually making.
   */
  const nodeBadge = computed<Map<NodeId, string>>(() => {
    const badges = new Map<NodeId, string>();
    if (isDsuMode.value) return badges;

    const parent = forest.value.parent;
    for (const node of graph.value.nodes) {
      const slot = slotOf.value.get(node.id);
      if (slot === undefined || slot >= parent.length) continue;
      const root = rootOf(parent, slot);
      badges.set(node.id, `set ${graph.value.nodes[root]?.label ?? root}`);
    }
    return badges;
  });

  /** Everything `MstStats.vue` shows. Read off the snapshot, never accumulated. */
  const stats = computed(() => ({
    finds: forest.value.finds,
    unions: forest.value.unions,
    compressions: forest.value.compressions,
    maxDepth: forest.value.maxDepth,
    totalWeight: highlights.totalWeight,
    components: highlights.components,
  }));

  function resetMstHighlights() {
    highlights.consideringEdge = null;
    highlights.acceptedEdges = [];
    highlights.rejectedEdges = [];
    highlights.queue = [];
    highlights.totalWeight = 0;
    highlights.components = isDsuMode.value ? nodeCount.value : graph.value.nodes.length;
  }

  function resetVisual() {
    forest.value = idleForest(isDsuMode.value ? nodeCount.value : graph.value.nodes.length);
    activeOp.value = null;
    activeNode.value = null;
    explain.value = null;
    resetMstHighlights();
  }

  const player = useStepPlayer<DsuCategoryStep>({
    speed,
    createGenerator: () => {
      resetVisual();

      const entry = currentAlgo.value;
      // The registry's `mode` discriminant is what makes this legal: on this
      // side of the branch TypeScript knows the generator's real signature, so
      // neither call needs a cast. See `algorithms/dsu/index.ts` for why the
      // registry is a union rather than one widened function type.
      if (entry.mode === 'dsu') {
        return entry.generator(nodeCount.value, [...opScript.value]);
      }

      if (graph.value.nodes.length === 0) return null;
      const root = typeof startId.value === 'number' ? startId.value : graph.value.nodes[0].id;
      return entry.generator(graph.value, root);
    },

    // Every field is assigned from the snapshot on every call — including the
    // fields belonging to the *other* step kind, which are cleared rather than
    // left alone. Nothing accumulates, so showing step N produces the same
    // picture however the cursor got there.
    applyStep: (step) => {
      forest.value = step.forest;
      explain.value = step.explain;

      if (step.kind === 'dsu') {
        activeOp.value = step.op;
        activeNode.value = step.active;
        highlights.consideringEdge = null;
        highlights.acceptedEdges = [];
        highlights.rejectedEdges = [];
        highlights.queue = [];
        highlights.totalWeight = 0;
        highlights.components = step.forest.parent.filter((p, i) => p === i).length;
        return;
      }

      activeOp.value = null;
      activeNode.value = null;
      highlights.consideringEdge = step.consideringEdge;
      highlights.acceptedEdges = step.acceptedEdges;
      highlights.rejectedEdges = step.rejectedEdges;
      highlights.queue = step.queue;
      highlights.totalWeight = step.totalWeight;
      highlights.components = step.components;
    },

    clearStep: resetVisual,

    // Passing `undefined` rather than a callback with an internal `if audio`
    // lets the player's `?.` short-circuit at zero per-tick cost. `algoKey` is
    // read at fire time so the resolver always matches whatever is running.
    onAdvance: audio ? (step) => cues.play(mstCues[algoKey.value]?.(step) ?? NO_CUES) : undefined,
  });

  /**
   * Rebuild the weighted graph from the current seed and return to idle.
   *
   * `weighted: true` is the whole reason this category asked for the option:
   * the weights come out of the same seeded `Rng` as the edges themselves, so
   * one seed reproduces the graph *and* its costs — which is what makes a
   * shared link show the same MST rather than a differently-priced one.
   */
  function generate(keepStart = false) {
    // Fresh Rng per call: a long-lived instance would keep advancing, so
    // regenerating with the same seed would silently stop being reproducible.
    graph.value = generateGraph(nodeCount.value, createRng(seed.value), {
      weighted: true,
      maxWeight: MST_MAX_WEIGHT,
    });

    const keep = keepStart && startId.value !== null && graph.value.adjacency.has(startId.value);
    if (!keep) startId.value = graph.value.nodes[0]?.id ?? null;

    player.reset();
  }

  /** Replace the DSU operation script. Refused mid-run, like every other dataset edit. */
  function setOpScript(ops: readonly DsuOp[]) {
    if (!player.canEdit.value) return;
    opScript.value = [...ops];
    player.reset();
  }

  /** Build a fresh reproducible script from the current seed and node count. */
  function randomizeOpScript() {
    setOpScript(defaultOpScript(nodeCount.value, seed.value));
  }

  /** Let the user click a node to pick where Prim starts. */
  function setStart(id: NodeId) {
    if (!player.canEdit.value) return;
    if (!graph.value.adjacency.has(id)) return;
    startId.value = id;
  }

  function randomizeSeed() {
    seed.value = randomSeed();
    generate();
    randomizeOpScript();
  }

  /** The pseudocode line responsible for the step on screen; null when untagged. */
  const activeLine = computed(() => player.current.value?.line ?? null);

  /** Hand-written pseudocode for the running algorithm; empty renders the panel's empty state. */
  const pseudocodeLines = computed<readonly string[]>(() => pseudocode[algoKey.value] ?? []);

  /** The running generator's own file, for the code panel's source mode. */
  const sourceCode = computed(() => source[algoKey.value]);

  /**
   * Source lines (0-based) responsible for the step on screen. One tag can sit
   * on several yields, so this is a list. Derived off the snapshot like
   * `activeLine`, never accumulated, so it stays correct under a backward
   * scrub or an arbitrary seek.
   */
  const activeSourceLines = computed(() => {
    const line = player.current.value?.line;
    if (line === undefined) return [];
    return sourceMap(algoKey.value).get(line) ?? [];
  });

  /** True when this algorithm has cue mappings; drives the UI hint. */
  const hasSoundCues = computed(() => algoKey.value in mstCues);

  // Hydrate from the URL BEFORE the initial generate(): a shared seed or node
  // count must be in place before the first graph is built, or the link
  // reproduces a different graph — with different weights, and so a different
  // MST.
  const { hydrated } = useUrlState(
    mstUrlParams({ algoKey, nodeCount, speed, seed, startId, opScript }),
  );

  // Seed an initial graph and script so the view has something to show on
  // mount, keeping whatever came from a shared link rather than overwriting it:
  // `generate()` would otherwise reset Prim's root to node 0, and the starter
  // script would overwrite a script the link spelled out in full.
  generate(hydrated.has('start'));
  if (!hydrated.has('ops')) opScript.value = defaultOpScript(nodeCount.value, seed.value);

  return {
    // ---- inputs ----
    //
    // The shareable surface, mirrored into the query as `algo`, `n`, `speed`,
    // `seed`, `start` and `ops` — see `mstUrlParams`, which spells the script
    // out literally (`ops=u3.4-f7-u0.1`) rather than as an index into anything,
    // so a link keeps meaning the same run forever.
    algoKey,
    nodeCount,
    speed,
    seed,
    opScript,
    startId,

    // ---- state ----
    graph,
    sortedEdges,
    forest,
    highlights,
    activeOp,
    activeNode,
    explain,
    stats,
    nodeTone,
    edgeTone,
    nodeBadge,
    currentAlgo,
    isDsuMode,
    activeLine,
    pseudocodeLines,
    sourceCode,
    activeSourceLines,
    hasSoundCues,

    // ---- playback ----
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

    // ---- controls ----
    generate,
    setOpScript,
    randomizeOpScript,
    randomizeSeed,
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
