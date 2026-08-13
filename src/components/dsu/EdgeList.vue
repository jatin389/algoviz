<script setup lang="ts">
// The weight-sorted edge queue Kruskal (and, for its candidate list, Prim)
// walks through: every edge in the graph, in the order it will be — or was
// — considered, tagged accepted / rejected / pending, with the edge under
// the cursor right now picked out.
//
// Closest existing analogue is ScheduleList.vue: both are "here is the whole
// candidate set, and here is where we are in it" panels driven by string ids
// rather than array indices, for the same reason — an edge's `id` is stable
// across a resort/regenerate in a way a positional index is not.
//
// Status precedence mirrors `edgeTone` in useMst.ts exactly: decided beats
// undecided. An edge lands in accepted/rejected on the very same step it is
// still the `consideringEdge` (both Kruskal and Prim keep `considering` set
// through the decision step so the verdict paints onto the edge that was
// just highlighted, not a blank one) — and on that step the verdict is what
// is worth reading, not the fact that it was being looked at a moment ago.

import { computed, nextTick, ref, watch } from 'vue';
import type { GraphEdge, GraphNode } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';

const props = defineProps<{
  /** Weight-sorted already — useMst.sortedEdges. This component does not resort. */
  edges: GraphEdge[];
  /** For resolving an endpoint id to its display label. */
  nodes: GraphNode[];
  consideringEdge: string | null;
  acceptedEdges: string[];
  rejectedEdges: string[];
}>();

type EdgeStatus = 'accepted' | 'rejected' | 'considering' | 'pending';

const LEGEND = [
  { label: 'Pending', class: 'bg-slate-300 dark:bg-slate-600' },
  { label: 'Considering', class: 'bg-amber-400' },
  { label: 'Accepted', class: 'bg-emerald-500' },
  { label: 'Rejected', class: 'bg-rose-400/60 dark:bg-rose-500/50' },
];

const STATUS_ROW_CLASS: Record<EdgeStatus, string> = {
  pending: 'border-slate-200 dark:border-slate-700',
  considering: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
  accepted: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
  rejected: 'border-rose-300 bg-rose-50/70 dark:border-rose-800 dark:bg-rose-900/10',
};

const STATUS_DOT_CLASS: Record<EdgeStatus, string> = {
  pending: 'bg-slate-300 dark:bg-slate-600',
  considering: 'bg-amber-400',
  accepted: 'bg-emerald-500',
  rejected: 'bg-rose-400/60 dark:bg-rose-500/50',
};

// O(1) membership checks while a run can repaint several times a second —
// same reasoning GraphCanvas.vue gives for its own lookup maps.
const acceptedSet = computed(() => new Set(props.acceptedEdges));
const rejectedSet = computed(() => new Set(props.rejectedEdges));
const nodeLabel = computed(() => new Map(props.nodes.map((n) => [n.id, n.label])));

function labelFor(id: number): string {
  return nodeLabel.value.get(id) ?? String(id);
}

function statusFor(edge: GraphEdge): EdgeStatus {
  if (acceptedSet.value.has(edge.id)) return 'accepted';
  if (rejectedSet.value.has(edge.id)) return 'rejected';
  if (edge.id === props.consideringEdge) return 'considering';
  return 'pending';
}

const acceptedCount = computed(() => props.acceptedEdges.length);
const rejectedCount = computed(() => props.rejectedEdges.length);

// Auto-scroll the edge under consideration into view, the same courtesy
// CodePanel.vue extends its own active line — without it, a ~60-edge queue
// scrolls the interesting row out of frame long before a run finishes.
const list = ref<HTMLElement | null>(null);
watch(
  () => props.consideringEdge,
  async () => {
    if (props.consideringEdge === null) return;
    await nextTick();
    const active = list.value?.querySelector('[data-active="true"]');
    // jsdom leaves scrollIntoView undefined, so guard rather than blow up a
    // test that happens to mount this panel — CodePanel.vue does the same.
    active?.scrollIntoView?.({ block: 'nearest' });
  },
);
</script>

<template>
  <AvPanel title="Edge Queue">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
      <AvLegend :items="LEGEND" />
      <p class="text-xs text-slate-400">
        {{ acceptedCount }} accepted &middot; {{ rejectedCount }} rejected &middot;
        {{ edges.length }} total
      </p>
    </div>

    <p v-if="edges.length === 0" class="py-6 text-center text-sm text-slate-400">
      No edges yet — generate a graph to build the queue.
    </p>

    <ol v-else ref="list" class="max-h-72 space-y-1 overflow-y-auto pr-1">
      <li
        v-for="edge in edges"
        :key="edge.id"
        :data-active="edge.id === consideringEdge"
        class="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors"
        :class="STATUS_ROW_CLASS[statusFor(edge)]"
      >
        <span class="flex items-center gap-2">
          <i class="h-2.5 w-2.5 flex-none rounded-full" :class="STATUS_DOT_CLASS[statusFor(edge)]" />
          <span class="font-mono font-semibold text-slate-700 dark:text-slate-200">
            {{ labelFor(edge.from) }} &ndash; {{ labelFor(edge.to) }}
          </span>
        </span>
        <span class="font-mono text-slate-500 dark:text-slate-400">w={{ edge.weight ?? 1 }}</span>
      </li>
    </ol>

    <p class="mt-3 text-center text-xs text-slate-400">
      Lightest edges first — the exact order Kruskal considers them in.
    </p>
  </AvPanel>
</template>
