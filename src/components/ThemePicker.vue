<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useTheme } from '@/composables/useTheme';
import type { ThemeMeta, ThemeName } from '@/theme/themes';

// A listbox, not a toggle: with eight themes there is nothing to toggle
// between. Each row previews its own palette by carrying `data-theme` on the
// swatch container — the token blocks in style.css are plain attribute
// selectors, so the swatches inherit that theme's real colours rather than a
// hand-maintained copy of every palette in JS.

const { theme, themes, setTheme } = useTheme();

const open = ref(false);
const listbox = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
/** Roving focus target while the list is open. */
const activeIndex = ref(0);

const current = computed<ThemeMeta>(
  () => themes.find((t) => t.name === theme.value) ?? themes[0],
);

/** Group headings, in registry order, without hardcoding the group names. */
const groups = computed(() => {
  const seen: { label: string; items: ThemeMeta[] }[] = [];
  for (const t of themes) {
    const group = seen.find((g) => g.label === t.group);
    if (group) group.items.push(t);
    else seen.push({ label: t.group, items: [t] });
  }
  return seen;
});

/** Flat order, so arrow keys cross group boundaries the way the eye does. */
const flat = computed(() => groups.value.flatMap((g) => g.items));

function focusOption(index: number) {
  const count = flat.value.length;
  activeIndex.value = ((index % count) + count) % count;
  nextTick(() => {
    const nodes = listbox.value?.querySelectorAll<HTMLElement>('[role="option"]');
    nodes?.[activeIndex.value]?.focus();
  });
}

function toggle() {
  open.value = !open.value;
  if (open.value) {
    focusOption(flat.value.findIndex((t) => t.name === theme.value));
  }
}

function close(returnFocus = true) {
  if (!open.value) return;
  open.value = false;
  if (returnFocus) trigger.value?.focus();
}

function choose(name: ThemeName) {
  setTheme(name);
  close();
}

function onListKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      focusOption(activeIndex.value + 1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      focusOption(activeIndex.value - 1);
      break;
    case 'Home':
      event.preventDefault();
      focusOption(0);
      break;
    case 'End':
      event.preventDefault();
      focusOption(flat.value.length - 1);
      break;
    case 'Escape':
      event.preventDefault();
      close();
      break;
  }
}

// Pointer-down rather than click: a click listener would also catch the press
// that opened the menu and close it again on the same gesture.
function onDocumentPointerDown(event: PointerEvent) {
  const target = event.target as Node;
  if (listbox.value?.contains(target) || trigger.value?.contains(target)) return;
  close(false);
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('pointerdown', onDocumentPointerDown);
  else document.removeEventListener('pointerdown', onDocumentPointerDown);
});

onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown));
</script>

<template>
  <div class="relative">
    <button
      ref="trigger"
      type="button"
      class="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 text-slate-600 transition-colors hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:text-indigo-400"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :title="`Theme: ${current.label}`"
      @click="toggle"
    >
      <span class="flex gap-0.5" aria-hidden="true">
        <i class="h-4 w-1.5 rounded-sm bg-accent" />
        <i class="h-4 w-1.5 rounded-sm bg-tone-probe" />
        <i class="h-4 w-1.5 rounded-sm bg-tone-settled" />
      </span>
      <span class="hidden text-sm font-semibold sm:inline">{{ current.label }}</span>
      <span class="sr-only">Change theme, currently {{ current.label }}</span>
    </button>

    <div
      v-if="open"
      ref="listbox"
      role="listbox"
      aria-label="Theme"
      class="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      @keydown="onListKeydown"
    >
      <template v-for="group in groups" :key="group.label">
        <p
          class="px-2 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400"
        >
          {{ group.label }}
        </p>
        <button
          v-for="item in group.items"
          :key="item.name"
          role="option"
          type="button"
          :aria-selected="item.name === theme"
          :tabindex="flat[activeIndex]?.name === item.name ? 0 : -1"
          class="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800"
          @click="choose(item.name)"
        >
          <!-- The swatch renders in ITS OWN theme: the token blocks are plain
               attribute selectors, so setting data-theme here re-points every
               `--av-*` variable inside this element. -->
          <span
            :data-theme="item.name"
            class="flex shrink-0 gap-px overflow-hidden rounded-md border border-line bg-canvas p-1"
            aria-hidden="true"
          >
            <i class="h-5 w-2 rounded-sm bg-surface" />
            <i class="h-5 w-2 rounded-sm bg-accent" />
            <i class="h-5 w-2 rounded-sm bg-tone-probe" />
            <i class="h-5 w-2 rounded-sm bg-tone-settled" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              {{ item.label }}
            </span>
            <span class="block truncate text-xs text-slate-500 dark:text-slate-400">
              {{ item.blurb }}
            </span>
          </span>
          <span
            v-if="item.name === theme"
            aria-hidden="true"
            class="shrink-0 text-indigo-500 dark:text-indigo-400"
            >&checkmark;</span
          >
        </button>
      </template>
    </div>
  </div>
</template>
