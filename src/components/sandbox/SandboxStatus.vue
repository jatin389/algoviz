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
      idle: 'bg-surface-alt text-ink-muted',
      ok: 'bg-ok-soft text-ok-ink',
      warn: 'bg-warn-soft text-warn-ink',
      error: 'bg-danger-soft text-danger-ink',
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
      class="mb-3 rounded-lg bg-accent-soft px-3 py-2 text-xs text-accent"
    >
      This code came from a shared link. It runs in an isolated frame with no access to this
      page, but it is not code you wrote.
    </p>

    <p v-if="error" class="text-sm text-danger">{{ error }}</p>

    <template v-else>
      <p v-if="stopLabel" class="mb-2 text-sm text-warn">
        {{ stopLabel }}
      </p>
      <p v-if="phase === 'ready'" class="nums text-sm text-ink-muted">
        Collected {{ stepsCollected.toLocaleString() }} snapshots<span v-if="elapsedMs !== null">
          in {{ (elapsedMs / 1000).toFixed(2) }}s</span
        >.
      </p>
      <p v-else-if="phase === 'idle'" class="text-sm text-ink-muted">
        Your code runs in a sandboxed frame on its own thread. It can draw bars; it cannot reach
        this page.
      </p>

      <p v-if="rejected > 0" class="nums mt-2 text-xs text-warn">
        {{ rejected.toLocaleString() }} snapshot{{ rejected === 1 ? '' : 's' }} rejected before
        rendering — {{ firstRejectReason }}
      </p>
    </template>
  </AvPanel>
</template>
