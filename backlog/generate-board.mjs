#!/usr/bin/env node
// backlog/generate-board.mjs
//
// Thin entry point: load every backlog/*.md task file (plus DONE.md's
// closed-items table and any backlog/labs/*.md lab files), derive the
// cross-references (unblocks, leverage, completeness, blocked), and write
// backlog/board.html plus one backlog/lab/NNNN.html per task.
//
// All parsing, derivation and rendering logic lives in backlog/lib/*.mjs —
// this file just wires it together. No dependencies — a small hand-rolled
// frontmatter/table parser, since the frontmatter here is just flat
// `key: value` pairs.
//
// Usage:
//   node backlog/generate-board.mjs
//   npm run backlog:board

import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { parseTaskFile, parseLabFile, parseDoneTable } from './lib/parse.mjs';
import { buildIndex } from './lib/derive.mjs';
import { renderBoardPage } from './lib/render-board.mjs';
import { renderLabPage } from './lib/render-lab.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKLOG_DIR = __dirname;
const LABS_DIR = path.join(BACKLOG_DIR, 'labs');
const LAB_OUTPUT_DIR = path.join(BACKLOG_DIR, 'lab');
const ORIGINAL_LABS_DIR = path.join(BACKLOG_DIR, 'original_labs');
const BOARD_OUTPUT_PATH = path.join(BACKLOG_DIR, 'board.html');

/** List `.md` files in a directory; [] if the directory doesn't exist. */
function listMarkdownFiles(dir) {
  try {
    return readdirSync(dir)
      .filter((name) => name.endsWith('.md'))
      .sort();
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Load
// ---------------------------------------------------------------------------

const taskFiles = listMarkdownFiles(BACKLOG_DIR).filter(
  (name) => name !== 'Backlogs.md' && name !== 'DONE.md',
);
const tasks = taskFiles.map((name) => parseTaskFile(name, BACKLOG_DIR));

const labFiles = listMarkdownFiles(LABS_DIR);
const labs = labFiles.map((name) => parseLabFile(name, LABS_DIR));

const doneRows = parseDoneTable('DONE.md', BACKLOG_DIR);

/**
 * Hand-authored Feature Lab pages, written by the `lab-creator` skill rather
 * than by this generator. Discovered on disk and keyed by the item id in the
 * filename, so the skill owns the naming and this only has to notice.
 */
function findOriginalLabs(dir) {
  const byId = new Map();
  try {
    for (const name of readdirSync(dir).sort()) {
      if (!name.endsWith('.html')) continue;
      const id = name.match(/^(\d{4})/)?.[1];
      if (id) byId.set(id, name);
    }
  } catch {
    /* directory absent — no hand-authored labs yet */
  }
  return byId;
}

const originalLabs = findOriginalLabs(ORIGINAL_LABS_DIR);

// ---------------------------------------------------------------------------
// Derive
// ---------------------------------------------------------------------------

const index = buildIndex(tasks, labs);
const generatedAt = new Date().toISOString();

// ---------------------------------------------------------------------------
// Render + write
// ---------------------------------------------------------------------------

const boardHtml = renderBoardPage({ ...index, doneRows, generatedAt, originalLabs });
writeFileSync(BOARD_OUTPUT_PATH, boardHtml, 'utf8');

mkdirSync(LAB_OUTPUT_DIR, { recursive: true });
for (const item of index.items) {
  const labHtml = renderLabPage(item, index.itemsById, generatedAt);
  writeFileSync(path.join(LAB_OUTPUT_DIR, `${item.id}.html`), labHtml, 'utf8');
}

console.log(
  `Wrote ${path.relative(process.cwd(), BOARD_OUTPUT_PATH)} — ${tasks.length} tasks, ${doneRows.length} done rows, ${labs.length} labs.`,
);
console.log(
  `Wrote ${index.items.length} lab pages to ${path.relative(process.cwd(), LAB_OUTPUT_DIR)}/`,
);
