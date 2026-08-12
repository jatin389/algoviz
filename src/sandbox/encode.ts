// URL encoding for shared snippets.
//
// The snippet travels in the link itself, base64url over UTF-8. There is no
// server to store it against and no id to look it up by, so the link *is* the
// storage — which also means a shared link keeps working forever with no
// backend to keep alive.

/** Snippets longer than this are not offered for sharing. */
export const MAX_SHARE_SOURCE_LENGTH = 6_000;

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  // Built one char at a time rather than via spread: String.fromCharCode
  // applied to a multi-kilobyte array overflows the argument limit.
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(raw: string): Uint8Array | undefined {
  const padded = raw.replace(/-/g, '+').replace(/_/g, '/');
  try {
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return undefined;
  }
}

/** Returns null when the snippet is too long to put in a URL. */
export function encodeSource(source: string): string | null {
  if (source.length > MAX_SHARE_SOURCE_LENGTH) return null;
  return toBase64Url(new TextEncoder().encode(source));
}

/** Returns undefined for anything unusable, matching `UrlParamSpec.decode`. */
export function decodeSource(raw: string): string | undefined {
  const bytes = fromBase64Url(raw);
  if (bytes === undefined) return undefined;
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    // An over-long snippet is refused on the way in too: the cap protects the
    // editor and the runner, not just the address bar.
    return text.length > MAX_SHARE_SOURCE_LENGTH ? undefined : text;
  } catch {
    return undefined;
  }
}
