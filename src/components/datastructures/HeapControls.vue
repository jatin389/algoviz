<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  canEdit: boolean;
  speed: number;
  isMinHeap: boolean;
}>();

const emit = defineEmits<{
  insert: [value: number];
  extract: [];
  'toggle-mode': [];
  seed: [count: number];
  reset: [];
  'update:speed': [value: number];
}>();

// `$event.target` is `EventTarget | null` under lang="ts", so the narrowing
// that the template expression used to do implicitly lives here now.
const onSpeed = (e: Event) => emit('update:speed', Number((e.target as HTMLInputElement).value));

const inputValue = ref('');

const isValidInput = computed(() => {
  if (inputValue.value.trim() === '') return false;
  return Number.isFinite(Number(inputValue.value));
});

function submitInsert() {
  if (!isValidInput.value || !props.canEdit) return;
  emit('insert', Number(inputValue.value));
  inputValue.value = '';
}
</script>

<template>
  <div class="av-card p-4 sm:p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
      Heap Controls
    </h2>

    <div
      class="mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50"
    >
      <span class="pl-2 text-sm font-medium text-slate-600 dark:text-slate-300">Mode</span>
      <div class="grid grid-cols-2 gap-1">
        <button
          type="button"
          :disabled="!canEdit"
          class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed"
          :class="
            isMinHeap
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
          "
          @click="!isMinHeap && emit('toggle-mode')"
        >
          Min
        </button>
        <button
          type="button"
          :disabled="!canEdit"
          class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed"
          :class="
            !isMinHeap
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
          "
          @click="isMinHeap && emit('toggle-mode')"
        >
          Max
        </button>
      </div>
    </div>

    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Value</span>
      <input
        v-model="inputValue"
        type="number"
        placeholder="e.g. 42"
        :disabled="!canEdit"
        class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        @keyup.enter="submitInsert"
      />
    </label>

    <div class="mt-3 grid grid-cols-2 gap-2">
      <button
        type="button"
        :disabled="!canEdit || !isValidInput"
        class="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
        @click="submitInsert"
      >
        Insert
      </button>
      <button
        type="button"
        :disabled="!canEdit"
        class="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/30 transition-all hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
        @click="emit('extract')"
      >
        Extract {{ isMinHeap ? 'Min' : 'Max' }}
      </button>
    </div>

    <label class="mt-4 block">
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
        @input="onSpeed"
      />
    </label>

    <div class="mt-4 grid grid-cols-2 gap-2">
      <button
        type="button"
        :disabled="!canEdit"
        class="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="emit('seed', 10)"
      >
        Seed random heap
      </button>
      <button
        type="button"
        :disabled="!canEdit"
        class="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="emit('reset')"
      >
        Reset
      </button>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Controls lock while an insert/extract animation is playing.
    </p>
  </div>
</template>
