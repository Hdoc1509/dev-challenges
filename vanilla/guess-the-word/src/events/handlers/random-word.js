import { resetAlert } from "@lib/alert";
import { words } from "@/state/words";
import { currentWord, setCurrentWord } from "@/state/current-word";
import { resetTries } from "@/state/tries";
import { gameResets, maxResets, resetGameResets } from "@/state/resets";
import { createLetterFields } from "@/utils/letter-fields";
import { scrambleWord } from "@/utils/scramble";
import { $word, captureWordLetters, setWordLetters } from "@/ui/word";
import { $currentTries, $triesContainer, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters, $mistakesContainer } from "@/ui/mistakes";
import { captureLetterFields, setLetterFields, $typing } from "@/ui/typing";
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
  const randomWord =
    /** @type {import("@/consts/definitions").DefinitionWord } */ (
      words[Math.floor(Math.random() * words.length)]
    );

  setCurrentWord(randomWord);
  resetAlert();
  resetTries();
  resetGameResets();

  while ($word.firstChild) $word.removeChild($word.firstChild);
  scrambleWord(currentWord)
    .split("")
    .forEach((letter) => {
      const $letter = document.createElement("span");

      $letter.textContent = letter;
      $letter.classList.add("word__letter");
      $word.appendChild($letter);
    });
  setWordLetters(captureWordLetters());
  $word.removeAttribute("data-completed");

  while ($typing.firstChild) $typing.removeChild($typing.firstChild);
  createLetterFields(currentWord.length);
  setLetterFields(captureLetterFields());

  if (maxResets === RESETS.MAX.VOID) {
    $mistakesContainer.removeAttribute("data-active");
    $triesContainer.removeAttribute("data-active");
  } else {
    $mistakesContainer.setAttribute("data-active", "");
    $triesContainer.setAttribute("data-active", "");
  }
  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
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
