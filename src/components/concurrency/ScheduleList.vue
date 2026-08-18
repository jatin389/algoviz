<script setup lang="ts">
// The candidate interleavings, as clickable chips.
//
// Each chip is the schedule itself written as thread letters — `ABABAB` means
// T0, T1, T0, T1… — so the ordering that causes the bug is legible before you
// even press play, and two chips can be compared at a glance.

import { computed } from 'vue';
import type { ScheduleOutcome } from '@/concurrency/execute';
import AvPanel from '@/components/ui/AvPanel.vue';

const props = withDefaults(
  defineProps<{
    outcomes: ScheduleOutcome[];
    selected: number[];
    summary: string;
    /** Chips beyond this stay collapsed; a sampled search can return thousands. */
    limit?: number;
  }>(),
  { limit: 240 },
);

const emit = defineEmits<{ select: [schedule: number[]] }>();

const selectedKey = computed(() => props.selected.join(','));

// Violating first: the whole point of the search is finding the broken ones,
// so making them scroll past the clean ones would bury the answer.
const ordered = computed(() =>
  [...props.outcomes].sort((a, b) => Number(b.violates) - Number(a.violates)),
);
const shown = computed(() => ordered.value.slice(0, props.limit));
const hiddenCount = computed(() => Math.max(0, ordered.value.length - shown.value.length));

function label(schedule: number[]) {
  return schedule.map((id) => String.fromCharCode(65 + id)).join('');
}
</script>

<template>
  <AvPanel title="Interleavings">
    <p class="mb-3 text-xs text-ink-muted">{{ summary }}</p>

    <div class="flex max-h-52 flex-wrap gap-1.5 overflow-y-auto" role="listbox">
      <button
        v-for="outcome in shown"
        :key="outcome.schedule.join(',')"
        type="button"
        role="option"
        :aria-selected="outcome.schedule.join(',') === selectedKey"
        :title="outcome.violates ? 'Breaks the invariant' : 'Invariant holds throughout'"
        class="rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold transition-colors"
        :class="[
          outcome.violates
            ? 'border-danger/40 bg-danger-soft text-danger hover:border-danger'
            : 'border-line text-ink-muted hover:border-accent',
          outcome.schedule.join(',') === selectedKey
            ? 'outline outline-2 outline-offset-1 outline-accent'
            : '',
        ]"
        @click="emit('select', outcome.schedule)"
      >
        {{ label(outcome.schedule) }}
      </button>
    </div>

    <p v-if="hiddenCount > 0" class="nums mt-2 text-xs text-ink-faint">
      + {{ hiddenCount.toLocaleString() }} more not shown.
    </p>
    <p class="mt-3 text-[11px] text-ink-faint">
      Each letter is a thread taking one step. A = T0, B = T1.
    </p>
  </AvPanel>
</template>
