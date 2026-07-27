<script setup lang="ts">
import { computed } from 'vue';

// Shared button primitive. Every class string below was lifted from the markup
// it replaces, so the emitted stylesheet is unchanged — the utilities simply
// live in one place now instead of being repeated ~36 times.
//
// No class-variance-authority, no tailwind-merge: seven flat variants in one
// repo are a Record plus a computed. One-off layout utilities (col-span-2,
// mt-4) ride in through Vue's automatic class fallthrough, which needs no
// conflict resolution because layout and color never collide here.

/** The visual roles the app actually uses. */
type Variant = 'primary' | 'warning' | 'danger' | 'neutral' | 'quiet' | 'selector' | 'toggle';

/** Variants that render a solid filled pill and share a common shape. */
type SolidVariant = 'primary' | 'warning' | 'danger' | 'neutral';

/** Variants that live in a button group and carry a selected state. */
type SegmentedVariant = 'selector' | 'toggle';

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    /** Segmented variants only: paints the selected state and sets aria-pressed. */
    active?: boolean;
    disabled?: boolean;
  }>(),
  { variant: 'neutral', active: false, disabled: false },
);

// Shape shared by the four solid variants; only the color words differ.
const SOLID =
  'flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none';

const SOLID_VARIANTS: Record<SolidVariant, string> = {
  primary: 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 hover:bg-emerald-600',
  warning: 'bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-600',
  danger: 'bg-rose-500 text-white shadow-md shadow-rose-500/30 hover:bg-rose-600',
  neutral:
    'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
};

/** The three filled variants also lift on hover; neutral has no shadow to lift. */
const SOLID_HOVER_LIFT: Record<SolidVariant, string> = {
  primary: 'hover:shadow-lg',
  warning: 'hover:shadow-lg',
  danger: 'hover:shadow-lg',
  neutral: '',
};

const SEGMENTED: Record<SegmentedVariant, { base: string; on: string; off: string }> = {
  selector: {
    base: 'rounded-xl px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed',
    on: 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30',
    off: 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white',
  },
  toggle: {
    base: 'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed',
    on: 'bg-indigo-500 text-white shadow-sm',
    off: 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700',
  },
};

const QUIET =
  'rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700';

const isSegmented = computed(() => props.variant === 'selector' || props.variant === 'toggle');

const classes = computed(() => {
  const variant = props.variant;
  if (variant === 'selector' || variant === 'toggle') {
    const style = SEGMENTED[variant];
    return [style.base, props.active ? style.on : style.off];
  }
  if (variant === 'quiet') return QUIET;
  return [SOLID, SOLID_VARIANTS[variant], SOLID_HOVER_LIFT[variant]];
});

// Only a button that has a selected state should announce one. Vue drops the
// attribute entirely when the bound value is undefined.
const pressed = computed(() => (isSegmented.value ? props.active : undefined));
</script>

<template>
  <button type="button" :class="classes" :disabled="disabled" :aria-pressed="pressed">
    <slot />
  </button>
</template>
