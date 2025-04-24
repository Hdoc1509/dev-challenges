import { getElementBySelector } from "@lib/dom";
import { $statsTabContent } from "../menu";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

/** @param {import("@/consts/stats").StatsCategory} category */
export function renderStatsTotal(category) {
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
  const totalCount =
    category === STATS_CATEGORY_TOTAL
      ? TOTAL_WORDS.ALL
      : TOTAL_WORDS[DIFFICULTY_GROUP[category]];

  $total.textContent = `${totalCount}`;
}
