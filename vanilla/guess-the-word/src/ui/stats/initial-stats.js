import { AvailableWords } from "@/state/words";
import { discoveredWords } from "@/state/discovered-words";
import {
  hasInitialStatsInitialized,
  setHasInitialStatsInitialized,
} from "@/state/stats";
import { DIFFICULTY, DIFFICULTY_GROUP } from "@/consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";

export async function renderInitialStats() {
  if (hasInitialStatsInitialized) return;

  const difficulties = Object.values(DIFFICULTY);

  const { renderCurrentStats } = await import("./current");

  setHasInitialStatsInitialized(true);

  renderCurrentStats({
    category: STATS_CATEGORY_TOTAL,
    count: discoveredWords.size,
    total: TOTAL_WORDS.ALL,
  });
  difficulties.forEach((difficulty) => {
    const availableWords = AvailableWords.get(difficulty)?.size;
    const total = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];
    let count = availableWords == null ? 0 : total - availableWords;

    renderCurrentStats({ category: difficulty, count, total });
  });
}
