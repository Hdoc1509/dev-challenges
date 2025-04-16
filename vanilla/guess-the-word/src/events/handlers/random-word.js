import { resetAlert } from "@lib/alert";
import { words } from "@/state/words";
import { currentWord, setCurrentWord } from "@/state/current-word";
import { resetTries } from "@/state/tries";
import { gameResets, maxResets, resetGameResets } from "@/state/resets";
import { Random } from "@/utils/random";
import { createLetterFields } from "@/ui/typing";
import { hasCompletedDifficulty } from "@/utils/difficulty/completed";
import { scrambleWord } from "@/utils/scramble";
import { createWordLetters } from "@/ui/word";
import { $triesContainer, TriesIndicator } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { $currentResets, $resetsIndicators } from "@/ui/resets";
import { hideTimerBar } from "@/ui/timer";
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
  let randomWord = Random.element(words);

  while (hasCompletedDifficulty({ word: randomWord }))
    randomWord = Random.element(words);

  setCurrentWord(randomWord);
  resetAlert();
  resetTries();
  resetGameResets();

  createWordLetters(scrambleWord(currentWord));
  createLetterFields(currentWord.length);

  if (maxResets === RESETS.MAX.VOID) {
    $mistakesContainer.removeAttribute("data-active");
    $triesContainer.removeAttribute("data-active");
  } else {
    $mistakesContainer.setAttribute("data-active", "");
    $triesContainer.setAttribute("data-active", "");
  }
  TriesIndicator.reset();
  $resetsIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";
  $currentResets.textContent = `${gameResets}`;
  hideTimerBar();
  $definitionSection.removeAttribute("data-active");
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");
  $hintsTriggerLabel.textContent = "Show hints";
  clearHints();
  $reset.disabled = true;
}
