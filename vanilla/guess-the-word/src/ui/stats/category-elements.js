import { getElementBySelector } from "@lib/dom";
import { $statsTabContent } from "../menu";

// TODO: remove $total property from StatsCategoryElements

/** @typedef StatsCategoryElements
 * @property {HTMLDivElement} $track
 * @property {HTMLSpanElement} $current
 * @property {HTMLSpanElement} $total
 */

/** @param {import("@/consts/stats").StatsCategory} category
 * @returns {StatsCategoryElements} */
export function getCategoryElements(category) {
  const $stats = getElementBySelector(
    `:scope > .progress[data-stats="${category}"]`,
    HTMLDivElement,
    $statsTabContent,
  );
  const $track = getElementBySelector(
    ":scope > .progress__track",
    HTMLDivElement,
    $stats,
  );
  const $current = getElementBySelector(
    ":scope .progress__current",
    HTMLSpanElement,
    $stats,
  );
  const $total = getElementBySelector(
    ":scope .progress__total",
    HTMLSpanElement,
    $stats,
  );

  return { $track, $current, $total };
}
