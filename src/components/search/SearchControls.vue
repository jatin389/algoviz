<script setup lang="ts">
// Controls panel: size + speed sliders, target input, quick-pick buttons, and
// the playback buttons. It is a pure presentational component — all state
// lives in useSearcher and is passed down via props / v-model, actions
// bubble up as events.

import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

defineProps<{
  size: number;
  speed: number;
  target: number;
  status: AlgoStatus;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
}>();

const emit = defineEmits<{
  'update:size': [value: number];
  'update:speed': [value: number];
  'update:target': [value: number];
  'pick-present-target': [];
  'pick-missing-target': [];
  generate: [];
  run: [];
  pause: [];
  reset: [];
}>();

// The inputs' `$event.target` is `EventTarget | null` once this block is
// type-checked, so the DOM narrowing lives here rather than in the template.
const onTarget = (e: Event) => emit('update:target', Number((e.target as HTMLInputElement).value));
</script>

<template>
  <AvPanel title="Controls">
    <!-- Sliders -->
    <div class="space-y-4">
      <AvSlider
        label="Array size"
        :model-value="size"
        :min="10"
        :max="50"
        :disabled="!canEdit"
        @update:model-value="emit('update:size', $event)"
      />

      <AvSlider
        label="Speed"
        :model-value="speed"
        :min="1"
        :max="100"
        suffix="%"
        @update:model-value="emit('update:speed', $event)"
      />

      <label class="block">
        <div class="mb-1.5 flex items-center justify-between text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">Target</span>
        </div>
        <input
          type="number"
          :value="target"
          :disabled="!canEdit"
          class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          @input="onTarget"
        />
      </label>
    </div>

    <!-- Quick-pick target buttons -->
    <div class="mt-3 grid grid-cols-2 gap-2">
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('pick-present-target')">
        Random present target
      </AvButton>
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('pick-missing-target')">
        Random missing target
      </AvButton>
    </div>

    <!-- Playback buttons -->
    <div class="mt-5 grid grid-cols-2 gap-2">
      <!-- Run / Resume -->
      <AvButton v-if="!isRunning" variant="primary" class="col-span-2" @click="emit('run')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {{ isPaused ? 'Resume' : 'Run' }}
      </AvButton>

      <!-- Pause -->
      <AvButton v-else variant="warning" class="col-span-2" @click="emit('pause')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
        Pause
      </AvButton>

      <!-- Reset -->
      <AvButton variant="neutral" @click="emit('reset')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Reset
      </AvButton>

      <!-- Generate new array -->
      <AvButton variant="neutral" :disabled="!canEdit" @click="emit('generate')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
        Shuffle
      </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Size, algorithm &amp; target lock while a search is running.
    </p>
  </AvPanel>
</template>
