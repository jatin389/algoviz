// backlog/lib/render-board.mjs
//
// Renders backlog/board.html — the full HTML document — from an index
// object produced by lib/derive.mjs's buildIndex() plus doneRows/generatedAt.

import { THEME_CSS } from './theme.mjs';
import {
  escapeHtml,
  statusPill,
  priorityBadge,
  effortBadge,
  zoneChip,
  zoneLabel,
  leverageMarker,
  blockedMarker,
  labStatusPill,
  boardToLabLink,
  boardToOriginalLabLink,
  statCard,
  themeToggle,
  THEME_INIT_SCRIPT,
  THEME_TOGGLE_SCRIPT,
} from './components.mjs';
import { statusLabel, effortLabel } from './components.mjs';

const BOARD_CSS = `
  header.board-header {
    padding: 1.5rem 1.75rem 1.25rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .board-header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
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

  .stats + .stats { margin-top: 0.6rem; }

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

  .toolbar label.checkbox-field {
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    padding-top: 1.1rem;
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

  .zone-group-title {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--text-muted);
    margin: 1.1rem 0 0.4rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px dashed var(--border);
  }

  .zone-group-title:first-child { margin-top: 0; }

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
    flex-wrap: wrap;
    gap: 0.4rem;
    flex-shrink: 0;
    justify-content: flex-end;
  }

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
    align-items: center;
    gap: 0.9rem;
    font-size: 0.78rem;
    color: var(--text-muted);
    margin: 0.7rem 0 0.3rem;
  }

  .card-meta code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  .card-meta .lab-link { font-weight: 600; }
  .card-meta .original-lab-link {
    color: var(--accent);
    font-weight: 700;
  }

  .card-body h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--text-muted);
    margin: 0.9rem 0 0.3rem;
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
`;

function renderCard(item, originalLabs) {
  const searchText = `${item.title} ${item.idea} ${item.zoneLabel} ${item.cluster}`.toLowerCase();
  const priorityAttr = item.priority || 'none';
  const effortAttr = item.effort || 'none';
  const zoneAttr = item.zone || 'none';
  const labAttr = item.labStatus === 'unresearched' ? 'unresearched' : 'researched';

  return `
    <article class="card"
      data-status="${escapeHtml(item.status)}"
      data-priority="${escapeHtml(priorityAttr)}"
      data-effort="${escapeHtml(effortAttr)}"
      data-zone="${escapeHtml(zoneAttr)}"
      data-lab="${escapeHtml(labAttr)}"
      data-search="${escapeHtml(searchText)}">
      <button class="card-header" type="button" aria-expanded="false">
        <span class="card-id">${escapeHtml(item.id)}</span>
        <span class="card-title">${escapeHtml(item.title)}</span>
        <span class="card-badges">
          ${zoneChip(item.zone)}
          ${statusPill(item.status)}
          ${priorityBadge(item.priority)}
          ${effortBadge(item.effort)}
          ${leverageMarker(item.leverage)}
          ${item.blocked ? blockedMarker() : ''}
        </span>
        <span class="chevron" aria-hidden="true">&#9656;</span>
      </button>
      <div class="card-body">
        <div class="card-meta">
          <span>File: <code>${escapeHtml(item.file)}</code></span>
          ${item.created ? `<span>Created: ${escapeHtml(item.created)}</span>` : ''}
          ${item.refinedAt ? `<span>Refined: ${escapeHtml(item.refinedAt)}</span>` : ''}
          ${item.cluster ? `<span>Cluster: <code>${escapeHtml(item.cluster)}</code></span>` : ''}
          <span>Lab: ${labStatusPill(item.labStatus)}</span>
          <span>${boardToLabLink(item.id, 'Open lab page →')}</span>
          ${originalLabs?.has(item.id) ? `<span>${boardToOriginalLabLink(originalLabs.get(item.id))}</span>` : ''}
        </div>
        <h3>Idea</h3>
        <pre class="section-text">${escapeHtml(item.idea || '(none)')}</pre>
        <h3>Refinement</h3>
        <pre class="section-text">${escapeHtml(item.refinement || '(none)')}</pre>
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

export function renderBoardPage({
  items,
  originalLabs,
  doneRows,
  generatedAt,
  statusCounts,
  presentStatuses,
  presentPriorities,
  presentEfforts,
  presentZones,
  zoneCounts,
}) {
  const researchedCount = items.filter((i) => i.labStatus !== 'unresearched').length;
  const unresearchedCount = items.length - researchedCount;

  const statusOptions = presentStatuses
    .map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(statusLabel(s))} (${statusCounts[s]})</option>`)
    .join('\n            ');
  const priorityOptions = presentPriorities
    .map((p) => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`)
    .join('\n            ');
  const effortOptions = presentEfforts
    .map((e) => `<option value="${escapeHtml(e)}">${escapeHtml(e)} — ${escapeHtml(effortLabel(e))}</option>`)
    .join('\n            ');
  const zoneOptions = presentZones
    .map(
      (z) =>
        `<option value="${escapeHtml(z)}">${escapeHtml(z)} — ${escapeHtml(zoneLabel(z))} (${zoneCounts[z] ?? 0})</option>`,
    )
    .join('\n            ');

  const statCards = presentStatuses.map((s) => statCard(statusCounts[s], statusLabel(s))).join('');

  const html = `<!DOCTYPE html>
<!-- Generated by backlog/generate-board.mjs (backlog/lib/render-board.mjs) — do not hand-edit.
     Edit the source .md files in backlog/ and backlog/labs/, then re-run \`npm run backlog:board\`. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="generated-at" content="${escapeHtml(generatedAt)}">
<title>AlgoViz Backlog Board</title>
<style>
${THEME_CSS}
${BOARD_CSS}
</style>
<script>${THEME_INIT_SCRIPT}</script>
</head>
<body>

<header class="board-header">
  <div class="board-header-top">
    <h1>AlgoViz Backlog Board</h1>
    ${themeToggle()}
  </div>
  <p class="subtitle">${items.length} tracked task${items.length === 1 ? '' : 's'} &middot; ${researchedCount} with a lab &middot; ${unresearchedCount} unresearched &middot; generated ${escapeHtml(generatedAt)}</p>
  <div class="stats">${statCards}</div>
</header>

<div class="toolbar">
  <label>
    Status
    <select id="filter-status">
      <option value="">All statuses</option>
      ${statusOptions}
    </select>
  </label>
  <label>
    Priority
    <select id="filter-priority">
      <option value="">All priorities</option>
      ${priorityOptions}
    </select>
  </label>
  <label>
    Effort
    <select id="filter-effort">
      <option value="">All efforts</option>
      ${effortOptions}
    </select>
  </label>
  <label>
    Zone
    <select id="filter-zone">
      <option value="">All zones</option>
      ${zoneOptions}
    </select>
  </label>
  <label>
    Lab
    <select id="filter-lab">
      <option value="">All items</option>
      <option value="researched">Researched (${researchedCount})</option>
      <option value="unresearched">Unresearched (${unresearchedCount})</option>
    </select>
  </label>
  <label class="checkbox-field">
    <input type="checkbox" id="group-by-zone">
    Group by zone
  </label>
  <label class="search-field">
    Search title &amp; idea
    <input type="search" id="filter-search" placeholder="e.g. sandbox, domain, quiz&hellip;">
  </label>
</div>

<p class="result-count" id="result-count"></p>

<main>
  <div class="cards" id="card-list">
    ${items.map((item) => renderCard(item, originalLabs)).join('\n')}
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
  Source: <code>backlog/*.md</code> &amp; <code>backlog/labs/*.md</code> &middot; Regenerate with <code>npm run backlog:board</code> &middot; Each card links to its <code>lab/NNNN.html</code> detail page.
</footer>

<script>
(function () {
  var statusSelect = document.getElementById('filter-status');
  var prioritySelect = document.getElementById('filter-priority');
  var effortSelect = document.getElementById('filter-effort');
  var zoneSelect = document.getElementById('filter-zone');
  var labSelect = document.getElementById('filter-lab');
  var searchInput = document.getElementById('filter-search');
  var groupToggle = document.getElementById('group-by-zone');
  var cardList = document.getElementById('card-list');
  var cards = Array.prototype.slice.call(cardList.querySelectorAll('.card'));
  var originalOrder = cards.slice();
  var resultCount = document.getElementById('result-count');

  var ZONE_ORDER = ['A', 'B', 'C', 'D', 'E', 'none'];
  var ZONE_GROUP_LABELS = {
    A: 'Zone A — Extend the map',
    B: 'Zone B — Off the map',
    C: 'Zone C — New territories',
    D: 'Zone D — Instruments',
    E: 'Zone E — Technical improvement',
    none: 'No zone assigned'
  };

  function applyFilters() {
    var status = statusSelect.value;
    var priority = prioritySelect.value;
    var effort = effortSelect.value;
    var zone = zoneSelect.value;
    var lab = labSelect.value;
    var query = searchInput.value.trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var matches =
        (!status || card.dataset.status === status) &&
        (!priority || card.dataset.priority === priority) &&
        (!effort || card.dataset.effort === effort) &&
        (!zone || card.dataset.zone === zone) &&
        (!lab || card.dataset.lab === lab) &&
        (!query || card.dataset.search.indexOf(query) !== -1);
      card.hidden = !matches;
      if (matches) visible++;
    });

    resultCount.textContent = visible + ' of ' + cards.length + ' task' + (cards.length === 1 ? '' : 's') + ' shown';
  }

  function applyGrouping() {
    Array.prototype.slice.call(cardList.querySelectorAll('.zone-group-title')).forEach(function (el) {
      el.remove();
    });
    if (!groupToggle.checked) {
      originalOrder.forEach(function (c) { cardList.appendChild(c); });
      return;
    }
    ZONE_ORDER.forEach(function (zone) {
      var group = originalOrder.filter(function (c) { return (c.dataset.zone || 'none') === zone; });
      if (!group.length) return;
      var header = document.createElement('div');
      header.className = 'zone-group-title';
      header.textContent = ZONE_GROUP_LABELS[zone] + ' (' + group.length + ')';
      cardList.appendChild(header);
      group.forEach(function (c) { cardList.appendChild(c); });
    });
  }

  statusSelect.addEventListener('change', applyFilters);
  prioritySelect.addEventListener('change', applyFilters);
  effortSelect.addEventListener('change', applyFilters);
  zoneSelect.addEventListener('change', applyFilters);
  labSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);
  groupToggle.addEventListener('change', applyGrouping);

  document.querySelectorAll('.card-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!expanded));
      var body = header.parentElement.querySelector('.card-body');
      body.classList.toggle('open', !expanded);
    });
  });

  applyFilters();
  applyGrouping();
})();
</script>
<script>${THEME_TOGGLE_SCRIPT}</script>
</body>
</html>
`;

  return html;
}
