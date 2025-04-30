import { getCategoryElements } from "./category-elements";

/** @type {Map<import("@/consts/stats").StatsCategory, import("./category-elements").StatsCategoryElements>} */
const Elements = new Map([]);

const CSS_VARIABLE = Object.freeze({
  PROGRESS_TRACK_WIDTH: "--progress-track-width",
});

/** @param {Object} params
 * @param {import("@/consts/stats").StatsCategory} params.category
 * @param {number} params.count
 * @param {number} params.total */
export function renderCurrentStats({ category, count, total }) {
  let $elements = Elements.get(category);
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
