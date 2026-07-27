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

function apply() {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark.value);
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

  function initTheme() {
    apply();
  }

  return { isDark, toggle, initTheme };
}
