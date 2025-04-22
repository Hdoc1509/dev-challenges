import { loadSavedWords } from "./services/saved-words/load";
import { difficulty } from "./state/difficulty";
import { discoveredWords } from "./state/discovered-words";
import { removeAvailableWord, words } from "./state/words";
import { setupEventListeners } from "./events/listeners/setup";
import { generateRandomWord } from "./events/handlers/random-word";
import { applyDifficulty } from "./utils/difficulty/apply";
import { getDifficultiesOfWord } from "./utils/difficulty/of-word";
import { showCompletedDifficultyMessage } from "./utils/difficulty/completed";
import { renderDefinitionsCount } from "./ui/definition/count";
import { DefinitionPages } from "./ui/definition/pages";
import { $word } from "./ui/word";
import { $typing } from "./ui/typing";
import { $randomWord } from "./ui/actions";
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
  // PERF: can I pass an `onLoadedWord()` callback to `loadSavedWords()`?
  // it will call `removeAvailableWord()` for each loaded word
  await loadSavedWords();
  for (const [word, difficulties] of discoveredWords) {
    const completedDifficulties =
      difficulties === DIFFICULTIES_ALL
        ? getDifficultiesOfWord(word)
        : difficulties;

    for (const difficulty of completedDifficulties)
      await removeAvailableWord(word, { difficulty });
  }
  await applyDifficulty(difficulty);
  removeSpinner($word, $typing);

  if (words.length === 0) {
    $randomWord.disabled = true;
    showCompletedDifficultyMessage();
  } else generateRandomWord();
  renderDefinitionsCount(discoveredWords.size);
  DefinitionPages.setItems(Array.from(discoveredWords.keys()).reverse());

  setupEventListeners();
})();
