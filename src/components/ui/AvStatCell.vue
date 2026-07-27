<script setup lang="ts">
// One metric tile inside a stats panel. `value` is pre-formatted by the caller
// (toLocaleString, a "3 / 12" ratio, a "1.24s" duration) because each panel
// formats differently and the tile has no business knowing which.
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
    <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
      {{ value }}
    </div>
    <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
      {{ label }}
    </div>
  </div>
</template>
