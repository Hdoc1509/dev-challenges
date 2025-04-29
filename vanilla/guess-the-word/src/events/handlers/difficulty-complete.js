import { gameCompleted, setGameCompleted } from "@/state/game-complete";
import { difficulty } from "@/state/difficulty";
import { AvailableWords } from "@/state/words";
import { createWordLetters } from "@/ui/word";
import { $triesContainer } from "@/ui/tries";
import { $mistakesContainer } from "@/ui/mistakes";
import { $resetsContainer } from "@/ui/resets";
import { hideTimer } from "@/ui/timer";
import { showCompletedDifficultyMessage } from "@/ui/completed";
import { $randomWord } from "@/ui/actions";
import { disableDifficultyOption } from "@/ui/difficulty-form";

export function handleDifficultyComplete() {
  if (!gameCompleted) {
    const isCompleted = Array.from(AvailableWords).every(
      ([, words]) => words?.size === 0,
    );

    setGameCompleted(isCompleted);
  }

  $randomWord.disabled = true;
  $triesContainer.removeAttribute("data-active");
  $mistakesContainer.removeAttribute("data-active");
  $resetsContainer.removeAttribute("data-active");
  hideTimer();
  showCompletedDifficultyMessage(difficulty, { allCompleted: gameCompleted });
  createWordLetters("congrats");
  disableDifficultyOption(difficulty);
}
