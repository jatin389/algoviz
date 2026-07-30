// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CodePanel from './CodePanel.vue';

// What is worth pinning here is the switch itself: which text the panel is
// showing, and which line it highlights in each mode. The class strings that
// paint the highlight are not — those would rot on every Tailwind tweak, so the
// tests read the `data-active` attribute the scroll logic already relies on.

const PSEUDO = ['for i = 0 to n - 1', '  if a[i] > a[i + 1]', 'done'];
const SOURCE = ['export function* demo() {', '  yield 1;', '}'].join('\n');

function makeWrapper(overrides: Record<string, unknown> = {}) {
  return mount(CodePanel, {
    props: {
      lines: PSEUDO,
      source: SOURCE,
      sourceFile: 'demoSort.ts',
      activeLine: 1,
      activeSourceLines: [2],
      ...overrides,
    },
  });
}

type Wrapper = ReturnType<typeof makeWrapper>;

/**
 * Text of every rendered code line, in order. `textContent` rather than
 * `.text()`: the latter trims, and leading indentation is exactly what the
 * `whitespace-pre` span exists to preserve.
 */
function shown(wrapper: Wrapper) {
  return wrapper.findAll('li span:last-child').map((el) => el.element.textContent);
}

/** Indices of the highlighted lines. */
function highlighted(wrapper: Wrapper) {
  return wrapper
    .findAll('li')
    .map((el, index) => (el.attributes('data-active') === 'true' ? index : -1))
    .filter((index) => index >= 0);
}

async function clickTab(wrapper: Wrapper, label: 'Pseudocode' | 'Source') {
  const tab = wrapper.findAll('button').find((b) => b.text() === label);
  expect(tab).toBeDefined();
  await tab!.trigger('click');
}

describe('CodePanel', () => {
  it('opens on pseudocode, highlighting activeLine', () => {
    const wrapper = makeWrapper();
    expect(shown(wrapper)).toEqual(PSEUDO);
    expect(highlighted(wrapper)).toEqual([1]);
    // The filename belongs to the source view only.
    expect(wrapper.text()).not.toContain('demoSort.ts');
  });

  it('switches to the generator source, highlighting activeSourceLines', async () => {
    const wrapper = makeWrapper();
    await clickTab(wrapper, 'Source');

    expect(shown(wrapper)).toEqual(SOURCE.split('\n'));
    expect(highlighted(wrapper)).toEqual([2]);
    expect(wrapper.text()).toContain('demoSort.ts');
  });

  it('switches back', async () => {
    const wrapper = makeWrapper();
    await clickTab(wrapper, 'Source');
    await clickTab(wrapper, 'Pseudocode');
    expect(shown(wrapper)).toEqual(PSEUDO);
    expect(highlighted(wrapper)).toEqual([1]);
  });

  it('highlights every line sharing one tag', async () => {
    const wrapper = makeWrapper({ activeSourceLines: [0, 2] });
    await clickTab(wrapper, 'Source');
    expect(highlighted(wrapper)).toEqual([0, 2]);
  });

  it('highlights nothing when the generator is untagged', async () => {
    const wrapper = makeWrapper({ activeLine: null, activeSourceLines: [] });
    expect(highlighted(wrapper)).toEqual([]);
    await clickTab(wrapper, 'Source');
    expect(highlighted(wrapper)).toEqual([]);
    // An untagged generator still shows its source in full.
    expect(shown(wrapper)).toEqual(SOURCE.split('\n'));
  });

  it('points at the Source tab when no pseudocode is written', async () => {
    const wrapper = makeWrapper({ lines: [] });
    expect(wrapper.findAll('li')).toHaveLength(0);
    expect(wrapper.text()).toContain('switch to Source');

    // ...and the source view still works from that state.
    await clickTab(wrapper, 'Source');
    expect(shown(wrapper)).toEqual(SOURCE.split('\n'));
  });
});
