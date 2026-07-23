<script setup>
import { watch } from 'vue';
import { useSorter } from './composables/useSorter.js';
import AlgorithmSelector from './components/AlgorithmSelector.vue';
import ControlsPanel from './components/ControlsPanel.vue';
import BarChart from './components/BarChart.vue';
import StatsDisplay from './components/StatsDisplay.vue';
import ThemeToggle from './components/ThemeToggle.vue';

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
  <div class="min-h-screen">
    <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <!-- Header -->
      <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" class="h-6 w-6">
              <line x1="6" y1="20" x2="6" y2="14" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="18" y1="20" x2="18" y2="10" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">AlgoViz</h1>
            <p class="text-xs text-slate-400 sm:text-sm">Interactive sorting algorithm visualizer</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <!-- Layout: sidebar controls + main visualization -->
      <div class="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
        <!-- Left column -->
        <div class="flex flex-col gap-4">
          <AlgorithmSelector v-model="sorter.algoKey.value" :disabled="!sorter.canEdit.value" />
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
        </div>

        <!-- Right column -->
        <div class="flex flex-col gap-4">
          <StatsDisplay
            :comparisons="sorter.stats.comparisons"
            :swaps="sorter.stats.swaps"
            :steps="sorter.stats.steps"
            :elapsed-ms="sorter.stats.elapsedMs"
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

      <footer class="mt-8 text-center text-xs text-slate-400">
        Built with Vue 3, Vite &amp; Tailwind CSS · each algorithm is a generator yielding step snapshots.
      </footer>
    </div>
  </div>
</template>
