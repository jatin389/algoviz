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
      <p class="mx-auto mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
        Every algorithm here is written as a generator that yields a snapshot after each meaningful
        step. Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of
        comparisons, swaps and visits, one step at a time.
      </p>
    </section>

    <!-- Continue where you left off -->
    <section v-if="resumeRoute">
      <RouterLink
        :to="resumeRoute.path"
        class="flex items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent-soft/60 px-5 py-4 transition-all hover:border-accent/50 hover:bg-accent-soft"
      >
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-accent">
            Continue where you left off
          </p>
          <p class="mt-1 font-semibold">{{ resumeRoute.meta?.label }}</p>
        </div>
        <span aria-hidden="true" class="text-xl text-accent">&rarr;</span>
      </RouterLink>
    </section>

    <!-- Category grid -->
    <section>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Categories</h3>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="route in navRoutes" :key="route.path">
          <RouterLink
            :to="route.path"
            class="flex h-full flex-col rounded-2xl border border-line bg-surface-raised/70 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
          >
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-semibold">{{ route.meta?.label }}</span>
              <span
                v-if="route.meta?.count"
                class="shrink-0 rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-ink-muted"
              >
                {{ route.meta.count }} algorithms
              </span>
            </div>
            <p class="mt-2 text-sm text-ink-muted">{{ route.meta?.pitch }}</p>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>
