<script setup lang="ts">
import { ref, computed } from 'vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

const props = defineProps<{
  canEdit: boolean;
  speed: number;
}>();

const emit = defineEmits<{
  insert: [value: number];
  remove: [value: number];
  seed: [count: number];
  reset: [];
  'update:speed': [value: number];
}>();

// `v-model` on an `<input type="number">` assigns a *number*, not a string —
// Vue coerces numeric inputs. The ref still starts as '' and is cleared to ''
// after a submit, so it genuinely holds either type.
const inputValue = ref<string | number>('');

const isValidInput = computed(() => {
  if (String(inputValue.value).trim() === '') return false;
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
  <AvPanel title="BST Controls">
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
      <AvButton variant="primary" :disabled="!canEdit || !isValidInput" @click="submitInsert">
        Insert
      </AvButton>
      <AvButton variant="danger" :disabled="!canEdit || !isValidInput" @click="submitRemove">
        Delete
      </AvButton>
    </div>

    <AvSlider
      label="Speed"
      class="mt-4"
      :model-value="speed"
      :min="1"
      :max="100"
      suffix="%"
      @update:model-value="emit('update:speed', $event)"
    />

    <div class="mt-4 grid grid-cols-2 gap-2">
      <AvButton variant="neutral" :disabled="!canEdit" @click="emit('seed', 10)">
        Seed random tree
      </AvButton>
      <AvButton variant="neutral" :disabled="!canEdit" @click="emit('reset')"> Reset </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Controls lock while an insert/delete animation is playing.
    </p>
  </AvPanel>
</template>
