import { describe, it, expect } from 'vitest';
import { encodeSource, decodeSource, MAX_SHARE_SOURCE_LENGTH } from './encode';
import { STARTER_SOURCE } from './contract';

describe('sandbox source encoding', () => {
  it('round-trips the starter snippet', () => {
    const encoded = encodeSource(STARTER_SOURCE);
    expect(encoded).not.toBeNull();
    expect(decodeSource(encoded as string)).toBe(STARTER_SOURCE);
  });

  it('round-trips non-ASCII source', () => {
    const source = '// naïve — sortiert 🎈\nfunction* run(a) { yield a; }';
    const encoded = encodeSource(source);
    expect(decodeSource(encoded as string)).toBe(source);
  });

  it('produces URL-safe output with no padding', () => {
    // '+' and '/' would need percent-encoding inside a query value, and '='
    // is noise in a link people are meant to paste around.
    const encoded = encodeSource(STARTER_SOURCE) as string;
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('refuses to encode a snippet past the share cap', () => {
    expect(encodeSource('x'.repeat(MAX_SHARE_SOURCE_LENGTH + 1))).toBeNull();
  });

  it('rejects malformed base64 rather than throwing', () => {
    expect(decodeSource('!!!not base64!!!')).toBeUndefined();
  });

  it('rejects bytes that are not valid UTF-8', () => {
    // 0xFF is never a legal UTF-8 lead byte; a hand-mangled link must degrade
    // to the starter snippet, not to mojibake in the editor.
    expect(decodeSource('_w')).toBeUndefined();
  });

  it('rejects an over-long payload on the way in as well as out', () => {
    const oversized = encodeSource('y'.repeat(MAX_SHARE_SOURCE_LENGTH));
    expect(oversized).not.toBeNull();
    // Same content, but the cap is enforced on decode too, so a link built by
    // some other tool cannot smuggle a larger snippet in.
    const longer = Buffer.from('y'.repeat(MAX_SHARE_SOURCE_LENGTH + 50), 'utf-8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    expect(decodeSource(longer)).toBeUndefined();
  });
});
