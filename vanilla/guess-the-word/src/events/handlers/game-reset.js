import { isShowingCorrectWord } from "@/state/correct-word";
import { resetTries } from "@/state/tries";
import {
  gameResets,
  implementsMaxResets,
  increaseGameResets,
  maxResets,
} from "@/state/resets";
import { MasterDifficulty } from "@/utils/difficulty/master";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { clearUsedLetters } from "@/ui/word";
import { $triesContainer, TriesIndicator } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { resetLetterFields } from "@/ui/typing/letter-fields";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

export async function resetGame() {
  if (isShowingCorrectWord) {
    $reset.disabled = true;
    return;
  }

  resetTries();
  increaseGameResets();

  clearUsedLetters();

  if (implementsMaxResets() && gameResets === maxResets) {
    $triesContainer.classList.add(CLASSES.HIDDEN);
    $mistakesContainer.classList.add(CLASSES.HIDDEN);
  }
  TriesIndicator.reset();
  $mistakenLetters.textContent = "0";
  if (MasterDifficulty.isApplied())
    import("@/ui/resets").then(({ ResetsIndicator }) =>
      ResetsIndicator.goNext(),
    );
  if (InsaneDifficulty.isApplied()) {
    import("@/ui/insane-countdown-bar").then(({ InsaneCountdownBar }) =>
      InsaneCountdownBar.disable(),
    );
    await import("@/events/handlers/letter-focus").then(
      ({ resetFocusedInput }) => resetFocusedInput(),
    );
  }

  resetLetterFields();

  $reset.disabled = true;
}
