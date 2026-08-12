<script setup lang="ts">
// Reports what the sandbox actually did — including the cases that are neither
// a clean success nor a hard failure. A run stopped by a budget still produced
// watchable steps, and saying so plainly is more useful than an error banner
// that throws the work away.

import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import type { SandboxPhase } from '@/composables/useSandbox';

const props = defineProps<{
  phase: SandboxPhase;
  error: string | null;
  stopLabel: string | null;
  stepsCollected: number;
  rejected: number;
  firstRejectReason: string | null;
  elapsedMs: number | null;
  fromSharedLink: boolean;
}>();

const tone = computed(() => {
  if (props.phase === 'error') return 'error';
  if (props.stopLabel || props.rejected > 0) return 'warn';
  if (props.phase === 'ready') return 'ok';
  return 'idle';
});

const toneClass = computed(
  () =>
    ({
      idle: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      ok: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      warn: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      error: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    })[tone.value],
);
</script>

<template>
  <AvPanel title="Sandbox">
    <template #header>
      <span class="rounded-full px-2.5 py-0.5 text-xs font-semibold" :class="toneClass">
        {{
          phase === 'executing'
            ? 'Executing'
            : phase === 'ready'
              ? 'Isolated · OK'
              : phase === 'error'
                ? 'Failed'
                : 'Idle'
        }}
      </span>
    </template>

    <!-- Shown before anything runs, because "someone else wrote this" is
         information you want *before* you press play, not after. Non-blocking
         on purpose: a confirmation gate would defeat the point of a link that
         just works. -->
    <p
      v-if="fromSharedLink"
      class="mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
    >
      This code came from a shared link. It runs in an isolated frame with no access to this
      page, but it is not code you wrote.
    </p>

    <p v-if="error" class="text-sm text-rose-600 dark:text-rose-400">{{ error }}</p>

    <template v-else>
      <p v-if="stopLabel" class="mb-2 text-sm text-amber-600 dark:text-amber-400">
        {{ stopLabel }}
      </p>
      <p v-if="phase === 'ready'" class="text-sm text-slate-500 dark:text-slate-400">
        Collected {{ stepsCollected.toLocaleString() }} snapshots<span v-if="elapsedMs !== null">
          in {{ (elapsedMs / 1000).toFixed(2) }}s</span
        >.
      </p>
      <p v-else-if="phase === 'idle'" class="text-sm text-slate-500 dark:text-slate-400">
        Your code runs in a sandboxed frame on its own thread. It can draw bars; it cannot reach
        this page.
      </p>

      <p v-if="rejected > 0" class="mt-2 text-xs text-amber-600 dark:text-amber-400">
        {{ rejected.toLocaleString() }} snapshot{{ rejected === 1 ? '' : 's' }} rejected before
        rendering — {{ firstRejectReason }}
      </p>
    </template>
  </AvPanel>
</template>
