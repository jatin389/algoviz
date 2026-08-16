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

// Counting what the app actually contains beats claiming it is comprehensive,
// and it cannot go stale — both numbers come from the registries themselves.
const algorithmCount = computed(() =>
  navRoutes.reduce((total, route) => total + (route.meta?.count ?? 0), 0),
);
</script>

<template>
  <div class="space-y-12">
    <!-- Hero.
         Left-aligned and set at the top of the display scale. The previous
         version was centred body copy at roughly the same size as everything
         below it, which gave the page no entry point — centring is the layout
         you reach for when you have not decided what matters. -->
    <section class="max-w-3xl">
      <p class="text-2xs font-semibold uppercase text-accent">Algorithm Visualizer</p>
      <h2 class="mt-3 font-display text-d-1 font-extrabold text-ink sm:text-d-2">
        See how algorithms actually run.
      </h2>
      <p class="mt-4 max-w-2xl text-base text-ink-muted">
        Every algorithm here is a generator that yields a snapshot after each meaningful step.
        Nothing is pre-rendered or faked — play, pause and scrub through the real sequence of
        comparisons, swaps and visits, one step at a time.
      </p>

      <dl class="mt-7 flex flex-wrap gap-x-8 gap-y-3">
        <div>
          <dt class="text-2xs uppercase text-ink-faint">Categories</dt>
          <dd class="nums font-mono text-xl font-semibold text-ink">{{ navRoutes.length }}</dd>
        </div>
        <div>
          <dt class="text-2xs uppercase text-ink-faint">Algorithms</dt>
          <dd class="nums font-mono text-xl font-semibold text-ink">{{ algorithmCount }}</dd>
        </div>
        <div>
          <dt class="text-2xs uppercase text-ink-faint">Themes</dt>
          <dd class="nums font-mono text-xl font-semibold text-ink">8</dd>
        </div>
      </dl>
    </section>

    <!-- Continue where you left off -->
    <section v-if="resumeRoute">
      <RouterLink
        :to="resumeRoute.path"
        class="group flex items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent-soft px-5 py-4 transition-colors hover:border-accent"
      >
        <span>
          <span class="block text-2xs font-semibold uppercase text-accent">
            Continue where you left off
          </span>
          <span class="mt-1 block font-semibold text-ink">{{ resumeRoute.meta?.label }}</span>
        </span>
        <span
          aria-hidden="true"
          class="text-xl text-accent transition-transform group-hover:translate-x-1"
          >&rarr;</span
        >
      </RouterLink>
    </section>

    <!-- Category grid. Hairline borders and a flat surface rather than lifting
         shadows: eleven cards that all hover-lift is eleven things asking for
         attention at once.
         Bordered cards rather than a single gapless table, because the category
         count is not a multiple of the column count — a table leaves a hole at
         the end of the last row that reads as a broken cell. -->
    <section>
      <h3 class="mb-4 text-2xs font-semibold uppercase text-ink-faint">Categories</h3>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="route in navRoutes" :key="route.path">
          <RouterLink
            :to="route.path"
            class="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-alt"
          >
            <span class="flex items-baseline justify-between gap-2">
              <span class="font-display font-bold text-ink">{{ route.meta?.label }}</span>
              <span
                v-if="route.meta?.count"
                class="nums shrink-0 font-mono text-2xs text-ink-faint"
              >
                {{ route.meta.count }}
              </span>
            </span>
            <span class="mt-2 text-sm text-ink-muted">{{ route.meta?.pitch }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>
