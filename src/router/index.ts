import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { algorithms as sortAlgorithms } from '@/algorithms';
import { algorithms as searchAlgorithms } from '@/algorithms/search';
import { algorithms as pathAlgorithms } from '@/algorithms/pathfinding';
import { algorithms as graphAlgorithms } from '@/algorithms/graph';
import LandingView from '@/views/LandingView.vue';
import SortingView from '@/views/SortingView.vue';
import SearchView from '@/views/SearchView.vue';
import PathfindingView from '@/views/PathfindingView.vue';
import BstView from '@/views/BstView.vue';
import HeapView from '@/views/HeapView.vue';
import GraphView from '@/views/GraphView.vue';

// Every route carries the label the nav renders, so the tab bar is derived
// from this array rather than duplicating it. `pitch` and `count` extend that
// same principle to the landing grid: adding a category to `navRoutes` is the
// only edit needed for it to appear on both the tab bar and the front door.
//
// `count` is optional because it is not universally meaningful — BST and Heap
// are operation-driven views with no algorithm registry to count.
declare module 'vue-router' {
  interface RouteMeta {
    label: string;
    pitch: string;
    count?: number;
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
  {
    path: '/sorting',
    name: 'sorting',
    component: SortingView,
    meta: {
      label: 'Sorting',
      pitch: 'Watch bars compare and swap their way into order.',
      count: Object.keys(sortAlgorithms).length,
    },
  },
  {
    path: '/searching',
    name: 'searching',
    component: SearchView,
    meta: {
      label: 'Searching',
      pitch: 'Narrow down a target and see how many probes it takes.',
      count: Object.keys(searchAlgorithms).length,
    },
  },
  {
    path: '/pathfinding',
    name: 'pathfinding',
    component: PathfindingView,
    meta: {
      label: 'Pathfinding',
      pitch: 'Paint walls on a grid and race algorithms to the exit.',
      count: Object.keys(pathAlgorithms).length,
    },
  },
  {
    path: '/bst',
    name: 'bst',
    component: BstView,
    meta: {
      label: 'BST',
      pitch: 'Insert, search and delete nodes in a binary search tree.',
    },
  },
  {
    path: '/heap',
    name: 'heap',
    component: HeapView,
    meta: {
      label: 'Heap',
      pitch: 'Sift values up and down to keep the heap property.',
    },
  },
  {
    path: '/graph',
    name: 'graph',
    component: GraphView,
    meta: {
      label: 'Graph',
      pitch: 'Traverse nodes and edges breadth- or depth-first.',
      count: Object.keys(graphAlgorithms).length,
    },
  },
];

/**
 * The complete route set: the nav routes plus a catch-all. Kept separate from
 * `navRoutes` so the tab bar is a plain array the nav renders directly — no
 * runtime filtering on `meta.label`, and no way for a non-navigable route to
 * leak into the tab bar.
 */
export const routes: RouteRecordRaw[] = [
  // The front door. Deliberately not part of `navRoutes` — it is reached via the
  // header logo, not a tab, and it is not a category to list on its own grid.
  { path: '/', name: 'landing', component: LandingView, meta: { label: 'Home', pitch: '' } },
  ...navRoutes,
  // Anything unrecognized lands on the front door rather than a blank page.
  { path: '/:pathMatch(.*)*', redirect: '/' },
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
