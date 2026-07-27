<script setup>
import { watch } from 'vue';
import { usePathfinder } from '@/composables/usePathfinder';
import PathfindingAlgorithmSelector from '../components/pathfinding/PathfindingAlgorithmSelector.vue';
import PathfindingControls from '../components/pathfinding/PathfindingControls.vue';
import GridCanvas from '../components/pathfinding/GridCanvas.vue';
import PathfindingStats from '../components/pathfinding/PathfindingStats.vue';

const finder = usePathfinder();

// Switching algorithms mid-view resets any finished run to a clean state so
// the grid isn't left painted from a previous algorithm's run.
watch(finder.algoKey, () => {
  if (finder.isDone.value) finder.reset();
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <PathfindingAlgorithmSelector
        v-model="finder.algoKey.value"
        :disabled="!finder.canEdit.value"
      />
      <PathfindingControls
        v-model:speed="finder.speed.value"
        :status="finder.status.value"
        :can-edit="finder.canEdit.value"
        :is-running="finder.isRunning.value"
        :is-paused="finder.isPaused.value"
        @run="finder.run()"
        @pause="finder.pause()"
        @reset="finder.reset()"
        @clear-walls="finder.clearWalls()"
        @randomize-walls="finder.randomizeWalls()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <PathfindingStats
        :visited-count="finder.stats.visitedCount"
        :path-length="finder.stats.pathLength"
        :elapsed-ms="finder.stats.elapsedMs"
        :status="finder.status.value"
      />
      <GridCanvas
        class="flex-1"
        :rows="finder.rows"
        :cols="finder.cols"
        :walls="finder.walls"
        :start="finder.start"
        :end="finder.end"
        :visited="finder.visited.value"
        :frontier="finder.frontier.value"
        :path="finder.path.value"
        :can-edit="finder.canEdit.value"
        @toggle-wall="finder.toggleWall($event.row, $event.col)"
        @place-start="finder.placeStart($event.row, $event.col)"
        @place-end="finder.placeEnd($event.row, $event.col)"
      />
    </div>
  </div>
</template>
