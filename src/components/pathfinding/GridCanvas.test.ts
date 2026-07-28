// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import type { Coord } from '@/types';
import GridCanvas from './GridCanvas.vue';

// Only the keyboard model is covered here. Drag-painting is deliberately not
// tested: jsdom does no hit testing and has no real pointer capture, so
// `pointerenter` never fires from a synthetic drag — any such test would be
// asserting the shape of its own mock rather than the component's behavior.

interface Props {
  rows: number;
  cols: number;
  walls: Set<string>;
  start: Coord;
  end: Coord;
  canEdit: boolean;
}

function makeWrapper(overrides: Partial<Props> = {}) {
  return mount(GridCanvas, {
    props: {
      rows: 3,
      cols: 4,
      walls: new Set<string>(),
      start: { row: 0, col: 0 },
      end: { row: 2, col: 3 },
      canEdit: true,
      ...overrides,
    },
  });
}

type Wrapper = ReturnType<typeof makeWrapper>;

/** The single cell currently in the tab order, identified by its "row,col". */
function focusedKey(wrapper: Wrapper) {
  const tabbable = wrapper.findAll('[tabindex="0"]');
  expect(tabbable).toHaveLength(1);
  return tabbable[0].attributes('data-key');
}

/** Always presses on whichever cell is currently the tab stop. */
function press(wrapper: Wrapper, key: string) {
  return wrapper.get('[tabindex="0"]').trigger('keydown', { key });
}

async function pressAll(wrapper: Wrapper, keys: string[]) {
  for (const key of keys) await press(wrapper, key);
}

async function setMode(wrapper: Wrapper, label: string) {
  const button = wrapper.findAll('button').find((b) => b.text() === label);
  if (!button) throw new Error(`No mode button labelled "${label}"`);
  await button.trigger('click');
}

// Named explicitly because wrapper.emitted() also records the raw DOM events
// that reached the root element, which would drown out the component's own.
const EMITS = ['toggle-wall', 'place-start', 'place-end'] as const;

function emittedCount(wrapper: Wrapper) {
  return EMITS.reduce((total, name) => total + (wrapper.emitted(name)?.length ?? 0), 0);
}

describe('GridCanvas keyboard model', () => {
  it('starts with the top-left cell as the only tab stop', () => {
    expect(focusedKey(makeWrapper())).toBe('0,0');
  });

  it('moves focus one cell per arrow press', async () => {
    const wrapper = makeWrapper();
    await pressAll(wrapper, ['ArrowRight', 'ArrowRight', 'ArrowDown']);
    expect(focusedKey(wrapper)).toBe('1,2');
    await pressAll(wrapper, ['ArrowLeft', 'ArrowUp']);
    expect(focusedKey(wrapper)).toBe('0,1');
  });

  it('clamps at every edge instead of wrapping', async () => {
    const wrapper = makeWrapper();

    await pressAll(wrapper, ['ArrowUp', 'ArrowLeft']);
    expect(focusedKey(wrapper)).toBe('0,0');

    await pressAll(wrapper, ['ArrowDown', 'ArrowDown', 'ArrowDown']);
    expect(focusedKey(wrapper)).toBe('2,0');

    await pressAll(wrapper, ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight']);
    expect(focusedKey(wrapper)).toBe('2,3');
  });

  it('jumps to the first and last column of the current row with Home/End', async () => {
    const wrapper = makeWrapper();
    await pressAll(wrapper, ['ArrowDown', 'End']);
    expect(focusedKey(wrapper)).toBe('1,3');
    await press(wrapper, 'Home');
    expect(focusedKey(wrapper)).toBe('1,0');
  });

  it('keeps exactly one tab stop across a mode switch', async () => {
    const wrapper = makeWrapper();
    expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(1);
    await press(wrapper, 'ArrowRight');
    await setMode(wrapper, 'Move Start');
    expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(1);
  });
});

describe('GridCanvas activation', () => {
  it('toggles a wall on Enter', async () => {
    const wrapper = makeWrapper();
    await pressAll(wrapper, ['ArrowDown', 'ArrowRight', 'Enter']);
    expect(wrapper.emitted('toggle-wall')).toEqual([[{ row: 1, col: 1 }]]);
  });

  it('toggles a wall on Space', async () => {
    const wrapper = makeWrapper();
    await pressAll(wrapper, ['ArrowRight', ' ']);
    expect(wrapper.emitted('toggle-wall')).toEqual([[{ row: 0, col: 1 }]]);
  });

  it('refuses to paint over the start and end cells', async () => {
    const wrapper = makeWrapper();
    await press(wrapper, 'Enter');
    await pressAll(wrapper, ['End', 'ArrowDown', 'ArrowDown', 'Enter']);
    expect(wrapper.emitted('toggle-wall')).toBeUndefined();
  });

  it('places the start marker instead while in Move Start mode', async () => {
    const wrapper = makeWrapper();
    await setMode(wrapper, 'Move Start');
    await pressAll(wrapper, ['ArrowRight', 'Enter']);
    expect(wrapper.emitted('place-start')).toEqual([[{ row: 0, col: 1 }]]);
    expect(wrapper.emitted('toggle-wall')).toBeUndefined();
  });

  it('places the end marker instead while in Move End mode', async () => {
    const wrapper = makeWrapper();
    await setMode(wrapper, 'Move End');
    await pressAll(wrapper, ['ArrowDown', 'Enter']);
    expect(wrapper.emitted('place-end')).toEqual([[{ row: 1, col: 0 }]]);
    expect(wrapper.emitted('toggle-wall')).toBeUndefined();
  });

  it('moves the tab stop to whatever a pointer last pressed', async () => {
    const wrapper = makeWrapper();
    await wrapper.get('[data-key="2,1"]').trigger('pointerdown');
    expect(focusedKey(wrapper)).toBe('2,1');
    expect(wrapper.emitted('toggle-wall')).toEqual([[{ row: 2, col: 1 }]]);
  });
});

describe('GridCanvas when editing is locked', () => {
  it('emits nothing for keyboard or pointer input', async () => {
    const wrapper = makeWrapper({ canEdit: false });

    await pressAll(wrapper, ['Enter', ' ', 'ArrowRight', 'Enter']);
    await wrapper.get('[data-key="1,2"]').trigger('pointerdown');
    await wrapper.get('[data-key="1,3"]').trigger('pointerenter');

    expect(emittedCount(wrapper)).toBe(0);
  });

  it('still lets the caret roam so the grid stays readable', async () => {
    const wrapper = makeWrapper({ canEdit: false });
    await pressAll(wrapper, ['ArrowDown', 'ArrowRight']);
    expect(focusedKey(wrapper)).toBe('1,1');
  });
});
