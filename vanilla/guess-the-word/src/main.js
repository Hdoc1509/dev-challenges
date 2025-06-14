import { loadSavedWords } from "./services/saved-words/load";
import { difficulty } from "./state/difficulty";
import { discoveredWords } from "./state/discovered-words";
import { removeAvailableWord, words } from "./state/words";
import { setupEventListeners } from "./events/listeners/setup";
import { generateRandomWord } from "./events/handlers/random-word";
import { applyDifficulty } from "./utils/difficulty/apply";
import { DefinitionPages } from "./ui/definition/pages";
import { removeSpinner } from "./ui/spinner";
import { $triesContainer } from "./ui/tries";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

(async () => {
  // data initialization
  await loadSavedWords(async ({ word, difficulties }) => {
    for (const difficulty of difficulties)
      await removeAvailableWord(word, { difficulty, isInitialization: true });
  });
  await applyDifficulty(difficulty);
  removeSpinner($triesContainer);

  if (words.length === 0)
    await import("./events/handlers/difficulty-complete").then(
      ({ handleDifficultyComplete }) => handleDifficultyComplete(),
    );
  else await generateRandomWord();

  DefinitionPages.setItems(Array.from(discoveredWords.keys()).reverse());

  setupEventListeners();
})();
