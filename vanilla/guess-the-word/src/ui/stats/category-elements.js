import { getElementBySelector } from "@lib/dom";
import { $statsTabContent } from "../menu";

// TODO: handle CateogryElements Map here

/** @typedef StatsCategoryElements
 * @property {HTMLDivElement} $track
 * @property {HTMLDivElement} $current */

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
    HTMLDivElement,
    $stats,
  );

  return { $track, $current };
}
