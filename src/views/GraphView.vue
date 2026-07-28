<script setup lang="ts">
import { watch } from 'vue';
import { useGraphTraversal } from '@/composables/useGraphTraversal';
import { algorithms } from '@/algorithms/graph';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import GraphControls from '../components/graph/GraphControls.vue';
import GraphCanvas from '../components/graph/GraphCanvas.vue';
import GraphStats from '../components/graph/GraphStats.vue';

const traversal = useGraphTraversal();

// Switching algorithms mid-view resets a finished run to a clean state so the
// graph isn't left painted from a previous algorithm's traversal.
watch(traversal.algoKey, () => {
  if (traversal.isDone.value) traversal.reset();
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <AvAlgorithmSelector
        v-model="traversal.algoKey.value"
        :algorithms="algorithms"
        title="Traversal Algorithm"
        :disabled="!traversal.canEdit.value"
      />
      <GraphControls
        v-model:speed="traversal.speed.value"
        :status="traversal.status.value"
        :can-edit="traversal.canEdit.value"
        :is-running="traversal.isRunning.value"
        :is-paused="traversal.isPaused.value"
        @generate="traversal.generate()"
        @run="traversal.run()"
        @pause="traversal.pause()"
        @reset="traversal.reset()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <GraphStats
        :visited-count="traversal.stats.visitedCount"
        :total-nodes="traversal.stats.totalNodes"
        :steps="traversal.stepCount.value"
        :elapsed-ms="traversal.elapsedMs.value"
        :status="traversal.status.value"
      />
      <GraphCanvas
        class="flex-1"
        :nodes="traversal.graph.value.nodes"
        :edges="traversal.graph.value.edges"
        :visited="traversal.highlights.visited"
        :frontier="traversal.highlights.frontier"
        :current="traversal.highlights.current"
        :start-id="traversal.startId.value"
        :can-edit="traversal.canEdit.value"
        @set-start="traversal.setStart($event)"
      />
    </div>
  </div>
</template>
