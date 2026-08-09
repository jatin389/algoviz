// backlog/lib/parse.mjs
//
// Pure-ish I/O + parsing helpers for the Feature Lab generator. This module
// reads task/lab markdown files and DONE.md and turns them into plain data
// objects. It does no HTML rendering and no derived-field computation
// (leverage, completeness, blocked, unblocks) — see lib/derive.mjs for that.
//
// The frontmatter parser is intentionally a line-based `key: value` reader
// with no YAML array support, matching the original generate-board.mjs. New
// fields (zone, depends_on, cluster, lab_status, researched_at, closes) fit
// that shape by using comma/semicolon-separated strings instead of arrays.

import { readFileSync } from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Generic frontmatter / section helpers
// ---------------------------------------------------------------------------

/** Split a markdown file's raw text into { frontmatter, body }. */
export function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  const [, fmBlock, body] = match;
  const frontmatter = {};
  for (const line of fmBlock.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Strip one layer of surrounding double quotes, e.g.
    //   title: "New category: Dynamic Programming"
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }
  return { frontmatter, body };
}

/**
 * Extract the raw text of a `## Heading` section from a markdown body:
 * everything between that heading line and the next `##` heading, or end
 * of file if there isn't one.
 */
export function extractSection(body, heading) {
  const lines = body.split(/\r?\n/);
  const startIdx = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (startIdx === -1) return '';
  const rest = lines.slice(startIdx + 1);
  const endIdx = rest.findIndex((line) => /^##\s/.test(line));
  const sectionLines = endIdx === -1 ? rest : rest.slice(0, endIdx);
  return sectionLines.join('\n').trim();
}

/**
 * Pull a `**Label:** rest of the line` value out of prose (used for the
 * task Refinement section's `**Goal:**` / `**Open questions:**` lines).
 * Returns '' if the label isn't present — never throws.
 */
export function extractRefinementField(text, label) {
  if (!text) return '';
  const re = new RegExp(`^\\*\\*${label}:?\\*\\*`, 'i');
  const line = text.split(/\r?\n/).find((l) => re.test(l.trim()));
  if (!line) return '';
  return line.trim().replace(re, '').trim();
}

/** Zero-pad/normalise an id (from frontmatter or a filename prefix) to 4 digits. */
export function normalizeId(rawId) {
  if (rawId === undefined || rawId === null) return '';
  const s = String(rawId).trim();
  if (!s) return '';
  const digits = s.replace(/\D/g, '');
  if (!digits) return s;
  return digits.padStart(4, '0');
}

/** Split a comma-separated frontmatter value into trimmed, non-empty parts. */
export function splitCommaList(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Split a semicolon-separated frontmatter value into trimmed, non-empty parts. */
export function splitSemicolonList(value) {
  if (!value) return [];
  return value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Task files: backlog/NNNN-slug.md
// ---------------------------------------------------------------------------

export function parseTaskFile(fileName, dir) {
  const raw = readFileSync(path.join(dir, fileName), 'utf8');
  const { frontmatter, body } = splitFrontmatter(raw);
  const filenamePrefix = fileName.match(/^\d+/)?.[0] ?? '';
  const id = normalizeId(frontmatter.id) || normalizeId(filenamePrefix) || fileName;
  const refinement = extractSection(body, 'Refinement');
  return {
    id,
    title: frontmatter.title ?? '(untitled)',
    status: frontmatter.status ?? 'unknown',
    priority: frontmatter.priority ?? '',
    effort: frontmatter.effort ?? '',
    created: frontmatter.created ?? '',
    refinedAt: frontmatter.refined_at ?? '',
    zone: (frontmatter.zone ?? '').trim().toUpperCase(),
    cluster: (frontmatter.cluster ?? '').trim(),
    dependsOn: splitCommaList(frontmatter.depends_on).map(normalizeId).filter(Boolean),
    idea: extractSection(body, 'Idea'),
    refinement,
    goal: extractRefinementField(refinement, 'Goal'),
    openQuestions: extractRefinementField(refinement, 'Open questions'),
    file: fileName,
  };
}

// ---------------------------------------------------------------------------
// Lab files: backlog/labs/NNNN-slug.md
// ---------------------------------------------------------------------------

export function parseLabFile(fileName, dir) {
  const raw = readFileSync(path.join(dir, fileName), 'utf8');
  const { frontmatter, body } = splitFrontmatter(raw);
  const filenamePrefix = fileName.match(/^\d+/)?.[0] ?? '';
  const id = normalizeId(frontmatter.id) || normalizeId(filenamePrefix) || '';
  return {
    id,
    labStatus: (frontmatter.lab_status ?? 'unresearched').trim() || 'unresearched',
    researchedAt: frontmatter.researched_at ?? '',
    closes: splitSemicolonList(frontmatter.closes),
    verdict: extractSection(body, 'Verdict'),
    constraints: extractSection(body, 'Constraints'),
    architecture: extractSection(body, 'Architecture'),
    phases: extractSection(body, 'Phases'),
    risks: extractSection(body, 'Risks'),
    outOfScope: extractSection(body, 'Out of scope'),
    file: fileName,
  };
}

// ---------------------------------------------------------------------------
// DONE.md's closed-items table
// ---------------------------------------------------------------------------

/**
 * Parse DONE.md's closed-items markdown table into row objects.
 * Returns [] if the file is missing or the table has no data rows yet —
 * this must not throw, so the board still builds before anything closes.
 */
export function parseDoneTable(fileName, dir) {
  let raw;
  try {
    raw = readFileSync(path.join(dir, fileName), 'utf8');
  } catch {
    return [];
  }
  const lines = raw.split(/\r?\n/);
  const headerIdx = lines.findIndex((line) => /^\|.*\bID\b.*\|/.test(line));
  if (headerIdx === -1) return [];

  // The line right after the header is the `|---|---|` separator; data rows
  // (if any) follow it until the table ends.
  const rows = [];
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().startsWith('|')) break;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    const [id, resolution, title, closed] = cells;
    if (!id) continue;
    rows.push({ id, resolution: resolution ?? '', title: title ?? '', closed: closed ?? '' });
  }
  return rows;
}
