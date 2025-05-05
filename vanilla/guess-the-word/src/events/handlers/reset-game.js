import { resetTries } from "@/state/tries";
import {
  gameResets,
  implementsMaxResets,
  increaseGameResets,
  maxResets,
} from "@/state/resets";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { clearUsedLetters } from "@/ui/word";
import { $triesContainer, TriesIndicator } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { ResetsIndicator } from "@/ui/resets";
import { resetLetterFields } from "@/ui/typing";
import { $reset } from "@/ui/actions";

export async function resetGame() {
  resetTries();
  increaseGameResets();

  clearUsedLetters();

  if (implementsMaxResets() && gameResets === maxResets) {
    $triesContainer.removeAttribute("data-active");
    $mistakesContainer.removeAttribute("data-active");
  }
  TriesIndicator.reset();
  $mistakenLetters.textContent = "0";
  if (implementsMaxResets()) ResetsIndicator.goNext();

  if (InsaneDifficulty.isApplied())
    import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());

  resetLetterFields();

  $reset.disabled = true;
}
