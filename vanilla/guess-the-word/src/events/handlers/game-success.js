import { showAlert } from "@lib/alert";
import { addDiscoveredWord, discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
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

  // TODO: update definition difficulty styles instead of return immediately
  if (discoveredWords.has(currentWord)) return;

  $definitionSection.setAttribute("data-active", "");
  addDiscoveredWord(currentWord);
  DefinitionPages.prepend(currentWord);
  renderDefinitionsCount(discoveredWords.size);
}
