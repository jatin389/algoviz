<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSorter } from '@/composables/useSorter';
import { useAudioCues } from '@/composables/useAudioCues';
import { algorithms } from '@/algorithms';
import { parseArrayInput } from '@/utils/parseArray';
import { decodeKey } from '@/utils/urlCodec';
import { useUrlState } from '@/composables/useUrlState';
import { pseudocode } from '@/algorithms/pseudocode';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import ControlsPanel from '../components/ControlsPanel.vue';
import PlaybackScrubber from '../components/PlaybackScrubber.vue';
import CodePanel from '../components/CodePanel.vue';
import DatasetPanel from '../components/DatasetPanel.vue';
import BarChart from '../components/BarChart.vue';
import StatsDisplay from '../components/StatsDisplay.vue';

const sorter = useSorter();
const audio = useAudioCues();

// The challenger in compare mode. syncUrl is off because two instances writing
// `algo` would fight over the query string; the view owns `algo2` instead.
// audio is off too: two instances ticking into one engine make a muddle, not
// a duet — only the primary sorter drives sound.
const rival = useSorter({ syncUrl: false, audio: false });
const compare = ref(false);

useUrlState({
  cmp: {
    ref: compare,
    encode: (on) => (on ? '1' : null),
    decode: (raw) => raw === '1',
  },
  algo2: {
    ref: rival.algoKey,
    encode: (key) => key,
    decode: (raw) => decodeKey(algorithms, raw),
  },
});

// One dataset, two players — a race is only meaningful on identical input.
watch(
  [sorter.baseArray, compare],
  () => {
    if (compare.value) rival.setArray([...sorter.baseArray.value]);
  },
  { immediate: true },
);

// Both charts animate at the same rate, so what differs is purely the algorithm.
watch(sorter.speed, (value) => (rival.speed.value = value), { immediate: true });

// Leaving compare mode clears the challenger rather than leaving it mid-run.
watch(compare, (on) => {
  if (!on) rival.reset();
});

/**
 * The two players tick independently. They deliberately do NOT stay in
 * step-for-step lockstep: different algorithms emit different numbers of steps
 * for the same array, and watching one finish first is the entire point.
 */
function runBoth() {
  sorter.run();
  rival.run();
}

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
      <AvAlgorithmSelector
        v-if="compare"
        v-model="rival.algoKey.value"
        title="Compare against"
        :algorithms="algorithms"
        :columns="3"
        :disabled="!sorter.canEdit.value"
      />
      <!-- @update:sound calls audio.toggle() rather than binding v-model:sound,
           so the click handler that satisfies the autoplay unlock stays an
           explicit call site instead of hiding behind two-way binding sugar. -->
      <ControlsPanel
        v-model:size="sorter.size.value"
        v-model:speed="sorter.speed.value"
        v-model:compare="compare"
        :status="sorter.status.value"
        :can-edit="sorter.canEdit.value"
        :is-running="sorter.isRunning.value"
        :is-paused="sorter.isPaused.value"
        :sound="audio.enabled.value"
        :volume="audio.volume.value"
        :has-sound-cues="sorter.hasSoundCues.value"
        @generate="sorter.generate()"
        @run="sorter.run()"
        @run-both="runBoth()"
        @pause="
          sorter.pause();
          rival.pause();
        "
        @reset="
          sorter.reset();
          rival.reset();
        "
        @update:sound="audio.toggle()"
        @update:volume="audio.setVolume($event)"
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
      <CodePanel
        :lines="pseudocode[sorter.algoKey.value] ?? []"
        :active-line="sorter.activeLine.value"
        :source="sorter.sourceCode.value.text"
        :source-file="sorter.sourceCode.value.file"
        :active-source-lines="sorter.activeSourceLines.value"
      />
    </div>

    <!-- Right column. In compare mode it splits into two independent columns,
         each a full stats + chart stack, so the race reads top to bottom. -->
    <div v-if="compare" class="grid gap-4 lg:grid-cols-2">
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
          :title="sorter.currentAlgo.value.name"
          :array="sorter.array.value"
          :comparing="sorter.highlights.comparing"
          :swapping="sorter.highlights.swapping"
          :sorted="sorter.highlights.sorted"
          :max-value="sorter.maxValue.value"
        />
      </div>
      <div class="flex flex-col gap-4">
        <StatsDisplay
          :comparisons="rival.stats.comparisons"
          :swaps="rival.stats.swaps"
          :steps="rival.stepCount.value"
          :elapsed-ms="rival.elapsedMs.value"
          :status="rival.status.value"
        />
        <!-- The legend is identical for both charts, so it renders once. -->
        <BarChart
          class="flex-1"
          :title="rival.currentAlgo.value.name"
          :show-legend="false"
          :array="rival.array.value"
          :comparing="rival.highlights.comparing"
          :swapping="rival.highlights.swapping"
          :sorted="rival.highlights.sorted"
          :max-value="rival.maxValue.value"
        />
      </div>
    </div>

    <div v-else class="flex flex-col gap-4">
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
