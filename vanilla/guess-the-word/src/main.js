import { loadSavedWords } from "./services/saved-words/load";
import { difficulty } from "./state/difficulty";
import { discoveredWords } from "./state/discovered-words";
import { setupEventListeners } from "./events/listeners/setup";
import { generateRandomWord } from "./events/handlers/random-word";
import { applyDifficulty } from "./utils/difficulty/apply";
import { renderDefinitionsCount } from "./ui/definition/count";
import { DefinitionPages } from "./ui/definition/pages";
import { $word } from "./ui/word";
import { $typing } from "./ui/typing";
import { addSpinner, removeSpinner } from "./ui/spinner";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

(async () => {
  // data initialization
  addSpinner($word, $typing);
  await applyDifficulty(difficulty);
  await loadSavedWords();
  removeSpinner($word, $typing);
  // TODO: disable $randomButton when all words of current difficulty are completed
  // - use an early return in generateRandomWord()
  // - also do this after handleGameSuccess() if needed
  generateRandomWord();
  renderDefinitionsCount(discoveredWords.size);
  DefinitionPages.setItems(Array.from(discoveredWords.keys()).reverse());

  setupEventListeners();
})();
