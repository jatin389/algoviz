<script setup lang="ts">
import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';

const props = defineProps<{
  visitedCount: number;
  pathLength: number;
  elapsedMs: number;
  status: AlgoStatus;
}>();

const elapsedLabel = computed(() => `${(props.elapsedMs / 1000).toFixed(2)}s`);

const statusLabel = computed(
  () =>
    ({ idle: 'Idle', running: 'Running', paused: 'Paused', done: 'Finished' })[props.status] ??
    props.status,
);
const statusClass = computed(
  () =>
    ({
      idle: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      running: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
      paused: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
      done: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    })[props.status],
);

const cells = computed(() => [
  { label: 'Visited', value: props.visitedCount.toLocaleString() },
  { label: 'Path Length', value: props.pathLength.toLocaleString() },
  { label: 'Elapsed', value: elapsedLabel.value },
]);

// A path always includes at least the start cell once found, so "steps"
// (edges walked) is one less than the cell count.
const hasPath = computed(() => props.status === 'done' && props.pathLength > 0);
const noPath = computed(() => props.status === 'done' && props.pathLength === 0);
const stepCount = computed(() => Math.max(props.pathLength - 1, 0));
</script>

<template>
  <AvPanel title="Stats">
    <template #header>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
        :class="statusClass"
      >
        {{ statusLabel }}
      </span>
    </template>

    <div class="grid grid-cols-3 gap-2">
      <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
    </div>

    <div
      v-if="hasPath"
      class="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    >
      Path found ({{ stepCount }} steps)
    </div>
    <div
      v-else-if="noPath"
      class="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    >
      No path exists
    </div>
  </AvPanel>
</template>
