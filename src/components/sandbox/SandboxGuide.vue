<script setup lang="ts">
// The sandbox's contract, in the view rather than only in the starter comment.
//
// Without this the feature is close to unusable from cold: nothing on screen
// says the function must be named `run`, must be a generator, or which fields
// a snapshot needs — and every one of those is a hard requirement that fails
// with an error rather than degrading.

import {
  MAX_SANDBOX_STEPS,
  MAX_SANDBOX_ARRAY_LENGTH,
  SANDBOX_SIZE_MAX,
} from '@/sandbox/contract';
import AvExplainer from '@/components/ui/AvExplainer.vue';

const fields: { name: string; type: string; note: string }[] = [
  { name: 'array', type: 'number[]', note: 'Required. The values as they stand right now.' },
  { name: 'comparing', type: 'number[]', note: 'Indices to mark as being compared. Defaults to none.' },
  { name: 'swapping', type: 'number[]', note: 'Indices to mark as swapping.' },
  { name: 'sorted', type: 'number[]', note: 'Indices to mark as sorted — settled for good.' },
  { name: 'comparisons', type: 'number', note: 'Shown in Stats. Your own running count.' },
  { name: 'swaps', type: 'number', note: 'Shown in Stats.' },
  { name: 'done', type: 'boolean', note: 'true on the final snapshot only. Ends the run.' },
];
</script>

<template>
  <AvExplainer
    title="How this works"
    summary="Write a generator, yield a snapshot per frame. Read this first — the shape is strict."
    start-open
  >
    <p class="mb-3 text-ink-muted">
      Your code runs in a sandboxed frame on its own thread, and everything it
      <code class="font-mono text-xs">yield</code>s is drawn on the chart to the right. It is the
      same contract every built-in algorithm here uses, so anything you write plays back with the
      same scrubber, speed control and step history.
    </p>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Required shape
    </h3>
    <pre
      class="mb-4 overflow-x-auto rounded-xl bg-surface-alt p-3 font-mono text-[11px] leading-5 text-ink"
    ><code>// name and function* are both required
function* run(input) {
  // copy it — mutating input breaks Reset
  const array = [...input];

  // one yield = one frame
  yield {
    array: [...array],
    comparing: [0, 1],
    swapping: [],
    sorted: [],
    comparisons: 1,
    swaps: 0,
    done: false,
  };
}</code></pre>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Snapshot fields
    </h3>
    <div class="mb-4 overflow-x-auto">
      <table class="w-full border-collapse text-left text-xs">
        <tbody>
          <tr
            v-for="field in fields"
            :key="field.name"
            class="border-b border-line last:border-0"
          >
            <td class="py-1.5 pr-3 font-mono font-semibold text-ink">
              {{ field.name }}
            </td>
            <td class="py-1.5 pr-3 font-mono text-ink-faint">{{ field.type }}</td>
            <td class="py-1.5 text-ink-muted">{{ field.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Rules worth knowing
    </h3>
    <ul class="mb-4 list-disc space-y-1.5 pl-5 text-ink-muted">
      <li>
        <b>JavaScript only.</b> The runner evaluates JS — other languages and WebAssembly are not
        supported.
      </li>
      <li>
        Highlight indices must be whole numbers <b>inside</b> the array. An out-of-range index is
        rejected rather than clamped, because a clamped index quietly highlights the wrong bar.
      </li>
      <li>
        A rejected snapshot is skipped and reported in the Sandbox panel with the reason — the run
        keeps going.
      </li>
      <li>
        Helper functions are fine. Only <code class="font-mono text-xs">run</code> is special.
      </li>
      <li>
        Limits: {{ MAX_SANDBOX_STEPS.toLocaleString() }} snapshots per run, arrays up to
        {{ MAX_SANDBOX_ARRAY_LENGTH }} entries (the size slider stops at {{ SANDBOX_SIZE_MAX }}).
      </li>
    </ul>

    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      Why it is safe to run a link someone sent you
    </h3>
    <p class="mb-2 text-ink-muted">
      Code executes inside an isolated frame with no access to this page — not its DOM, its
      storage, or its cookies — and on a separate thread, so even an infinite loop cannot freeze
      the tab. A run that stops responding is terminated automatically.
    </p>
    <p class="text-ink-faint">
      One honest limitation: isolation stops shared code touching <em>this app</em>, but it can
      still make network requests, the same as any script on any page you open. Treat a shared
      snippet the way you would treat any link.
    </p>
  </AvExplainer>
</template>
