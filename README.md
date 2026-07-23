# AlgoViz — Sorting Algorithm Visualizer

An interactive, single-page app for watching sorting algorithms work step by step. Built with **Vue 3**, **Vite**, and **Tailwind CSS**.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Six algorithms** — Bubble, Selection, Insertion, Merge, Quick, and Heap sort, each with a description and Big-O complexity card.
- **Controls** — array size (10–100) and speed sliders, shuffle, run, pause/resume, and reset.
- **Color-coded bars** — unsorted, comparing, swapping, and final-position bars, with smooth CSS height/color transitions.
- **Live stats** — comparisons, swaps, step count, and elapsed time.
- **Dark mode by default** with a light-mode toggle (persisted to `localStorage`).
- **Responsive** layout for desktop and tablet, with controls locked while a sort is running.

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
npm run test       # run the algorithm unit tests (Vitest)
```

## Architecture

Algorithm logic is fully decoupled from rendering. Each algorithm is a **generator function** that yields immutable *step snapshots* describing the array state plus which indices are being compared/swapped/finalized. The UI simply plays these snapshots back on a timer.

```
src/
├── algorithms/            # pure, framework-free sorting generators
│   ├── _utils.js          # snapshot helpers (the step contract)
│   ├── bubbleSort.js
│   ├── selectionSort.js
│   ├── insertionSort.js
│   ├── mergeSort.js
│   ├── quickSort.js
│   ├── heapSort.js
│   ├── index.js           # registry: key -> { name, generator, complexity, ... }
│   └── algorithms.test.js # correctness tests for every generator
├── composables/
│   ├── useSorter.js        # playback engine: drives a generator, owns all state
│   └── useTheme.js         # shared dark/light mode
├── components/
│   ├── AlgorithmSelector.vue
│   ├── ControlsPanel.vue
│   ├── BarChart.vue        # visualization + legend
│   ├── StatsDisplay.vue
│   └── ThemeToggle.vue
├── App.vue                 # wires composable state to components
├── main.js
└── style.css               # Tailwind entry + slider/base styling
```

### The step-snapshot contract

Every generator yields objects of this shape (see `algorithms/_utils.js`):

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

Because generators are lazy, `useSorter` advances one step per timer tick — the array is never sorted "all at once" behind the scenes. To add a new algorithm, drop a new generator in `src/algorithms/`, register it in `index.js`, and it appears in the UI automatically.....
