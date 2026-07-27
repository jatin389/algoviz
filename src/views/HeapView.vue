<script setup>
import { computed } from 'vue';
import { useHeap } from '../composables/useHeap.js';
import HeapControls from '../components/datastructures/HeapControls.vue';
import TreeDiagram from '../components/datastructures/TreeDiagram.vue';

// Self-contained root: no props in, no changes to any other file needed to
// render this view standalone.
const heap = useHeap();

const X_SPACING = 50;
const Y_SPACING = 60;
const X_MARGIN = 40;
const Y_MARGIN = 40;

// The heap array IS a complete binary tree (child i -> 2i+1 / 2i+2), so the
// same in-order-slot layout technique used for the BST applies directly to
// indices instead of node references.
function layoutHeap(a) {
  const nodes = [];
  const edges = [];
  let nextSlot = 0;
  const n = a.length;

  function walk(i, depth) {
    if (i >= n) return;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    walk(left, depth + 1);
    const x = X_MARGIN + nextSlot * X_SPACING;
    const y = Y_MARGIN + depth * Y_SPACING;
    nextSlot += 1;
    nodes.push({ id: i, x, y, value: a[i], depth });
    walk(right, depth + 1);
    if (left < n) edges.push({ from: i, to: left });
    if (right < n) edges.push({ from: i, to: right });
  }

  walk(0, 0);
  return { nodes, edges, slotCount: nextSlot };
}

const layout = computed(() => layoutHeap(heap.heap.value));

// Heap operations don't have a per-node insert/remove "phase" the way BST
// does — comparing maps to the amber "visiting" state and an active swap
// maps to the emerald "inserted" state, since a swap means this pair is
// settling into its resting position for this step.
function stateForIndex(i) {
  if (heap.highlights.comparing.includes(i)) return 'visiting';
  if (heap.highlights.swapping.includes(i)) return 'inserted';
  return 'default';
}

const nodes = computed(() =>
  layout.value.nodes.map((n) => ({
    id: n.id,
    x: n.x,
    y: n.y,
    value: n.value,
    state: stateForIndex(n.id),
  })),
);

const edges = computed(() => layout.value.edges);

const viewBoxWidth = computed(() =>
  Math.max(320, X_MARGIN * 2 + layout.value.slotCount * X_SPACING),
);
const viewBoxHeight = computed(() => {
  const maxDepth = layout.value.nodes.reduce((max, n) => Math.max(max, n.depth), 0);
  return Math.max(200, Y_MARGIN * 2 + maxDepth * Y_SPACING);
});

const isEmpty = computed(() => heap.heap.value.length === 0);
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <HeapControls
        :can-edit="heap.canEdit.value"
        :speed="heap.speed.value"
        :is-min-heap="heap.isMinHeap.value"
        @insert="heap.insert($event)"
        @extract="heap.extractRoot()"
        @toggle-mode="heap.toggleMode()"
        @seed="heap.seed($event)"
        @reset="heap.reset()"
        @update:speed="heap.speed.value = $event"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <div class="av-card p-4 sm:p-5">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Stats</h2>
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            :class="{
              'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400':
                heap.status.value === 'idle',
              'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400':
                heap.status.value === 'running',
              'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400':
                heap.status.value === 'done',
            }"
          >
            {{
              heap.status.value === 'running'
                ? 'Running'
                : heap.status.value === 'done'
                  ? 'Done'
                  : 'Idle'
            }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
            <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
              {{ heap.stats.comparisons }}
            </div>
            <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Comparisons
            </div>
          </div>
          <div class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
            <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
              {{ heap.stats.swaps }}
            </div>
            <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Swaps
            </div>
          </div>
          <div class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
            <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
              {{ heap.stats.steps }}
            </div>
            <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Steps
            </div>
          </div>
        </div>
        <p v-if="heap.lastExtracted.value !== null" class="mt-3 text-center text-xs text-slate-400">
          Last extracted:
          <span class="font-mono font-semibold text-indigo-500 dark:text-indigo-400">{{
            heap.lastExtracted.value
          }}</span>
        </p>
      </div>

      <div class="av-card flex min-h-[280px] flex-1 items-center justify-center p-4 sm:p-5">
        <p v-if="isEmpty" class="text-sm text-slate-400">
          The heap is empty — insert a value to get started.
        </p>
        <TreeDiagram
          v-else
          :nodes="nodes"
          :edges="edges"
          :view-box-width="viewBoxWidth"
          :view-box-height="viewBoxHeight"
          class="max-h-[55vh]"
        />
      </div>

      <!-- Raw array — reinforces that a heap IS an array under the hood. -->
      <div class="av-card p-4 sm:p-5">
        <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Backing Array
        </h2>
        <div v-if="isEmpty" class="text-sm text-slate-400">Empty.</div>
        <div v-else class="flex flex-wrap gap-1.5">
          <div
            v-for="(value, i) in heap.heap.value"
            :key="i"
            class="flex w-12 flex-col items-center overflow-hidden rounded-lg border transition-colors"
            :class="
              stateForIndex(i) === 'visiting'
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30'
                : stateForIndex(i) === 'inserted'
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'
            "
          >
            <div
              class="w-full bg-slate-200/70 py-0.5 text-center text-[10px] font-medium text-slate-500 dark:bg-slate-700/70 dark:text-slate-400"
            >
              {{ i }}
            </div>
            <div class="py-1 font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
              {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
