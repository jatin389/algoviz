import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { algorithms as sortAlgorithms } from '@/algorithms';
import { algorithms as searchAlgorithms } from '@/algorithms/search';
import { algorithms as pathAlgorithms } from '@/algorithms/pathfinding';
import { algorithms as graphAlgorithms } from '@/algorithms/graph';
import { algorithms as dpAlgorithms } from '@/algorithms/dp';
import { algorithms as dsuAlgorithms } from '@/algorithms/dsu';
import { algorithms as hashAlgorithms } from '@/algorithms/hashtable';
import { scenarios } from '@/concurrency/scenarios';
import LandingView from '@/views/LandingView.vue';
import SortingView from '@/views/SortingView.vue';
import SearchView from '@/views/SearchView.vue';
import PathfindingView from '@/views/PathfindingView.vue';
import BstView from '@/views/BstView.vue';
import HeapView from '@/views/HeapView.vue';
import GraphView from '@/views/GraphView.vue';
import SandboxView from '@/views/SandboxView.vue';
import ConcurrencyView from '@/views/ConcurrencyView.vue';
import DpView from '@/views/DpView.vue';
import MstView from '@/views/MstView.vue';
import HashTableView from '@/views/HashTableView.vue';
import EmbedView from '@/views/EmbedView.vue';

// Every route carries the label the nav renders, so the tab bar is derived
// from this array rather than duplicating it. `pitch` and `count` extend that
// same principle to the landing grid: adding a category to `navRoutes` is the
// only edit needed for it to appear on both the tab bar and the front door.
//
// `count` is optional because it is not universally meaningful — BST and Heap
// are operation-driven views with no algorithm registry to count.
//
// `embed` marks the minimal-chrome variant. It is read by `App.vue` to drop the
// header/nav/footer, and by the views that render a prose guide. A flag on the
// route rather than an embed-only special case, so presenter mode (backlog 0028)
// can reuse the same bare shell.
declare module 'vue-router' {
  interface RouteMeta {
    label: string;
    pitch: string;
    count?: number;
    embed?: boolean;
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
    path: '/dp',
    name: 'dp',
    component: DpView,
    meta: {
      label: 'DP',
      pitch: 'Fill a table cell by cell and trace the answer back out of it.',
      count: Object.keys(dpAlgorithms).length,
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
  {
    path: '/mst',
    name: 'mst',
    component: MstView,
    meta: {
      label: 'Union-Find & MST',
      pitch: 'Merge disjoint sets, then grow a minimum spanning tree from them.',
      count: Object.keys(dsuAlgorithms).length,
    },
  },
  {
    path: '/hashing',
    name: 'hashing',
    component: HashTableView,
    meta: {
      label: 'Hashing',
      pitch: 'Watch keys collide, probe, and rehash as the table fills up.',
      count: Object.keys(hashAlgorithms).length,
    },
  },
  {
    path: '/concurrency',
    name: 'concurrency',
    component: ConcurrencyView,
    meta: {
      label: 'Concurrency',
      pitch: 'Find the exact thread interleaving that breaks the invariant.',
      count: Object.keys(scenarios).length,
    },
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: SandboxView,
    meta: {
      label: 'Sandbox',
      pitch: 'Write your own algorithm and watch it run, safely isolated.',
    },
  },
];

/**
 * The complete route set: the nav routes plus a catch-all. Kept separate from
 * `navRoutes` so the tab bar is a plain array the nav renders directly — no
 * runtime filtering on `meta.label`, and no way for a non-navigable route to
 * leak into the tab bar.
 */
/**
 * Categories that can be embedded, derived from `navRoutes` rather than listed
 * again — a new category becomes embeddable by existing, not by a second edit.
 *
 * BST and Heap are excluded because they are the only two categories that never
 * call `useUrlState`: an `/embed/bst?seed=…` would accept the param and silently
 * ignore it, which is worse than not resolving at all. Retrofitting URL state to
 * both is queued as a follow-up.
 */
const NOT_EMBEDDABLE = new Set(['bst', 'heap']);

export const embeddableRoutes: RouteRecordRaw[] = navRoutes.filter(
  (route) => !NOT_EMBEDDABLE.has(String(route.name)),
);

export const routes: RouteRecordRaw[] = [
  // The front door. Deliberately not part of `navRoutes` — it is reached via the
  // header logo, not a tab, and it is not a category to list on its own grid.
  { path: '/', name: 'landing', component: LandingView, meta: { label: 'Home', pitch: '' } },
  ...navRoutes,
  // Also kept out of `navRoutes`: an embed is a way to render a category, not a
  // category of its own, and it must not reach the tab bar or the landing grid.
  // Declared before the catch-all so it matches first — which also means an
  // unknown `:category` lands *here*, not on the catch-all, and `EmbedView` has
  // to turn it away itself.
  {
    path: '/embed/:category',
    name: 'embed',
    component: EmbedView,
    meta: { label: 'Embed', pitch: '', embed: true },
  },
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
