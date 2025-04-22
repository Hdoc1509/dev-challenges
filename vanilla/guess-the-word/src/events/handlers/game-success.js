import { showAlert } from "@lib/alert";
import { addDiscoveredWord } from "@/services/saved-words/add";
import { discoveredWords } from "@/state/discovered-words";
import { removeAvailableWord } from "@/state/words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import {
  hasCompletedAllDifficulties,
  showCompletedDifficultyMessage,
} from "@/utils/difficulty/completed";
import { showCorrectWord } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { DefinitionPages } from "@/ui/definition/pages";
import { renderDefinitionsCount } from "@/ui/definition/count";
import { renderCompletedDifficulty } from "@/ui/definition/difficulty";
import { $definitionSection } from "@/ui/definition/elements";
import { $hints, $hintsContent } from "@/ui/hints";
import { $randomWord, $reset } from "@/ui/actions";

export function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  hideTimerBar();
  $reset.disabled = true;
  showCorrectWord();
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");

  if (!discoveredWords.has(currentWord)) {
    $definitionSection.setAttribute("data-active", "");
    // NOTE: render of definition's difficulty depends on discoveredWords
    addDiscoveredWord(currentWord, { difficulty });
    DefinitionPages.prepend(currentWord);
    renderDefinitionsCount(discoveredWords.size);
  } else if (!hasCompletedAllDifficulties({ word: currentWord })) {
    const { completed } = addDiscoveredWord(currentWord, { difficulty });

    if (completed) {
      removeAvailableWord(currentWord, { difficulty });
      $randomWord.disabled = true;
      showCompletedDifficultyMessage();
      // TODO:
      // - update completed words of all difficulties in Stats tab
      // - disable difficulty option from Difficulty tab
    }
    if (renderCompletedDifficulty({ word: currentWord, difficulty }))
      $definitionSection.setAttribute("data-active", "");
  }
}
