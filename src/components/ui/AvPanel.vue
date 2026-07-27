<script setup lang="ts">
// The card shell every left-column and right-column section shares: the
// `av-card` component class from style.css plus its padding and heading row.
//
// Two heading layouts exist in the app — a plain title, and a title with a
// status pill pushed to the right. The `header` slot picks between them, so
// callers never repeat the flex row.
//
// Callers that need a different body layout (the four canvas panels want
// `flex h-full flex-col`, the two diagram wrappers want a min height) pass
// those utilities as a normal class; Vue's fallthrough merges them onto the
// root and none of them collide with what is set here.
defineProps<{ title?: string }>();
</script>

<template>
  <div class="av-card p-4 sm:p-5">
    <div v-if="$slots.header" class="mb-3 flex items-center justify-between">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ title }}</h2>
      <slot name="header" />
    </div>
    <h2
      v-else-if="title"
      class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
    >
      {{ title }}
    </h2>

    <slot />
  </div>
</template>
