<script setup>
import { watch } from 'vue';
import { useSearcher } from '../composables/useSearcher.js';
import SearchAlgorithmSelector from '../components/search/SearchAlgorithmSelector.vue';
import SearchControls from '../components/search/SearchControls.vue';
import SearchBarChart from '../components/search/SearchBarChart.vue';
import SearchStats from '../components/search/SearchStats.vue';

const searcher = useSearcher();

// Changing the size slider (only possible while editable) rebuilds the dataset.
watch(searcher.size, () => {
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
      <SearchAlgorithmSelector
        v-model="searcher.algoKey.value"
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
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <SearchStats
        :comparisons="searcher.stats.comparisons"
        :steps="searcher.stats.steps"
        :elapsed-ms="searcher.stats.elapsedMs"
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
