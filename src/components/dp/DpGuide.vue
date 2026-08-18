<script setup lang="ts">
// What a DP table is, and how to read this particular one.
//
// The table is the least self-explanatory picture in the app. A sorted bar
// chart explains itself; a grid of integers with arrows on it does not, and
// the two things that make it mean something — that a cell is a *subproblem*,
// and that an arrow is "this answer was reused rather than recomputed" — are
// exactly the things a reader has to be told once and then never again. Hence
// `start-open`, matching `ConcurrencyGuide` for the same reason.

import AvExplainer from '@/components/ui/AvExplainer.vue';
</script>

<template>
  <AvExplainer
    title="How to read this"
    summary="Every cell is a smaller version of the same question, answered once and reused."
    start-open
  >
    <p class="mb-3 text-ink-muted">
      A dynamic programming table is a list of subproblems with their answers written down. Each
      cell asks a smaller version of the same question —
      <em>what is the best I can do with the first 3 items and a capacity of 5?</em> — and the
      recurrence at the top of the table says how to answer it using cells that are already filled
      in. Nothing is ever computed twice, which is the entire trick: the naive recursion asks the
      same subproblem over and over, and the table simply refuses to.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Reading the arrows
    </h3>
    <p class="mb-3 text-ink-muted">
      The <span class="font-semibold text-tone-active-ink">cell being computed right now</span> is
      highlighted. The <span class="font-semibold text-tone-trace-ink">cells its recurrence
      read</span> are highlighted too, and an arrow runs from each of them into it. Where the
      recurrence has to <em>choose</em> — take the item or skip it, insert or delete or substitute
      — the <span class="font-semibold text-tone-active-ink">chosen branch</span> is drawn thicker,
      and the others stay thin. That thicker arrow is the decision the traceback will later follow
      back.
    </p>
    <p class="mb-3 text-ink-muted">
      Hover any cell — filled or not, at any point in the run — to see the arrows for
      <em>that</em> cell instead, drawn dashed. They come from the same function the animation uses,
      so what you see on hover is exactly what the algorithm would read.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      The traceback
    </h3>
    <p class="mb-3 text-ink-muted">
      Filling the table answers the question with a <em>number</em>: the length of the longest
      common subsequence, the cost of the cheapest parenthesisation. It does not, by itself, tell
      you <em>which</em> subsequence or <em>which</em> parenthesisation. The
      <span class="font-semibold text-tone-trace-ink">traceback path</span> is the second pass that
      recovers it, walking backwards from the answer cell and, at each step, asking which branch won
      there. That is why the traceback lights up a thin path through a large table — most of the
      cells were needed to be sure, but only a few are part of the answer.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Cells versus calls
    </h3>
    <p class="text-ink-faint">
      The stats panel counts both: the cells this table costs, and the calls the naive recursion
      would have made on the same input. Fibonacci at n = 40 is 41 cells against 331 million calls.
      The call counts are exact, not estimated — and where one grows past what a JavaScript number
      can hold exactly, it is shown as a lower bound (<code class="font-mono text-xs"
        >&gt; 9.0e15</code
      >) rather than as a wrong-looking round number.
    </p>
  </AvExplainer>
</template>
