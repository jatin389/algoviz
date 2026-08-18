<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { embeddableRoutes } from '@/router';
import { useTheme } from '@/composables/useTheme';
import { isThemeName, resolveStoredTheme } from '@/theme/themes';
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
// `?theme=` accepts any theme name, and still honours the original `light`
// and `dark` — those were the only two values when embeds shipped, and
// `resolveStoredTheme` already maps them onto Daylight and Midnight, so old
// embed URLs in the wild keep working.
//
// An unrecognised value is ignored rather than reset to the default: a typo in
// someone else's iframe should leave the widget alone, not repaint it.
const isEmbedThemeParam = (value: string) =>
  isThemeName(value) || value === 'light' || value === 'dark';

const themeParam = computed(() => route.query.theme);
if (typeof themeParam.value === 'string' && isEmbedThemeParam(themeParam.value)) {
  // Never persisted — see the note on `setTheme`. Two embeds on one page share
  // an origin, so a stored theme is a channel between them.
  useTheme().setTheme(resolveStoredTheme(themeParam.value), { persist: false });
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
