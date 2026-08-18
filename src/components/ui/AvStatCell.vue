<script setup lang="ts">
// One metric tile inside a stats panel. `value` is pre-formatted by the caller
// (toLocaleString, a "3 / 12" ratio, a "1.24s" duration) because each panel
// formats differently and the tile has no business knowing which.
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="rounded-xl bg-surface-alt p-3 text-center">
    <div class="nums font-mono text-xl font-bold text-ink sm:text-2xl">
      {{ value }}
    </div>
    <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
      {{ label }}
    </div>
  </div>
</template>
