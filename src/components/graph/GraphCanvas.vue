<script setup>
import { computed } from 'vue';

const props = defineProps({
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true },
  visited: { type: Array, default: () => [] },
  frontier: { type: Array, default: () => [] },
  current: { type: [Number, String], default: null },
  startId: { type: [Number, String], default: null },
  canEdit: { type: Boolean, default: false },
});

const emit = defineEmits(['set-start']);

// Build O(1) lookup structures so per-node/edge class resolution stays cheap
// even while a traversal is animating many steps per second.
const visitedSet = computed(() => new Set(props.visited));
const frontierSet = computed(() => new Set(props.frontier));
const nodeById = computed(() => new Map(props.nodes.map((n) => [n.id, n])));

function edgeIsVisited(edge) {
  return visitedSet.value.has(edge.from) && visitedSet.value.has(edge.to);
}

// Color precedence: current > visited > frontier > default.
function nodeColorClass(id) {
  if (id === props.current) return 'fill-rose-500';
  if (visitedSet.value.has(id)) return 'fill-emerald-500';
  if (frontierSet.value.has(id)) return 'fill-amber-400';
  return 'fill-indigo-500/80 dark:fill-indigo-400/80';
}

function onNodeClick(id) {
  if (!props.canEdit) return;
  emit('set-start', id);
}
</script>

<template>
  <div class="av-card flex h-full flex-col p-4 sm:p-5">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Graph</h2>
      <!-- Color legend -->
      <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-indigo-500/80 dark:bg-indigo-400/80" />Unvisited</span>
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-amber-400" />Frontier</span>
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-rose-500" />Current</span>
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-emerald-500" />Visited</span>
      </div>
    </div>

    <div class="flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40">
      <svg viewBox="0 0 400 400" class="h-full max-h-[480px] w-full max-w-[480px]">
        <line
          v-for="edge in edges"
          :key="edge.id"
          :x1="nodeById.get(edge.from)?.x"
          :y1="nodeById.get(edge.from)?.y"
          :x2="nodeById.get(edge.to)?.x"
          :y2="nodeById.get(edge.to)?.y"
          stroke-width="2"
          :class="edgeIsVisited(edge) ? 'stroke-emerald-500' : 'stroke-slate-300 dark:stroke-slate-700'"
        />

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
              node.id === startId ? 'stroke-white dark:stroke-slate-100' : 'stroke-transparent',
            ]"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="central"
            class="pointer-events-none select-none fill-white text-[10px] font-semibold"
          >
            {{ node.label }}
          </text>
        </g>
      </svg>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Click a node to set the traversal start point.
    </p>
  </div>
</template>
