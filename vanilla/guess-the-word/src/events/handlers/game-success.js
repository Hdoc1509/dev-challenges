import { showAlert } from "@lib/alert";
import { discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { handleNewWord } from "./new-word";
import { handleNewDifficulty } from "./new-difficulty";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { showCorrectWord } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";

export async function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  if (InsaneDifficulty.isApplied()) {
    const { hideTimerBar } = await import("@/ui/timer");
    hideTimerBar();
  }
  $reset.disabled = true;
  showCorrectWord();
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");

  if (!discoveredWords.has(currentWord)) handleNewWord();
  else if (!hasCompletedAllDifficulties({ word: currentWord }))
    handleNewDifficulty();
}
