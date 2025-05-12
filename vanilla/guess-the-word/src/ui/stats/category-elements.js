import { getElementBySelector } from "@lib/dom";
import { $statsTabContent } from "../menu";

/** @typedef StatsCategoryElements
 * @property {HTMLDivElement} $track
 * @property {HTMLDivElement} $current */

/** @type {Map<import("@/consts/stats").StatsCategory, StatsCategoryElements>} */
const Elements = new Map([]);

/** @param {import("@/consts/stats").StatsCategory} category
 * @returns {StatsCategoryElements} */
export function getCategoryElements(category) {
  const $elements = Elements.get(category);

  if ($elements != null) return $elements;

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

  Elements.set(category, { $track, $current });
  return { $track, $current };
}
