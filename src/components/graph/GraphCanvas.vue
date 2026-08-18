<script setup lang="ts">
import { computed } from 'vue';
import type { GraphEdge, GraphNode, NodeId } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import { NODE_TONE_CLASS, EDGE_TONE_CLASS, DEFAULT_TRAVERSAL_LEGEND } from './tones';
import type { GraphTone } from './tones';
import type { LegendItem } from '@/theme/tones';

// Dumb renderer, deliberately: this component knows how to draw a node-link
// graph and nothing about what BFS, DFS, cycle-detection, bipartite-check, or
// (soon) Kruskal/Prim mean. Every algorithm-specific decision — which node is
// "current", which edges are in the spanning tree so far — comes in pre-baked
// as a `GraphTone` (see tones.ts) so this file never needs an if/else per
// algorithm family. See useGraphTraversal.ts for where the traversal
// vertical turns its visited/frontier/current state into tone maps.

const props = withDefaults(
  defineProps<{
    nodes: GraphNode[];
    edges: GraphEdge[];
    /** Absent id => 'idle'. */
    nodeTone?: Map<NodeId, GraphTone>;
    /** Keyed by edge.id (the stable "min-max" string, not array index); absent => 'idle'. */
    edgeTone?: Map<string, GraphTone>;
    /** Small label beneath a node — MST uses this for the node's DSU set root. */
    nodeBadge?: Map<NodeId, string>;
    /** Render edge.weight as a label at the edge midpoint. */
    showWeights?: boolean;
    legend?: LegendItem[];
    title?: string;
    hint?: string;
    startId?: NodeId | null;
    canEdit?: boolean;
  }>(),
  {
    nodeTone: () => new Map(),
    edgeTone: () => new Map(),
    nodeBadge: () => new Map(),
    showWeights: false,
    legend: () => DEFAULT_TRAVERSAL_LEGEND,
    title: 'Graph',
    hint: 'Click a node to set the traversal start point.',
    startId: null,
    canEdit: false,
  },
);

const emit = defineEmits<{
  'set-start': [id: NodeId];
}>();

// O(1) lookup structures so per-node/edge class resolution stays cheap even
// while a traversal (or an MST run) is animating many steps per second.
// The explicit type arguments are what let the `[n.id, n]` literal be read as
// a Map entry tuple rather than a two-element array — same trick graphModel.ts
// uses when it builds the adjacency map.
const nodeById = computed(() => new Map<number, GraphNode>(props.nodes.map((n) => [n.id, n])));

// Edge label positions are pure arithmetic on the two endpoints' fixed
// coordinates — this codebase never measures the DOM for SVG geometry (see
// the header comment in graphModel.ts) — precomputed into a map for the same
// O(1)-lookup-while-animating reason as nodeById above, rather than
// recomputed inline on every one of the three template reads that need it.
const edgeMidpoints = computed(() => {
  const midpoints = new Map<string, { x: number; y: number }>();
  for (const edge of props.edges) {
    const from = nodeById.value.get(edge.from);
    const to = nodeById.value.get(edge.to);
    if (from && to) midpoints.set(edge.id, { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 });
  }
  return midpoints;
});

function nodeColorClass(id: NodeId): string {
  return NODE_TONE_CLASS[props.nodeTone.get(id) ?? 'idle'];
}

function edgeColorClass(edge: GraphEdge): string {
  return EDGE_TONE_CLASS[props.edgeTone.get(edge.id) ?? 'idle'];
}

// 'accepted' (an MST tree edge) draws a hair thicker than every other tone,
// including the plain traversal 'visited' look, so the finished spanning
// tree reads as its own structure against the considered/rejected edges
// still on screen rather than blending into "just another coloured line".
function edgeStrokeWidth(edge: GraphEdge): number {
  return props.edgeTone.get(edge.id) === 'accepted' ? 3 : 2;
}

function onNodeClick(id: NodeId) {
  if (!props.canEdit) return;
  emit('set-start', id);
}
</script>

<template>
  <AvPanel class="flex h-full flex-col">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-faint">{{ title }}</h2>
      <AvLegend :items="legend" />
    </div>

    <div
      class="flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-surface-alt p-3"
    >
      <svg viewBox="0 0 400 400" class="h-full max-h-[480px] w-full max-w-[480px]">
        <line
          v-for="edge in edges"
          :key="edge.id"
          :x1="nodeById.get(edge.from)?.x"
          :y1="nodeById.get(edge.from)?.y"
          :x2="nodeById.get(edge.to)?.x"
          :y2="nodeById.get(edge.to)?.y"
          :stroke-width="edgeStrokeWidth(edge)"
          :class="edgeColorClass(edge)"
        />

        <!-- Weight labels get their own pass, after every line, so a label
             never sits underneath a later edge drawn on top of it. Each
             label carries a filled backing rect (rather than a `paint-order:
             stroke` halo) so the readable area stays a predictable rectangle
             regardless of whether the weight is one or two digits wide. -->
        <template v-if="showWeights">
          <g v-for="edge in edges" :key="`w-${edge.id}`">
            <template v-if="edge.weight !== undefined && edgeMidpoints.get(edge.id)">
              <rect
                :x="edgeMidpoints.get(edge.id)!.x - 10"
                :y="edgeMidpoints.get(edge.id)!.y - 7"
                width="20"
                height="14"
                rx="3"
                class="fill-surface-alt"
              />
              <text
                :x="edgeMidpoints.get(edge.id)!.x"
                :y="edgeMidpoints.get(edge.id)!.y"
                text-anchor="middle"
                dominant-baseline="central"
                class="pointer-events-none select-none fill-ink-muted text-[9px] font-semibold"
              >
                {{ edge.weight }}
              </text>
            </template>
          </g>
        </template>

        <g
          v-for="node in nodes"
          :key="node.id"
          class="cursor-pointer"
          @click="onNodeClick(node.id)"
        >
          <circle
            :cx="node.x"
            :cy="node.y"
            r="16"
            :stroke-width="node.id === startId ? 3 : 0"
            class="transition-colors duration-150 ease-out"
            :class="[
              nodeColorClass(node.id),
              node.id === startId ? 'stroke-accent' : 'stroke-transparent',
            ]"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="central"
            class="pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"
          >
            {{ node.label }}
          </text>
          <text
            v-if="nodeBadge.get(node.id) !== undefined"
            :x="node.x"
            :y="node.y + 27"
            text-anchor="middle"
            class="pointer-events-none select-none fill-ink-faint text-[9px] font-medium"
          >
            {{ nodeBadge.get(node.id) }}
          </text>
        </g>
      </svg>
    </div>

    <p class="mt-3 text-center text-xs text-ink-faint">
      {{ hint }}
    </p>
  </AvPanel>
</template>
