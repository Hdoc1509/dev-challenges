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

export function generateRandomWord() {
  if (words.length === 0) {
    import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
      handleDifficultyComplete(),
    );
    return;
  }

  const randomWord = words.length === 1 ? words[0] : Random.element(words);

  setCurrentWord(randomWord);
  if (isAlertInitialized)
    import("@lib/alert").then(({ resetAlert }) => resetAlert());
  resetTries();
  resetGameResets();

  createWordLetters(scrambleWord(randomWord));
  createLetterFields(randomWord.length);

  if (maxResets === RESETS.MAX.VOID) {
    $mistakesContainer.classList.add(CLASSES.HIDDEN);
    $triesContainer.classList.add(CLASSES.HIDDEN);
  } else {
    $mistakesContainer.classList.remove(CLASSES.HIDDEN);
    $triesContainer.classList.remove(CLASSES.HIDDEN);
  }
  TriesIndicator.reset();
  if (MasterDifficulty.isApplied())
    import("@/ui/resets").then(({ ResetsIndicator }) => {
      ResetsIndicator.reset();
    });
  $mistakenLetters.textContent = "0";
  if (InsaneDifficulty.isApplied())
    import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());
  $definitionSection.classList.add(CLASSES.HIDDEN);
  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);
  $hintsTriggerLabel.textContent = "Show hints";
  clearHints();
  $reset.disabled = true;
}
