import { words } from "@/state/words";
import { setCurrentWord } from "@/state/current-word";
import { resetTries } from "@/state/tries";
import { maxResets, resetGameResets } from "@/state/resets";
import { isAlertInitialized } from "@/state/alert";
import { Random } from "@/utils/random";
import { MasterDifficulty } from "@/utils/difficulty/master";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { scrambleWord } from "@/utils/scramble";
import { createWordLetters } from "@/ui/word";
import { $triesContainer, TriesIndicator } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { createLetterFields } from "@/ui/typing/letter-fields";
import { $reset } from "@/ui/actions";
import { $definitionSection } from "@/ui/definition/elements";
import { clearHints } from "@/ui/hints/clear";
import { $hints, $hintsContent, $hintsTriggerLabel } from "@/ui/hints/elements";
import { RESETS } from "@/consts/resets";
import { CLASSES } from "@/consts/css-classes";

export async function generateRandomWord() {
  // TODO: add auxiliary state to ensure that the button is disabled even if
  // manipulating the DOM

  if (words.length === 0) {
    import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
      handleDifficultyComplete(),
    );
    return;
  }

  const randomWord = words.length === 1 ? words[0] : Random.element(words);

  setCurrentWord(randomWord);
  if (isAlertInitialized)
    await import("@/ui/alert").then(({ GameAlert }) => GameAlert.reset());
  resetTries();
  resetGameResets();

  if (maxResets === RESETS.MAX.VOID) {
    $mistakesContainer.classList.add(CLASSES.HIDDEN);
    $triesContainer.classList.add(CLASSES.HIDDEN);
  } else {
    $mistakesContainer.classList.remove(CLASSES.HIDDEN);
    $triesContainer.classList.remove(CLASSES.HIDDEN);
  }
  TriesIndicator.reset();
  if (MasterDifficulty.isApplied())
    await import("@/ui/resets").then(({ ResetsIndicator }) => {
      ResetsIndicator.reset();
    });
  $mistakenLetters.textContent = "0";
  if (InsaneDifficulty.isApplied())
    import("@/ui/insane-countdown-bar").then(({ InsaneCountdownBar }) =>
      InsaneCountdownBar.disable(),
    );
  $definitionSection.classList.add(CLASSES.HIDDEN);
  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);
  $hintsTriggerLabel.textContent = "Show hints";
  clearHints();
  $reset.disabled = true;

  createWordLetters(scrambleWord(randomWord));
  createLetterFields(randomWord.length);
}
