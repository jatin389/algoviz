<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSearcher } from '@/composables/useSearcher';
import { algorithms } from '@/algorithms/search';
import { parseArrayInput } from '@/utils/parseArray';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import SearchControls from '../components/search/SearchControls.vue';
import PlaybackScrubber from '../components/PlaybackScrubber.vue';
import DatasetPanel from '../components/DatasetPanel.vue';
import SearchBarChart from '../components/search/SearchBarChart.vue';
import SearchStats from '../components/search/SearchStats.vue';

const searcher = useSearcher();

// Parsing lives here rather than in DatasetPanel, so that component stays a
// dumb renderer like every other one in this repo.
const customArray = ref('');
const customError = ref<string | null>(null);

function applyCustomArray() {
  const { values, error } = parseArrayInput(customArray.value);
  customError.value = error;
  // Binary search needs sorted input, so useSearcher sorts whatever it is given.
  if (!error) searcher.setArray(values);
}

// Changing the size slider (only possible while editable) rebuilds the dataset.
watch(searcher.size, () => {
  if (searcher.canEdit.value) searcher.generate();
});

// Typing a seed rebuilds from it, which is what makes a seed reproducible:
// the same number always yields the same array and target.
watch(searcher.seed, () => {
  if (searcher.canEdit.value) searcher.generate();
});

// Switching algorithms mid-view resets any finished run to a clean state so the
// bars aren't left painted from a previous algorithm's run.
watch(searcher.algoKey, () => {
  if (searcher.isDone.value) searcher.reset();
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <AvAlgorithmSelector
        v-model="searcher.algoKey.value"
        :algorithms="algorithms"
        :columns="3"
        :disabled="!searcher.canEdit.value"
      />
      <SearchControls
        v-model:size="searcher.size.value"
        v-model:speed="searcher.speed.value"
        v-model:target="searcher.target.value"
        :status="searcher.status.value"
        :can-edit="searcher.canEdit.value"
        :is-running="searcher.isRunning.value"
        :is-paused="searcher.isPaused.value"
        @pick-present-target="searcher.pickPresentTarget()"
        @pick-missing-target="searcher.pickMissingTarget()"
        @generate="searcher.generate()"
        @run="searcher.run()"
        @pause="searcher.pause()"
        @reset="searcher.reset()"
      />
      <DatasetPanel
        v-model:custom="customArray"
        :seed="searcher.seed.value"
        :error="customError"
        :can-edit="searcher.canEdit.value"
        @update:seed="searcher.seed.value = $event"
        @apply="applyCustomArray()"
        @randomize="searcher.randomizeSeed()"
      />
      <PlaybackScrubber
        :cursor="searcher.cursor.value"
        :buffered-count="searcher.bufferedCount.value"
        :fully-buffered="searcher.fullyBuffered.value"
        :can-step-back="searcher.canStepBack.value"
        :can-step-forward="searcher.canStepForward.value"
        @seek="searcher.seek($event)"
        @step-back="searcher.stepBack()"
        @step-forward="searcher.stepForward()"
        @skip-to-end="searcher.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <SearchStats
        :comparisons="searcher.stats.comparisons"
        :steps="searcher.stepCount.value"
        :elapsed-ms="searcher.elapsedMs.value"
        :status="searcher.status.value"
        :found-index="searcher.foundIndex.value"
      />
      <SearchBarChart
        class="flex-1"
        :array="searcher.array.value"
        :low="searcher.highlights.low"
        :high="searcher.highlights.high"
        :checking="searcher.highlights.checking"
        :found-index="searcher.foundIndex.value"
        :max-value="searcher.maxValue.value"
      />
    </div>
  </div>
</template>
