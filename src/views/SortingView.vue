<script setup lang="ts">
import { watch } from 'vue';
import { useSorter } from '@/composables/useSorter';
import { algorithms } from '@/algorithms';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import ControlsPanel from '../components/ControlsPanel.vue';
import PlaybackScrubber from '../components/PlaybackScrubber.vue';
import BarChart from '../components/BarChart.vue';
import StatsDisplay from '../components/StatsDisplay.vue';

const sorter = useSorter();

// Changing the size slider (only possible while editable) rebuilds the dataset.
watch(sorter.size, () => {
  if (sorter.canEdit.value) sorter.generate();
});

// Switching algorithms mid-view resets any finished run to a clean state so the
// bars aren't left painted green from a previous algorithm.
watch(sorter.algoKey, () => {
  if (sorter.isDone.value) sorter.reset();
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <AvAlgorithmSelector
        v-model="sorter.algoKey.value"
        :algorithms="algorithms"
        :columns="3"
        :disabled="!sorter.canEdit.value"
      />
      <ControlsPanel
        v-model:size="sorter.size.value"
        v-model:speed="sorter.speed.value"
        :status="sorter.status.value"
        :can-edit="sorter.canEdit.value"
        :is-running="sorter.isRunning.value"
        :is-paused="sorter.isPaused.value"
        @generate="sorter.generate()"
        @run="sorter.run()"
        @pause="sorter.pause()"
        @reset="sorter.reset()"
      />
      <PlaybackScrubber
        :cursor="sorter.cursor.value"
        :buffered-count="sorter.bufferedCount.value"
        :fully-buffered="sorter.fullyBuffered.value"
        :can-step-back="sorter.canStepBack.value"
        :can-step-forward="sorter.canStepForward.value"
        @seek="sorter.seek($event)"
        @step-back="sorter.stepBack()"
        @step-forward="sorter.stepForward()"
        @skip-to-end="sorter.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <StatsDisplay
        :comparisons="sorter.stats.comparisons"
        :swaps="sorter.stats.swaps"
        :steps="sorter.stepCount.value"
        :elapsed-ms="sorter.elapsedMs.value"
        :status="sorter.status.value"
      />
      <BarChart
        class="flex-1"
        :array="sorter.array.value"
        :comparing="sorter.highlights.comparing"
        :swapping="sorter.highlights.swapping"
        :sorted="sorter.highlights.sorted"
        :max-value="sorter.maxValue.value"
      />
    </div>
  </div>
</template>
