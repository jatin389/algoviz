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

function apply(persist = true) {
  const root = document.documentElement;
  // The one place the active theme is written. Every colour in the app resolves
  // from the `--av-*` variables this attribute selects, so there is no second
  // channel to keep in step.
  root.setAttribute('data-theme', theme.value);

  if (!persist) return;
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
  /**
   * Set the active theme.
   *
   * `persist: false` is not a nicety — it exists for embeds. A widget writing
   * the theme to localStorage poisons the whole origin: a second embed on the
   * same page reads it at module init and silently inherits the first one's
   * `?theme=`, and the reader's own preference in the full app gets overwritten
   * by a widget they only scrolled past. A widget on someone else's page must
   * not have that reach.
   */
  function setTheme(next: ThemeName, options: { persist?: boolean } = {}) {
    theme.value = next;
    apply(options.persist ?? true);
  }

  function initTheme() {
    apply();
  }

  return { theme, themes: THEMES, setTheme, initTheme };
}
