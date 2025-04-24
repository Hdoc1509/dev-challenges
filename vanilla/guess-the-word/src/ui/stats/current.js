import { getCategoryElements } from "./category-elements";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
/** @typedef {import("@/consts/stats").StatsCategory} Category */

/** @type {Map<Category, import("./category-elements").StatsCategoryElements>} */
const Elements = new Map([]);

const CSS_VARIABLE = Object.freeze({
  PROGRESS_TRACK_WIDTH: "--progress-track-width",
});

/** @param {Category} category
 * @param {number} count */
export function renderCurrentStats(category, count) {
  let $elements = Elements.get(category);
  const total =
    category === STATS_CATEGORY_TOTAL
      ? TOTAL_WORDS.ALL
      : TOTAL_WORDS[DIFFICULTY_GROUP[category]];
  const trackWidth = ((count / total) * 100).toFixed(8);

  if ($elements == null) {
    $elements = getCategoryElements(category);
    Elements.set(category, $elements);
  }

  $elements.$track.style.setProperty(
    CSS_VARIABLE.PROGRESS_TRACK_WIDTH,
    `${trackWidth}%`,
  );
  $elements.$current.textContent = `${count}`;
}
