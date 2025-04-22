import { loadSavedWords } from "./services/saved-words/load";
import { difficulty } from "./state/difficulty";
import { removeWord } from "./state/words";
import { setupEventListeners } from "./events/listeners/setup";
import { generateRandomWord } from "./events/handlers/random-word";
import { applyDifficulty } from "./utils/difficulty/apply";
import { getDifficultyGroupOfWord } from "./utils/difficulty/of-word";
import { renderDefinitionsCount } from "./ui/definition/count";
import { DefinitionPages } from "./ui/definition/pages";
import { $word } from "./ui/word";
import { $typing } from "./ui/typing";
import { addSpinner, removeSpinner } from "./ui/spinner";
import { DIFFICULTIES_ALL } from "./consts/difficulty";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

(async () => {
  // data initialization
  addSpinner($word, $typing);
  const discoveredWords = await loadSavedWords();
  for (const [word, difficulties] of discoveredWords) {
    if (difficulties === DIFFICULTIES_ALL)
      await removeWord(word, {
        difficultyGroup: getDifficultyGroupOfWord(word),
      });
  }
  await applyDifficulty(difficulty);
  removeSpinner($word, $typing);
  // TODO: disable $randomButton when there are no available words
  // - use an early return in generateRandomWord()
  // - also do this after handleGameSuccess() if needed
  generateRandomWord();
  renderDefinitionsCount(discoveredWords.size);
  DefinitionPages.setItems(Array.from(discoveredWords.keys()).reverse());

  setupEventListeners();
})();
