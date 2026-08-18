<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';

/**
 * The attribution link shown in the corner of an embed.
 *
 * An embed runs on someone else's page, so this is the only thing tying the
 * widget back to the app it came from. It carries the *current* query rather
 * than the one the page author wrote, so a reader who fiddles with the embed and
 * then clicks through arrives at what they were looking at, not what the author
 * originally linked.
 */
const props = defineProps<{
  /** Route name of the category being embedded — the link's destination. */
  category: string;
  /** The embed's current query, `brand` included; it is stripped here. */
  query: LocationQueryRaw;
}>();

const router = useRouter();

const href = computed(() => {
  // `brand` is an embed-only concern and would be dead weight on the full app.
  const { brand: _brand, ...forwarded } = props.query;
  // Resolved through the router rather than concatenated, so the deployed base
  // path (`/algoviz/` in production, `/` in dev) and the hash both come out
  // right without this component knowing either.
  return router.resolve({ name: props.category, query: forwarded }).href;
});
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    data-testid="embed-brand"
    class="pointer-events-auto absolute bottom-2 right-2 rounded-lg border border-line bg-surface/90 px-2 py-1 text-2xs font-medium text-ink-muted shadow-sm transition-colors hover:text-accent"
  >
    Powered by AlgoViz ↗
  </a>
</template>
