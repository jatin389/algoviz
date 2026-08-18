import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { useRoute } from 'vue-router';

/**
 * useIsEmbed — whether the current route is the minimal-chrome embed shell.
 *
 * Read from route meta rather than the route name so any future bare-shell route
 * (presenter mode, backlog 0028) gets the same treatment by setting one flag.
 * Callers use it to drop anything that only makes sense in the full app: the
 * site header and tab bar, and the per-category prose guides, which are reading
 * material rather than controls and are dead weight inside a small frame.
 */
export function useIsEmbed(): ComputedRef<boolean> {
  const route = useRoute();
  return computed(() => route.meta.embed === true);
}
