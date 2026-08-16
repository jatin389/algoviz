<script setup lang="ts">
import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';
import AvStatusPill from '@/components/ui/AvStatusPill.vue';

const props = defineProps<{
  visitedCount: number;
  totalNodes: number;
  steps: number;
  elapsedMs: number;
  status: AlgoStatus;
}>();

const elapsedLabel = computed(() => `${(props.elapsedMs / 1000).toFixed(2)}s`);

const cells = computed(() => [
  { label: 'Visited', value: `${props.visitedCount} / ${props.totalNodes}` },
  { label: 'Steps', value: props.steps.toLocaleString() },
  { label: 'Elapsed', value: elapsedLabel.value },
]);
</script>

<template>
  <AvPanel title="Stats">
    <template #header>
      <AvStatusPill :status="status" />
    </template>

    <div class="grid grid-cols-3 gap-2">
      <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
    </div>
  </AvPanel>
</template>
