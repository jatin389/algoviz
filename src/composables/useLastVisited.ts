import { ref } from 'vue';
import type { Router } from 'vue-router';

export const LAST_VISITED_KEY = 'algoviz-last-visited';

/**
 * Reads the stored route name, or `null` when nothing is stored. Exported so it
 * can be tested against a stubbed `localStorage` without importing the
 * module-level ref's import-time value (same precedent as `useAudioCues`).
 */
export function readLastVisited(): string | null {
  try {
    // An empty string is stored-but-meaningless; normalise it to "nothing".
    return localStorage.getItem(LAST_VISITED_KEY) || null;
  } catch {
    // localStorage may be unavailable (private mode, SSR). No resume card is a
    // fine outcome; throwing on every page load is not.
    return null;
  }
}

/**
 * The name of the last category route the user opened, or `null` if they have
 * never opened one (or storage is unreadable). Module-level so the landing view
 * and the recorder observe the same value without prop drilling — the same
 * pattern `useTheme` uses.
 */
const lastVisited = ref<string | null>(readLastVisited());

function write(name: string) {
  try {
    localStorage.setItem(LAST_VISITED_KEY, name);
  } catch {
    // Ignore persistence failures — the in-memory value still drives this session.
  }
}

/**
 * useLastVisited — remembers which category the user was last in, so the landing
 * page can offer to send them back there.
 *
 * Only named category routes are recorded. The landing route itself is skipped
 * on purpose: recording it would make "continue where you left off" resolve to
 * the very page the card is rendered on.
 */
export function useLastVisited() {
  function record(name: string) {
    lastVisited.value = name;
    write(name);
  }

  /**
   * Wire recording into navigation. Call once at startup. Uses `afterEach` so a
   * cancelled or redirected navigation never records a route the user did not
   * actually land on.
   */
  function trackLastVisited(router: Router, isTrackable: (name: string) => boolean) {
    router.afterEach((to) => {
      const name = typeof to.name === 'string' ? to.name : null;
      if (name && isTrackable(name)) record(name);
    });
  }

  return { lastVisited, record, trackLastVisited };
}
