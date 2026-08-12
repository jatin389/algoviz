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

function instructionClass(laneIndex: number, index: number) {
  const lane = lanes.value[laneIndex];
  if (index === lane.activeIndex) {
    return lane.status === 'critical'
      ? 'border-rose-400 bg-rose-100 text-rose-700 dark:border-rose-500 dark:bg-rose-900/40 dark:text-rose-300'
      : 'border-indigo-400 bg-indigo-100 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/40 dark:text-indigo-300';
  }
  if (index < lane.pc) {
    return 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-500';
  }
  return 'border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400';
}

const statusPill: Record<string, string> = {
  ready: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  critical: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
  done: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
};
</script>

<template>
  <AvPanel class="flex h-full flex-col" title="Threads">
    <template #header>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
        :class="
          violated
            ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
            : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
        "
      >
        {{ violated ? '✕ invariant broken' : '✓ invariant holds' }}
      </span>
    </template>

    <p class="mb-4 text-xs text-slate-400 dark:text-slate-500">
      {{ scenario.invariant.label }}
    </p>

    <div class="flex flex-col gap-3">
      <div v-for="(lane, laneIndex) in lanes" :key="lane.name" class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
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
            class="font-mono text-[11px] text-slate-400 dark:text-slate-500"
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
    <div class="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="[key, value] in sharedEntries"
          :key="key"
          class="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          {{ key }}: {{ value }}
        </span>
        <span
          v-for="[name, owner] in lockEntries"
          :key="name"
          class="rounded-lg px-2.5 py-1.5 font-mono text-xs"
          :class="
            owner === null
              ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
          "
        >
          lock {{ name }}: {{ owner === null ? 'free' : `held by T${owner}` }}
        </span>
      </div>

      <p v-if="lastAction" class="mt-3 font-mono text-xs text-slate-400 dark:text-slate-500">
        T{{ lastAction.threadId }} ran “{{ lastAction.instruction }}”
      </p>
    </div>
  </AvPanel>
</template>
