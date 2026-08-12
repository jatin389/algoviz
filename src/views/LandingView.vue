<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { navRoutes } from '@/router';
import { useLastVisited } from '@/composables/useLastVisited';

// The grid is derived from `navRoutes`, not a hand-maintained list — adding a
// category to the router is the only edit needed for it to show up here.
const { lastVisited } = useLastVisited();

// Resolve the stored route name back to a live route. A name that no longer
// exists (a category was renamed or removed since the user's last visit) simply
// yields no resume card rather than a dead link.
const resumeRoute = computed(() =>
  lastVisited.value ? navRoutes.find((route) => route.name === lastVisited.value) : undefined,
);
</script>

<template>
  <div class="space-y-8">
    <!-- Intro -->
    <section class="text-center">
      <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">See how algorithms actually run</h2>
      <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
        Every algorithm here is written as a generator that yields a snapshot after each meaningful
        step. Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of
        comparisons, swaps and visits, one step at a time.
      </p>
    </section>

    <!-- Continue where you left off -->
    <section v-if="resumeRoute">
      <RouterLink
        :to="resumeRoute.path"
        class="flex items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 px-5 py-4 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/20"
      >
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-400">
            Continue where you left off
          </p>
          <p class="mt-1 font-semibold">{{ resumeRoute.meta?.label }}</p>
        </div>
        <span aria-hidden="true" class="text-xl text-indigo-500 dark:text-indigo-400">&rarr;</span>
      </RouterLink>
    </section>

    <!-- Category grid -->
    <section>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Categories</h3>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="route in navRoutes" :key="route.path">
          <RouterLink
            :to="route.path"
            class="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-indigo-500/50"
          >
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-semibold">{{ route.meta?.label }}</span>
              <span
                v-if="route.meta?.count"
                class="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300"
              >
                {{ route.meta.count }} algorithms
              </span>
            </div>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ route.meta?.pitch }}</p>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>
