<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  canEdit: { type: Boolean, required: true },
  speed: { type: Number, required: true },
});

const emit = defineEmits(['insert', 'remove', 'seed', 'reset', 'update:speed']);

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

function submitRemove() {
  if (!isValidInput.value || !props.canEdit) return;
  emit('remove', Number(inputValue.value));
  inputValue.value = '';
}
</script>

<template>
  <div class="av-card p-4 sm:p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
      BST Controls
    </h2>

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
        :disabled="!canEdit || !isValidInput"
        class="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/30 transition-all hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
        @click="submitRemove"
      >
        Delete
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
        @input="emit('update:speed', Number($event.target.value))"
      />
    </label>

    <div class="mt-4 grid grid-cols-2 gap-2">
      <button
        type="button"
        :disabled="!canEdit"
        class="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="emit('seed', 10)"
      >
        Seed random tree
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
      Controls lock while an insert/delete animation is playing.
    </p>
  </div>
</template>
