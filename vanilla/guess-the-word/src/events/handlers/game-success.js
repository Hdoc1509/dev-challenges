import { showAlert } from "@lib/alert";
import { discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { handleNewWord } from "./new-word";
import { handleNewDifficulty } from "./new-difficulty";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { showCorrectWord } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

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

  const totalWords = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];

  if (!discoveredWords.has(currentWord))
    // TODO: access to `currentWord` internally
    handleNewWord(currentWord, { totalWords });
  else if (!hasCompletedAllDifficulties({ word: currentWord }))
    handleNewDifficulty();
}
