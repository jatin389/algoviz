/** @type {import('tailwindcss').Config} */

// Semantic colours are authored in `src/style.css` as space-separated RGB
// channels (`--av-surface: 15 23 42`) rather than complete colours, because
// Tailwind substitutes `<alpha-value>` by plain string replacement. Channels
// are what make `bg-surface/70` possible; a `#0f172a` or a `rgb(...)` in the
// variable would silently drop every opacity modifier in the app, and there
// are ~150 of them.
const token = (name) => `rgb(var(--av-${name}) / <alpha-value>)`;

export default {
  // KEEP until the last `dark:` utility is gone, then delete in its own commit.
  // Removing this line does not error: Tailwind falls back to `darkMode: 'media'`,
  // which re-keys every surviving `dark:` to the OS preference. That breaks only
  // on dark-OS machines, so it does not show up in review on a light-OS box.
  darkMode: 'class',
  // Must include .ts: the tone tables are Record<> literals in .ts files, and
  // Tailwind only emits a class it has literally seen in a scanned file.
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      // `extend`, never a bare `theme.colors` — extend merges with the default
      // palette, so `slate-500` and `surface` both resolve while the migration
      // is in flight. The final tier moves this to `theme.colors` so that any
      // surviving literal becomes a build failure rather than an unthemed pixel.
      colors: {
        canvas: token('canvas'),
        surface: {
          DEFAULT: token('surface'),
          alt: token('surface-alt'),
          raised: token('surface-raised'),
        },
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },
        ink: {
          DEFAULT: token('ink'),
          muted: token('ink-muted'),
          faint: token('ink-faint'),
          inverse: token('ink-inverse'),
        },
        accent: {
          DEFAULT: token('accent'),
          alt: token('accent-alt'),
          soft: token('accent-soft'),
          ink: token('accent-ink'),
        },
        // The seven algorithm states. Three layers each, because the tables
        // being replaced use a saturated fill, a tinted surface, and a legible
        // text colour on that surface. Borders reuse the base at reduced alpha
        // (`border-tone-probe/60`) rather than earning a fourth layer.
        tone: {
          idle: { DEFAULT: token('tone-idle'), soft: token('tone-idle-soft'), ink: token('tone-idle-ink') },
          probe: { DEFAULT: token('tone-probe'), soft: token('tone-probe-soft'), ink: token('tone-probe-ink') },
          active: { DEFAULT: token('tone-active'), soft: token('tone-active-soft'), ink: token('tone-active-ink') },
          settled: { DEFAULT: token('tone-settled'), soft: token('tone-settled-soft'), ink: token('tone-settled-ink') },
          rejected: { DEFAULT: token('tone-rejected'), soft: token('tone-rejected-soft'), ink: token('tone-rejected-ink') },
          trace: { DEFAULT: token('tone-trace'), soft: token('tone-trace-soft'), ink: token('tone-trace-ink') },
          blocked: { DEFAULT: token('tone-blocked'), soft: token('tone-blocked-soft'), ink: token('tone-blocked-ink') },
        },
      },

      // The whole radius set, not a subset: a partially-overridden scale mixes
      // themed and stock geometry, which is visible as soon as a theme wants
      // square corners. `full` stays literal — a pill is a pill in every theme.
      // `mark` is for data marks: a 16px bar with an 8px radius has no readable
      // top edge, so bars and cells get their own near-square token while cards
      // stay soft.
      borderRadius: {
        none: '0px',
        sm: 'var(--av-radius-sm)',
        DEFAULT: 'var(--av-radius)',
        md: 'var(--av-radius-md)',
        lg: 'var(--av-radius-lg)',
        xl: 'var(--av-radius-xl)',
        '2xl': 'var(--av-radius-2xl)',
        '3xl': 'var(--av-radius-3xl)',
        mark: 'var(--av-radius-mark)',
        full: '9999px',
      },

      // The offsets stay literal and only the COLOUR is a variable. This is not
      // a style preference: `parseBoxShadowValue` marks a shadow valid only when
      // it can read an x and a y, and an invalid shadow makes `--tw-shadow-colored`
      // identical to `--tw-shadow`. That silently turns every `shadow-accent/30`
      // into a no-op — no build error, no warning, just a missing colour.
      boxShadow: {
        // `sm` and `inner` use the softer alpha, matching Tailwind's own scale.
        sm: '0 1px 2px 0 var(--av-shadow-soft)',
        DEFAULT: '0 1px 3px 0 var(--av-shadow-color), 0 1px 2px -1px var(--av-shadow-color)',
        md: '0 4px 6px -1px var(--av-shadow-color), 0 2px 4px -2px var(--av-shadow-color)',
        lg: '0 10px 15px -3px var(--av-shadow-color), 0 4px 6px -4px var(--av-shadow-color)',
        xl: '0 20px 25px -5px var(--av-shadow-color), 0 8px 10px -6px var(--av-shadow-color)',
        '2xl': '0 25px 50px -12px var(--av-shadow-strong)',
        inner: 'inset 0 2px 4px 0 var(--av-shadow-soft)',
        // `none` is intentionally not redefined — Tailwind's own entry already
        // emits a fully transparent shadow, and restating it here makes the
        // colour-substitution pass rewrite it.
      },

      // Preflight sets the <html> font from `theme('fontFamily.sans')`, so
      // routing these through variables themes the base font for free — which
      // is what lets Terminal swap the whole UI to a mono face from CSS alone.
      fontFamily: {
        display: 'var(--av-font-display)',
        sans: 'var(--av-font-sans)',
        mono: 'var(--av-font-mono)',
      },

      // The type scale is deliberately NOT changed here. Overriding `fontSize`
      // rewrites every existing `text-sm`/`text-base` in the app, which would
      // make this tier a visual change rather than inert plumbing. It lands
      // with the rest of the typography work.
    },
  },
  plugins: [
    ({ addVariant, addUtilities }) => {
      // Windows High Contrast / forced-colors. The monochrome encoding (stroke
      // weight, dash, pattern) is exactly what survives forced-colors, so the
      // two share one implementation.
      addVariant('hc', '@media (forced-colors: active)');
      addVariant('motion-ok', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-off', '@media (prefers-reduced-motion: reduce)');
      addUtilities({
        // Every readout in the app is a number that changes every frame.
        // Without tabular figures they shift horizontally as they count.
        '.nums': { fontVariantNumeric: 'tabular-nums slashed-zero lining-nums' },
      });
    },
  ],
};
