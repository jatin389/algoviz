import { describe, expect, it } from 'vitest';
import {
  ALGO_TONES,
  TONE_BG,
  TONE_BORDER,
  TONE_FILL,
  TONE_INK,
  TONE_LABEL,
  TONE_MARK,
  TONE_SOFT_BG,
  TONE_STROKE,
  toneLegend,
  type AlgoTone,
} from './tones';
import { AS_ALGO_TONE, EDGE_TONE_CLASS, NODE_TONE_CLASS } from '@/components/graph/tones';

// These tables exist to stop nine per-domain copies of the same vocabulary
// drifting apart, so the thing worth testing is that they cannot themselves
// develop a hole. A missing key renders a mark with no colour at all, which is
// invisible in review and obvious only in the one theme nobody opened.

const TABLES: Record<string, Record<AlgoTone, string>> = {
  TONE_BG,
  TONE_SOFT_BG,
  TONE_INK,
  TONE_BORDER,
  TONE_FILL,
  TONE_STROKE,
  TONE_MARK,
  TONE_LABEL,
};

describe('tone tables', () => {
  it.each(Object.keys(TABLES))('%s covers every tone, with no extras', (name) => {
    expect(Object.keys(TABLES[name]).sort()).toEqual([...ALGO_TONES].sort());
  });

  it.each(Object.keys(TABLES))('%s has a non-empty value for every tone', (name) => {
    for (const tone of ALGO_TONES) expect(TABLES[name][tone]).toBeTruthy();
  });

  // Tailwind only emits a class it has literally seen in a scanned file. A
  // value assembled at runtime is therefore not just bad style here, it
  // silently produces an unstyled mark in the build.
  it.each(Object.keys(TABLES).filter((n) => n !== 'TONE_LABEL'))(
    '%s holds whole class names, never interpolated fragments',
    (name) => {
      for (const tone of ALGO_TONES) {
        expect(TABLES[name][tone]).not.toMatch(/\$\{|\bundefined\b/);
      }
    },
  );

  it('names each tone distinctly in the legend vocabulary', () => {
    const labels = ALGO_TONES.map((t) => TONE_LABEL[t]);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('gives every tone a distinct class in the painting tables', () => {
    // Two tones sharing a colour would make them indistinguishable on screen
    // while still type-checking.
    for (const name of ['TONE_BG', 'TONE_FILL', 'TONE_STROKE']) {
      const values = ALGO_TONES.map((t) => TABLES[name][t]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it('carries the texture channel on every DOM mark', () => {
    // The hueless themes encode state in `--tone-pat`; a mark that forgot to
    // wire it renders as a flat fill and loses its meaning there.
    for (const tone of ALGO_TONES) {
      expect(TONE_MARK[tone]).toContain('viz-mark');
      expect(TONE_MARK[tone]).toContain(`--tone-pat:var(--av-tone-${tone}-pat)`);
    }
  });
});

describe('toneLegend', () => {
  it('expands a bare tone to its default wording', () => {
    expect(toneLegend(['probe'])).toEqual([{ tone: 'probe', label: TONE_LABEL.probe }]);
  });

  it('keeps caller wording when given', () => {
    expect(toneLegend([{ tone: 'idle', label: 'Unsorted' }])).toEqual([
      { tone: 'idle', label: 'Unsorted' },
    ]);
  });
});

describe('graph tones', () => {
  const GRAPH_TONES = Object.keys(AS_ALGO_TONE) as (keyof typeof AS_ALGO_TONE)[];

  it('maps every graph tone onto a real algorithm tone', () => {
    for (const tone of GRAPH_TONES) {
      expect(ALGO_TONES).toContain(AS_ALGO_TONE[tone]);
    }
  });

  it('paints nodes and edges from that mapping', () => {
    // The renderer must not be able to disagree with the mapping — that
    // disagreement is exactly what the shared vocabulary removes.
    for (const tone of GRAPH_TONES) {
      expect(NODE_TONE_CLASS[tone]).toBe(TONE_FILL[AS_ALGO_TONE[tone]]);
      expect(EDGE_TONE_CLASS[tone]).toBe(TONE_STROKE[AS_ALGO_TONE[tone]]);
    }
  });
});
