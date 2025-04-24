import { getElementBySelector } from "@lib/dom";
import { $statsTabContent } from "../menu";

/** @param {Object} params
 * @param {import("@/consts/stats").StatsCategory} params.category
 * @param {number} params.total */
export function renderStatsTotal({ category, total }) {
  const $stats = getElementBySelector(
    `:scope > .progress[data-stats="${category}"]`,
    HTMLDivElement,
    $statsTabContent,
  );
  const $total = getElementBySelector(
    ":scope > .progress__description > .progress__count > .progress__total",
    HTMLSpanElement,
    $stats,
  );

  $total.textContent = `${total}`;
}
