import { AvailableWords } from "@/state/words";
import { discoveredWords } from "@/state/discovered-words";
import {
  hasInitialStatsInitialized,
  setHasInitialStatsInitialized,
} from "@/state/stats";
import { getCategoryElements } from "./category-elements";
import { renderStatsTotal } from "./total";
import { addSpinner, removeSpinner } from "@/ui/spinner";
import { DIFFICULTY, DIFFICULTY_GROUP } from "@/consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";

export async function renderInitialStats() {
  if (hasInitialStatsInitialized) return;

  const difficulties = Object.values(DIFFICULTY);
  const categories = /** @type {const} */ ([
    STATS_CATEGORY_TOTAL,
    ...difficulties,
  ]);

  categories.forEach((category) => {
    const $current = getCategoryElements(category).$current;
    const $count = /** @type {HTMLSpanElement} */ (
      $current.closest(".progress__count")
    );
    const $description = /** @type {HTMLParagraphElement} */ (
      $current.closest(".progress__description")
    );

    $count.setAttribute("data-loading", "");
    addSpinner($description);
  });

  const { renderCurrentStats } = await import("./current");

  setHasInitialStatsInitialized(true);
  renderCurrentStats({
    category: STATS_CATEGORY_TOTAL,
    count: discoveredWords.size,
    total: TOTAL_WORDS.ALL,
  });
  renderStatsTotal({
    category: STATS_CATEGORY_TOTAL,
    total: TOTAL_WORDS.ALL,
  });

  difficulties.forEach((difficulty) => {
    const availableWords = AvailableWords.get(difficulty)?.size;
    const total = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];
    let count = availableWords == null ? 0 : total - availableWords;

    renderCurrentStats({ category: difficulty, count, total });
    renderStatsTotal({ category: difficulty, total });
  });

  categories.forEach((category) => {
    const $current = getCategoryElements(category).$current;
    const $count = /** @type {HTMLSpanElement} */ (
      $current.closest(".progress__count")
    );
    const $description = /** @type {HTMLParagraphElement} */ (
      $current.closest(".progress__description")
    );

    $count.removeAttribute("data-loading");
    removeSpinner($description);
  });
}
