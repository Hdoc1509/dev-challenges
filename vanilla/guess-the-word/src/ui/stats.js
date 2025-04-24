import { getElementBySelector } from "@lib/dom";
import { $statsTabContent } from "./menu";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty | typeof STATS_CATEGORY_TOTAL} StatsCategory */

/** @typedef StatsCategoryElements
 * @property {HTMLDivElement} $track
 * @property {HTMLSpanElement} $current
 * @property {HTMLSpanElement} $total
 */

export const STATS_CATEGORY_TOTAL = "total";

/** @param {StatsCategory} category */
const getCategoryElements = (category) => {
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
};

/** @type {Map<StatsCategory, StatsCategoryElements>} */
const Elements = new Map([]);

/** @param {StatsCategory} category
 * @param {number} count */
export function renderStats(category, count) {
  let $elements = Elements.get(category);
  const total =
    category === STATS_CATEGORY_TOTAL
      ? TOTAL_WORDS.ALL
      : TOTAL_WORDS[DIFFICULTY_GROUP[category]];

  if ($elements == null) {
    $elements = getCategoryElements(category);
    Elements.set(category, $elements);
  }

  console.log("renderStats", { category, count, total });
}
