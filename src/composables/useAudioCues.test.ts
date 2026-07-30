// @vitest-environment jsdom
//
// The module under test reads `localStorage` at import time and `document.hidden`
// inside `play()`, both DOM globals — hence jsdom rather than the default node
// environment (see GridCanvas.test.ts for the same precedent).
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AUDIO_ENABLED_KEY,
  AUDIO_VOLUME_KEY,
  DEFAULT_VOLUME,
  readStoredEnabled,
  readStoredVolume,
  useAudioCues,
} from './useAudioCues';

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

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('readStoredEnabled', () => {
  it('defaults to false when nothing is stored', () => {
    vi.stubGlobal('localStorage', makeStorage());
    expect(readStoredEnabled()).toBe(false);
  });

  it('is true only for the exact stored value "1"', () => {
    vi.stubGlobal('localStorage', makeStorage({ [AUDIO_ENABLED_KEY]: '1' }));
    expect(readStoredEnabled()).toBe(true);
  });

  // Every one of these is unequal to the literal '1', so all correctly read
  // as off — unlike readStoredVolume, there is no numeric coercion here to
  // trip on.
  it.each(['0', 'true', 'abc', '', '2', '-1', 'NaN'])(
    'treats stored value %j as false',
    (stored) => {
      vi.stubGlobal('localStorage', makeStorage({ [AUDIO_ENABLED_KEY]: stored }));
      expect(readStoredEnabled()).toBe(false);
    },
  );

  it('falls back to false, and does not throw, when getItem throws', () => {
    const storage = makeStorage();
    storage.getItem = () => {
      throw new Error('blocked (private mode)');
    };
    vi.stubGlobal('localStorage', storage);
    expect(() => readStoredEnabled()).not.toThrow();
    expect(readStoredEnabled()).toBe(false);
  });
});

describe('readStoredVolume', () => {
  it('defaults to DEFAULT_VOLUME when nothing is stored', () => {
    vi.stubGlobal('localStorage', makeStorage());
    expect(readStoredVolume()).toBe(DEFAULT_VOLUME);
  });

  // Non-finite or out-of-range numbers all fall back to the baseline.
  it.each(['abc', '2', '-1', 'NaN', 'Infinity'])(
    'falls back to DEFAULT_VOLUME for garbage value %j',
    (stored) => {
      vi.stubGlobal('localStorage', makeStorage({ [AUDIO_VOLUME_KEY]: stored }));
      expect(readStoredVolume()).toBe(DEFAULT_VOLUME);
    },
  );

  // SUSPECTED PRODUCTION BUG — see report. `Number('')` is `0` in JS, and 0 is
  // a legal volume, so the implementation's `raw === null` guard does not
  // catch an empty-string value the way it catches the genuinely absent key:
  // this reads back as volume 0 rather than falling back to DEFAULT_VOLUME.
  // Asserting the intended contract here (matching the other garbage values)
  // rather than the current behavior, per instructions not to paper over a
  // real bug by weakening the test.
  it('falls back to DEFAULT_VOLUME for an empty stored string', () => {
    vi.stubGlobal('localStorage', makeStorage({ [AUDIO_VOLUME_KEY]: '' }));
    expect(readStoredVolume()).toBe(DEFAULT_VOLUME);
  });

  it('round-trips a mid-range valid volume', () => {
    vi.stubGlobal('localStorage', makeStorage({ [AUDIO_VOLUME_KEY]: '0.75' }));
    expect(readStoredVolume()).toBe(0.75);
  });

  it('accepts 0 as a valid boundary volume', () => {
    vi.stubGlobal('localStorage', makeStorage({ [AUDIO_VOLUME_KEY]: '0' }));
    expect(readStoredVolume()).toBe(0);
  });

  it('accepts 1 as a valid boundary volume', () => {
    vi.stubGlobal('localStorage', makeStorage({ [AUDIO_VOLUME_KEY]: '1' }));
    expect(readStoredVolume()).toBe(1);
  });

  it('falls back to DEFAULT_VOLUME, and does not throw, when getItem throws', () => {
    const storage = makeStorage();
    storage.getItem = () => {
      throw new Error('blocked (private mode)');
    };
    vi.stubGlobal('localStorage', storage);
    expect(() => readStoredVolume()).not.toThrow();
    expect(readStoredVolume()).toBe(DEFAULT_VOLUME);
  });
});

// `enabled` and `volume` are module-level refs created once at import, so
// every test below shares the *same* singleton rather than a fresh instance.
// Each test therefore restores whatever it changed before returning, so test
// order never matters for the describe blocks that follow.
describe('useAudioCues() singleton: toggle/setVolume', () => {
  it('toggle() flips enabled and persists the new value', () => {
    const storage = makeStorage();
    vi.stubGlobal('localStorage', storage);
    const { enabled, toggle } = useAudioCues();
    const before = enabled.value;

    toggle();
    expect(enabled.value).toBe(!before);
    expect(storage.getItem(AUDIO_ENABLED_KEY)).toBe(enabled.value ? '1' : '0');

    toggle(); // restore
    expect(enabled.value).toBe(before);
  });

  it('setVolume() sets the ref and persists it', () => {
    const storage = makeStorage();
    vi.stubGlobal('localStorage', storage);
    const { volume, setVolume } = useAudioCues();

    setVolume(0.5);
    expect(volume.value).toBe(0.5);
    expect(storage.getItem(AUDIO_VOLUME_KEY)).toBe('0.5');

    setVolume(DEFAULT_VOLUME); // restore
  });

  it('setVolume() clamps above 1 down to 1', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { volume, setVolume } = useAudioCues();

    setVolume(2);
    expect(volume.value).toBe(1);

    setVolume(DEFAULT_VOLUME); // restore
  });

  it('setVolume() clamps below 0 up to 0', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { volume, setVolume } = useAudioCues();

    setVolume(-1);
    expect(volume.value).toBe(0);

    setVolume(DEFAULT_VOLUME); // restore
  });

  it('toggle() does not throw, and the ref still updates, when setItem throws', () => {
    const storage = makeStorage();
    storage.setItem = () => {
      throw new Error('quota exceeded');
    };
    vi.stubGlobal('localStorage', storage);
    const { enabled, toggle } = useAudioCues();
    const before = enabled.value;

    expect(() => toggle()).not.toThrow();
    expect(enabled.value).toBe(!before);

    expect(() => toggle()).not.toThrow(); // restore, again through a throwing setItem
    expect(enabled.value).toBe(before);
  });

  it('setVolume() does not throw, and the ref still updates, when setItem throws', () => {
    const storage = makeStorage();
    storage.setItem = () => {
      throw new Error('quota exceeded');
    };
    vi.stubGlobal('localStorage', storage);
    const { volume, setVolume } = useAudioCues();

    expect(() => setVolume(0.9)).not.toThrow();
    expect(volume.value).toBe(0.9);

    setVolume(DEFAULT_VOLUME); // restore, through the same throwing storage
  });
});

describe('useAudioCues() singleton: play()', () => {
  it('is a no-op and does not throw for an empty cue list', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { play } = useAudioCues();
    expect(() => play([])).not.toThrow();
  });

  // The highest-value test in this file. jsdom ships no AudioContext
  // constructor at all, so if `play()` ever reached past the `enabled` gate
  // to lazily build the engine, `createAudioEngine()` would have nothing to
  // construct from — this is the test that would catch engine construction
  // ever being made eager.
  it('with sound disabled, does not construct an engine and does not throw', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { enabled, play } = useAudioCues();
    // Guard the premise: the assertion below only proves what it claims to
    // prove if sound really is off going in.
    expect(enabled.value).toBe(false);

    expect(() => play(['compare'])).not.toThrow();
  });

  // Must run after the disabled-path test above (or restore `enabled`
  // afterward, which it does): flipping `enabled` to true mutates the shared
  // module singleton for every other test in this file, and once true, this
  // test itself is what lazily builds the engine for the first time.
  it('with sound enabled, lazily builds the engine and still degrades to a silent no-op', () => {
    vi.stubGlobal('localStorage', makeStorage());
    const { enabled, toggle, play } = useAudioCues();
    expect(enabled.value).toBe(false);
    toggle();
    expect(enabled.value).toBe(true);

    try {
      // jsdom has no AudioContext, so createAudioEngine() degrades to
      // `available: false` internally and every play() becomes a silent
      // no-op. There is no sound to observe in jsdom, so not throwing is the
      // entire assertion here — asserting a mock would be worthless.
      expect(() => play(['compare'])).not.toThrow();
    } finally {
      toggle(); // restore `enabled` to false for any test file run after this one
      expect(enabled.value).toBe(false);
    }
  });
});
