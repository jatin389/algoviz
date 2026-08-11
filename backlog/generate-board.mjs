#!/usr/bin/env node
// backlog/generate-board.mjs
//
// Reads every backlog/*.md task file (plus DONE.md's closed-items table) and
// emits backlog/board.html: a single self-contained, filterable HTML board.
// No dependencies — a small hand-rolled frontmatter/table parser, since the
// frontmatter here is just flat `key: value` pairs.
//
// Usage:
//   node backlog/generate-board.mjs
//   npm run backlog:board

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKLOG_DIR = __dirname;
const OUTPUT_PATH = path.join(BACKLOG_DIR, 'board.html');

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

/** Split a task markdown file's raw text into { frontmatter, body }. */
function splitFrontmatter(raw) {
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
 * Extract the raw text of a `## Heading` section from a task body:
 * everything between that heading line and the next `##` heading, or end
 * of file if there isn't one.
 */
function extractSection(body, heading) {
  const lines = body.split(/\r?\n/);
  const startIdx = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (startIdx === -1) return '';
  const rest = lines.slice(startIdx + 1);
  const endIdx = rest.findIndex((line) => /^##\s/.test(line));
  const sectionLines = endIdx === -1 ? rest : rest.slice(0, endIdx);
  return sectionLines.join('\n').trim();
}

function parseTaskFile(fileName) {
  const raw = readFileSync(path.join(BACKLOG_DIR, fileName), 'utf8');
  const { frontmatter, body } = splitFrontmatter(raw);
  return {
    id: frontmatter.id ?? fileName,
    title: frontmatter.title ?? '(untitled)',
    status: frontmatter.status ?? 'unknown',
    priority: frontmatter.priority ?? '',
    effort: frontmatter.effort ?? '',
    zone: frontmatter.zone ?? '',
    created: frontmatter.created ?? '',
    refinedAt: frontmatter.refined_at ?? '',
    idea: extractSection(body, 'Idea'),
    refinement: extractSection(body, 'Refinement'),
    file: fileName,
  };
}

/**
 * Parse DONE.md's closed-items markdown table into row objects.
 * Returns [] if the file is missing or the table has no data rows yet —
 * this must not throw, so the board still builds before anything closes.
 */
function parseDoneTable(fileName) {
  let raw;
  try {
    raw = readFileSync(path.join(BACKLOG_DIR, fileName), 'utf8');
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

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

const taskFiles = readdirSync(BACKLOG_DIR)
  .filter((name) => name.endsWith('.md') && name !== 'Backlogs.md' && name !== 'DONE.md')
  .sort();

const tasks = taskFiles.map(parseTaskFile);
const doneRows = parseDoneTable('DONE.md');

// ---------------------------------------------------------------------------
// Derived data: counts, sort order, filter option lists
// ---------------------------------------------------------------------------

const PRIORITY_ORDER = ['P0', 'P1', 'P2', 'P3'];
const STATUS_LABELS = {
  ready: 'Ready',
  inbox: 'Inbox',
  'in-progress': 'In Progress',
  done: 'Done',
  dropped: 'Dropped',
};
const STATUS_ORDER = ['ready', 'in-progress', 'inbox', 'done', 'dropped'];

function priorityRank(priority) {
  const idx = PRIORITY_ORDER.indexOf(priority);
  return idx === -1 ? PRIORITY_ORDER.length : idx;
}

// Status counts, computed from the actual parsed data (not hardcoded).
// Closed tasks keep their file (status: done/dropped) per the backlog skill's
// closing step, so task frontmatter is the single source of truth here —
// DONE.md's table is a redundant index and is only used below for display.
const statusCounts = {};
for (const task of tasks) {
  statusCounts[task.status] = (statusCounts[task.status] ?? 0) + 1;
}

// Every status actually present, in a friendly display order, falling back
// to alphabetical for anything unrecognized.
const presentStatuses = Object.keys(statusCounts).sort((a, b) => {
  const rankA = STATUS_ORDER.indexOf(a);
  const rankB = STATUS_ORDER.indexOf(b);
  if (rankA === -1 && rankB === -1) return a.localeCompare(b);
  if (rankA === -1) return 1;
  if (rankB === -1) return -1;
  return rankA - rankB;
});

const presentPriorities = PRIORITY_ORDER.filter((p) => tasks.some((t) => t.priority === p));
const presentEfforts = ['S', 'M', 'L'].filter((e) => tasks.some((t) => t.effort === e));

// Zones are open-ended (a later research pass can add Zone E, F, ...), so the
// filter list is derived from whatever's actually present in the data,
// sorted alphabetically, rather than a hardcoded A–D list.
const presentZones = [...new Set(tasks.map((t) => t.zone).filter(Boolean))].sort();

// Default order: group by status (Ready, In Progress, Inbox, Done, ...),
// and within each group sort by priority (P0 first), then by ID.
const sortedTasks = [...tasks].sort((a, b) => {
  const statusA = STATUS_ORDER.indexOf(a.status);
  const statusB = STATUS_ORDER.indexOf(b.status);
  const rankA = statusA === -1 ? STATUS_ORDER.length : statusA;
  const rankB = statusB === -1 ? STATUS_ORDER.length : statusB;
  if (rankA !== rankB) return rankA - rankB;
  const priorityDelta = priorityRank(a.priority) - priorityRank(b.priority);
  if (priorityDelta !== 0) return priorityDelta;
  return String(a.id).localeCompare(String(b.id));
});

// ---------------------------------------------------------------------------
// HTML rendering
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusLabel(status) {
  return STATUS_LABELS[status] ?? status;
}

function effortLabel(effort) {
  return { S: 'Small', M: 'Medium', L: 'Large' }[effort] ?? effort;
}

// Display names for known zones. Falls back to the bare letter for any zone
// not listed here, so a future Zone E/F/... renders fine without a code
// change — the backlog skill's "Zones (optional)" section is the source of
// truth for what a letter means.
const ZONE_NAMES = {
  A: 'Extend the map',
  B: 'Off the map',
  C: 'New territories',
  D: 'Instruments',
  E: 'Technical improvement',
};

function zoneLabel(zone) {
  return ZONE_NAMES[zone] ? `${zone} · ${ZONE_NAMES[zone]}` : zone;
}

/** Tiny 3-bar "signal strength" cue: fills 1/2/3 bars for S/M/L. */
function effortBars(effort) {
  const filled = { S: 1, M: 2, L: 3 }[effort] ?? 0;
  let bars = '';
  for (let i = 1; i <= 3; i++) {
    bars += `<span class="effort-bar${i <= filled ? ' filled' : ''}"></span>`;
  }
  return `<span class="effort-bars" aria-hidden="true">${bars}</span>`;
}

function renderCard(task) {
  const searchText = `${task.title} ${task.idea} ${task.zone} ${zoneLabel(task.zone)}`.toLowerCase();
  const priorityAttr = task.priority || 'none';
  const effortAttr = task.effort || 'none';
  const zoneAttr = task.zone || 'none';

  return `
    <article class="card"
      data-status="${escapeHtml(task.status)}"
      data-priority="${escapeHtml(priorityAttr)}"
      data-effort="${escapeHtml(effortAttr)}"
      data-zone="${escapeHtml(zoneAttr)}"
      data-search="${escapeHtml(searchText)}">
      <button class="card-header" type="button" aria-expanded="false">
        <span class="card-id">${escapeHtml(task.id)}</span>
        <span class="card-title">${escapeHtml(task.title)}</span>
        <span class="card-badges">
          <span class="pill status-${escapeHtml(task.status)}">${escapeHtml(statusLabel(task.status))}</span>
          ${task.priority ? `<span class="badge priority-${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</span>` : ''}
          ${task.effort ? `<span class="badge effort-${escapeHtml(task.effort)}" title="${escapeHtml(effortLabel(task.effort))} effort">${effortBars(task.effort)}${escapeHtml(task.effort)}</span>` : ''}
          ${task.zone ? `<span class="badge zone-badge">${escapeHtml(zoneLabel(task.zone))}</span>` : ''}
        </span>
        <span class="chevron" aria-hidden="true">&#9656;</span>
      </button>
      <div class="card-body">
        <div class="card-meta">
          <span>File: <code>${escapeHtml(task.file)}</code></span>
          ${task.created ? `<span>Created: ${escapeHtml(task.created)}</span>` : ''}
          ${task.refinedAt ? `<span>Refined: ${escapeHtml(task.refinedAt)}</span>` : ''}
        </div>
        <h3>Idea</h3>
        <pre class="section-text">${escapeHtml(task.idea || '(none)')}</pre>
        <h3>Refinement</h3>
        <pre class="section-text">${escapeHtml(task.refinement || '(none)')}</pre>
      </div>
    </article>`;
}

function renderDoneRow(row) {
  return `
        <tr>
          <td>${escapeHtml(row.id)}</td>
          <td>${escapeHtml(row.resolution)}</td>
          <td>${escapeHtml(row.title)}</td>
          <td>${escapeHtml(row.closed)}</td>
        </tr>`;
}

function renderStatusOptions() {
  return presentStatuses
    .map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(statusLabel(s))} (${statusCounts[s]})</option>`)
    .join('\n            ');
}

function renderPriorityOptions() {
  return presentPriorities.map((p) => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join('\n            ');
}

function renderEffortOptions() {
  return presentEfforts
    .map((e) => `<option value="${escapeHtml(e)}">${escapeHtml(e)} — ${escapeHtml(effortLabel(e))}</option>`)
    .join('\n            ');
}

function renderZoneOptions() {
  return presentZones
    .map((z) => `<option value="${escapeHtml(z)}">${escapeHtml(zoneLabel(z))}</option>`)
    .join('\n            ');
}

function renderStatCards() {
  return presentStatuses
    .map(
      (s) => `
        <div class="stat">
          <span class="stat-count">${statusCounts[s]}</span>
          <span class="stat-label">${escapeHtml(statusLabel(s))}</span>
        </div>`,
    )
    .join('');
}

const generatedAt = new Date().toISOString();

const html = `<!DOCTYPE html>
<!-- Generated by backlog/generate-board.mjs — do not hand-edit. Edit the source .md files in backlog/ and re-run \`npm run backlog:board\`. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="generated-at" content="${escapeHtml(generatedAt)}">
<title>AlgoViz Backlog Board</title>
<style>
  :root {
    --bg: #f6f7f9;
    --surface: #ffffff;
    --surface-alt: #eef0f3;
    --border: #d9dce1;
    --text: #1b1f24;
    --text-muted: #5b636e;
    --accent: #2f6fed;
    --p0: #c62828;
    --p1: #e0812a;
    --p2: #2f6fed;
    --p3: #5b636e;
    --ready: #1f8a57;
    --inbox: #7a6ff0;
    --progress: #d8973c;
    --done: #6b7280;
    --shadow: 0 1px 2px rgba(16, 20, 24, 0.06), 0 1px 1px rgba(16, 20, 24, 0.04);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.45;
  }

  header.board-header {
    padding: 1.5rem 1.75rem 1.25rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  header.board-header h1 {
    margin: 0 0 0.15rem;
    font-size: 1.4rem;
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0 0 1rem;
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0.9rem;
    min-width: 5.5rem;
  }

  .stat-count {
    font-size: 1.3rem;
    font-weight: 700;
  }

  .stat-label {
    font-size: 0.78rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .toolbar {
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    align-items: center;
    padding: 0.9rem 1.75rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .toolbar label {
    font-size: 0.78rem;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .toolbar select,
  .toolbar input[type="search"] {
    font: inherit;
    padding: 0.4rem 0.55rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    color: var(--text);
  }

  .toolbar input[type="search"] {
    min-width: 16rem;
  }

  .toolbar .search-field {
    flex-grow: 1;
  }

  .toolbar .search-field input {
    width: 100%;
  }

  .result-count {
    font-size: 0.82rem;
    color: var(--text-muted);
    padding: 0 1.75rem;
    margin-top: 0.75rem;
  }

  main {
    padding: 0.5rem 1.75rem 2.5rem;
  }

  .group {
    margin-top: 1.5rem;
  }

  .group-title {
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    margin: 0 0 0.6rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid var(--border);
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .card[hidden] { display: none; }

  .card-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.9rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font: inherit;
    color: inherit;
  }

  .card-header:hover { background: var(--surface-alt); }

  .card-id {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.78rem;
    color: var(--text-muted);
    min-width: 2.6rem;
  }

  .card-title {
    flex: 1;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .card-badges {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  .pill {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    color: #fff;
    white-space: nowrap;
  }

  .pill.status-ready { background: var(--ready); }
  .pill.status-inbox { background: var(--inbox); }
  .pill.status-in-progress { background: var(--progress); }
  .pill.status-done { background: var(--done); }
  .pill.status-dropped { background: var(--text-muted); }
  .pill.status-unknown { background: var(--text-muted); }

  .badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    border: 1px solid var(--border);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .badge.priority-P0 { color: var(--p0); border-color: var(--p0); }
  .badge.priority-P1 { color: var(--p1); border-color: var(--p1); }
  .badge.priority-P2 { color: var(--p2); border-color: var(--p2); }
  .badge.priority-P3 { color: var(--p3); border-color: var(--p3); }

  .badge.effort-S,
  .badge.effort-M,
  .badge.effort-L {
    color: var(--text);
  }

  .badge.zone-badge {
    color: var(--accent);
    border-color: var(--accent);
  }

  .effort-bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 1px;
    height: 0.6rem;
  }

  .effort-bar {
    width: 3px;
    background: var(--border);
    border-radius: 1px;
  }

  .effort-bar:nth-child(1) { height: 0.3rem; }
  .effort-bar:nth-child(2) { height: 0.45rem; }
  .effort-bar:nth-child(3) { height: 0.6rem; }

  .effort-bar.filled { background: var(--accent); }

  .chevron {
    flex-shrink: 0;
    color: var(--text-muted);
    transition: transform 0.15s ease;
  }

  .card-header[aria-expanded="true"] .chevron {
    transform: rotate(90deg);
  }

  .card-body {
    display: none;
    padding: 0.2rem 1rem 1rem;
    border-top: 1px solid var(--border);
  }

  .card-body.open { display: block; }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    font-size: 0.78rem;
    color: var(--text-muted);
    margin: 0.7rem 0 0.3rem;
  }

  .card-meta code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  .card-body h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--text-muted);
    margin: 0.9rem 0 0.3rem;
  }

  .section-text {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    font-size: 0.9rem;
    margin: 0;
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.65rem 0.8rem;
  }

  .empty-state {
    color: var(--text-muted);
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  table.done-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    font-size: 0.88rem;
  }

  table.done-table th,
  table.done-table td {
    text-align: left;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  table.done-table th {
    background: var(--surface-alt);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--text-muted);
  }

  table.done-table tr:last-child td { border-bottom: none; }

  footer {
    padding: 1rem 1.75rem 2rem;
    color: var(--text-muted);
    font-size: 0.78rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron { transition: none; }
  }
</style>
</head>
<body>

<header class="board-header">
  <h1>AlgoViz Backlog Board</h1>
  <p class="subtitle">${tasks.length} tracked task${tasks.length === 1 ? '' : 's'} &middot; generated ${escapeHtml(generatedAt)}</p>
  <div class="stats">${renderStatCards()}</div>
</header>

<div class="toolbar">
  <label>
    Status
    <select id="filter-status">
      <option value="">All statuses</option>
      ${renderStatusOptions()}
    </select>
  </label>
  <label>
    Priority
    <select id="filter-priority">
      <option value="">All priorities</option>
      ${renderPriorityOptions()}
    </select>
  </label>
  <label>
    Effort
    <select id="filter-effort">
      <option value="">All efforts</option>
      ${renderEffortOptions()}
    </select>
  </label>
  <label>
    Zone
    <select id="filter-zone">
      <option value="">All zones</option>
      ${renderZoneOptions()}
    </select>
  </label>
  <label class="search-field">
    Search title &amp; idea
    <input type="search" id="filter-search" placeholder="e.g. sandbox, domain, quiz&hellip;">
  </label>
</div>

<p class="result-count" id="result-count"></p>

<main>
  <div class="cards" id="card-list">
    ${sortedTasks.map(renderCard).join('\n')}
  </div>

  <div class="group">
    <h2 class="group-title">Done / Dropped (${doneRows.length})</h2>
    ${
      doneRows.length === 0
        ? '<p class="empty-state">No closed items yet.</p>'
        : `<table class="done-table">
      <thead>
        <tr><th>ID</th><th>Resolution</th><th>Title</th><th>Closed</th></tr>
      </thead>
      <tbody>${doneRows.map(renderDoneRow).join('')}
      </tbody>
    </table>`
    }
  </div>
</main>

<footer>
  Source: <code>backlog/*.md</code> &middot; Regenerate with <code>npm run backlog:board</code>
</footer>

<script>
(function () {
  var statusSelect = document.getElementById('filter-status');
  var prioritySelect = document.getElementById('filter-priority');
  var effortSelect = document.getElementById('filter-effort');
  var zoneSelect = document.getElementById('filter-zone');
  var searchInput = document.getElementById('filter-search');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var resultCount = document.getElementById('result-count');

  function applyFilters() {
    var status = statusSelect.value;
    var priority = prioritySelect.value;
    var effort = effortSelect.value;
    var zone = zoneSelect.value;
    var query = searchInput.value.trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var matches =
        (!status || card.dataset.status === status) &&
        (!priority || card.dataset.priority === priority) &&
        (!effort || card.dataset.effort === effort) &&
        (!zone || card.dataset.zone === zone) &&
        (!query || card.dataset.search.indexOf(query) !== -1);
      card.hidden = !matches;
      if (matches) visible++;
    });

    resultCount.textContent = visible + ' of ' + cards.length + ' task' + (cards.length === 1 ? '' : 's') + ' shown';
  }

  statusSelect.addEventListener('change', applyFilters);
  prioritySelect.addEventListener('change', applyFilters);
  effortSelect.addEventListener('change', applyFilters);
  zoneSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.card-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!expanded));
      var body = header.parentElement.querySelector('.card-body');
      body.classList.toggle('open', !expanded);
    });
  });

  applyFilters();
})();
</script>
</body>
</html>
`;

writeFileSync(OUTPUT_PATH, html, 'utf8');
console.log(
  `Wrote ${path.relative(process.cwd(), OUTPUT_PATH)} — ${tasks.length} tasks, ${doneRows.length} done rows.`,
);
