<script setup lang="ts">
// A collapsible "how this works" panel.
//
// Built on native <details>/<summary> rather than a v-if toggle: that gives
// keyboard operation, the correct expanded/collapsed semantics for screen
// readers, and in-page find (browsers expand a closed <details> to reveal a
// search hit) with no JS at all.
//
// `startOpen` exists because the right default differs per feature — a view
// nobody can use without reading the contract should open itself, while a
// mostly self-evident one should stay out of the way.

withDefaults(defineProps<{ title: string; summary?: string; startOpen?: boolean }>(), {
  summary: '',
  startOpen: false,
});
</script>

<template>
  <details class="av-card group p-4 sm:p-5" :open="startOpen">
    <summary
      class="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden"
    >
      <span class="min-w-0">
        <span class="block text-xs font-semibold uppercase tracking-wider text-ink-faint">
          {{ title }}
        </span>
        <span v-if="summary" class="mt-1 block text-sm text-ink-muted">
          {{ summary }}
        </span>
      </span>
      <span
        class="shrink-0 text-ink-faint transition-transform group-open:rotate-180"
        aria-hidden="true"
      >
        ▾
      </span>
    </summary>

    <div class="mt-4 border-t border-line pt-4 text-sm">
      <slot />
    </div>
  </details>
</template>
