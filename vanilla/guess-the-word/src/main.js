import { loadSavedWords } from "./services/saved-words/load";
import { difficulty } from "./state/difficulty";
import { discoveredWords } from "./state/discovered-words";
import { AvailableWords, removeAvailableWord, words } from "./state/words";
import { setupEventListeners } from "./events/listeners/setup";
import { generateRandomWord } from "./events/handlers/random-word";
import { applyDifficulty } from "./utils/difficulty/apply";
import { handleDifficultyComplete } from "./events/handlers/difficulty-complete";
import { DefinitionPages } from "./ui/definition/pages";
import { $word } from "./ui/word";
import { $typing } from "./ui/typing";
import { renderCurrentStats } from "./ui/stats/current";
import { renderStatsTotal } from "./ui/stats/total";
import { addSpinner, removeSpinner } from "./ui/spinner";
import { TOTAL_WORDS } from "./consts/words/total";
import { DIFFICULTY, DIFFICULTY_GROUP } from "./consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "./consts/stats";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

// TODO: split logic into:
// - initialization
//   - data
//   - ui
(async () => {
  // data initialization
  addSpinner($word, $typing);
  await loadSavedWords(async ({ word, difficulties }) => {
    for (const difficulty of difficulties)
      await removeAvailableWord(word, { difficulty });
  });
  await applyDifficulty(difficulty);
  removeSpinner($word, $typing);

  if (words.length === 0) handleDifficultyComplete();
  else generateRandomWord();
  renderCurrentStats({
    category: STATS_CATEGORY_TOTAL,
    count: discoveredWords.size,
    total: TOTAL_WORDS.ALL,
  });
  renderStatsTotal({ category: STATS_CATEGORY_TOTAL, total: TOTAL_WORDS.ALL });
  Object.values(DIFFICULTY).forEach((difficulty) => {
    const availableWords = AvailableWords.get(difficulty)?.size;
    const total = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];
    let count = availableWords == null ? 0 : total - availableWords;

    renderCurrentStats({ category: difficulty, count, total });
    renderStatsTotal({ category: difficulty, total });
  });
  DefinitionPages.setItems(Array.from(discoveredWords.keys()).reverse());

  setupEventListeners();
})();
