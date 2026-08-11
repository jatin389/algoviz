// backlog/lib/components.mjs
//
// Small, pure string-returning HTML building blocks shared by both page
// types (board + lab). Nothing here does I/O or knows about the overall
// page shell — see render-board.mjs / render-lab.mjs for that.

import {
  STATUS_LABELS,
  ZONE_LABELS,
  LAB_STATUS_LABELS,
} from './derive.mjs';

// ---------------------------------------------------------------------------
// Escaping
// ---------------------------------------------------------------------------

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Label lookups
// ---------------------------------------------------------------------------

export function statusLabel(status) {
  return STATUS_LABELS[status] ?? status;
}

const EFFORT_LABELS = { S: 'Small', M: 'Medium', L: 'Large' };
export function effortLabel(effort) {
  return EFFORT_LABELS[effort] ?? effort;
}

export function zoneLabel(zone) {
  return ZONE_LABELS[zone] ?? '';
}

export function labStatusLabel(status) {
  return LAB_STATUS_LABELS[status] ?? status;
}

// ---------------------------------------------------------------------------
// Pills / badges / effort bars
// ---------------------------------------------------------------------------

/** A rounded, filled pill — used for status and lab-status. `modifierClass` is escaped for you. */
export function pill(text, modifierClass) {
  return `<span class="pill ${escapeHtml(modifierClass)}">${escapeHtml(text)}</span>`;
}

/** An outlined badge — used for priority and effort. `innerHtml` is caller-escaped (may embed effortBars()). */
export function badge(innerHtml, modifierClass, title) {
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
  return `<span class="badge ${escapeHtml(modifierClass)}"${titleAttr}>${innerHtml}</span>`;
}

/** Tiny 3-bar "signal strength" cue: fills 1/2/3 bars for S/M/L. */
export function effortBars(effort) {
  const filled = { S: 1, M: 2, L: 3 }[effort] ?? 0;
  let bars = '';
  for (let i = 1; i <= 3; i++) {
    bars += `<span class="effort-bar${i <= filled ? ' filled' : ''}"></span>`;
  }
  return `<span class="effort-bars" aria-hidden="true">${bars}</span>`;
}

/** Full priority badge, or '' if the item has no priority. */
export function priorityBadge(priority) {
  if (!priority) return '';
  return badge(escapeHtml(priority), `priority-${priority}`);
}

/** Full effort badge (bars + letter), or '' if the item has no effort. */
export function effortBadge(effort) {
  if (!effort) return '';
  return badge(`${effortBars(effort)}${escapeHtml(effort)}`, `effort-${effort}`, `${effortLabel(effort)} effort`);
}

/** Status pill. */
export function statusPill(status) {
  return pill(statusLabel(status), `status-${status || 'unknown'}`);
}

/** Lab status pill. */
export function labStatusPill(status) {
  return pill(labStatusLabel(status), `lab-status-${status || 'unresearched'}`);
}

/** Zone chip: letter + label, or '' if the item has no zone assigned. */
export function zoneChip(zone) {
  if (!zone) return '';
  const label = zoneLabel(zone);
  const title = label ? `Zone ${zone} — ${label}` : `Zone ${zone}`;
  return `<span class="chip zone-chip zone-${escapeHtml(zone)}" title="${escapeHtml(title)}">${escapeHtml(zone)}${
    label ? ` &middot; ${escapeHtml(label)}` : ''
  }</span>`;
}

/** Small "unblocks N" marker, shown when leverage > 0. */
export function leverageMarker(leverage) {
  if (!leverage) return '';
  return `<span class="chip leverage-marker" title="Unblocks ${leverage} other item${leverage === 1 ? '' : 's'} once researched">&#9650; unblocks ${leverage}</span>`;
}

/** Small "blocked" marker, shown when an item's dependency is unresearched. */
export function blockedMarker() {
  return `<span class="chip blocked-marker" title="Depends on an item with no lab yet">&#9888; blocked</span>`;
}

// ---------------------------------------------------------------------------
// Stat cards / meters
// ---------------------------------------------------------------------------

export function statCard(count, label) {
  return `
        <div class="stat">
          <span class="stat-count">${escapeHtml(String(count))}</span>
          <span class="stat-label">${escapeHtml(label)}</span>
        </div>`;
}

/** A small horizontal completeness/progress meter, e.g. "3/6". */
export function meter(value, max, ariaLabel) {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.max(0, Math.min(100, (value / safeMax) * 100));
  return `<span class="meter" role="img" aria-label="${escapeHtml(ariaLabel ?? `${value} of ${max}`)}">
      <span class="meter-track"><span class="meter-fill" style="width:${pct}%"></span></span>
      <span class="meter-label">${escapeHtml(String(value))}/${escapeHtml(String(max))}</span>
    </span>`;
}

// ---------------------------------------------------------------------------
// Link helpers
// ---------------------------------------------------------------------------

/** Link from board.html down to a lab page. */
export function boardToLabLink(id, text) {
  return `<a class="lab-link" href="lab/${escapeHtml(id)}.html">${escapeHtml(text)}</a>`;
}

/**
 * Link from board.html to a hand-authored Feature Lab in original_labs/, when
 * one exists. These are written by the `lab-creator` skill rather than by this
 * generator, so the filename is discovered on disk, not derived.
 */
export function boardToOriginalLabLink(fileName, text = 'Feature Lab &rarr;') {
  return `<a class="lab-link original-lab-link" href="original_labs/${escapeHtml(fileName)}">${text}</a>`;
}

/** Link from a lab page back up to the board. */
export function labToBoardLink(text = 'Back to board') {
  return `<a class="back-link" href="../board.html">${escapeHtml(text)}</a>`;
}

/** Link from a lab page to a sibling lab page. */
export function labToLabLink(id, text) {
  return `<a href="${escapeHtml(id)}.html">${escapeHtml(text)}</a>`;
}

// ---------------------------------------------------------------------------
// Markdown-subset renderer (headings, bold, inline code, fenced code blocks,
// tables, lists, paragraphs). Everything is escaped before formatting marks
// are applied, so raw `<script>`-shaped source text can never reach the page
// unescaped.
// ---------------------------------------------------------------------------

export function renderInline(rawLine) {
  return escapeHtml(rawLine)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+?)`/g, '<code>$1</code>');
}

function isTableRow(line) {
  return /^\s*\|.*\|\s*$/.test(line);
}

function isTableSeparatorRow(line) {
  return /^\s*\|[\s:|-]+\|\s*$/.test(line) && /-/.test(line);
}

function splitTableCells(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function renderTable(lines) {
  const rows = lines.filter((line) => !isTableSeparatorRow(line)).map(splitTableCells);
  if (rows.length === 0) return '';
  const [headerRow, ...bodyRows] = rows;
  const thead = `<thead><tr>${headerRow.map((cell) => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`;
  const tbody = bodyRows.length
    ? `<tbody>${bodyRows
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
        .join('')}</tbody>`
    : '';
  return `<div class="table-scroll"><table class="md-table">${thead}${tbody}</table></div>`;
}

/**
 * Render a simple markdown subset to HTML: `#`-headings, **bold**, `code`,
 * fenced ``` code blocks, `-`/`*`/`1.` lists, `|`-tables (wrapped for
 * horizontal scroll), and blank-line-separated paragraphs. Not a general
 * markdown parser — good enough for the lab body sections, which are
 * hand-written prose, not arbitrary markdown.
 */
export function renderMarkdownSubset(text) {
  if (!text || !text.trim()) return '';
  const lines = text.split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced code block.
    if (/^\s*```/.test(line)) {
      const codeLines = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(`<pre class="md-code"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    // Heading.
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length + 2, 6); // keep below page <h1>/<h2>
      blocks.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Table.
    if (isTableRow(line)) {
      const tableLines = [];
      while (i < lines.length && isTableRow(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      blocks.push(renderTable(tableLines));
      continue;
    }

    // Unordered list.
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(renderInline(lines[i].replace(/^\s*[-*]\s+/, '')));
        i++;
      }
      blocks.push(`<ul>${items.map((it) => `<li>${it}</li>`).join('')}</ul>`);
      continue;
    }

    // Ordered list.
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(renderInline(lines[i].replace(/^\s*\d+\.\s+/, '')));
        i++;
      }
      blocks.push(`<ol>${items.map((it) => `<li>${it}</li>`).join('')}</ol>`);
      continue;
    }

    // Paragraph: consecutive non-blank, non-special lines.
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^\s*```/.test(lines[i]) &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !isTableRow(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(`<p>${paraLines.map(renderInline).join('<br>')}</p>`);
  }

  return blocks.join('\n');
}

// ---------------------------------------------------------------------------
// Lab structure components
//
// These render structure that already exists in lab markdown but was
// previously flattened into uniform prose by the generic markdown renderer.
// Each one takes the output of a lib/sections.mjs parser and returns null when
// it can't confidently render — the caller then falls back to the generic
// renderer, so a lab written in a different style degrades instead of breaking.
// ---------------------------------------------------------------------------

/**
 * Constraint cards. A constraint is a fact plus its consequence; that split is
 * the whole value of the section, so the consequence gets its own treatment
 * rather than trailing the prose as another sentence.
 */
export function constraintCards(entries) {
  if (!Array.isArray(entries) || entries.length === 0) return null;
  const cards = entries
    .map(
      (entry) => `
      <li class="constraint-card">
        <p class="constraint-lead">${renderInline(entry.lead)}</p>
        ${entry.body ? `<p class="constraint-body">${renderInline(entry.body)}</p>` : ''}
        <p class="constraint-consequence"><strong>Consequence:</strong> ${renderInline(entry.consequence)}</p>
      </li>`,
    )
    .join('');
  return `<ol class="constraint-list">${cards}\n    </ol>`;
}

/**
 * Phase tape. The Gate column states "don't proceed until this is true" and is
 * the most decision-relevant field in a lab, so it is emphasised rather than
 * left as a third table cell. Returns null when the table has no Gate column,
 * which is the signal to render it as an ordinary table instead.
 */
export function phaseTape(table) {
  if (!table || !Array.isArray(table.headers) || !Array.isArray(table.rows)) return null;
  if (table.rows.length === 0) return null;

  const gateIdx = table.headers.findIndex((h) => /gate/i.test(h));
  if (gateIdx === -1) return null;
  const numIdx = table.headers.findIndex((h) => /^(#|no\.?|phase)$/i.test(String(h).trim()));
  const descIdx = table.headers.findIndex((_, i) => i !== gateIdx && i !== numIdx);
  if (descIdx === -1) return null;

  const steps = table.rows
    .map((row, i) => {
      const num = (numIdx >= 0 ? row[numIdx] : '') || String(i);
      const desc = row[descIdx] ?? '';
      const gate = row[gateIdx] ?? '';
      return `
      <li class="phase-step">
        <span class="phase-num">${renderInline(num)}</span>
        <div class="phase-deliverable">${renderInline(desc)}</div>
        ${gate ? `<div class="phase-gate"><span class="phase-gate-label">Gate</span> ${renderInline(gate)}</div>` : ''}
      </li>`;
    })
    .join('');
  return `<ol class="phase-tape">${steps}\n    </ol>`;
}

/**
 * Dependency graph: depends-on on the left, this item in the middle, unblocks
 * on the right, cluster siblings underneath. CSS/DOM rather than SVG so it
 * stays token-driven, reflows on narrow screens, and is made of real links
 * with real text.
 */
export function dependencyGraph(item, itemsById) {
  const node = (id, modifier = '') => {
    const target = itemsById.get(id);
    if (!target) {
      return `<div class="dep-node${modifier}"><span class="dep-node-id">${escapeHtml(id)}</span> <span class="muted">(not found)</span></div>`;
    }
    const title = modifier.includes('is-self')
      ? `<span class="dep-node-title">${escapeHtml(target.title)}</span>`
      : `<a class="dep-node-title" href="${escapeHtml(target.id)}.html">${escapeHtml(target.title)}</a>`;
    return `<div class="dep-node${modifier}">
          <span class="dep-node-id">${escapeHtml(target.id)}</span>
          ${title}
          ${labStatusPill(target.labStatus)}
        </div>`;
  };

  const column = (label, ids, emptyText) => `
      <div class="dep-col">
        <span class="dep-col-label">${escapeHtml(label)}</span>
        ${ids.length ? ids.map((id) => node(id)).join('') : `<p class="muted">${escapeHtml(emptyText)}</p>`}
      </div>`;

  const siblings = item.clusterSiblings ?? [];
  const siblingsHtml = siblings.length
    ? `
    <div class="cluster-siblings">
      <span class="dep-col-label">Shares the <code>${escapeHtml(item.cluster)}</code> substrate with</span>
      ${siblings.map((id) => node(id)).join('')}
    </div>`
    : '';

  return `
    <div class="dep-graph">
      ${column('Depends on', item.dependsOn, 'Nothing — this can start on its own.')}
      <span class="dep-arrow" aria-hidden="true">&rarr;</span>
      <div class="dep-col">
        <span class="dep-col-label">This item</span>
        ${node(item.id, ' is-self')}
      </div>
      <span class="dep-arrow" aria-hidden="true">&rarr;</span>
      ${column('Unblocks', item.unblocks, 'Nothing else is waiting on this.')}
    </div>${siblingsHtml}`;
}

// ---------------------------------------------------------------------------
// Theme toggle
//
// Nothing sets data-theme on a file:// page, so without this the explicit
// override half of the theme layer would be unreachable. THEME_INIT_SCRIPT
// must run in <head>, before first paint, or a stored dark preference flashes
// light on every load.
// ---------------------------------------------------------------------------

export const THEME_STORAGE_KEY = 'algoviz-backlog-theme';

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export function themeToggle() {
  return `<button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false" title="Toggle light / dark theme">
    <span class="theme-toggle-icon" aria-hidden="true"></span>
    <span class="theme-toggle-text">Theme</span>
  </button>`;
}

export const THEME_TOGGLE_SCRIPT = `(function(){
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  function current() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function sync() {
    var mode = current();
    btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    btn.title = mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('${THEME_STORAGE_KEY}', next); } catch (e) {}
    sync();
  });
  sync();
})();`;

/**
 * Mechanism flow diagram: how something works today, beside how it works with
 * the proposed change. Side by side rather than toggled — a lab is a reference
 * document, and a toggle would hide half the comparison behind a click.
 *
 * Node text keeps its inline markdown (backticks especially) and goes through
 * renderInline; `emphasis` has already had its `**` stripped by the parser, so
 * the two never double up.
 */
export function flowDiagram(flows) {
  if (!flows || !Array.isArray(flows.rows) || flows.rows.length === 0) return null;

  const renderFlow = (flow) => {
    if (!flow || !Array.isArray(flow.nodes) || flow.nodes.length === 0) return '';
    const parts = [];
    flow.nodes.forEach((node, i) => {
      const emphasis = node.emphasis ? ' is-emphasis' : '';
      parts.push(`<span class="flow-node${emphasis}">${renderInline(node.text)}</span>`);
      const connector = flow.connectors?.[i];
      if (connector) {
        const cut = connector === 'cut';
        parts.push(
          `<span class="flow-connector${cut ? ' is-cut' : ''}"${cut ? ' title="This hop is not possible"' : ''}>${
            cut ? '&#10007;' : '&rarr;'
          }</span>`,
        );
      }
    });
    return `<div class="flow-cell">${parts.join('')}</div>`;
  };

  const [, leftHead, rightHead] = flows.headers;
  const rows = flows.rows
    .map(
      (row) => `
      <div class="flow-row">
        <span class="flow-row-label">${renderInline(row.label)}</span>
        ${renderFlow(row.flows[0])}
        ${renderFlow(row.flows[1])}
      </div>`,
    )
    .join('');

  return `
    <div class="flow-table">
      <div class="flow-head">
        <span class="flow-col-head"></span>
        <span class="flow-col-head">${renderInline(leftHead ?? 'Today')}</span>
        <span class="flow-col-head">${renderInline(rightHead ?? 'Proposed')}</span>
      </div>${rows}
    </div>`;
}
