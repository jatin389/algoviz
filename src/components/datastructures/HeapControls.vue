<script setup lang="ts">
import { ref, computed } from 'vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

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
</script>

<template>
  <AvPanel title="Heap Controls">
    <div class="mb-4 flex items-center justify-between rounded-xl bg-surface-alt p-2">
      <span class="pl-2 text-sm font-medium text-ink-muted">Mode</span>
      <div class="grid grid-cols-2 gap-1">
        <AvButton
          variant="toggle"
          :active="isMinHeap"
          :disabled="!canEdit"
          @click="!isMinHeap && emit('toggle-mode')"
        >
          Min
        </AvButton>
        <AvButton
          variant="toggle"
          :active="!isMinHeap"
          :disabled="!canEdit"
          @click="isMinHeap && emit('toggle-mode')"
        >
          Max
        </AvButton>
      </div>
    </div>

    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-ink-muted">Value</span>
      <input
        v-model="inputValue"
        type="number"
        placeholder="e.g. 42"
        :disabled="!canEdit"
        class="w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
        @keyup.enter="submitInsert"
      />
    </label>

    <div class="mt-3 grid grid-cols-2 gap-2">
      <AvButton variant="primary" :disabled="!canEdit || !isValidInput" @click="submitInsert">
        Insert
      </AvButton>
      <AvButton variant="danger" :disabled="!canEdit" @click="emit('extract')">
        Extract {{ isMinHeap ? 'Min' : 'Max' }}
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
        Seed random heap
      </AvButton>
      <AvButton variant="neutral" :disabled="!canEdit" @click="emit('reset')"> Reset </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-ink-faint">
      Controls lock while an insert/extract animation is playing.
    </p>
  </AvPanel>
</template>
