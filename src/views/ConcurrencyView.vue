<script setup lang="ts">
import { computed } from 'vue';
import { useConcurrency } from '@/composables/useConcurrency';
import ConcurrencyControls from '@/components/concurrency/ConcurrencyControls.vue';
import ConcurrencyGuide from '@/components/concurrency/ConcurrencyGuide.vue';
import ScheduleList from '@/components/concurrency/ScheduleList.vue';
import ThreadLanes from '@/components/concurrency/ThreadLanes.vue';
import PlaybackScrubber from '@/components/PlaybackScrubber.vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';
import AvStatusPill from '@/components/ui/AvStatusPill.vue';

const concurrency = useConcurrency();

const selected = computed(() => concurrency.selected.value);

const verdict = computed(() => {
  const outcome = selected.value;
  if (!outcome) return 'No interleaving selected.';
  if (!outcome.violates) return 'This ordering is safe — the invariant holds at every step.';
  return `This ordering breaks the invariant, first at step ${outcome.firstViolationIndex + 1}.`;
});

// Not a run-status pill — a two-way search verdict — but it shares the same
// pill shape, so it borrows AvStatusPill rather than re-declaring its own
// class record. `running`/`error` are picked only for their colour (green vs
// rose, matching the original emerald/rose), with the wording overridden.
const verdictStatus = computed(() => (selected.value?.violates ? 'error' : 'running'));
const verdictLabel = computed(() => (selected.value?.violates ? 'Buggy ordering' : 'Safe ordering'));

const cells = computed(() => [
  { label: 'Step', value: `${concurrency.stats.executed} / ${concurrency.stats.total}` },
  { label: 'Broken', value: (concurrency.search.value?.violatingCount ?? 0).toLocaleString() },
  { label: 'Checked', value: (concurrency.search.value?.checkedCount ?? 0).toLocaleString() },
  {
    label: 'Coverage',
    value: concurrency.search.value?.mode === 'exhaustive' ? 'all' : 'sampled',
  },
]);
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <ConcurrencyGuide />
      <ConcurrencyControls
        v-model:scenario="concurrency.scenarioKey.value"
        v-model:speed="concurrency.speed.value"
        :status="concurrency.status.value"
        :can-edit="concurrency.canEdit.value"
        :is-running="concurrency.isRunning.value"
        :is-paused="concurrency.isPaused.value"
        :has-schedule="concurrency.schedule.value.length > 0"
        :seed="concurrency.seed.value"
        @run="concurrency.run()"
        @pause="concurrency.pause()"
        @reset="concurrency.reset()"
        @randomize="concurrency.randomizeSeed()"
        @update:seed="concurrency.seed.value = $event"
      />
      <PlaybackScrubber
        :cursor="concurrency.cursor.value"
        :buffered-count="concurrency.bufferedCount.value"
        :fully-buffered="concurrency.fullyBuffered.value"
        :can-step-back="concurrency.canStepBack.value"
        :can-step-forward="concurrency.canStepForward.value"
        @seek="concurrency.seek($event)"
        @step-back="concurrency.stepBack()"
        @step-forward="concurrency.stepForward()"
        @skip-to-end="concurrency.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <AvPanel title="Search">
        <template #header>
          <AvStatusPill :status="verdictStatus" :label="verdictLabel" />
        </template>
        <div class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <AvStatCell
            v-for="cell in cells"
            :key="cell.label"
            :label="cell.label"
            :value="cell.value"
          />
        </div>
        <p class="text-sm text-ink-muted">{{ verdict }}</p>
      </AvPanel>

      <ScheduleList
        :outcomes="concurrency.search.value?.outcomes ?? []"
        :selected="concurrency.schedule.value"
        :summary="concurrency.summary.value"
        @select="concurrency.selectSchedule($event)"
      />

      <ThreadLanes
        class="flex-1"
        :scenario="concurrency.scenario.value"
        :threads="concurrency.threads.value"
        :shared-mem="concurrency.sharedMem.value"
        :lock-owners="concurrency.lockOwners.value"
        :last-action="concurrency.lastAction.value"
        :violated="concurrency.violatedNow.value"
      />
    </div>
  </div>
</template>
