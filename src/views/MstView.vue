<script setup lang="ts">
// Union-Find & MST category root: two-column layout like SearchView.vue,
// with the right column switched cleanly on the selected algorithm instead
// of rendering empty panels for the mode that doesn't apply.
//
// THE SWITCH, AND WHY IT IS A v-if NOT A DISABLED STATE. `dsu` has no graph
// at all — useMst's own header comment calls this out as the whole reason
// one player has to cover two step shapes — so GraphCanvas and EdgeList have
// nothing honest to show while it runs: a graph with every edge idle is not
// "no graph", it is a graph lying about being irrelevant. Hiding the panels
// outright, and giving DsuOpBuilder the same v-if in the left column, keeps
// each mode's screen matching what is actually driving it.

import { computed, watch } from 'vue';
import { useMst } from '@/composables/useMst';
import { algorithms } from '@/algorithms/dsu';
import { toneLegend } from '@/theme/tones';
import type { InspectorRow } from '@/components/ui/AvStepInspector.vue';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import AvStepInspector from '@/components/ui/AvStepInspector.vue';
import PlaybackScrubber from '@/components/PlaybackScrubber.vue';
import CodePanel from '@/components/CodePanel.vue';
import GraphCanvas from '@/components/graph/GraphCanvas.vue';
import MstGuide from '@/components/dsu/MstGuide.vue';
import MstControls from '@/components/dsu/MstControls.vue';
import DsuOpBuilder from '@/components/dsu/DsuOpBuilder.vue';
import MstStats from '@/components/dsu/MstStats.vue';
import DsuForest from '@/components/dsu/DsuForest.vue';
import EdgeList from '@/components/dsu/EdgeList.vue';

const mst = useMst();

// Node count and seed both reshape the dataset (a graph, or a forest sized
// to match), so both follow the exact pattern SearchView/SortingView use for
// their own size/seed sliders: change the ref, then rebuild — but only while
// editing is actually allowed, so a slider dragged mid-run has no effect
// until the run is reset. useMst.randomizeSeed() also calls generate()
// itself; the watcher below fires a second, harmless regenerate on top of
// it, the same small redundancy useSearcher's randomizeSeed + SearchView's
// own seed watcher already accept elsewhere in this codebase.
watch(mst.nodeCount, () => {
  if (mst.canEdit.value) mst.generate();
});
watch(mst.seed, () => {
  if (mst.canEdit.value) mst.generate();
});

// Switching algorithms mid-view resets a finished run to a clean state, so
// neither the forest nor the graph is left painted from whatever the last
// algorithm did — same rule SearchView and GraphView both already apply.
watch(mst.algoKey, () => {
  if (mst.isDone.value) mst.reset();
});

// GraphCanvas is a dumb renderer with its own default legend built for the
// traversal category's tones (Unvisited/Frontier/Current/Visited). This
// category paints a different three tones — considering/accepted/rejected —
// on top of the same idle color, so it needs its own legend rather than one
// that describes tones this view never emits. Built with `toneLegend`, the
// same helper `DEFAULT_TRAVERSAL_LEGEND` itself uses, so this swatch list
// cannot drift from `NODE_TONE_CLASS`'s fills the way a hand-mirrored `bg-*`
// list could.
const GRAPH_LEGEND = toneLegend([
  { tone: 'idle', label: 'Idle' },
  { tone: 'probe', label: 'Considering' },
  { tone: 'settled', label: 'Accepted' },
  { tone: 'rejected', label: 'Rejected' },
]);

// DsuForest defaults to plain numeric indices when `labels` is empty, and
// that default is deliberately what standalone DSU mode gets: there is no
// graph backing those indices in that mode, so borrowing the graph's node
// labels would dress up "just an element count" as if it were "these named
// nodes". In Kruskal/Prim mode the forest's slot i really is graph node i
// (see indexNodes in algorithms/dsu/_utils.ts), so the graph's own labels
// are the honest, more readable choice.
const forestLabels = computed(() =>
  mst.isDsuMode.value ? [] : mst.graph.value.nodes.map((n) => n.label),
);

// GraphCanvas's click-to-set-start affordance only means something for
// Prim, which grows from a root. Kruskal has no root at all — sorting every
// edge by weight does not care where you start — so leaving the click
// handler live there would let a learner "set a start point" that the
// algorithm silently ignores on the very next run. Gating both `canEdit`
// and the hint text on the algorithm, rather than always wiring the click
// and hoping the hint alone stops confusion, is what keeps the affordance
// honest for both algorithms sharing one canvas.
const canSetStart = computed(() => mst.canEdit.value && mst.algoKey.value === 'prim');
const graphHint = computed(() =>
  mst.algoKey.value === 'prim'
    ? "Click a node to set Prim's starting point — the tree grows outward from there."
    : 'Kruskal has no starting point: edges are accepted strictly by weight, regardless of position.',
);

// AvStepInspector is deliberately fed a *derived* formula/rows pair rather
// than raw `activeOp`/`highlights` fields, for the same reason DP and hash
// table feed it their own: the panel's contract is "a headline, a formula
// string, and a row list", and only this view knows which of useMst's two
// step shapes is live right now.
const inspectorFormula = computed(() => {
  if (mst.isDsuMode.value) {
    const op = mst.activeOp.value;
    if (!op) return null;
    return op.kind === 'union' ? `union(${op.a}, ${op.b})` : `find(${op.a})`;
  }
  const edge = mst.graph.value.edges.find((e) => e.id === mst.highlights.consideringEdge);
  if (!edge) return null;
  return `considering ${edge.from}–${edge.to} (weight ${edge.weight ?? 1})`;
});

const inspectorRows = computed<InspectorRow[]>(() => {
  if (mst.isDsuMode.value) {
    return [
      {
        label: 'Active node',
        value: mst.activeNode.value === null ? '—' : String(mst.activeNode.value),
      },
      { label: 'Sets remaining', value: String(mst.stats.value.components) },
    ];
  }
  return [
    {
      label: 'Accepted',
      value: String(mst.highlights.acceptedEdges.length),
      tone: 'good',
    },
    {
      label: 'Rejected',
      value: String(mst.highlights.rejectedEdges.length),
      tone: mst.highlights.rejectedEdges.length > 0 ? 'warn' : 'neutral',
    },
    { label: 'Components left', value: String(mst.highlights.components) },
  ];
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <AvAlgorithmSelector
        v-model="mst.algoKey.value"
        :algorithms="algorithms"
        title="Algorithm"
        :columns="3"
        :disabled="!mst.canEdit.value"
      />
      <MstGuide />
      <MstControls
        :node-count="mst.nodeCount.value"
        :seed="mst.seed.value"
        :speed="mst.speed.value"
        :status="mst.status.value"
        :can-edit="mst.canEdit.value"
        :is-running="mst.isRunning.value"
        :is-paused="mst.isPaused.value"
        @update:node-count="mst.nodeCount.value = $event"
        @update:speed="mst.speed.value = $event"
        @update:seed="mst.seed.value = $event"
        @randomize="mst.randomizeSeed()"
        @generate="mst.generate()"
        @run="mst.run()"
        @pause="mst.pause()"
        @reset="mst.reset()"
      />
      <DsuOpBuilder
        v-if="mst.isDsuMode.value"
        :ops="mst.opScript.value"
        :node-count="mst.nodeCount.value"
        :can-edit="mst.canEdit.value"
        @update:ops="mst.setOpScript($event)"
        @randomize="mst.randomizeOpScript()"
      />
      <PlaybackScrubber
        :cursor="mst.cursor.value"
        :buffered-count="mst.bufferedCount.value"
        :fully-buffered="mst.fullyBuffered.value"
        :can-step-back="mst.canStepBack.value"
        :can-step-forward="mst.canStepForward.value"
        @seek="mst.seek($event)"
        @step-back="mst.stepBack()"
        @step-forward="mst.stepForward()"
        @skip-to-end="mst.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <MstStats
        :stats="mst.stats.value"
        :status="mst.status.value"
        :is-dsu-mode="mst.isDsuMode.value"
      />

      <GraphCanvas
        v-if="!mst.isDsuMode.value"
        :nodes="mst.graph.value.nodes"
        :edges="mst.graph.value.edges"
        :node-tone="mst.nodeTone.value"
        :edge-tone="mst.edgeTone.value"
        :node-badge="mst.nodeBadge.value"
        :show-weights="true"
        :legend="GRAPH_LEGEND"
        title="Graph"
        :hint="graphHint"
        :start-id="mst.startId.value"
        :can-edit="canSetStart"
        @set-start="mst.setStart($event)"
      />

      <DsuForest
        :parent="mst.forest.value.parent"
        :set-size="mst.forest.value.setSize"
        :rank="mst.forest.value.rank"
        :find-path="mst.forest.value.findPath"
        :compressed="mst.forest.value.compressed"
        :active="mst.activeNode.value"
        :labels="forestLabels"
        :title="mst.isDsuMode.value ? 'Disjoint-Set Forest' : 'Underlying Disjoint-Set Forest'"
      />

      <EdgeList
        v-if="!mst.isDsuMode.value"
        :edges="mst.sortedEdges.value"
        :nodes="mst.graph.value.nodes"
        :considering-edge="mst.highlights.consideringEdge"
        :accepted-edges="mst.highlights.acceptedEdges"
        :rejected-edges="mst.highlights.rejectedEdges"
      />

      <AvStepInspector
        :headline="mst.explain.value"
        :formula="inspectorFormula"
        :rows="inspectorRows"
      />

      <CodePanel
        :lines="mst.pseudocodeLines.value"
        :source="mst.sourceCode.value.text"
        :source-file="mst.sourceCode.value.file"
        :active-line="mst.activeLine.value"
        :active-source-lines="mst.activeSourceLines.value"
        title="Code"
      />
    </div>
  </div>
</template>
