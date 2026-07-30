# AlgoViz — Algorithm Visualizer

An interactive, single-page app for watching algorithms and data structures work step by step. Built with **Vue 3**, **Vite**, and **Tailwind CSS**.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

Six independent categories, selectable from the top nav — each owns its own state and visualization, nothing is mixed together:

- **Sorting** — Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, Comb, Counting, and Radix sort, each with a description and Big-O complexity card. Color-coded bars (unsorted/comparing/swapping/sorted) with smooth transitions, live comparisons/swaps/steps/elapsed stats. A code panel follows along as it runs, toggling between hand-written pseudocode and the generator's real source — highlighting the `yield` it is suspended at.
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

Algorithm and data-structure logic is fully decoupled from rendering. Each algorithm is a **generator function** that yields immutable _step snapshots_ describing its state at that instant — the array, a grid's visited/frontier/path cells, a tree's current node, etc. Generators are pure and know nothing about Vue.

**`useStepPlayer` is the shared animation engine.** It owns the timer chain, the `idle → running ↔ paused → done` status machine, elapsed timing, and the recorded history of every snapshot a run produces — which is what makes stepping backwards and scrubbing possible, since generators only run forwards. The four continuous categories (`useSorter`, `useSearcher`, `usePathfinder`, `useGraphTraversal`) each supply just the category-specific parts: how to build a generator, and what a snapshot means when painted onto the screen.

That callback, `applyStep`, **must be idempotent and absolute** — it is called on forward ticks, backward scrubs and arbitrary seeks, so accumulating in it (`stats.steps += 1`) silently corrupts the moment a user scrubs back. Anything counted per-step comes from the player instead.

`useBST` and `useHeap` keep their own simpler driver: they animate a single operation per command, never pause, and their `reset()` destroys the structure rather than rewinding a run. They share only `useStepDelay`.

Every category is a **self-contained view** (`src/views/*.vue`) with no props and no shared state with any other category. `<RouterView>` has no `<KeepAlive>`, so switching tabs unmounts the previous view outright — which is what disposes its timers and re-reads its configuration from the URL.

```
src/
├── algorithms/
│   ├── _utils.ts, bubbleSort.ts, ... radixSort.ts, index.ts   # sorting generators + registry
│   ├── pseudocode.ts        # displayed pseudocode, keyed by algorithm
│   ├── source.ts            # the generators' own text (?raw) + step -> source line map
│   ├── algorithms.test.ts
│   ├── search/              # linearSearch.ts, binarySearch.ts, index.ts, search.test.ts
│   ├── pathfinding/         # bfs.ts, dfs.ts, dijkstra.ts, astar.ts, index.ts, pathfinding.test.ts
│   ├── datastructures/      # bst.ts, heap.ts, bst.test.ts, heap.test.ts
│   └── graph/               # graphModel.ts, bfsTraversal.ts, dfsTraversal.ts, index.ts
├── composables/
│   ├── useStepPlayer.ts     # the shared playback engine + step history
│   ├── useStepDelay.ts      # the one speed -> delay mapping
│   ├── useUrlState.ts, urlParams.ts   # shareable configuration in the hash query
│   ├── useSorter.ts, useSearcher.ts, usePathfinder.ts
│   ├── useBST.ts, useHeap.ts, useGraphTraversal.ts
│   └── useTheme.ts          # shared dark/light mode
├── utils/
│   ├── rng.ts               # seeded mulberry32; the app's only entropy source
│   ├── parseArray.ts, urlCodec.ts
├── components/
│   ├── ui/                  # AvPanel, AvButton, AvSlider, AvTextField, AvStatCell, AvAlgorithmSelector
│   ├── ControlsPanel.vue, PlaybackScrubber.vue, CodePanel.vue, DatasetPanel.vue
│   ├── BarChart.vue, StatsDisplay.vue, ThemeToggle.vue
│   └── search/, pathfinding/, datastructures/, graph/   # per-category components
├── views/                   # one self-contained view per category
├── router/index.ts          # hash history; nav tabs derive from `navRoutes`
├── main.ts
└── style.css                # Tailwind entry + slider/base styling
```

### The step-snapshot contract

Sorting generators yield objects of this shape (see `algorithms/_utils.ts`):

```ts
{
  array:       number[],  // copy of the array at this instant
  comparing:   number[],  // indices being compared
  swapping:    number[],  // indices being written / swapped
  sorted:      number[],  // indices confirmed in final position
  comparisons: number,
  swaps:       number,
  line?:       number,    // 0-based line in algorithms/pseudocode.ts, if tagged
  done:        boolean,   // true only on the terminal snapshot
}
```

Each other category defines its own snapshot shape suited to its domain (e.g. pathfinding yields `{ visited, frontier, current, path, done }`; graph traversal yields `{ visited, frontier, current, done }`), but the same principle holds everywhere: generators are lazy and framework-agnostic, so the player can advance one step per timer tick and the underlying structure is never mutated "all at once" behind the scenes.

`line` is what drives the code panel's highlight. It is optional: only bubble, insertion, quick and merge sort are tagged so far, and untagged algorithms simply render the panel without a highlight. **If you tag a generator, every `line` it yields must index into that algorithm's entry in `pseudocode.ts`** — a test in `algorithms.test.ts` enforces the bounds, since an off-by-one is otherwise invisible until someone reads the screen.

### Pseudocode and source, from one tag

`CodePanel.vue` shows the running algorithm two ways, switched by a toggle in its header:

- **Pseudocode** — the hand-written prose in `pseudocode.ts`, highlighted at `line`.
- **Source** — the generator file itself, highlighted at the `yield` the generator is currently suspended at.

Both come off the same `line` tag, so nothing extra is asked of a generator to get the source view. `algorithms/source.ts` supplies the two halves that make it work:

The **text** is imported with Vite's `?raw`, not read from `generator.toString()`. `toString()` is the obvious move and it is wrong twice over: esbuild strips comments and rewrites whitespace in a production build, so what is on screen would stop being what is in the repo, and the line numbers would stop lining up with it. `?raw` inlines the file's exact bytes as a string literal, which minification leaves alone. The cost is the ten sort files' text in the bundle (~15 kB raw, ~4.6 kB gzipped).

The **mapping** from a pseudocode index to the source line(s) that yield it is parsed out of that text by `buildSourceMap`, rather than written by hand — the tag numbers already live in the `yield` calls, and a hand-kept table would go stale the first time anyone inserted a line above one. That parse is a regex, which makes it the fragile part: a `yield` reformatted across two lines stops matching and the highlight silently vanishes. `source.test.ts` pins it from both directions — every tag a generator actually emits must resolve to a line, and every line the map points at must really contain a `yield`.

One tag may map to several source lines (nothing stops two yields sharing one), so `activeSourceLines` is a list and all of them highlight.

### Reproducibility

Every run is reproducible from its seed: `utils/rng.ts` holds a seeded mulberry32, and `randomSeed()` is the app's single remaining `Math.random` call. Any function drawing randomness constructs its `Rng` **fresh on each call** — a long-lived instance would keep advancing, so the same seed would stop reproducing.

Configuration round-trips through the hash query (`?algo=quick&size=60&seed=1839274611`), so any setup is a shareable link. Hand-painted pathfinding walls are the one thing that does not survive a link; randomized mazes do, since they derive from the seed.

To add a new algorithm to an existing category, drop a new generator in that category's `algorithms/` folder and register it in its `index.ts` — it appears in the UI automatically. To add a whole new category, follow the same pattern: a generator module, a composable built on `useStepPlayer`, category-specific components, and a self-contained view added to `navRoutes`.
