import { resetTries } from "@/state/tries";
import {
  gameResets,
  implementsMaxResets,
  increaseGameResets,
  maxResets,
} from "@/state/resets";
import { clearUsedLetters } from "@/ui/word";
import { $triesContainer, TriesIndicator } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { ResetsIndicator } from "@/ui/resets";
import { hideTimerBar } from "@/ui/timer";
import { resetLetterFields } from "@/ui/typing";
import { $reset } from "@/ui/actions";

export function resetGame() {
  resetTries();
  increaseGameResets();

  clearUsedLetters();

  if (implementsMaxResets() && gameResets === maxResets) {
    $triesContainer.removeAttribute("data-active");
    $mistakesContainer.removeAttribute("data-active");
  }
  TriesIndicator.reset();
  $mistakenLetters.textContent = "-";
  if (implementsMaxResets()) ResetsIndicator.goNext();

  hideTimerBar();

  resetLetterFields();

  $reset.disabled = true;
}
