import { showAlert } from "@lib/alert";
import { addDiscoveredWord, discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { setWordCompleted, showCorrectWord } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { $definition, renderDefinition } from "@/ui/definition";
import { $hints } from "@/ui/hints";
import { $reset } from "@/ui/actions";

export function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  hideTimerBar();
  $reset.disabled = true;
  setWordCompleted();
  showCorrectWord();
  $hints.removeAttribute("data-active");

  if (discoveredWords.has(currentWord)) return;

  $definition.setAttribute("data-active", "");
  addDiscoveredWord(currentWord);
  renderDefinition(currentWord);
}
