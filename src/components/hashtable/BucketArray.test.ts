// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import type { HashBucket, HashPhase } from '@/types';
import BucketArray from './BucketArray.vue';

interface BucketArrayProps {
  buckets: HashBucket[];
  homeIndex?: number | null;
  probeIndex?: number | null;
  probeSeq?: number[];
  phase?: HashPhase;
  activeKey?: string | null;
  chaining?: boolean;
}

// BucketArray is pure presentation: every highlight is a function of props,
// so what is worth pinning is "given this prop shape, does the row that
// matters actually render distinctly from its neighbours" — not incidental
// class names. Where a class is asserted below (the tombstone's dashed rose
// border vs. the empty slot's plain dash) it is asserted because the
// component's own header comment calls that particular distinction the
// load-bearing one: "A tombstone is not an empty slot and must never look
// like one."

function makeWrapper(overrides: Partial<BucketArrayProps> = {}) {
  return mount(BucketArray, {
    props: {
      buckets: [] as HashBucket[],
      ...overrides,
    },
  });
}

describe('BucketArray', () => {
  it('renders one row per bucket, in order, with the index gutter', () => {
    const buckets: HashBucket[] = [
      { entries: [], state: 'empty' },
      { entries: [], state: 'empty' },
      { entries: [], state: 'empty' },
    ];
    const wrapper = makeWrapper({ buckets });
    const rows = wrapper.findAll('[data-bucket]');
    expect(rows).toHaveLength(3);
    expect(rows.map((r) => r.attributes('data-bucket'))).toEqual(['0', '1', '2']);
  });

  it('renders every entry of a chained bucket, and highlights the link the cursor is on', () => {
    // Two links deep into a chain at bucket 0: probeSeq has pushed the home
    // index once per link examined (see ops.ts's note on probeSeq), so two
    // pushes means the cursor sits on the second entry, "dog".
    const buckets: HashBucket[] = [
      {
        entries: [
          { key: 'cat', value: 0 },
          { key: 'dog', value: 1 },
        ],
        state: 'occupied',
      },
    ];
    const wrapper = makeWrapper({
      buckets,
      chaining: true,
      homeIndex: 0,
      probeIndex: 0,
      probeSeq: [0, 0],
      phase: 'probing',
    });

    const entries = wrapper.findAll('[data-role="entry"]');
    expect(entries.map((e) => e.attributes('data-key'))).toEqual(['cat', 'dog']);

    // The link under the cursor ("dog") is called out; the other link is not.
    expect(entries[1].attributes('data-link-state')).toBe('cursor');
    expect(entries[0].attributes('data-link-state')).toBeUndefined();

    // Chaining counts links walked, not a slot index, so the badge carries the
    // "↓" prefix and reads the chain depth rather than a probe position.
    const badge = wrapper.get('[data-probe-order]');
    expect(badge.text()).toBe('↓2');
  });

  it('marks a tombstone distinctly from an empty slot, even sitting side by side', () => {
    const buckets: HashBucket[] = [
      { entries: [], state: 'tombstone' },
      { entries: [], state: 'empty' },
    ];
    const wrapper = makeWrapper({ buckets, chaining: false });

    const rows = wrapper.findAll('[data-bucket]');
    const tombstoneRow = rows[0];
    const emptyRow = rows[1];

    const tombstone = tombstoneRow.get('[data-role="tombstone"]');
    expect(tombstone.text()).toContain('✕ deleted');
    expect(tombstone.classes()).toContain('border-dashed');
    expect(tombstoneRow.find('[data-role="empty"]').exists()).toBe(false);

    const empty = emptyRow.get('[data-role="empty"]');
    expect(empty.text()).toBe('—');
    expect(emptyRow.find('[data-role="tombstone"]').exists()).toBe(false);

    // The two states must not simply differ in text — a tombstone must not
    // borrow the empty slot's rendering path, or vice versa.
    expect(tombstone.classes()).not.toEqual(empty.classes());
  });

  it('highlights the home index in the gutter', () => {
    const buckets: HashBucket[] = [
      { entries: [], state: 'empty' },
      { entries: [], state: 'empty' },
    ];
    const wrapper = makeWrapper({ buckets, homeIndex: 1 });

    const rows = wrapper.findAll('[data-bucket]');
    expect(rows[0].attributes('data-home')).toBeUndefined();
    expect(rows[1].attributes('data-home')).toBe('true');

    // The gutter number itself carries the highlight, not just the row — the
    // home slot's own span is marked distinctly from every other gutter span.
    const homeGutter = rows[1].find('span');
    const otherGutter = rows[0].find('span');
    expect(homeGutter.attributes('data-home')).toBe('true');
    expect(otherGutter.attributes('data-home')).toBeUndefined();
  });

  it('highlights the live probe index and numbers every slot probed so far, in open addressing', () => {
    // A linear probe starting at home slot 0 that collided and landed at 3:
    // probeSeq [0, 3] records both stops in order.
    const buckets: HashBucket[] = [
      { entries: [{ key: 'cat', value: 0 }], state: 'occupied' },
      { entries: [], state: 'tombstone' },
      { entries: [], state: 'empty' },
      { entries: [{ key: 'dog', value: 1 }], state: 'occupied' },
    ];
    const wrapper = makeWrapper({
      buckets,
      chaining: false,
      homeIndex: 0,
      probeIndex: 3,
      probeSeq: [0, 3],
      phase: 'probing',
    });

    const rows = wrapper.findAll('[data-bucket]');

    // The slot under the cursor right now is rung, distinctly from a slot
    // that was merely probed earlier in the same operation.
    expect(rows[3].attributes('data-probing')).toBe('true');
    expect(rows[0].attributes('data-probing')).toBeUndefined();

    // Every probed slot carries its 1-based position in the probe sequence —
    // open addressing badges a slot index, not a chain depth, so no "↓".
    const homeBadge = rows[0].get('[data-probe-order]');
    expect(homeBadge.text()).toBe('1');
    const cursorBadge = rows[3].get('[data-probe-order]');
    expect(cursorBadge.text()).toBe('2');

    // A slot never probed this operation carries no badge at all.
    expect(rows[2].find('[data-probe-order]').exists()).toBe(false);
  });
});
