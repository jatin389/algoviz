import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import SortingView from '@/views/SortingView.vue';
import SearchView from '@/views/SearchView.vue';
import PathfindingView from '@/views/PathfindingView.vue';
import BstView from '@/views/BstView.vue';
import HeapView from '@/views/HeapView.vue';
import GraphView from '@/views/GraphView.vue';

// Every route carries the label the nav renders, so the tab bar is derived
// from this array rather than duplicating it.
declare module 'vue-router' {
  interface RouteMeta {
    label: string;
  }
}

/**
 * Views are **eagerly imported on purpose.** The whole app is ~5k LOC; lazy
 * chunks would add a network round-trip to every tab switch for no meaningful
 * payload win.
 *
 * Declaration order is the tab order — `App.vue` iterates this array directly
 * rather than `router.getRoutes()`, whose ordering is not guaranteed to match.
 */
export const navRoutes: RouteRecordRaw[] = [
  { path: '/sorting', name: 'sorting', component: SortingView, meta: { label: 'Sorting' } },
  { path: '/searching', name: 'searching', component: SearchView, meta: { label: 'Searching' } },
  {
    path: '/pathfinding',
    name: 'pathfinding',
    component: PathfindingView,
    meta: { label: 'Pathfinding' },
  },
  { path: '/bst', name: 'bst', component: BstView, meta: { label: 'BST' } },
  { path: '/heap', name: 'heap', component: HeapView, meta: { label: 'Heap' } },
  { path: '/graph', name: 'graph', component: GraphView, meta: { label: 'Graph' } },
];

/**
 * The complete route set: the nav routes plus a catch-all. Kept separate from
 * `navRoutes` so the tab bar is a plain array the nav renders directly — no
 * runtime filtering on `meta.label`, and no way for a non-navigable route to
 * leak into the tab bar.
 */
export const routes: RouteRecordRaw[] = [
  ...navRoutes,
  // Anything unrecognized lands on the default view rather than a blank page.
  { path: '/:pathMatch(.*)*', redirect: '/sorting' },
];

/**
 * Hash history, not web history. Clean URLs would need a `404.html` copy step
 * in `deploy.yml` for GitHub Pages' SPA fallback; hash history needs zero
 * workflow change and survives a hard refresh unconditionally. `BASE_URL`
 * resolves to `/algoviz/` in production and `/` in dev automatically.
 */
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
