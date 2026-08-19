<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useSandbox } from '@/composables/useSandbox';
import { useIsEmbed } from '@/composables/useIsEmbed';
import CodeEditor from '@/components/sandbox/CodeEditor.vue';
import SandboxGuide from '@/components/sandbox/SandboxGuide.vue';
import SandboxControls from '@/components/sandbox/SandboxControls.vue';
import SandboxStatus from '@/components/sandbox/SandboxStatus.vue';
import PlaybackScrubber from '@/components/PlaybackScrubber.vue';
import SortStage from '@/components/sorting/SortStage.vue';
import StatsDisplay from '@/components/StatsDisplay.vue';

const sandbox = useSandbox();

// The guide is the only thing hidden when embedded. The shared-link banner in
// SandboxStatus deliberately stays: an embed's code always arrives via `src`, so
// `fromSharedLink` is already true, and a reader running a stranger's code on a
// third-party page is exactly who that banner exists for.
const isEmbed = useIsEmbed();

// Changing the dataset invalidates whatever tape was collected against the old
// one: the steps still reference the previous array, so replaying them would
// paint bars that never existed.
watch([sandbox.size, sandbox.seed], () => {
  if (sandbox.phase.value !== 'executing') sandbox.regenerate();
});

// A shared link's whole promise is that opening it shows you the thing. The
// banner in SandboxStatus is what makes that honest rather than silent.
onMounted(() => {
  if (sandbox.fromSharedLink) sandbox.execute();
});

const elapsed = computed(() => sandbox.lastRun.value?.elapsedMs ?? null);
const rejected = computed(() => sandbox.lastRun.value?.rejected ?? 0);
const firstRejectReason = computed(() => sandbox.lastRun.value?.firstRejectReason ?? null);
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,420px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <SandboxGuide v-if="!isEmbed" />
      <CodeEditor v-model="sandbox.source.value" :disabled="sandbox.phase.value === 'executing'" />
      <SandboxControls
        v-model:size="sandbox.size.value"
        v-model:speed="sandbox.speed.value"
        :status="sandbox.status.value"
        :executing="sandbox.phase.value === 'executing'"
        :can-edit="sandbox.canEdit.value"
        :is-running="sandbox.isRunning.value"
        :is-paused="sandbox.isPaused.value"
        :has-tape="sandbox.stepsCollected.value > 0"
        :seed="sandbox.seed.value"
        @execute="sandbox.execute()"
        @cancel="sandbox.cancel()"
        @run="sandbox.run()"
        @pause="sandbox.pause()"
        @reset="sandbox.reset()"
        @randomize="sandbox.randomizeSeed()"
        @reset-source="sandbox.resetSource()"
        @update:seed="sandbox.seed.value = $event"
      />
      <PlaybackScrubber
        :cursor="sandbox.cursor.value"
        :buffered-count="sandbox.bufferedCount.value"
        :fully-buffered="sandbox.fullyBuffered.value"
        :can-step-back="sandbox.canStepBack.value"
        :can-step-forward="sandbox.canStepForward.value"
        @seek="sandbox.seek($event)"
        @step-back="sandbox.stepBack()"
        @step-forward="sandbox.stepForward()"
        @skip-to-end="sandbox.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <SandboxStatus
        :phase="sandbox.phase.value"
        :error="sandbox.error.value"
        :stop-label="sandbox.stopLabel.value"
        :steps-collected="sandbox.stepsCollected.value"
        :rejected="rejected"
        :first-reject-reason="firstRejectReason"
        :elapsed-ms="elapsed"
        :from-shared-link="sandbox.fromSharedLink"
      />
      <StatsDisplay
        :comparisons="sandbox.stats.comparisons"
        :swaps="sandbox.stats.swaps"
        :steps="sandbox.stepCount.value"
        :elapsed-ms="sandbox.elapsedMs.value"
        :status="sandbox.status.value"
      />
      <SortStage
        class="flex-1"
        title="Your algorithm"
        :array="sandbox.array.value"
        :comparing="sandbox.highlights.comparing"
        :swapping="sandbox.highlights.swapping"
        :sorted="sandbox.highlights.sorted"
        :max-value="sandbox.maxValue.value"
      />
    </div>
  </div>
</template>
