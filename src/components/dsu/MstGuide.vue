<script setup lang="ts">
// What a disjoint set is, what its two optimizations buy, and why Kruskal in
// particular cannot be built without one. Follows ConcurrencyGuide.vue's
// shape: this category shows something the other visualizers don't — a
// structure that exists purely to answer one yes/no question fast, whose own
// internal shape (a forest, not the graph) is half the lesson — so it earns
// the same up-front "how to read this" treatment.

import AvExplainer from '@/components/ui/AvExplainer.vue';
</script>

<template>
  <AvExplainer
    title="How to read this"
    summary="A disjoint set answers one question fast: are these two nodes already connected?"
    start-open
  >
    <p class="mb-3 text-slate-600 dark:text-slate-300">
      A <b>disjoint-set forest</b> (union-find) partitions a collection of elements into groups —
      here, nodes into the components they belong to — and supports exactly two operations:
      <code class="font-mono text-xs">find(x)</code>, which returns the group's representative,
      and <code class="font-mono text-xs">union(a, b)</code>, which merges two groups into one.
      Two elements are in the same group precisely when <code class="font-mono text-xs">find</code>
      returns the same answer for both. The forest panel on the right draws exactly that: an arrow
      from each node to its parent, with a self-pointing root marking a group's representative.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
      Two optimizations, one payoff
    </h3>
    <ul class="mb-4 space-y-2 text-slate-600 dark:text-slate-300">
      <li>
        <b>Union by rank.</b> When two trees merge, the shallower one is hung under the deeper
        one, never the other way round. Do this consistently and a forest built from n elements
        can never get deeper than log&#8322;(n) — the Stats panel's <b>Max Depth</b> is that bound
        made visible, not just another counter.
      </li>
      <li>
        <b>Path compression.</b> Every <code class="font-mono text-xs">find</code> re-hangs every
        node it walked through directly onto the root it found. The next
        <code class="font-mono text-xs">find</code> on any of those nodes is then one hop instead
        of a walk — watch the forest panel's amber "on find path" nodes turn emerald the instant
        this happens.
      </li>
    </ul>
    <p class="mb-4 text-slate-600 dark:text-slate-300">
      Neither optimization is required for correctness — a disjoint set built without them still
      answers <code class="font-mono text-xs">find</code> and <code class="font-mono text-xs"
      >union</code> correctly, just slowly, degenerating toward a linked list under an unlucky
      sequence of unions. Together they bring every operation down to
      <code class="font-mono text-xs">O(&alpha;(n))</code> amortized — <code class="font-mono text-xs"
      >&alpha;</code> being the inverse Ackermann function, which is under 5 for any n you could
      ever construct. That is "constant time" in every practical sense.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
      Why Kruskal needs exactly this
    </h3>
    <p class="mb-2 text-slate-600 dark:text-slate-300">
      Kruskal's rule is trivial to state — sort every edge by weight, then accept it unless its
      two endpoints are already connected — and completely useless without a fast answer to
      "already connected?", asked once per edge, on a component structure that is changing under
      the question as edges get accepted. A disjoint set is the one structure built to answer
      that question near-instantly: <code class="font-mono text-xs">find(u) === find(v)</code> is
      the whole cycle check, and <code class="font-mono text-xs">union(u, v)</code> is the whole
      merge. The two obvious alternatives are both dramatically worse — re-running a traversal
      from scratch per edge to check connectivity is O(E) work E times over, and maintaining an
      explicit component-id array means relabelling half the graph on every merge.
    </p>
    <p class="text-slate-500 dark:text-slate-400">
      Prim doesn't strictly need one — it could track "in the tree / not in the tree" with a plain
      boolean array — but this visualization runs a real disjoint set underneath it anyway, purely
      so both algorithms render through the same forest panel. See prim.ts's own header comment for
      exactly which of its counters are meaningful as a result and which are just bookkeeping.
    </p>
  </AvExplainer>
</template>
