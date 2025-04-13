import { resetTries } from "@/state/tries";
import { difficulty } from "@/state/difficulty";
import { gameResets, increaseGameResets, maxResets } from "@/state/resets";
import { implementsMaxResets } from "@/utils/max-resets";
import { clearUsedLetters } from "@/ui/word";
import { $currentTries, $triesContainer, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { $currentResets, $resetsIndicators } from "@/ui/resets";
import { hideTimerBar } from "@/ui/timer";
import { resetLetterFields } from "@/ui/typing";
import { $reset } from "@/ui/actions";

export function resetGame() {
  resetTries();
  hideTimerBar();
  increaseGameResets();

  clearUsedLetters();
  resetLetterFields();

  if (implementsMaxResets({ difficulty }) && gameResets === maxResets) {
    $mistakesContainer.removeAttribute("data-active");
    $triesContainer.removeAttribute("data-active");
  }
  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  if (implementsMaxResets({ difficulty })) {
    $currentResets.textContent = `${gameResets}`;
    $resetsIndicators[gameResets - 1].setAttribute("data-completed", "");
  }
  $mistakenLetters.textContent = "-";
  $reset.disabled = true;
}
