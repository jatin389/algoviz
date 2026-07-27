<script setup lang="ts">
import { computed } from 'vue';
import { useBST } from '@/composables/useBST';
import type { BSTNode, BSTPhase } from '@/types';
import BstControls from '../components/datastructures/BstControls.vue';
import TreeDiagram from '../components/datastructures/TreeDiagram.vue';

/** The paint states TreeDiagram understands, keyed off the current BST phase. */
type NodeState = 'default' | 'visiting' | 'inserted' | 'removing';

/** One positioned node handed to TreeDiagram. */
interface DiagramNode {
  id: number;
  x: number;
  y: number;
  value: number;
  state: NodeState;
}

/** A parent -> child link, referenced by node id. */
interface DiagramEdge {
  from: number;
  to: number;
}

/** Layout bookkeeping: `node`/`depth` are used here and dropped before render. */
interface LayoutNode {
  id: number;
  x: number;
  y: number;
  value: number;
  node: BSTNode;
  depth: number;
}

// Self-contained root: no props in, no changes to any other file needed to
// render this view standalone.
const bst = useBST();

const X_SPACING = 50;
const Y_SPACING = 60;
const X_MARGIN = 40;
const Y_MARGIN = 40;

// Classic simple tree layout: an in-order walk assigns each node an
// increasing x slot (so left-subtree nodes always sit left of their parent),
// while y is just depth * spacing. Not balanced-aware, but predictable and
// cheap, which is all a live-editable visualizer needs.
function layoutTree(root: BSTNode | null) {
  const nodes: LayoutNode[] = [];
  const edges: DiagramEdge[] = [];
  let nextSlot = 0;

  function walk(node: BSTNode | null, depth: number) {
    if (!node) return;
    walk(node.left, depth + 1);
    const x = X_MARGIN + nextSlot * X_SPACING;
    const y = Y_MARGIN + depth * Y_SPACING;
    nextSlot += 1;
    nodes.push({ id: node.id, x, y, value: node.value, node, depth });
    walk(node.right, depth + 1);
    if (node.left) edges.push({ from: node.id, to: node.left.id });
    if (node.right) edges.push({ from: node.id, to: node.right.id });
  }

  walk(root, 0);
  return { nodes, edges, slotCount: nextSlot };
}

const layout = computed(() => layoutTree(bst.tree.value));

const nodes = computed<DiagramNode[]>(() =>
  layout.value.nodes.map((n) => ({
    id: n.id,
    x: n.x,
    y: n.y,
    value: n.value,
    state: n.id === bst.visiting.value ? stateForPhase(bst.phase.value) : 'default',
  })),
);

function stateForPhase(phase: BSTPhase | null): NodeState {
  if (phase === 'searching') return 'visiting';
  if (phase === 'removing') return 'removing';
  if (phase === 'inserted' || phase === 'deleted') return 'inserted';
  return 'default';
}

const edges = computed(() => layout.value.edges);

const viewBoxWidth = computed(() =>
  Math.max(320, X_MARGIN * 2 + layout.value.slotCount * X_SPACING),
);
const viewBoxHeight = computed(() => {
  const maxDepth = layout.value.nodes.reduce((max, n) => Math.max(max, n.depth), 0);
  return Math.max(200, Y_MARGIN * 2 + maxDepth * Y_SPACING);
});

const isEmpty = computed(() => bst.tree.value === null);
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <BstControls
        :can-edit="bst.canEdit.value"
        :speed="bst.speed.value"
        @insert="bst.insert($event)"
        @remove="bst.remove($event)"
        @seed="bst.seed($event)"
        @reset="bst.reset()"
        @update:speed="bst.speed.value = $event"
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
                bst.status.value === 'idle',
              'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400':
                bst.status.value === 'running',
              'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400':
                bst.status.value === 'done',
            }"
          >
            {{
              bst.status.value === 'running'
                ? 'Running'
                : bst.status.value === 'done'
                  ? 'Done'
                  : 'Idle'
            }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
            <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
              {{ bst.stats.comparisons }}
            </div>
            <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Comparisons
            </div>
          </div>
          <div class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
            <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
              {{ bst.stats.steps }}
            </div>
            <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Steps
            </div>
          </div>
        </div>
      </div>

      <div class="av-card flex min-h-[320px] flex-1 items-center justify-center p-4 sm:p-5">
        <p v-if="isEmpty" class="text-sm text-slate-400">
          The tree is empty — insert a value to get started.
        </p>
        <TreeDiagram
          v-else
          :nodes="nodes"
          :edges="edges"
          :view-box-width="viewBoxWidth"
          :view-box-height="viewBoxHeight"
          class="max-h-[60vh]"
        />
      </div>
    </div>
  </div>
</template>
