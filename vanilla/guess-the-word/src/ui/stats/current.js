import { getCategoryElements } from "./category-elements";

const CSS_VARIABLE = Object.freeze({
  PROGRESS_TRACK_WIDTH: "--progress-track-width",
});

/** @param {Object} params
 * @param {import("@/consts/stats").StatsCategory} params.category
 * @param {number} params.count
 * @param {number} params.total */
export function renderCurrentStats({ category, count, total }) {
  const { $track, $current } = getCategoryElements(category);
  const trackWidth = ((count / total) * 100).toFixed(8);

  $track.style.setProperty(CSS_VARIABLE.PROGRESS_TRACK_WIDTH, `${trackWidth}%`);
  $current.textContent = `${count}`;
}
