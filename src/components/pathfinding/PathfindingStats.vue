<script setup lang="ts">
import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';
import AvStatusPill from '@/components/ui/AvStatusPill.vue';

const props = defineProps<{
  visitedCount: number;
  pathLength: number;
  elapsedMs: number;
  status: AlgoStatus;
}>();

const elapsedLabel = computed(() => `${(props.elapsedMs / 1000).toFixed(2)}s`);

// Pathfinding has a better word than the pill's default "Done" for a finished run.
const statusLabel = computed(() => (props.status === 'done' ? 'Finished' : undefined));

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
      <AvStatusPill :status="status" :label="statusLabel" />
    </template>

    <div class="grid grid-cols-3 gap-2">
      <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
    </div>

    <div
      v-if="hasPath"
      class="mt-3 rounded-xl bg-ok-soft px-3 py-2 text-center text-sm font-semibold text-ok-ink"
    >
      Path found ({{ stepCount }} steps)
    </div>
    <div
      v-else-if="noPath"
      class="mt-3 rounded-xl bg-warn-soft px-3 py-2 text-center text-sm font-semibold text-warn-ink"
    >
      No path exists
    </div>
  </AvPanel>
</template>
