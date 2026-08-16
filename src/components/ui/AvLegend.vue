<script setup lang="ts">
// The small color-key row that sits next to a canvas title (graph node
// states, grid cell states, ...). Each domain owns its own colors and
// wording, so this component only lays the swatches out — `class` is the
// swatch's background utility, supplied whole by the caller for the same
// scanner reason AvAlgorithmSelector's GROUP_CLASS exists.
defineProps<{ items: { label: string; class: string }[] }>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
    <span v-for="item in items" :key="item.label" class="flex items-center gap-1.5"
      ><i class="h-3 w-3 rounded-sm" :class="item.class" />{{ item.label }}</span
    >
  </div>
</template>
