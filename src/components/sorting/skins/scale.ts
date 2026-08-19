/**
 * Value -> height percentage for magnitude skins (Bars, Book spines, People).
 * Reserves a little headroom so the tallest item never touches the ceiling.
 * Moved verbatim from BarChart.vue rather than re-derived, so Phase-0 parity
 * holds exactly.
 */
export function barHeightPercent(value: number, maxValue: number): string {
  return `${(value / maxValue) * 98 + 2}%`;
}
