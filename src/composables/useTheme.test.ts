// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resolveStoredTheme, isDarkTheme, isThemeName, THEMES } from '@/theme/themes';

// `useTheme` holds its ref at module scope, so a fresh copy per test needs a
// module-registry reset rather than a plain re-import.
async function freshUseTheme() {
  const { useTheme } = await import('./useTheme');
  return useTheme();
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.classList.remove('dark');
  vi.resetModules();
});

describe('resolveStoredTheme', () => {
  it('maps the pre-registry values a returning visitor still has stored', () => {
    // The key predates named themes; dropping these would silently reset
    // everyone who had ever touched the old toggle.
    expect(resolveStoredTheme('dark')).toBe('midnight');
    expect(resolveStoredTheme('light')).toBe('daylight');
  });

  it('passes through a known theme name', () => {
    expect(resolveStoredTheme('terminal')).toBe('terminal');
    expect(resolveStoredTheme('paper')).toBe('paper');
  });

  it('falls back to the default for anything unrecognised', () => {
    expect(resolveStoredTheme(null)).toBe('midnight');
    expect(resolveStoredTheme('')).toBe('midnight');
    expect(resolveStoredTheme('solarized')).toBe('midnight');
  });
});

describe('theme registry', () => {
  it('has a unique name per theme', () => {
    const names = THEMES.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('recognises exactly the registered names', () => {
    for (const t of THEMES) expect(isThemeName(t.name)).toBe(true);
    expect(isThemeName('nope')).toBe(false);
    expect(isThemeName(undefined)).toBe(false);
  });

  it('declares a light/dark character for every theme', () => {
    for (const t of THEMES) expect(typeof isDarkTheme(t.name)).toBe('boolean');
  });
});

describe('useTheme', () => {
  it('writes data-theme onto <html> and persists the choice', async () => {
    const { setTheme } = await freshUseTheme();
    setTheme('paper');
    expect(document.documentElement.getAttribute('data-theme')).toBe('paper');
    expect(localStorage.getItem('algoviz-theme')).toBe('paper');
  });

  it('keeps the .dark class in step with the theme, both directions', async () => {
    // Load-bearing while `dark:` utilities remain: an unmigrated component
    // reads this class, not the data attribute.
    const { setTheme } = await freshUseTheme();
    setTheme('paper');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    setTheme('terminal');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    setTheme('daylight');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('adopts a legacy stored value on first init', async () => {
    localStorage.setItem('algoviz-theme', 'light');
    const { theme, initTheme } = await freshUseTheme();
    initTheme();
    expect(theme.value).toBe('daylight');
    expect(document.documentElement.getAttribute('data-theme')).toBe('daylight');
    // …and rewrites storage to the new vocabulary so the migration is one-shot.
    expect(localStorage.getItem('algoviz-theme')).toBe('daylight');
  });

  it('shares one value across callers', async () => {
    const a = await freshUseTheme();
    const { useTheme } = await import('./useTheme');
    const b = useTheme();
    a.setTheme('neon');
    expect(b.theme.value).toBe('neon');
  });
});
