import { ref } from 'vue';
import { createAudioEngine } from '@/audio/engine';
import type { AudioEngine } from '@/audio/engine';
import { CUES } from '@/audio/cues';
import type { CueName } from '@/audio/cues';

export const AUDIO_ENABLED_KEY = 'algoviz-audio-enabled';
export const AUDIO_VOLUME_KEY = 'algoviz-audio-volume';
export const DEFAULT_VOLUME = 0.4;

/** Exported for testability: the module-level singleton reads these once at import. */
export function readStoredEnabled(): boolean {
  try {
    return localStorage.getItem(AUDIO_ENABLED_KEY) === '1';
  } catch {
    // localStorage may be unavailable (private mode, SSR); default to off.
    return false;
  }
}

/** Exported for testability: the module-level singleton reads these once at import. */
export function readStoredVolume(): number {
  try {
    const raw = localStorage.getItem(AUDIO_VOLUME_KEY);
    // Empty string is checked alongside null because `Number('')` is 0, which
    // would otherwise pass the range test below and silently mute audio rather
    // than falling back like every other malformed value.
    if (raw === null || raw === '') return DEFAULT_VOLUME;
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) return parsed;
    return DEFAULT_VOLUME;
  } catch {
    // localStorage may be unavailable (private mode, SSR); default to the baseline.
    return DEFAULT_VOLUME;
  }
}

// Enabled defaults to false: firing audio unsolicited on load is hostile, and
// the browser's autoplay policy gates sound behind a user gesture anyway — an
// eager default-on would render as "on" while actually producing silence until
// the user clicked something. See toggle() for the one place that unlocks it.
const enabled = ref(readStoredEnabled());
const volume = ref(readStoredVolume());

// Built lazily by toggle()/setVolume(), never at import: jsdom and node have no
// AudioContext, so eager construction here would make this module unimportable
// under test.
let engine: AudioEngine | null = null;

function persist() {
  try {
    localStorage.setItem(AUDIO_ENABLED_KEY, enabled.value ? '1' : '0');
    localStorage.setItem(AUDIO_VOLUME_KEY, String(volume.value));
  } catch {
    // Ignore persistence failures — the in-memory toggle still works.
  }
}

/**
 * Build the engine on first need and bring it up to date.
 *
 * Called from toggle() — where the click is itself the gesture the autoplay
 * policy wants — and from play(), which matters for a user returning with
 * `enabled` already persisted as true: there is no toggle click in that session,
 * so without this the toggle would read "on" and produce nothing. The first cue
 * of a run is emitted synchronously inside the Run button's click handler
 * (run() calls tick() directly), so that path is still gesture-backed.
 */
function ensureEngine(): AudioEngine {
  const ready = engine ?? createAudioEngine();
  engine = ready;
  ready.setVolume(volume.value);
  ready.unlock();
  return ready;
}

/**
 * useAudioCues — shared sound-effect state, modeled on useTheme.
 *
 * `enabled` and `volume` are module-level so every component observes the same
 * instance and shares the single underlying AudioEngine.
 */
export function useAudioCues() {
  function toggle() {
    enabled.value = !enabled.value;
    persist();
    if (enabled.value) ensureEngine();
  }

  function setVolume(v: number) {
    volume.value = Math.min(1, Math.max(0, v));
    persist();
    engine?.setVolume(volume.value);
  }

  function play(cues: readonly CueName[]) {
    // Cheapest check first: sound is off, nothing to do.
    if (!enabled.value) return;
    if (cues.length === 0) return;
    // Background tabs clamp setTimeout to ~1s but do not auto-suspend the
    // AudioContext, so without this an invisible tab would blip once a second.
    if (document.hidden) return;
    const ready = engine ?? ensureEngine();
    for (const name of cues) ready.play(CUES[name], name);
  }

  return { enabled, volume, toggle, setVolume, play };
}

// Vite re-creates this module's singleton on every HMR invalidation without
// closing the previous AudioContext. Chrome caps a page at ~6 live contexts,
// past which construction throws — so without this, audio would silently die
// a handful of edits into `npm run dev`.
import.meta.hot?.dispose(() => engine?.dispose());
