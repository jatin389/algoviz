// The theme registry. One entry per `[data-theme]` block in `src/style.css`;
// adding a theme means adding a block there and a row here, nothing else.
//
// Themes are a flat list rather than a family-plus-polarity matrix. Each theme
// owns its light-or-dark character outright, so there is one picker and one
// axis instead of a theme control and a separate light/dark switch whose
// combinations mostly do not make sense (a "light Terminal" is not a thing).

export type ThemeName =
  | 'midnight'
  | 'daylight'
  | 'neon'
  | 'pastel'
  | 'mono'
  | 'terminal'
  | 'paper'
  | 'contrast';

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  /** One line, shown under the label in the picker. */
  blurb: string;
  /**
   * Whether the palette is dark. Nothing in the styling depends on this — every
   * colour resolves from the theme's own tokens — but the picker uses it to
   * group light and dark themes, and the contrast test uses it as a sanity
   * check against the block's declared `color-scheme`.
   */
  dark: boolean;
  group: 'Core' | 'Expressive' | 'Accessible';
}

export const THEMES: readonly ThemeMeta[] = [
  {
    name: 'midnight',
    label: 'Midnight',
    blurb: 'Deep blue-black with a single cyan accent.',
    dark: true,
    group: 'Core',
  },
  {
    name: 'daylight',
    label: 'Daylight',
    blurb: 'Clean and bright, crisp hairlines.',
    dark: false,
    group: 'Core',
  },
  {
    name: 'neon',
    label: 'Neon',
    blurb: 'Near-black with acid mint and a glow.',
    dark: true,
    group: 'Expressive',
  },
  {
    name: 'pastel',
    label: 'Pastel',
    blurb: 'Warm paper, soft fills, inked borders.',
    dark: false,
    group: 'Expressive',
  },
  {
    name: 'mono',
    label: 'Monochrome',
    blurb: 'One hue. State reads as texture and outline.',
    dark: true,
    group: 'Expressive',
  },
  {
    name: 'terminal',
    label: 'Terminal',
    blurb: 'Amber phosphor, square corners, all mono.',
    dark: true,
    group: 'Expressive',
  },
  {
    name: 'paper',
    label: 'Paper',
    blurb: 'Risograph spot inks on off-white stock.',
    dark: false,
    group: 'Expressive',
  },
  {
    name: 'contrast',
    label: 'High Contrast',
    blurb: 'Maximum contrast, colourblind-safe states.',
    dark: true,
    group: 'Accessible',
  },
] as const;

export const DEFAULT_THEME: ThemeName = 'midnight';

const NAMES = new Set<string>(THEMES.map((t) => t.name));

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === 'string' && NAMES.has(value);
}

export function isDarkTheme(name: ThemeName): boolean {
  return THEMES.find((t) => t.name === name)?.dark ?? true;
}

/**
 * Resolve whatever is in storage to a real theme name.
 *
 * The key predates this registry and used to hold the strings `'dark'` and
 * `'light'`, so existing visitors have one of those sitting in localStorage.
 * Mapping them keeps a returning user on the palette they had rather than
 * silently resetting them to the default.
 */
export function resolveStoredTheme(stored: string | null): ThemeName {
  if (stored === 'dark') return 'midnight';
  if (stored === 'light') return 'daylight';
  return isThemeName(stored) ? stored : DEFAULT_THEME;
}
