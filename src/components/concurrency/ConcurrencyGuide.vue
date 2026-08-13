<script setup lang="ts">
// What an interleaving *is*, and how to read the three panels.
//
// This view shows something no other domain does — a search over orderings
// rather than a single run — so the letter chips, the "checked all N" claim
// and the thread lanes all need decoding before any of it means anything.

import AvExplainer from '@/components/ui/AvExplainer.vue';
</script>

<template>
  <AvExplainer
    title="How to read this"
    summary="Same code, different orderings. Some orderings are buggy — this finds which."
    start-open
  >
    <p class="mb-3 text-slate-600 dark:text-slate-300">
      Two threads run at the same time, so their instructions can land in many different orders.
      The code never changes; only the <em>ordering</em> does. Most concurrency bugs are orderings
      that happen to be rare — which is exactly why they survive testing and surface in
      production. This page enumerates the orderings instead of waiting to get unlucky.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
      Reading an interleaving
    </h3>
    <p class="mb-3 text-slate-600 dark:text-slate-300">
      Each chip is one complete ordering, written as letters:
      <code class="font-mono text-xs">A</code> means T0 takes its next step,
      <code class="font-mono text-xs">B</code> means T1 does. So
      <code class="font-mono text-xs">ABABAB</code> is strict alternation, and
      <code class="font-mono text-xs">AAABBB</code> is T0 finishing completely before T1 starts.
      <span class="text-rose-600 dark:text-rose-400">Red chips break the invariant</span>; click
      any chip to load it, and playback jumps straight to the step where it first goes wrong.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
      The two scenarios
    </h3>
    <ul class="mb-4 space-y-2 text-slate-600 dark:text-slate-300">
      <li>
        <b>Racy counter.</b> <code class="font-mono text-xs">counter = counter + 1</code> is three
        machine steps, not one: read, add, write. If both threads read before either writes, they
        both compute the same value and one increment vanishes. Only the two orderings where one
        thread finishes first are safe.
      </li>
      <li>
        <b>Mutex violation.</b> Checking whether a lock is free and taking it are separate steps,
        so both threads can see it free and both walk in. Watch for two lanes showing
        <em>in critical section</em> at once — and note the state looks perfectly fine again by
        the last step, which is why this bug is so hard to catch after the fact.
      </li>
    </ul>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
      “Checked all” vs “sampled”
    </h3>
    <p class="mb-2 text-slate-600 dark:text-slate-300">
      The number of orderings explodes as threads and instructions grow — two threads of three
      steps is 20, but five threads of four is over 300 billion. When the total is small enough,
      every single ordering is executed and checked, and the panel says
      <b>checked all N</b>. When it is not, orderings are sampled instead and the panel says so.
      Both scenarios here are small enough to check exhaustively, so nothing is being missed.
    </p>
    <p class="text-slate-500 dark:text-slate-400">
      The seed only matters in sampled mode, where it decides which orderings get drawn. Sharing
      the URL reproduces the exact interleaving you are looking at.
    </p>
  </AvExplainer>
</template>
