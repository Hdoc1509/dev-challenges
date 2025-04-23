import { createWordLetters } from "@/ui/word";
import { $triesContainer } from "@/ui/tries";
import { $mistakesContainer } from "@/ui/mistakes";
import { $resetsContainer } from "@/ui/resets";
import { hideTimer } from "@/ui/timer";
import {
  $difficultyCompleted,
  showCompletedDifficultyMessage,
} from "@/ui/completed";
import { $randomWord } from "@/ui/actions";
import { difficulty } from "@/state/difficulty";

export function handleDifficultyComplete() {
  $randomWord.disabled = true;
  $triesContainer.removeAttribute("data-active");
  $mistakesContainer.removeAttribute("data-active");
  $resetsContainer.removeAttribute("data-active");
  hideTimer();
  $difficultyCompleted.setAttribute("data-active", "");
  showCompletedDifficultyMessage(difficulty);

  createWordLetters("congrats");
  // TODO:
  // - update completed words of all difficulties in Stats tab
  // - disable difficulty option from Difficulty tab
}
