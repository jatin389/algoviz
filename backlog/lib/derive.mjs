// backlog/lib/derive.mjs
//
// Pure computation over parsed tasks + labs: graph inversion (unblocks),
// leverage, completeness, blocked, counts, and display sort order. No I/O,
// no HTML — everything here takes plain data in and returns plain data out.

export const PRIORITY_ORDER = ['P0', 'P1', 'P2', 'P3'];

export const STATUS_LABELS = {
  ready: 'Ready',
  inbox: 'Inbox',
  'in-progress': 'In Progress',
  done: 'Done',
  dropped: 'Dropped',
};
export const STATUS_ORDER = ['ready', 'in-progress', 'inbox', 'done', 'dropped'];

export const EFFORT_ORDER = ['S', 'M', 'L'];

// Display names for the zones documented today. The list is deliberately NOT a
// whitelist: zones are open-ended and a later research pass can introduce E, F,
// … so an unrecognised letter must still reach the board rather than being
// filtered out of existence. ZONE_ORDER only fixes the *display order* of the
// known letters; unknown ones sort after them (see presentZones below).
export const ZONE_ORDER = ['A', 'B', 'C', 'D'];
export const ZONE_LABELS = {
  A: 'Extend the map',
  B: 'Off the map',
  C: 'New territories',
  D: 'Instruments',
};

/** Known zones first in canonical order, then any undocumented letters, sorted. */
function orderZones(zones) {
  const known = ZONE_ORDER.filter((z) => zones.includes(z));
  const unknown = zones.filter((z) => !ZONE_ORDER.includes(z)).sort();
  return [...known, ...unknown];
}

export const LAB_STATUS_ORDER = ['unresearched', 'researching', 'planned'];
export const LAB_STATUS_LABELS = {
  unresearched: 'Unresearched',
  researching: 'Researching',
  planned: 'Planned',
};

// The lab sections whose non-emptiness makes up `completeness`. Exported as a
// count so no renderer has to hardcode the denominator — adding a section here
// moves every meter in one edit.
export const LAB_SECTION_KEYS = [
  'verdict',
  'constraints',
  'flows',
  'architecture',
  'phases',
  'risks',
  'outOfScope',
];

export const LAB_SECTION_COUNT = LAB_SECTION_KEYS.length;

function priorityRank(priority) {
  const idx = PRIORITY_ORDER.indexOf(priority);
  return idx === -1 ? PRIORITY_ORDER.length : idx;
}

function statusRank(status) {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? STATUS_ORDER.length : idx;
}

/**
 * Merge parsed tasks with parsed labs and compute every derived field:
 * unblocks (inverse of depends_on), leverage (unblocks.length),
 * completeness (non-empty lab sections, see LAB_SECTION_COUNT), blocked (any depends_on
 * target is itself unresearched), plus counts/present-option lists and the
 * default display sort order.
 *
 * Guards against dangling/self-referencing depends_on ids and never throws.
 */
export function buildIndex(tasks, labs) {
  const labsById = new Map();
  for (const lab of labs) {
    if (!lab.id) continue;
    labsById.set(lab.id, lab);
  }

  const taskIds = new Set(tasks.map((t) => t.id));

  const items = tasks.map((task) => {
    const lab = labsById.get(task.id) ?? null;
    const labStatus = lab?.labStatus || 'unresearched';
    const completeness = lab
      ? LAB_SECTION_KEYS.reduce((n, key) => n + (lab[key] && lab[key].trim() ? 1 : 0), 0)
      : 0;
    // Drop dangling ids (no matching task) and self-references defensively —
    // depends_on is hand-maintained prose-adjacent data, not guaranteed clean.
    const dependsOn = (task.dependsOn ?? []).filter(
      (depId) => depId && depId !== task.id && taskIds.has(depId),
    );
    return {
      ...task,
      dependsOn,
      zoneLabel: ZONE_LABELS[task.zone] ?? '',
      lab,
      labStatus,
      completeness,
      unblocks: [],
      leverage: 0,
      blocked: false,
      clusterSiblings: [],
    };
  });

  const itemsById = new Map(items.map((item) => [item.id, item]));

  // Graph inversion: unblocks is the inverse of every other item's depends_on.
  for (const item of items) {
    for (const depId of item.dependsOn) {
      const dep = itemsById.get(depId);
      if (dep) dep.unblocks.push(item.id);
    }
  }
  for (const item of items) {
    item.leverage = item.unblocks.length;
  }

  // Cluster siblings: the other items sharing this item's `cluster` slug.
  // Derived here rather than in a renderer so the dependency view can show the
  // whole neighbourhood — hard prerequisites *and* shared-substrate relatives —
  // without a second pass over every item.
  const byCluster = new Map();
  for (const item of items) {
    if (!item.cluster) continue;
    const bucket = byCluster.get(item.cluster);
    if (bucket) bucket.push(item.id);
    else byCluster.set(item.cluster, [item.id]);
  }
  for (const item of items) {
    item.clusterSiblings = item.cluster
      ? (byCluster.get(item.cluster) ?? []).filter((id) => id !== item.id)
      : [];
  }

  // blocked: true if any depends_on target is itself unresearched.
  for (const item of items) {
    item.blocked = item.dependsOn.some((depId) => {
      const dep = itemsById.get(depId);
      return dep ? dep.labStatus === 'unresearched' : false;
    });
  }

  // Counts, computed from the actual parsed data (not hardcoded).
  const statusCounts = {};
  const priorityCounts = {};
  const effortCounts = {};
  const zoneCounts = {};
  const labStatusCounts = {};
  for (const item of items) {
    statusCounts[item.status] = (statusCounts[item.status] ?? 0) + 1;
    if (item.priority) priorityCounts[item.priority] = (priorityCounts[item.priority] ?? 0) + 1;
    if (item.effort) effortCounts[item.effort] = (effortCounts[item.effort] ?? 0) + 1;
    if (item.zone) zoneCounts[item.zone] = (zoneCounts[item.zone] ?? 0) + 1;
    labStatusCounts[item.labStatus] = (labStatusCounts[item.labStatus] ?? 0) + 1;
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

  const presentPriorities = PRIORITY_ORDER.filter((p) => priorityCounts[p]);
  const presentEfforts = EFFORT_ORDER.filter((e) => effortCounts[e]);
  const presentZones = orderZones(Object.keys(zoneCounts));
  const presentLabStatuses = Object.keys(labStatusCounts).sort((a, b) => {
    const rankA = LAB_STATUS_ORDER.indexOf(a);
    const rankB = LAB_STATUS_ORDER.indexOf(b);
    if (rankA === -1 && rankB === -1) return a.localeCompare(b);
    if (rankA === -1) return 1;
    if (rankB === -1) return -1;
    return rankA - rankB;
  });

  // Default order: group by status (Ready, In Progress, Inbox, Done, ...),
  // and within each group sort by priority (P0 first), then by ID.
  const sortedItems = [...items].sort((a, b) => {
    const rankA = statusRank(a.status);
    const rankB = statusRank(b.status);
    if (rankA !== rankB) return rankA - rankB;
    const priorityDelta = priorityRank(a.priority) - priorityRank(b.priority);
    if (priorityDelta !== 0) return priorityDelta;
    return String(a.id).localeCompare(String(b.id));
  });

  return {
    items: sortedItems,
    itemsById,
    statusCounts,
    priorityCounts,
    effortCounts,
    zoneCounts,
    labStatusCounts,
    presentStatuses,
    presentPriorities,
    presentEfforts,
    presentZones,
    presentLabStatuses,
  };
}
