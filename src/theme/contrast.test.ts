import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { ALGO_TONES, type AlgoTone } from './tones';
import { THEMES } from './themes';

// Shipping eight palettes is only tractable if "does this theme work" is a
// check rather than a judgement call. This parses the token blocks straight out
// of style.css and gates every theme on WCAG contrast plus colour-vision
// simulation, so a palette tweak that quietly breaks legibility fails here
// instead of in front of someone who needs it.

const CSS = readFileSync(fileURLToPath(new URL('../style.css', import.meta.url)), 'utf8');

type Rgb = [number, number, number];

function parseThemes(source: string): Record<string, Record<string, string>> {
  const themes: Record<string, Record<string, string>> = {};
  // `:root` carries the defaults and doubles as the midnight palette.
  const blocks = /(?::root|\[data-theme='([a-z-]+)'\])\s*\{([^}]*)\}/g;
  for (const match of source.matchAll(blocks)) {
    const name = match[1] ?? 'midnight';
    const vars = (themes[name] ??= {});
    for (const [, key, value] of match[2].matchAll(/--av-([a-z0-9-]+):\s*([^;]+);/g)) {
      vars[key] = value.trim();
    }
  }
  return themes;
}

const THEME_VARS = parseThemes(CSS);

const isTriplet = (v: string | undefined) => !!v && /^\d{1,3} \d{1,3} \d{1,3}$/.test(v);

function channel(theme: string, token: string): Rgb | null {
  const raw = THEME_VARS[theme]?.[token];
  return isTriplet(raw) ? (raw!.split(' ').map(Number) as Rgb) : null;
}

const toLinear = (c: number) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]: Rgb) =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Viénot-style dichromat simulation on linear RGB, at full severity.
const CVD_MATRIX = {
  deuteranopia: [0.29275, 0.70725, 0, 0.29275, 0.70725, 0, -0.02234, 0.02234, 1],
  protanopia: [0.15266, 0.84734, 0, 0.15266, 0.84734, 0, 0, 0, 1],
} as const;

function simulate(colour: Rgb, kind: keyof typeof CVD_MATRIX): Rgb {
  const [r, g, b] = colour.map(toLinear);
  const m = CVD_MATRIX[kind];
  return [
    m[0] * r + m[1] * g + m[2] * b,
    m[3] * r + m[4] * g + m[5] * b,
    m[6] * r + m[7] * g + m[8] * b,
  ].map((x) => {
    const v = x <= 0.0031308 ? x * 12.92 : 1.055 * x ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  }) as Rgb;
}

function oklab([r, g, b]: Rgb): Rgb {
  const [R, G, B] = [r, g, b].map(toLinear);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

/** Perceptual distance. OKLab euclidean stands in for dE2000 and needs no dep. */
function distance(a: Rgb, b: Rgb): number {
  const [x, y] = [oklab(a), oklab(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]) * 100;
}

const NAMES = THEMES.map((t) => t.name);

/**
 * Only five tones compete for a hue slot. `rejected` is textured in every
 * theme and `blocked` is stroked in every theme, so neither carries its meaning
 * in hue — and taking them out of the budget is precisely what leaves the other
 * five room to stay separable under colour-vision deficiency.
 */
const HUE_CARRYING: AlgoTone[] = ALGO_TONES.filter(
  (t) => t !== 'rejected' && t !== 'blocked',
) as AlgoTone[];

/**
 * Single-hue themes opt out of the hue-separation gate by construction: they
 * encode state as luminance, texture and outline, which a colour-only check
 * cannot see. They are still held to every contrast requirement below.
 */
const SINGLE_HUE = new Set(['mono', 'terminal', 'contrast']);

describe('theme tokens', () => {
  it('defines a block for every registered theme', () => {
    for (const name of NAMES) expect(Object.keys(THEME_VARS)).toContain(name);
  });

  it.each(NAMES)('%s defines every colour token', (theme) => {
    const required = [
      'canvas',
      'surface',
      'surface-alt',
      'surface-raised',
      'line',
      'line-strong',
      'ink',
      'ink-muted',
      'ink-faint',
      'ink-inverse',
      'accent',
      'accent-alt',
      'accent-soft',
      'accent-ink',
      'ok',
      'ok-soft',
      'ok-ink',
      'warn',
      'warn-soft',
      'warn-ink',
      'danger',
      'danger-soft',
      'danger-ink',
      ...ALGO_TONES.flatMap((t) => [`tone-${t}`, `tone-${t}-soft`, `tone-${t}-ink`]),
    ];
    const missing = required.filter((token) => !channel(theme, token));
    expect(missing).toEqual([]);
  });
});

describe('text legibility (WCAG 1.4.3)', () => {
  it.each(NAMES)('%s: body and muted text clear 4.5:1', (theme) => {
    const surface = channel(theme, 'surface')!;
    const canvas = channel(theme, 'canvas')!;
    expect(contrast(channel(theme, 'ink')!, surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(channel(theme, 'ink')!, canvas)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(channel(theme, 'ink-muted')!, surface)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(NAMES)('%s: the faint tier still clears 3:1', (theme) => {
    // `ink-faint` is for small uppercase labels — deliberately quiet, but it is
    // still text somebody has to read.
    expect(
      contrast(channel(theme, 'ink-faint')!, channel(theme, 'surface')!),
    ).toBeGreaterThanOrEqual(3);
  });

  it.each(NAMES)('%s: a label on a solid fill is legible', (theme) => {
    // Buttons paint `text-ink-inverse` on `ok`/`warn`/`danger`/`accent`.
    const inverse = channel(theme, 'ink-inverse')!;
    for (const fill of ['ok', 'warn', 'danger'] as const) {
      expect(contrast(inverse, channel(theme, fill)!)).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(channel(theme, 'accent-ink')!, channel(theme, 'accent')!)).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  it.each(NAMES)('%s: tone ink is legible on its own tint', (theme) => {
    for (const tone of ALGO_TONES) {
      expect(
        contrast(channel(theme, `tone-${tone}-ink`)!, channel(theme, `tone-${tone}-soft`)!),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe('non-text contrast (WCAG 1.4.11)', () => {
  it.each(NAMES)('%s: borders and accent clear 3:1', (theme) => {
    const surface = channel(theme, 'surface')!;
    expect(contrast(channel(theme, 'line-strong')!, surface)).toBeGreaterThanOrEqual(3);
    expect(contrast(channel(theme, 'accent')!, surface)).toBeGreaterThanOrEqual(3);
  });

  it.each(NAMES)('%s: every tone fill clears 3:1', (theme) => {
    const surface = channel(theme, 'surface')!;
    for (const tone of ALGO_TONES) {
      // `blocked` is exempt: a wall reads as solid by being darker than the
      // grid it sits in, so it cannot also be 3:1 away from it. Its contrast
      // comes from the stroke every blocked mark carries, gated by
      // `line-strong` above.
      if (tone === 'blocked') continue;
      expect(contrast(channel(theme, `tone-${tone}`)!, surface)).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('colour-vision deficiency', () => {
  const gate = (theme: string, kind: 'normal' | keyof typeof CVD_MATRIX) => {
    let worst = Infinity;
    let pair = '';
    for (let i = 0; i < HUE_CARRYING.length; i++) {
      for (let j = i + 1; j < HUE_CARRYING.length; j++) {
        const a = channel(theme, `tone-${HUE_CARRYING[i]}`)!;
        const b = channel(theme, `tone-${HUE_CARRYING[j]}`)!;
        const [x, y] = kind === 'normal' ? [a, b] : [simulate(a, kind), simulate(b, kind)];
        const d = distance(x, y);
        if (d < worst) {
          worst = d;
          pair = `${HUE_CARRYING[i]}/${HUE_CARRYING[j]}`;
        }
      }
    }
    return { worst, pair };
  };

  it.each(NAMES.filter((n) => !SINGLE_HUE.has(n)))(
    '%s: the five hue-carrying tones stay separable, including for dichromats',
    (theme) => {
      for (const kind of ['normal', 'deuteranopia', 'protanopia'] as const) {
        const { worst, pair } = gate(theme, kind);
        expect(worst, `${kind}: closest pair ${pair}`).toBeGreaterThanOrEqual(10);
      }
    },
  );

  it.each([...SINGLE_HUE])('%s encodes state without relying on hue', (theme) => {
    // A single-hue theme is only legible because the pattern and stroke
    // channels are switched on. If that ever regressed to `none`, the palette
    // would collapse into one colour with nothing to tell the states apart.
    expect(THEME_VARS[theme]['viz-stroke-w']).toBeDefined();
    expect(THEME_VARS[theme]['viz-stroke-w']).not.toBe('0px');
    const patterns = ALGO_TONES.map((t) => THEME_VARS[theme][`tone-${t}-pat`]).filter(Boolean);
    expect(patterns.some((p) => p !== 'none')).toBe(true);
  });
});
