import { showAlert } from "@lib/alert";
import { addDiscoveredWord, discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { hasCompletedDifficulties } from "@/utils/difficulty/completed";
import { setWordCompleted, showCorrectWord } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { DefinitionPages } from "@/ui/definition/pages";
import { renderDefinitionsCount } from "@/ui/definition/render/count";
import { $definitionSection } from "@/ui/definition/elements";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";

export function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  hideTimerBar();
  $reset.disabled = true;
  setWordCompleted();
  showCorrectWord();
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");

  if (!discoveredWords.has(currentWord)) {
    $definitionSection.setAttribute("data-active", "");
    // NOTE: render of definition's difficulty depends on discoveredWords
    addDiscoveredWord(currentWord, { difficulty });
    DefinitionPages.prepend(currentWord);
    renderDefinitionsCount(discoveredWords.size);
  } else if (!hasCompletedDifficulties({ word: currentWord })) {
    // NOTE: definition may be not rendered if its page was not rendered yet
    // only show definition button if the item is rendered
    $definitionSection.setAttribute("data-active", "");
    addDiscoveredWord(currentWord, { difficulty });
    // TODO: update definition difficulty styles
    // updateDefinitionDifficulty(currentWord, { difficulty });
  }
}
