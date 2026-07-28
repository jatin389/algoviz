// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';
import { useSearcher } from './useSearcher';
import { useGraphTraversal } from './useGraphTraversal';

/**
 * Guards the hydration-vs-generate ordering, which is invisible to
 * `urlParams.test.ts`: the codecs there are pure, but the bug this file
 * covers lives in the *sequence* — `useUrlState` hydrates synchronously, then
 * the composable's trailing `generate()` runs in the same tick and used to
 * clobber the hydrated value before the first render. Because both happen
 * synchronously, the write-back watcher only ever saw the clobbered value, so
 * a shared link silently rewrote its own query and dropped the param.
 *
 * Nothing here mocks the router: the clobbering is only observable end to end,
 * through a real `useRouter()` reading a real query.
 */

/**
 * Mount a composable under a router sitting at `query`.
 *
 * The composable must run inside a component so `useRouter()` resolves and
 * `onScopeDispose` (useStepPlayer's timer cleanup) has a scope to attach to.
 */
async function mountWith<T>(composable: () => T, query: LocationQueryRaw) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { render: () => null } }],
  });
  await router.push({ path: '/', query });
  await router.isReady();

  let api!: T;
  const wrapper = mount(
    defineComponent({
      setup() {
        api = composable();
        return () => h('div');
      },
    }),
    { global: { plugins: [router] } },
  );

  return { api, router, wrapper };
}

/**
 * Wait out `useUrlState`'s write-back before asserting on the query.
 *
 * Without this the query assertions below are vacuous: they would pass even
 * against the clobbering bug, simply because nothing had written yet. The
 * debounce is a single timer shared by every key (`maxDebounce` takes the max
 * across the whole spec), so both categories inherit `speed`'s 250ms.
 */
async function settleUrl() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  await flushPromises();
}

describe('useSearcher URL hydration', () => {
  it('keeps a hydrated target instead of overwriting it with a seed-derived pick', async () => {
    const { api } = await mountWith(useSearcher, { seed: '1234', target: '42' });
    expect(api.target.value).toBe(42);
  });

  it('leaves the hydrated target in the query rather than rewriting it away', async () => {
    const { router } = await mountWith(useSearcher, { seed: '1234', target: '42' });
    await settleUrl();
    expect(router.currentRoute.value.query.target).toBe('42');
  });

  it('derives a target from the seed when the URL carries none', async () => {
    const { api } = await mountWith(useSearcher, { seed: '1234' });
    // The seed-derived pick is always a member of the dataset, and the initial
    // `ref(0)` is outside the 1..99 generation range — so a non-zero target
    // present in the array proves `pickPresentTarget` actually ran.
    expect(api.target.value).not.toBe(0);
    expect(api.array.value).toContain(api.target.value);
  });

  it('still repicks the target on an explicit later generate()', async () => {
    const { api } = await mountWith(useSearcher, { seed: '1234', target: '42' });
    expect(api.target.value).toBe(42);

    // "New array" must not be pinned to the shared link's target forever: the
    // rebuilt dataset may not even contain it.
    api.generate();
    expect(api.array.value).toContain(api.target.value);
  });

  it('ignores a malformed target and falls back to a seed-derived pick', async () => {
    const { api } = await mountWith(useSearcher, { seed: '1234', target: 'not-a-number' });
    expect(api.array.value).toContain(api.target.value);
  });
});

describe('useGraphTraversal URL hydration', () => {
  it('keeps a hydrated start node instead of resetting to node 0', async () => {
    const { api } = await mountWith(useGraphTraversal, { seed: '1234', start: '3' });
    expect(api.startId.value).toBe(3);
  });

  it('leaves the hydrated start in the query rather than rewriting it away', async () => {
    const { router } = await mountWith(useGraphTraversal, { seed: '1234', start: '3' });
    await settleUrl();
    expect(router.currentRoute.value.query.start).toBe('3');
  });

  it('defaults to node 0 when the URL carries no start', async () => {
    const { api } = await mountWith(useGraphTraversal, { seed: '1234' });
    expect(api.startId.value).toBe(0);
  });

  it('falls back to node 0 when the hydrated start is absent from the graph', async () => {
    // Decodes fine (the codec's cap is a generous 9999) but no such node
    // exists in a 10-node graph, so honouring it would leave the traversal
    // unable to start at all.
    const { api } = await mountWith(useGraphTraversal, { seed: '1234', start: '500' });
    expect(api.startId.value).toBe(0);
  });

  it('still resets the start to node 0 on an explicit later generate()', async () => {
    const { api } = await mountWith(useGraphTraversal, { seed: '1234', start: '3' });
    expect(api.startId.value).toBe(3);

    // Clicking "new graph" is a deliberate reset, not a link being restored.
    api.generate();
    expect(api.startId.value).toBe(0);
  });
});
