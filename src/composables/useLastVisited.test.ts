// @vitest-environment jsdom
//
// The module under test reads `localStorage` at import time, a DOM global —
// hence jsdom rather than the default node environment (see useAudioCues.test.ts
// for the same precedent).
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Router } from 'vue-router';
import { LAST_VISITED_KEY, readLastVisited, useLastVisited } from './useLastVisited';

/**
 * Minimal Storage stand-in. Only getItem/setItem are ever exercised by the
 * module under test, but the full interface is stubbed out so `as unknown as
 * Storage` is the only cast needed at the call site.
 */
function makeStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map(Object.entries(initial));
  const storage = {
    getItem: (key: string) => (data.has(key) ? (data.get(key) as string) : null),
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
    clear: () => data.clear(),
    key: () => null,
    get length() {
      return data.size;
    },
  };
  return storage as unknown as Storage;
}

/**
 * Captures the `afterEach` guard the composable installs, so a test can drive
 * navigation without standing up a real router.
 */
function makeRouter() {
  let hook: ((to: { name: unknown }) => void) | undefined;
  const router = {
    afterEach: (fn: (to: { name: unknown }) => void) => {
      hook = fn;
    },
  } as unknown as Router;
  return { router, navigate: (name: unknown) => hook?.({ name }) };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('readLastVisited', () => {
  it('returns null when nothing is stored', () => {
    vi.stubGlobal('localStorage', makeStorage());
    expect(readLastVisited()).toBeNull();
  });

  it('returns the stored route name', () => {
    vi.stubGlobal('localStorage', makeStorage({ [LAST_VISITED_KEY]: 'pathfinding' }));
    expect(readLastVisited()).toBe('pathfinding');
  });

  // An empty string is falsy but not null; without normalising it the landing
  // view would look up a route named '' and render a resume card pointing nowhere.
  it('normalises an empty stored value to null', () => {
    vi.stubGlobal('localStorage', makeStorage({ [LAST_VISITED_KEY]: '' }));
    expect(readLastVisited()).toBeNull();
  });

  it('falls back to null, and does not throw, when getItem throws', () => {
    const storage = makeStorage();
    storage.getItem = () => {
      throw new Error('blocked (private mode)');
    };
    vi.stubGlobal('localStorage', storage);
    expect(() => readLastVisited()).not.toThrow();
    expect(readLastVisited()).toBeNull();
  });
});

describe('record', () => {
  it('persists the name and updates the shared ref', () => {
    const storage = makeStorage();
    vi.stubGlobal('localStorage', storage);

    const { lastVisited, record } = useLastVisited();
    record('heap');

    expect(lastVisited.value).toBe('heap');
    expect(storage.getItem(LAST_VISITED_KEY)).toBe('heap');
  });

  it('still updates the ref when setItem throws', () => {
    const storage = makeStorage();
    storage.setItem = () => {
      throw new Error('quota exceeded');
    };
    vi.stubGlobal('localStorage', storage);

    const { lastVisited, record } = useLastVisited();
    expect(() => record('graph')).not.toThrow();
    expect(lastVisited.value).toBe('graph');
  });
});

describe('trackLastVisited', () => {
  it('records a trackable route on navigation', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { router, navigate } = makeRouter();
    const { lastVisited, record, trackLastVisited } = useLastVisited();

    record('sorting');
    trackLastVisited(router, () => true);
    navigate('bst');

    expect(lastVisited.value).toBe('bst');
  });

  // The landing route is excluded by the predicate wired up in main.ts —
  // recording it would make "continue where you left off" resolve to the very
  // page the resume card is rendered on.
  it('leaves the stored value alone for an untrackable route', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { router, navigate } = makeRouter();
    const { lastVisited, record, trackLastVisited } = useLastVisited();

    record('sorting');
    trackLastVisited(router, (name) => name !== 'landing');
    navigate('landing');

    expect(lastVisited.value).toBe('sorting');
  });

  // vue-router types `name` as `RouteRecordName | null | undefined`, so a route
  // without a name reaches the guard as a non-string.
  it('ignores a navigation with no string route name', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { router, navigate } = makeRouter();
    const { lastVisited, record, trackLastVisited } = useLastVisited();

    record('sorting');
    trackLastVisited(router, () => true);
    navigate(undefined);
    navigate(Symbol('unnamed'));

    expect(lastVisited.value).toBe('sorting');
  });
});
