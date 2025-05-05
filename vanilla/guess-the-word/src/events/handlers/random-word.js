import { resetAlert } from "@lib/alert";
import { words } from "@/state/words";
import { setCurrentWord } from "@/state/current-word";
import { resetTries } from "@/state/tries";
import { maxResets, resetGameResets } from "@/state/resets";
import { handleDifficultyComplete } from "./difficulty-complete";
import { Random } from "@/utils/random";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { scrambleWord } from "@/utils/scramble";
import { createWordLetters } from "@/ui/word";
import { $triesContainer, TriesIndicator } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { ResetsIndicator } from "@/ui/resets";
import { createLetterFields } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { $definitionSection } from "@/ui/definition/elements";
import {
  $hints,
  $hintsContent,
  $hintsTriggerLabel,
  clearHints,
} from "@/ui/hints";
import { RESETS } from "@/consts/resets";

export function generateRandomWord() {
  if (words.length === 0) return handleDifficultyComplete();

  const randomWord = words.length === 1 ? words[0] : Random.element(words);

  setCurrentWord(randomWord);
  resetAlert();
  resetTries();
  resetGameResets();

  createWordLetters(scrambleWord(randomWord));
  createLetterFields(randomWord.length);

  if (maxResets === RESETS.MAX.VOID) {
    $mistakesContainer.removeAttribute("data-active");
    $triesContainer.removeAttribute("data-active");
  } else {
    $mistakesContainer.setAttribute("data-active", "");
    $triesContainer.setAttribute("data-active", "");
  }
  TriesIndicator.reset();
  ResetsIndicator.reset();
  $mistakenLetters.textContent = "0";
  if (InsaneDifficulty.isApplied())
    import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());
  $definitionSection.removeAttribute("data-active");
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");
  $hintsTriggerLabel.textContent = "Show hints";
  clearHints();
  $reset.disabled = true;
}
