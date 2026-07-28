<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSorter } from '@/composables/useSorter';
import { algorithms } from '@/algorithms';
import { parseArrayInput } from '@/utils/parseArray';
import { pseudocode } from '@/algorithms/pseudocode';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import ControlsPanel from '../components/ControlsPanel.vue';
import PlaybackScrubber from '../components/PlaybackScrubber.vue';
import PseudocodePanel from '../components/PseudocodePanel.vue';
import DatasetPanel from '../components/DatasetPanel.vue';
import BarChart from '../components/BarChart.vue';
import StatsDisplay from '../components/StatsDisplay.vue';

const sorter = useSorter();

// Parsing lives here rather than in DatasetPanel, so that component stays a
// dumb renderer like every other one in this repo.
const customArray = ref('');
const customError = ref<string | null>(null);

function applyCustomArray() {
  const { values, error } = parseArrayInput(customArray.value);
  customError.value = error;
  if (!error) sorter.setArray(values);
}

// Changing the size slider (only possible while editable) rebuilds the dataset.
watch(sorter.size, () => {
  if (sorter.canEdit.value) sorter.generate();
});

// Typing a seed rebuilds from it, which is what makes a seed reproducible:
// the same number always yields the same bars.
watch(sorter.seed, () => {
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
      <DatasetPanel
        v-model:custom="customArray"
        :seed="sorter.seed.value"
        :error="customError"
        :can-edit="sorter.canEdit.value"
        @update:seed="sorter.seed.value = $event"
        @apply="applyCustomArray()"
        @randomize="sorter.randomizeSeed()"
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
      <PseudocodePanel
        :lines="pseudocode[sorter.algoKey.value] ?? []"
        :active-line="sorter.activeLine.value"
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
