import { showAlert } from "@lib/alert";
import { addDiscoveredWord, discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
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
    if (
      discoveredWords.get(currentWord)?.size !==
      getDifficultiesOfWord(currentWord).length
    ) {
      $definitionSection.setAttribute("data-active", "");
      // NOTE: need to be added before DefinitionPages.prepend(currentWord);
      addDiscoveredWord(currentWord, { difficulty });
      // TODO: update definition difficulty styles
      // updateDefinitionDifficulty(currentWord, { difficulty });
    }

    DefinitionPages.prepend(currentWord);
    renderDefinitionsCount(discoveredWords.size);
  }
}
