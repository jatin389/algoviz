<script setup lang="ts">
// Dataset panel: reproduce a run from a seed, or supply a custom array.
// Pure presentational component — parsing and generation live in the owning
// view, this only relays user input as events.

import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvTextField from '@/components/ui/AvTextField.vue';

defineProps<{
  seed: number;
  custom: string;
  error: string | null;
  canEdit: boolean;
}>();

const emit = defineEmits<{
  'update:seed': [value: number];
  'update:custom': [value: string];
  apply: []; // parse + install the custom array
  randomize: []; // pick a new random seed, then regenerate
}>();

// The seed field is text (so it can be typed freely) but the model is a
// number. Emitting NaN would let a bad paste silently corrupt the seed state
// upstream, so a non-integer keystroke is simply swallowed — the displayed
// text stays controlled by the `seed` prop, which will just snap back.
function onSeedInput(value: string) {
  const parsed = Number(value);
  if (Number.isInteger(parsed)) emit('update:seed', parsed);
}
</script>

<template>
  <AvPanel title="Dataset">
    <div class="space-y-4">
      <AvTextField
        label="Seed"
        monospace
        :model-value="String(seed)"
        :disabled="!canEdit"
        @update:model-value="onSeedInput"
      />

      <AvTextField
        label="Custom array"
        monospace
        placeholder="e.g. 5, 3, 9, 1"
        :model-value="custom"
        :error="error"
        :disabled="!canEdit"
        @update:model-value="emit('update:custom', $event)"
      />
    </div>

    <div class="mt-4 grid grid-cols-2 gap-2">
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('apply')">Apply</AvButton>
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('randomize')">New seed</AvButton>
    </div>

    <p class="mt-3 text-xs text-ink-faint">The same seed always reproduces the same data.</p>
  </AvPanel>
</template>
