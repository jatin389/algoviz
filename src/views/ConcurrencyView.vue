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

const concurrency = useConcurrency();

const selected = computed(() => concurrency.selected.value);

const verdict = computed(() => {
  const outcome = selected.value;
  if (!outcome) return 'No interleaving selected.';
  if (!outcome.violates) return 'This ordering is safe — the invariant holds at every step.';
  return `This ordering breaks the invariant, first at step ${outcome.firstViolationIndex + 1}.`;
});

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
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            :class="
              selected?.violates
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
                : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
            "
          >
            {{ selected?.violates ? 'Buggy ordering' : 'Safe ordering' }}
          </span>
        </template>
        <div class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <AvStatCell
            v-for="cell in cells"
            :key="cell.label"
            :label="cell.label"
            :value="cell.value"
          />
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ verdict }}</p>
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
