<script setup lang="ts">
import { computed } from 'vue';

// The run-status badge. This exact record was copy-pasted verbatim into six
// stats panels and near-copied into three views, which is nine places to edit
// whenever a status is added or a colour changes — and nine chances for them
// to fall out of step.
//
// These are chrome tokens, not algorithm tones. A run being paused is a fact
// about the UI, not about the data, so it must stay legible in the hueless
// themes where the data marks deliberately give up their colour.

export type RunStatus = 'idle' | 'running' | 'paused' | 'done' | 'error';

const props = withDefaults(
  defineProps<{
    status: RunStatus;
    /** Overrides the default wording, e.g. 'Searching' instead of 'Running'. */
    label?: string;
  }>(),
  { label: '' },
);

// Whole class names, never interpolated — a name built at runtime never
// reaches Tailwind's scanner and the rule is simply not emitted.
const STATUS_CLASS: Record<RunStatus, string> = {
  idle: 'bg-surface-alt text-ink-muted',
  running: 'bg-ok-soft text-ok-ink',
  paused: 'bg-warn-soft text-warn-ink',
  done: 'bg-accent-soft text-accent',
  error: 'bg-danger-soft text-danger-ink',
};

const DEFAULT_LABEL: Record<RunStatus, string> = {
  idle: 'Idle',
  running: 'Running',
  paused: 'Paused',
  done: 'Done',
  error: 'Error',
};

const classes = computed(() => STATUS_CLASS[props.status]);
const text = computed(() => props.label || DEFAULT_LABEL[props.status]);
</script>

<template>
  <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="classes">{{ text }}</span>
</template>
