<script setup lang="ts">
import { computed } from 'vue';

// The measurement rail that sits under an indexed visualization.
//
// This is the app's signature element — one form repeated across every indexed
// view so eight palettes read as one product rather than eight skins. It is
// also the rare decoration that does real work: in a 60-element array you can
// actually find index 37 by eye, which you cannot do against bare bars.
//
// Each theme restyles it purely through tokens (Terminal's square hairlines,
// Paper's ink ticks, High Contrast's heavier rules); none of them reimplement
// it.

const props = withDefaults(
  defineProps<{
    /** Number of items the rail spans. One tick per item. */
    length: number;
    /** Label every Nth index. Ticks between are drawn short and unlabelled. */
    step?: number;
    /**
     * Below this many items the rail is suppressed entirely — at small counts
     * the bars are wide enough to count directly, and a rail under them is
     * noise rather than help.
     */
    minLength?: number;
  }>(),
  { step: 5, minLength: 12 },
);

const visible = computed(() => props.length >= props.minLength);

/**
 * Labelling every index is unreadable past ~40 items, so the step grows with
 * the array instead. The multiplier keeps roughly a dozen labels on screen at
 * any size rather than a fixed count that crowds at one end of the range.
 */
const effectiveStep = computed(() => {
  const target = Math.ceil(props.length / 12);
  return Math.max(props.step, Math.ceil(target / props.step) * props.step);
});

const ticks = computed(() =>
  Array.from({ length: props.length }, (_, index) => ({
    index,
    major: index % effectiveStep.value === 0,
  })),
);
</script>

<template>
  <div v-if="visible" class="mt-1 select-none" aria-hidden="true">
    <div class="flex items-start gap-[2px] sm:gap-1">
      <div v-for="tick in ticks" :key="tick.index" class="flex flex-1 flex-col items-center">
        <span
          class="w-px bg-line-strong"
          :class="tick.major ? 'h-1.5 opacity-100' : 'h-1 opacity-40'"
        />
        <span
          v-if="tick.major"
          class="nums mt-0.5 font-mono text-[9px] leading-none text-ink-faint"
        >
          {{ tick.index }}
        </span>
      </div>
    </div>
  </div>
</template>
