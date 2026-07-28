# AlgoViz — Algorithm Visualizer

An interactive, single-page app for watching algorithms and data structures work step by step. Built with **Vue 3**, **Vite**, and **Tailwind CSS**.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

Six independent categories, selectable from the top nav — each owns its own state and visualization, nothing is mixed together:

- **Sorting** — Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, Comb, Counting, and Radix sort, each with a description and Big-O complexity card. Color-coded bars (unsorted/comparing/swapping/sorted) with smooth transitions, live comparisons/swaps/steps/elapsed stats.
- **Searching** — Linear and Binary Search over a sorted array, with random present/missing target pickers and a found/not-found result banner.
- **Pathfinding** — BFS, DFS, Dijkstra, and A* on an editable grid. Draw walls by dragging, relocate start/end, randomize a maze, and watch the frontier/visited/path colors animate.
- **BST** — interactive Binary Search Tree insert/delete, animated as a live SVG tree diagram.
- **Heap** — interactive min/max binary heap insert/extract, shown as both a tree diagram and its backing array.
- **Graph** — BFS/DFS traversal over a generated node-link graph; click any node to set the traversal start.

Plus, app-wide:

- **Dark mode by default** with a light-mode toggle (persisted to `localStorage`).
- **Responsive** layout for desktop and tablet, with controls locked while an algorithm is actively running.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

### Other scripts

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run test       # run every algorithm's unit tests (Vitest)
```

## Deployment

Every branch deploys. A repository only ever gets **one** GitHub Pages site, so branches share it and are separated by directory rather than getting a site each:

| Branch | URL |
| --- | --- |
| `main` | `https://jatin389.github.io/algoviz/` |
| anything else | `https://jatin389.github.io/algoviz/preview/<branch>/` |

`.github/workflows/deploy.yml` runs on a push to any branch: it gates on lint, type-check and tests, builds with the base path for that branch, and commits the result into the right folder of the `gh-pages` branch, which is what Pages serves. A deploy of `main` replaces the site root but leaves `preview/` untouched, so previews survive. Slashes in a branch name are flattened (`feat/new-sort` → `preview/feat-new-sort`).

When a branch is deleted, `.github/workflows/pages-cleanup.yml` removes its preview folder. That workflow can also be run manually against a branch name to clear a stale preview.

> **One-time setup:** this requires **Settings → Pages → Source** set to **Deploy from a branch → `gh-pages` / `(root)`**. Let the workflow run once first so the branch exists.

## Architecture

Algorithm and data-structure logic is fully decoupled from rendering. Each algorithm is a **generator function** that yields immutable _step snapshots_ describing its state at that instant — the array, a grid's visited/frontier/path cells, a tree's current node, etc. A composable per category (`useSorter`, `useSearcher`, `usePathfinder`, `useBST`, `useHeap`, `useGraphTraversal`) drives its generator one step per timer tick and owns all reactive state; components stay dumb, just rendering whatever the composable exposes.

Every category is a **self-contained view** (`src/views/*.vue`) with no props and no shared state with any other category — switching tabs in `App.vue` mounts/unmounts a view outright, so nothing leaks between them.

```
src/
├── algorithms/
│   ├── _utils.js, bubbleSort.js, ... radixSort.js, index.js   # sorting generators + registry
│   ├── algorithms.test.js
│   ├── search/            # linearSearch.js, binarySearch.js, index.js, search.test.js
│   ├── pathfinding/        # bfs.js, dfs.js, dijkstra.js, astar.js, index.js, pathfinding.test.js
│   ├── datastructures/     # bst.js, heap.js, bst.test.js, heap.test.js
│   └── graph/               # graphModel.js, bfsTraversal.js, dfsTraversal.js, index.js, graph.test.js
├── composables/
│   ├── useSorter.js, useSearcher.js, usePathfinder.js
│   ├── useBST.js, useHeap.js, useGraphTraversal.js
│   └── useTheme.js          # shared dark/light mode
├── components/
│   ├── AlgorithmSelector.vue, ControlsPanel.vue, BarChart.vue, StatsDisplay.vue, ThemeToggle.vue
│   ├── search/, pathfinding/, datastructures/, graph/   # per-category components
├── views/
│   ├── SortingView.vue, SearchView.vue, PathfindingView.vue
│   └── BstView.vue, HeapView.vue, GraphView.vue
├── App.vue                 # top-level category nav, mounts the active view
├── main.js
└── style.css               # Tailwind entry + slider/base styling
```

### The step-snapshot contract

Sorting generators yield objects of this shape (see `algorithms/_utils.js`):

```js
{
  array:       number[],  // copy of the array at this instant
  comparing:   number[],  // indices being compared
  swapping:    number[],  // indices being written / swapped
  sorted:      number[],  // indices confirmed in final position
  comparisons: number,
  swaps:       number,
  done:        boolean,   // true only on the terminal snapshot
}
```

Each other category defines its own snapshot shape suited to its domain (e.g. pathfinding yields `{ visited, frontier, current, path, done }`; graph traversal yields `{ visited, frontier, current, done }`), but the same principle holds everywhere: generators are lazy and framework-agnostic, so a composable can advance one step per timer tick and the underlying structure is never mutated "all at once" behind the scenes.

To add a new algorithm to an existing category, drop a new generator in that category's `algorithms/` folder and register it in its `index.js` — it appears in the UI automatically. To add a whole new category, follow the same pattern: a generator module, a composable, category-specific components, and a self-contained view wired into `App.vue`'s nav.
