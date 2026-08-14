// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';
import { routes } from '@/router';
import App from '@/App.vue';

/**
 * Covers the embed shell end to end, through the real route table.
 *
 * Mounting `App` rather than `EmbedView` is deliberate: half of what "embedded"
 * means lives in App.vue's chrome gate, and the other half in EmbedView, so
 * testing either alone would miss the seam between them. Nothing is mocked — the
 * real `routes` array is what decides which categories are embeddable, and a
 * stubbed router would let that drift without failing anything.
 */

/** Mount the whole app at `path`, under a real router. */
async function mountAt(path: string, query: LocationQueryRaw = {}) {
  const router = createRouter({ history: createMemoryHistory(), routes });
  await router.push({ path, query });
  await router.isReady();

  const wrapper = mount(App, { global: { plugins: [router] } });
  await flushPromises();

  return { wrapper, router };
}

// useTheme applies its class to the real <html>, and the ref behind it is
// module-level, so one test's `?theme=` would otherwise leak into the next.
beforeEach(() => {
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

describe('embed route', () => {
  it('renders the category view with its URL state hydrated', async () => {
    const { wrapper } = await mountAt('/embed/sorting', { algo: 'quick', seed: '42' });

    expect(wrapper.find('[data-testid="embed-shell"]').exists()).toBe(true);
    // The selected algorithm is what proves the query reached the composable
    // rather than the view merely mounting with its defaults.
    expect(wrapper.text()).toContain('Quick');
  });

  it('drops the site chrome', async () => {
    const { wrapper } = await mountAt('/embed/sorting');

    // The three chrome blocks App.vue gates. Checked by role/tag rather than
    // Tailwind classes so a restyle doesn't silently pass a broken gate.
    expect(wrapper.find('header').exists()).toBe(false);
    expect(wrapper.find('nav').exists()).toBe(false);
    expect(wrapper.find('footer').exists()).toBe(false);
  });

  it('keeps the site chrome on an ordinary category route', async () => {
    const { wrapper } = await mountAt('/sorting');

    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.find('[data-testid="embed-shell"]').exists()).toBe(false);
  });

  it('turns away a category that has no URL state', async () => {
    // BST and Heap never call useUrlState, so an embed of them would accept
    // `?seed=` and ignore it. They match the embed route (it is declared before
    // the catch-all), so EmbedView has to reject them itself.
    const { router } = await mountAt('/embed/bst');

    expect(router.currentRoute.value.path).toBe('/');
  });

  it('turns away an unknown category', async () => {
    const { router } = await mountAt('/embed/bogus');

    expect(router.currentRoute.value.path).toBe('/');
  });

  it('does not leak into the tab bar or the landing grid', async () => {
    // Both are rendered from `navRoutes`; the embed record lives in `routes`
    // only. This is the guard on that contract.
    const { wrapper } = await mountAt('/sorting');

    const hrefs = wrapper.findAll('nav a').map((link) => link.attributes('href'));
    expect(hrefs.some((href) => href?.includes('/embed'))).toBe(false);
  });
});

describe('embed attribution link', () => {
  it('links back to the full app carrying the current query', async () => {
    const { wrapper } = await mountAt('/embed/sorting', { algo: 'quick', seed: '42' });

    const brand = wrapper.find('[data-testid="embed-brand"]');
    expect(brand.exists()).toBe(true);

    const href = brand.attributes('href') ?? '';
    // Points at the ordinary category route, not the embed one — clicking it
    // should escape the frame into the real app.
    expect(href).toContain('/sorting');
    expect(href).not.toContain('/embed');
    expect(href).toContain('seed=42');
  });

  it('opens in a new tab', async () => {
    // Inside an iframe a same-tab navigation would replace the widget with the
    // app, which is a worse outcome than not linking at all.
    const { wrapper } = await mountAt('/embed/sorting');
    const brand = wrapper.find('[data-testid="embed-brand"]');

    expect(brand.attributes('target')).toBe('_blank');
    expect(brand.attributes('rel')).toContain('noopener');
  });

  it('is suppressed by brand=0, and does not forward the flag', async () => {
    const { wrapper } = await mountAt('/embed/sorting', { brand: '0', seed: '42' });

    expect(wrapper.find('[data-testid="embed-brand"]').exists()).toBe(false);
  });

  it('strips brand from the outbound link when shown', async () => {
    // Any value other than '0' still shows the link; `brand` is an embed-only
    // concern and would be dead weight on the full app.
    const { wrapper } = await mountAt('/embed/sorting', { brand: '1', seed: '42' });

    const href = wrapper.find('[data-testid="embed-brand"]').attributes('href') ?? '';
    expect(href).toContain('seed=42');
    expect(href).not.toContain('brand');
  });
});

describe('embed theme override', () => {
  it('honors theme=light against the app-wide dark default', async () => {
    await mountAt('/embed/sorting', { theme: 'light' });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('honors theme=dark', async () => {
    await mountAt('/embed/sorting', { theme: 'dark' });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('does not persist the override', async () => {
    // Found by framing two embeds on one page: the first carried `theme=light`,
    // wrote it to localStorage, and the second — same origin, so same storage —
    // read it at module init and came up light despite asking for nothing. The
    // same write also silently overwrites the reader's own preference in the
    // full app. A widget on someone else's page must not have that reach.
    await mountAt('/embed/sorting', { theme: 'light' });

    expect(localStorage.getItem('algoviz-theme')).toBeNull();
  });

  it('ignores a malformed theme rather than erroring', async () => {
    // Matches how every other param degrades: a mangled link falls back to the
    // normal experience instead of breaking the widget.
    const { wrapper } = await mountAt('/embed/sorting', { theme: 'chartreuse' });

    expect(wrapper.find('[data-testid="embed-shell"]').exists()).toBe(true);
  });
});
