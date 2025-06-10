import { discoveredWords } from "@/state/discovered-words";
import { currentWord } from "@/state/current-word";
import { setIsShowingCorrectWord } from "@/state/correct-word";
import { setIsAlertInitialized } from "@/state/alert";
import { handleNewWord } from "./new-word";
import { handleNewDifficulty } from "./new-difficulty";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { showCorrectWord } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints/elements";
import { $randomWord, $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

export function handleGameSuccess() {
  import("@/ui/alert").then(({ GameAlert }) => {
    setIsAlertInitialized(true);
    GameAlert.show({ color: "success", text: "🎉 Success!" });
  });

  $randomWord.disabled = true;
  setIsShowingCorrectWord(true);
  showCorrectWord().then(() => {
    $randomWord.disabled = false;
    setIsShowingCorrectWord(false);
  });

  if (InsaneDifficulty.isApplied())
    import("@/ui/insane-countdown-bar").then(({ InsaneCountdownBar }) =>
      InsaneCountdownBar.disable(),
    );

  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);

  $reset.disabled = true;

  if (!discoveredWords.has(currentWord)) handleNewWord();
  else if (!hasCompletedAllDifficulties({ word: currentWord }))
    handleNewDifficulty();
}
