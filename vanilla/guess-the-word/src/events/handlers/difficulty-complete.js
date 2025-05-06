import { gameCompleted, setGameCompleted } from "@/state/game-complete";
import { difficulty } from "@/state/difficulty";
import { AvailableWords } from "@/state/words";
import { MasterDifficulty } from "@/utils/difficulty/master";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { createWordLetters } from "@/ui/word";
import { $triesContainer } from "@/ui/tries";
import { $mistakesContainer } from "@/ui/mistakes";
import { showCompletedDifficultyMessage } from "@/ui/completed";
import { $typing } from "@/ui/typing";
import { $randomWord } from "@/ui/actions";
import { disableDifficultyOption } from "@/ui/difficulty-form";

export async function handleDifficultyComplete() {
  if (!gameCompleted) {
    const isCompleted = Array.from(AvailableWords).every(
      ([, words]) => words?.size === 0,
    );

    setGameCompleted(isCompleted);
  }

  $randomWord.disabled = true;
  $triesContainer.removeAttribute("data-active");
  $mistakesContainer.removeAttribute("data-active");
  if (MasterDifficulty.isApplied()) {
    const { $resetsContainer } = await import("@/ui/resets");
    $resetsContainer.removeAttribute("data-active");
  }
  $typing.replaceChildren();
  $typing.removeAttribute("data-active");
  if (InsaneDifficulty.isApplied()) {
    const { hideTimer } = await import("@/ui/timer");
    hideTimer();
  }
  showCompletedDifficultyMessage(difficulty, { allCompleted: gameCompleted });
  createWordLetters("congrats");
  disableDifficultyOption(difficulty);
}
