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

  if (discoveredWords.has(currentWord)) return;

  $definition.setAttribute("data-active", "");
  discoveredWords.add(currentWord);
  renderDefinition(currentWord);
  saveDiscoveredWords();
}
