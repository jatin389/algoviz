<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';
import SortingView from './views/SortingView.vue';
import SearchView from './views/SearchView.vue';
import PathfindingView from './views/PathfindingView.vue';
import BstView from './views/BstView.vue';
import HeapView from './views/HeapView.vue';
import GraphView from './views/GraphView.vue';
import ThemeToggle from './components/ThemeToggle.vue';

type CategoryKey = 'sorting' | 'searching' | 'pathfinding' | 'bst' | 'heap' | 'graph';

interface Category {
  key: CategoryKey;
  label: string;
  component: Component;
}

// Each category is a fully self-contained view with its own composable/state —
// switching tabs never mixes state between them, and a view is only mounted
// (and its timers/generators alive) while its tab is active.
const categories: Category[] = [
  { key: 'sorting', label: 'Sorting', component: SortingView },
  { key: 'searching', label: 'Searching', component: SearchView },
  { key: 'pathfinding', label: 'Pathfinding', component: PathfindingView },
  { key: 'bst', label: 'BST', component: BstView },
  { key: 'heap', label: 'Heap', component: HeapView },
  { key: 'graph', label: 'Graph', component: GraphView },
];

const activeCategory = ref<CategoryKey>('sorting');

// `find` is typed `Category | undefined`, but activeCategory is a CategoryKey so
// a match always exists. Fall back to the first category rather than asserting.
const activeComponent = () =>
  (categories.find((c) => c.key === activeCategory.value) ?? categories[0]).component;
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <!-- Header -->
      <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              class="h-6 w-6"
            >
              <line x1="6" y1="20" x2="6" y2="14" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="18" y1="20" x2="18" y2="10" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">AlgoViz</h1>
            <p class="text-xs text-slate-400 sm:text-sm">Interactive algorithm visualizer</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <!-- Category nav -->
      <nav class="mb-6 flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category.key"
          type="button"
          class="rounded-xl px-4 py-2 text-sm font-semibold transition-all"
          :class="
            activeCategory === category.key
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
              : 'bg-white/70 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'
          "
          @click="activeCategory = category.key"
        >
          {{ category.label }}
        </button>
      </nav>

      <component :is="activeComponent()" />

      <footer class="mt-8 text-center text-xs text-slate-400">
        Built with Vue 3, Vite &amp; Tailwind CSS · each algorithm is a generator yielding step
        snapshots.
      </footer>
    </div>
  </div>
</template>
