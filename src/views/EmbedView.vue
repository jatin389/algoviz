<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { embeddableRoutes } from '@/router';
import { useTheme } from '@/composables/useTheme';
import EmbedBrand from '@/components/EmbedBrand.vue';

/**
 * EmbedView — the minimal-chrome shell an iframe points at.
 *
 * It renders one of the ordinary category views unchanged; everything that makes
 * a category work (URL hydration, playback, editing) already lives in that view
 * and its composable. All this adds is the category lookup, an attribution link,
 * and a theme override.
 *
 * URL state is deliberately left syncing. Inside an iframe `router.replace`
 * rewrites the frame's own hash — invisible to the host page and unable to touch
 * its history — and keeping it on is what lets the attribution link carry the
 * reader's current state rather than the author's original.
 */
const route = useRoute();
const router = useRouter();

const category = computed(() => String(route.params.category ?? ''));

const target = computed(() =>
  embeddableRoutes.find((record) => record.name === category.value),
);

const view = computed(() => target.value?.component as Component | undefined);

// An unknown or non-embeddable category matched this route rather than the
// catch-all (the embed record is declared first), so the redirect has to happen
// here. Sending it to the front door beats framing a broken widget.
if (target.value === undefined) {
  router.replace('/');
}

// `theme` and `brand` are read straight off the query rather than through
// `useUrlState`: neither belongs to a category's spec, and routing them through
// one would mean writing them back into the URL on every change. They survive
// the categories' own write-back untouched, since it only ever rewrites keys it
// owns.
const theme = computed(() => route.query.theme);
if (theme.value === 'light' || theme.value === 'dark') {
  // Never persisted — see the note on `setDark`. Two embeds on one page share an
  // origin, so a stored theme is a channel between them.
  useTheme().setDark(theme.value === 'dark', { persist: false });
}

const showBrand = computed(() => route.query.brand !== '0');
</script>

<template>
  <div v-if="view" class="embed-shell relative" data-testid="embed-shell">
    <component :is="view" />
    <EmbedBrand v-if="showBrand" :category="category" :query="route.query" />
  </div>
</template>

<style scoped>
/*
 * Put the visualization first while the layout is stacked.
 *
 * Every category view is a `grid` whose two children are the control column and
 * the visualization, side by side from `lg` up and stacked below it. In the full
 * app stacking is harmless — you scroll. In an iframe the height is fixed by the
 * embedder, and a typical post is narrower than `lg` (1024px), so the reader
 * would get a panel of sliders with the algorithm entirely below the fold. That
 * is the one thing an embed exists not to do.
 *
 * This leans on the shape the nine embeddable views share, so it lives here
 * rather than in nine templates. Ordering only, no restyling: controls are still
 * there, just under the thing they control.
 */
@media (max-width: 1023px) {
  .embed-shell > :deep(.grid) > :last-child {
    order: -1;
  }
}
</style>
