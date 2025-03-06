import { showAlert } from "@lib/alert";
import { setWordCompleted, showCorrectWord } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { $definition } from "@/ui/definition";
import { $reset } from "@/ui/actions";

export function handleGameSuccess() {
  // TODO: move to another file
  showAlert({ color: "success", text: "🎉 Success!" });
  hideTimerBar();
  $reset.disabled = true;
  setWordCompleted();
  showCorrectWord();
  $definition.setAttribute("data-active", "");
  // check if the word is in discoveredWords Set
  // if not, add it to discoveredWords Set
  // render the new word definition id $definitionsList
  // save the discoveredWords Set to localStorage
}
