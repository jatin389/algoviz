import { ref } from 'vue';
import { DEFAULT_THEME, resolveStoredTheme, THEMES, type ThemeName } from '@/theme/themes';

const STORAGE_KEY = 'algoviz-theme';

function readInitial(): ThemeName {
  try {
    return resolveStoredTheme(localStorage.getItem(STORAGE_KEY));
  } catch {
    // localStorage may be unavailable (private mode, SSR).
    return DEFAULT_THEME;
  }
}

// Module-level so every component observes the same value without provide/inject.
const theme = ref<ThemeName>(readInitial());

function apply() {
  const root = document.documentElement;
  // The one place the active theme is written. Every colour in the app resolves
  // from the `--av-*` variables this attribute selects, so there is no second
  // channel to keep in step.
  root.setAttribute('data-theme', theme.value);

  try {
    localStorage.setItem(STORAGE_KEY, theme.value);
  } catch {
    // Ignore persistence failures — the in-memory value still works.
  }
}

/**
 * useTheme — shared theme state.
 *
 * Call `initTheme()` once at startup. Note that the first paint is already
 * handled by the inline script in `index.html`; this only re-syncs the DOM
 * with the reactive ref so the two cannot drift.
 */
export function useTheme() {
  function setTheme(next: ThemeName) {
    theme.value = next;
    apply();
  }

  function initTheme() {
    apply();
  }

  return { theme, themes: THEMES, setTheme, initTheme };
}
