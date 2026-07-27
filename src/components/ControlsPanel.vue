<script setup>
// Controls panel: speed + size sliders and the playback buttons.
// It is a pure presentational component — all state lives in useSorter and is
// passed down via props / v-model, actions bubble up as events.

defineProps({
  size: { type: Number, required: true },
  speed: { type: Number, required: true },
  status: { type: String, required: true },
  canEdit: { type: Boolean, required: true },
  isRunning: { type: Boolean, required: true },
  isPaused: { type: Boolean, required: true },
});

const emit = defineEmits(['update:size', 'update:speed', 'generate', 'run', 'pause', 'reset']);
</script>

<template>
  <div class="av-card p-4 sm:p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Controls</h2>

    <!-- Sliders -->
    <div class="space-y-4">
      <label class="block">
        <div class="mb-1.5 flex items-center justify-between text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">Array size</span>
          <span class="font-mono text-indigo-500 dark:text-indigo-400">{{ size }}</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          :value="size"
          :disabled="!canEdit"
          class="w-full"
          @input="emit('update:size', Number($event.target.value))"
        />
      </label>

      <label class="block">
        <div class="mb-1.5 flex items-center justify-between text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">Speed</span>
          <span class="font-mono text-indigo-500 dark:text-indigo-400">{{ speed }}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          :value="speed"
          class="w-full"
          @input="emit('update:speed', Number($event.target.value))"
        />
      </label>
    </div>

    <!-- Playback buttons -->
    <div class="mt-5 grid grid-cols-2 gap-2">
      <!-- Run / Resume -->
      <button
        v-if="!isRunning"
        type="button"
        class="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition-all hover:bg-emerald-600 hover:shadow-lg active:scale-[0.98]"
        @click="emit('run')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {{ isPaused ? 'Resume' : 'Run' }}
      </button>

      <!-- Pause -->
      <button
        v-else
        type="button"
        class="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-500/30 transition-all hover:bg-amber-600 hover:shadow-lg active:scale-[0.98]"
        @click="emit('pause')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
        Pause
      </button>

      <!-- Reset -->
      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-300 active:scale-[0.98] dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="emit('reset')"
      >
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
      </button>

      <!-- Generate new array -->
      <button
        type="button"
        :disabled="!canEdit"
        class="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="emit('generate')"
      >
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
      </button>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Size &amp; algorithm lock while a sort is running.
    </p>
  </div>
</template>
