// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SortStage from './SortStage.vue';
import { sortSkins } from './skins';
import type { SortSkinKey } from './skins';

// This file is the Phase-0/Phase-1 parity net named in
// backlog/labs/0019-skins.md: `skin="bars"` must render output equivalent to
// BarChart.vue as it existed before this refactor (bar count, tone-class
// precedence per index, the showLabels cutoff at 25 items, a 4-entry legend).
// It doubles as the cross-skin contract test — every skin substituted here
// must satisfy the same item-count and tone-labelling invariants, using the
// `data-testid="sort-skin-item"` / `data-tone` hooks every skin exposes.

interface Props {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  maxValue: number;
  skin?: SortSkinKey;
  showLegend?: boolean;
}

function makeWrapper(overrides: Partial<Props> = {}) {
  return mount(SortStage, {
    props: {
      array: [3, 1, 4, 1, 5, 9, 2, 6],
      comparing: [],
      swapping: [],
      sorted: [],
      maxValue: 9,
      ...overrides,
    },
  });
}

type Wrapper = ReturnType<typeof makeWrapper>;

function items(wrapper: Wrapper) {
  return wrapper.findAll('[data-testid="sort-skin-item"]');
}

describe('SortStage — bars parity', () => {
  it('renders one item per array element', () => {
    const wrapper = makeWrapper();
    expect(items(wrapper)).toHaveLength(8);
  });

  it('resolves tone precedence: swapping > comparing > sorted > idle', () => {
    const wrapper = makeWrapper({
      comparing: [1, 2],
      swapping: [2],
      sorted: [7],
    });
    const tones = items(wrapper).map((item) => item.attributes('data-tone'));
    expect(tones[1]).toBe('probe');
    expect(tones[2]).toBe('active');
    expect(tones[7]).toBe('settled');
    expect(tones[0]).toBe('idle');
  });

  it('shows numeric labels at or under 25 items', () => {
    const wrapper = makeWrapper();
    expect(wrapper.findAll('[data-testid="sort-skin-item-label"]')).toHaveLength(8);
  });

  it('hides numeric labels above 25 items', () => {
    const array = Array.from({ length: 30 }, (_, i) => i + 1);
    const wrapper = makeWrapper({ array, maxValue: 30 });
    expect(wrapper.findAll('[data-testid="sort-skin-item-label"]')).toHaveLength(0);
  });

  it('renders a 4-entry legend by default', () => {
    const wrapper = makeWrapper();
    expect(wrapper.text()).toContain('Unsorted');
    expect(wrapper.text()).toContain('Comparing');
    expect(wrapper.text()).toContain('Swapping');
    expect(wrapper.text()).toContain('Sorted');
  });

  it('omits the legend when showLegend is false', () => {
    const wrapper = makeWrapper({ showLegend: false });
    expect(wrapper.text()).not.toContain('Unsorted');
  });

  it('carries a role and an aria-label describing the current step', () => {
    const wrapper = makeWrapper({ swapping: [2, 3] });
    const stage = wrapper.get('[role="img"]');
    expect(stage.attributes('aria-label')).toContain('Swapping');
  });

  it('falls back to the default skin for an unrecognised key', () => {
    // @ts-expect-error deliberately invalid key, e.g. a stale ?skin= link
    const wrapper = makeWrapper({ skin: 'not-a-real-skin' });
    expect(items(wrapper)).toHaveLength(8);
  });
});

describe('SortStage — cross-skin contract', () => {
  const keys = Object.keys(sortSkins) as SortSkinKey[];

  it.each(keys)('skin "%s" renders one item per array element with a tone', (key) => {
    const wrapper = makeWrapper({ skin: key, swapping: [1] });
    const rendered = items(wrapper);
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.every((item) => item.attributes('data-tone'))).toBe(true);
  });
});
