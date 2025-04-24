import { getCategoryElements } from "./category-elements";
/** @typedef {import("@/consts/stats").StatsCategory} Category */

/** @type {Map<Category, import("./category-elements").StatsCategoryElements>} */
const Elements = new Map([]);

const CSS_VARIABLE = Object.freeze({
  PROGRESS_TRACK_WIDTH: "--progress-track-width",
});

/** @param {{ category: Category, count: number, total: number }} params */
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
