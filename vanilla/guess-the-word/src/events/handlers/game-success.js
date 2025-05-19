import { discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { setIsAlertInitialized } from "@/state/alert";
import { handleNewWord } from "./new-word";
import { handleNewDifficulty } from "./new-difficulty";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { showCorrectWord } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints/elements";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

export async function handleGameSuccess() {
  import("@lib/alert").then(({ showAlert }) => {
    setIsAlertInitialized(true);
    showAlert({ color: "success", text: "🎉 Success!" });
  });

  showCorrectWord();

  if (InsaneDifficulty.isApplied()) {
    // TODO: remove usage of `await`
    const { hideTimerBar } = await import("@/ui/timer");
    hideTimerBar();
  }

  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);

  $reset.disabled = true;

  if (!discoveredWords.has(currentWord)) handleNewWord();
  else if (!hasCompletedAllDifficulties({ word: currentWord }))
    handleNewDifficulty();
}
