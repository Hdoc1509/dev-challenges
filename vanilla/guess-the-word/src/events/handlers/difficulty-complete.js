import { gameCompleted, setGameCompleted } from "@/state/game-complete";
import { difficulty } from "@/state/difficulty";
import { AvailableWords } from "@/state/words";
import { MasterDifficulty } from "@/utils/difficulty/master";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { createWordLetters } from "@/ui/word";
import { $triesContainer } from "@/ui/tries";
import { $mistakesContainer } from "@/ui/mistakes";
import { showCompletedDifficultyMessage } from "@/ui/completed";
import { $typing } from "@/ui/typing/elements";
import { $randomWord } from "@/ui/actions";
import { disableDifficultyOption } from "@/ui/difficulty-form";
import { CLASSES } from "@/consts/css-classes";

export function handleDifficultyComplete() {
  if (!gameCompleted) {
    const isCompleted = Array.from(AvailableWords).every(
      ([, words]) => words?.size === 0,
    );

    setGameCompleted(isCompleted);
  }

  $randomWord.disabled = true;

  $triesContainer.classList.add(CLASSES.HIDDEN);
  $mistakesContainer.removeAttribute("data-active");
  if (MasterDifficulty.isApplied())
    import("@/ui/resets").then(({ $resetsContainer }) =>
      $resetsContainer.removeAttribute("data-active"),
    );
  if (InsaneDifficulty.isApplied())
    import("@/ui/timer").then(({ hideTimer }) => hideTimer());
  $typing.replaceChildren();
  $typing.classList.add(CLASSES.HIDDEN);

  showCompletedDifficultyMessage(difficulty, { allCompleted: gameCompleted });
  createWordLetters("congrats");
  disableDifficultyOption(difficulty);
}
