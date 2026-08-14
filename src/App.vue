<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { navRoutes } from '@/router';
import { useIsEmbed } from '@/composables/useIsEmbed';
import ThemeToggle from './components/ThemeToggle.vue';

// Embed routes drop the chrome entirely: an iframe on someone else's page has no
// use for our header, tab bar or footer, and the host supplies the surrounding
// layout.
const isEmbed = useIsEmbed();

// Each route is a fully self-contained view with its own composable/state —
// switching tabs never mixes state between them, and a view is only mounted
// (and its timers/generators alive) while its tab is active. <RouterView>
// without <KeepAlive> preserves that: the previous view unmounts, which is what
// disposes its timer chain.
//
// `navRoutes` comes from the router module rather than `router.getRoutes()`,
// whose ordering is not guaranteed to match declaration order — and tab order
// matters here.
</script>

<template>
  <div :class="isEmbed ? '' : 'min-h-screen'">
    <!-- Embedded, the iframe sets the box: no centering, no max width, and only
         enough padding to keep the visualizer off the frame edge. -->
    <div :class="isEmbed ? 'p-3' : 'mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8'">
      <!-- Header -->
      <header v-if="!isEmbed" class="mb-6 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3 rounded-2xl transition-opacity hover:opacity-80">
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
        </RouterLink>
        <ThemeToggle />
      </header>

      <!-- Category nav -->
      <nav v-if="!isEmbed" class="mb-6 flex flex-wrap gap-2">
        <RouterLink
          v-for="route in navRoutes"
          :key="route.path"
          :to="route.path"
          class="rounded-xl px-4 py-2 text-sm font-semibold transition-all"
          :class="
            $route.path === route.path
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
              : 'bg-white/70 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'
          "
        >
          {{ route.meta?.label }}
        </RouterLink>
      </nav>

      <RouterView />

      <footer v-if="!isEmbed" class="mt-8 text-center text-xs text-slate-400">
        Built with Vue 3, Vite &amp; Tailwind CSS · each algorithm is a generator yielding step
        snapshots.
      </footer>
    </div>
  </div>
</template>
