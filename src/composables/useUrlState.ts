import { onScopeDispose, watch } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { LocationQuery, LocationQueryRaw } from 'vue-router';

/**
 * useUrlState — mirrors a category's configuration into the hash query, so any
 * configuration is a shareable link.
 *
 * Deliberately one-way in each direction: hydrate once when the composable is
 * created, then write back on change. There is NO `watch(route.query)` reader,
 * which is what makes feedback loops between the router and the refs
 * structurally impossible rather than merely unlikely.
 *
 * Nothing is lost by omitting the reader: views unmount on every tab switch
 * (App.vue has no <KeepAlive>), so each mount rehydrates from scratch. The only
 * thing a reader would add is live address-bar editing, which is not worth the
 * loop risk.
 */

export interface UrlParamSpec<V> {
  ref: Ref<V>;
  /** Serialize. Return null to OMIT the param entirely — e.g. it is at its default. */
  encode: (value: V) => string | null;
  /** Parse. Return undefined to reject a malformed value and keep the current one. */
  decode: (raw: string) => V | undefined;
  /** Trailing debounce for write-back, ms. Default 0. */
  debounceMs?: number;
}

export type UrlParamSpecs<T extends Record<string, unknown>> = {
  [K in keyof T]: UrlParamSpec<T[K]>;
};

function readFirst(query: LocationQuery, key: string): string | undefined {
  const raw = query[key];
  // Repeated params (?a=1&a=2) arrive as an array; take the first and move on
  // rather than rejecting, since a hand-edited link should still work.
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === 'string' ? value : undefined;
}

export interface UrlStateResult<T> {
  /**
   * Which params actually came from the URL. Callers need this to avoid
   * overwriting a hydrated value with a freshly derived one — a shared link
   * whose target or start node is immediately recomputed is not shareable.
   */
  hydrated: Set<keyof T & string>;
}

export function useUrlState<T extends Record<string, unknown>>(
  specs: UrlParamSpecs<T>,
): UrlStateResult<T> {
  const router = useRouter();
  const keys = Object.keys(specs) as (keyof T & string)[];
  const hydrated = new Set<keyof T & string>();

  // Read synchronously at call time, NOT in onMounted: the owning composable
  // builds its first dataset immediately after calling this, so a seed or size
  // arriving one tick later would be applied to an array that already exists.
  const initial = router.currentRoute.value.query;
  for (const key of keys) {
    const raw = readFirst(initial, key);
    if (raw === undefined) continue;
    const decoded = specs[key].decode(raw);
    // undefined means malformed — leave the ref at its default so a mangled
    // link degrades to the normal experience instead of erroring.
    if (decoded === undefined) continue;
    specs[key].ref.value = decoded;
    hydrated.add(key);
  }

  let timer: ReturnType<typeof setTimeout> | null = null;

  function writeBack() {
    const current = router.currentRoute.value.query;
    const next: LocationQueryRaw = { ...current };

    for (const key of keys) {
      const encoded = specs[key].encode(specs[key].ref.value);
      // Express omission by deleting the key. Assigning `undefined` makes some
      // vue-router versions render a bare `?key`.
      if (encoded === null) delete next[key];
      else next[key] = encoded;
    }

    // Foreign keys survive untouched, and an unchanged query must not push a
    // redundant navigation.
    const changed =
      keys.some((key) => next[key] !== current[key]) ||
      Object.keys(next).length !== Object.keys(current).length;
    if (!changed) return;

    router.replace({ query: next }).catch(() => {
      // A navigation cancelled by a concurrent route change is expected here
      // and must not surface as an unhandled rejection.
    });
  }

  const maxDebounce = Math.max(0, ...keys.map((key) => specs[key].debounceMs ?? 0));

  watch(
    keys.map((key) => specs[key].ref),
    () => {
      if (maxDebounce === 0) {
        writeBack();
        return;
      }
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(writeBack, maxDebounce);
    },
    { flush: 'post' },
  );

  // A pending write firing after the view unmounts would clobber the query the
  // NEXT view just hydrated from — the same class of bug as a leaked timer.
  onScopeDispose(() => {
    if (timer !== null) clearTimeout(timer);
  });

  return { hydrated };
}
