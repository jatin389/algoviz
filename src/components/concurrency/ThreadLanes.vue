<script setup lang="ts">
// One lane per thread, each showing that thread's own program with its program
// counter, plus the shared state everyone is fighting over.
//
// The layout is the teaching device: instructions run left to right within a
// lane, but time runs *across* lanes, so a violating interleaving is visible as
// two lanes lit up in the critical section at the same instant. No existing
// view in the app renders more than one actor, so none of this could be reused.

import { computed } from 'vue';
import type { ConcurrencyStep, ThreadState } from '@/types';
import type { Scenario } from '@/concurrency/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import { TONE_SOFT_BG, TONE_INK, TONE_BORDER } from '@/theme/tones';

const props = defineProps<{
  scenario: Scenario;
  threads: ThreadState[];
  sharedMem: Record<string, number>;
  lockOwners: Record<string, number | null>;
  lastAction: ConcurrencyStep['lastAction'];
  violated: boolean;
}>();

/** Per-thread lane rows, pairing each program with its live state. */
const lanes = computed(() =>
  props.scenario.threads.map((program, index) => {
    const state = props.threads[index];
    return {
      name: program.name,
      instructions: program.instructions,
      pc: state?.pc ?? 0,
      status: state?.status ?? 'ready',
      locals: state?.locals ?? {},
      // The instruction that just ran, so it can be lit rather than merely
      // marked complete.
      activeIndex:
        props.lastAction?.threadId === index && state ? state.pc - 1 : -1,
    };
  }),
);

const sharedEntries = computed(() => Object.entries(props.sharedMem));
const lockEntries = computed(() => Object.entries(props.lockOwners));

// Instruction marks read execution state through the seven-tone vocabulary,
// not chrome — `statusPill` below is where the danger/ok signalling lives.
// The instruction that just ran is the cursor (`active`); when it also sits
// inside the scenario's critical section it becomes `blocked` instead —
// borrowing "impassable" for the opposite reason a wall is: this is the
// instruction that ran in a zone mutual exclusion should have kept a single
// thread inside of, so the mark for it reads as the same "this should not be
// crossable" alarm a wall gives a pathfinding grid. Already-executed
// instructions are `settled`; anything still ahead of the program counter is
// untouched, i.e. `idle`.
function instructionClass(laneIndex: number, index: number) {
  const lane = lanes.value[laneIndex];
  if (index === lane.activeIndex) {
    return lane.status === 'critical'
      ? `${TONE_BORDER.blocked} ${TONE_SOFT_BG.blocked} ${TONE_INK.blocked}`
      : `${TONE_BORDER.active} ${TONE_SOFT_BG.active} ${TONE_INK.active}`;
  }
  if (index < lane.pc) {
    return `${TONE_BORDER.settled} ${TONE_SOFT_BG.settled} ${TONE_INK.settled}`;
  }
  return `${TONE_BORDER.idle} ${TONE_INK.idle}`;
}

const statusPill: Record<string, string> = {
  ready: 'bg-surface-alt text-ink-muted',
  critical: 'bg-danger-soft text-danger-ink',
  done: 'bg-ok-soft text-ok-ink',
};
</script>

<template>
  <AvPanel class="flex h-full flex-col" title="Threads">
    <template #header>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
        :class="violated ? 'bg-danger-soft text-danger-ink' : 'bg-ok-soft text-ok-ink'"
      >
        {{ violated ? '✕ invariant broken' : '✓ invariant holds' }}
      </span>
    </template>

    <p class="mb-4 text-xs text-ink-faint">
      {{ scenario.invariant.label }}
    </p>

    <div class="flex flex-col gap-3">
      <div v-for="(lane, laneIndex) in lanes" :key="lane.name" class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs font-bold text-ink-muted">
            {{ lane.name }}
          </span>
          <span
            class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
            :class="statusPill[lane.status]"
          >
            {{ lane.status === 'critical' ? 'in critical section' : lane.status }}
          </span>
          <span
            v-for="(value, key) in lane.locals"
            :key="key"
            class="font-mono text-[11px] text-ink-faint"
          >
            {{ key }}={{ value }}
          </span>
        </div>

        <!-- Horizontal scroll is scoped to the lane so a long program never
             makes the whole page scroll sideways. -->
        <div class="flex gap-1.5 overflow-x-auto pb-1">
          <span
            v-for="(instruction, index) in lane.instructions"
            :key="index"
            class="whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors"
            :class="instructionClass(laneIndex, index)"
          >
            {{ instruction.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Shared state, visually separated from the lanes because it is the one
         thing the threads have in common and the thing they corrupt. -->
    <div class="mt-4 border-t border-line pt-3">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="[key, value] in sharedEntries"
          :key="key"
          class="rounded-lg bg-surface-alt px-2.5 py-1.5 font-mono text-xs text-ink-muted"
        >
          {{ key }}: {{ value }}
        </span>
        <span
          v-for="[name, owner] in lockEntries"
          :key="name"
          class="rounded-lg px-2.5 py-1.5 font-mono text-xs"
          :class="owner === null ? 'bg-surface-alt text-ink-muted' : 'bg-warn-soft text-warn-ink'"
        >
          lock {{ name }}: {{ owner === null ? 'free' : `held by T${owner}` }}
        </span>
      </div>

      <p v-if="lastAction" class="mt-3 font-mono text-xs text-ink-faint">
        T{{ lastAction.threadId }} ran “{{ lastAction.instruction }}”
      </p>
    </div>
  </AvPanel>
</template>
