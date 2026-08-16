<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { navRoutes } from '@/router';
import ThemePicker from './components/ThemePicker.vue';

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
  <div class="min-h-screen">
    <!-- The header is a full-bleed band with a hairline under it, so the page
         has an actual masthead rather than a logo floating in the content
         column. -->
    <header class="border-b border-line">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4"
      >
        <RouterLink to="/" class="group flex items-baseline gap-2.5">
          <!-- Wordmark, not a gradient tile. A rounded square holding a generic
               glyph is the most over-used mark on the web; a set wordmark with
               the accent carried by a single rule is both cheaper and more
               distinctive, and it survives eight palettes intact. -->
          <span class="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
            >AlgoViz</span
          >
          <span aria-hidden="true" class="h-4 w-px bg-line-strong" />
          <span class="hidden text-2xs uppercase text-ink-faint sm:inline">
            Algorithm Visualizer
          </span>
        </RouterLink>
        <ThemePicker />
      </div>
    </header>

    <!-- Category nav.
         Twelve filled pills wrapping onto two rows was the single busiest
         element on the page: every destination shouted equally, so none of them
         read as current. A single scrollable row with a rule under the active
         tab gives the same information with one loud element instead of twelve. -->
    <nav class="border-b border-line" aria-label="Categories">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <ul class="-mb-px flex gap-1 overflow-x-auto">
          <li v-for="route in navRoutes" :key="route.path" class="shrink-0">
            <RouterLink
              :to="route.path"
              class="block whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors"
              :class="
                $route.path === route.path
                  ? 'border-accent text-accent'
                  : 'border-transparent text-ink-muted hover:border-line-strong hover:text-ink'
              "
            >
              {{ route.meta?.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <main class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <RouterView />

      <footer class="mt-10 border-t border-line pt-5 text-xs text-ink-faint">
        Every algorithm here is a generator that yields a snapshot after each
        meaningful step — nothing is pre-rendered.
      </footer>
    </main>
  </div>
</template>
