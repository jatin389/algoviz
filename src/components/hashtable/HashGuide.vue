<script setup lang="ts">
// What the two collision families actually trade against each other, and why
// the load factor and the tombstones are on screen at all.
//
// Opens by default, like ConcurrencyGuide: the bucket grid shows probe badges,
// tombstones and a resize animation, none of which mean anything to someone who
// has not been told what a probe sequence is.

import AvExplainer from '@/components/ui/AvExplainer.vue';
</script>

<template>
  <AvExplainer
    title="How to read this"
    summary="A hash sends every key to one bucket. The interesting part is what happens when two land on the same one."
    start-open
  >
    <p class="mb-3 text-ink-muted">
      A hash table turns a key into a number, folds that number into a slot with
      <code class="font-mono text-xs">h(key) mod capacity</code>, and stores the key there. That is
      the entire idea, and it is O(1) — right up until two keys pick the same slot. Everything on
      this page is about that moment. The inspector spells out the arithmetic for every step, so
      each probe can be checked by hand.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Chaining vs open addressing
    </h3>
    <ul class="mb-4 space-y-2 text-ink-muted">
      <li>
        <b>Separate chaining</b> hangs a list off each bucket. Colliding keys are appended, so a
        lookup hashes once and then walks a chain that averages α links long. It degrades gently,
        never fills up, and deletion is just unlinking — but every entry costs a pointer, and the
        chain is scattered through memory.
      </li>
      <li>
        <b>Open addressing</b> keeps everything in the array: on a collision, the key walks a
        <em>probe sequence</em> until it finds a free slot. No pointers, excellent cache behaviour,
        and it is what most modern standard libraries do — at the price of everything below.
      </li>
    </ul>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Clustering — the reason there are three probe sequences
    </h3>
    <p class="mb-3 text-ink-muted">
      <b>Linear probing</b> tries the next slot along, so collisions form contiguous runs, and every
      run is a bigger target for the next key — a cluster grows itself. That is
      <em>primary clustering</em>. <b>Quadratic probing</b> jumps k(k+1)/2 slots on the k-th probe,
      which scatters the runs; but two keys with the same home slot still follow the identical
      jump sequence, which is <em>secondary clustering</em>. <b>Double hashing</b> derives the stride
      from a second hash of the key, so even keys that collide at home diverge immediately. Load the
      weak hash function, force a collision, and switch between the three: the badges show the
      probe order, and the clusters are visible.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Why α matters
    </h3>
    <p class="mb-3 text-ink-muted">
      The load factor α = keys / slots is what the cost actually depends on — not the number of
      keys. Chaining costs about 1 + α. Open addressing costs about 1/(1 − α), which is 2 probes at
      half full, 10 at 90%, and unbounded as the table fills. That is why the table grows: once α
      crosses the threshold, the capacity doubles and <em>every key is rehashed</em>, because a key's
      slot is a function of the capacity it was inserted under. Watch the rehash step through key by
      key — most of them move. Each individual resize is O(n), but it only happens after n more
      inserts, so the amortized cost per insert stays constant.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Why deletion needs a tombstone
    </h3>
    <p class="mb-2 text-ink-muted">
      Under open addressing a search stops at the first <em>empty</em> slot — that is what makes a
      miss cheap. So emptying a slot on delete would cut every probe sequence that ran through it,
      and any key stored further along its own sequence would become invisible while still sitting
      in the table. Instead the slot is marked
      <span class="font-mono text-tone-rejected-ink">✕ deleted</span>: searches walk
      straight past it, and a later insert may reuse it. Delete a key from the middle of a cluster
      and search for one after it — the tombstone is what makes the lookup still succeed.
    </p>
    <p class="text-ink-faint">
      Tombstones are not free: they hold no key but still cost a probe, so they count toward the
      fill that triggers a resize. A rehash is also how they get cleaned up.
    </p>
  </AvExplainer>
</template>
