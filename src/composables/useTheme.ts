import { ref } from 'vue';

const STORAGE_KEY = 'algoviz-theme';

// Dark mode is the default. We only fall back to light if the user explicitly
// chose it in a previous session.
function initialIsDark() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light') return false;
    if (saved === 'dark') return true;
  } catch {
    // localStorage may be unavailable (private mode, SSR); default to dark.
  }
  return true;
}

const isDark = ref(initialIsDark());

function apply(persist = true) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark.value);
  if (!persist) return;
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
  } catch {
    // Ignore persistence failures — the in-memory toggle still works.
  }
}

/**
 * useTheme — shared dark/light mode state.
 *
 * The `isDark` ref is module-level so every component observes the same value.
 * Call `initTheme()` once at startup to sync the <html> class before first paint.
 */
export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value;
    apply();
  }

  // Set explicitly rather than relative to the current value. Embeds need this:
  // the app defaults to dark, which is the wrong choice inside a light-background
  // host page, and `?theme=light` has to win regardless of what is stored.
  //
  // `persist: false` is not a nicety. An embed writing the theme to localStorage
  // poisons the whole origin: a second embed on the same page reads it at module
  // init and silently inherits the first one's `?theme=`, and the reader's own
  // preference in the full app gets overwritten by a widget they only scrolled
  // past. A widget on someone else's page must not have that reach.
  function setDark(value: boolean, options: { persist?: boolean } = {}) {
    isDark.value = value;
    apply(options.persist ?? true);
  }

  function initTheme() {
    apply();
  }

  return { isDark, toggle, setDark, initTheme };
}
