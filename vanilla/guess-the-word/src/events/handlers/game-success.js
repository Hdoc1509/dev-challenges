import { showAlert } from "@lib/alert";
import { discoveredWords, saveDiscoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { setWordCompleted, showCorrectWord } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { $definition, renderDefinition } from "@/ui/definition";
import { $reset } from "@/ui/actions";

export function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  hideTimerBar();
  $reset.disabled = true;
  setWordCompleted();
  showCorrectWord();
  // TODO: only show definition button if word is not in discoveredWords
  $definition.setAttribute("data-active", "");
  if (discoveredWords.has(currentWord)) return;

  discoveredWords.add(currentWord);
  renderDefinition(currentWord, {});
  saveDiscoveredWords();
}
