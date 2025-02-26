import { resetAlert } from "@lib/alert";
import { words } from "@/state/words";
import { currentWord, setCurrentWord } from "@/state/current-word";
import { resetTries } from "@/state/tries";
import { gameResets, resetGameResets } from "@/state/resets";
import { createLetterFields } from "@/utils/letter-fields";
import { scrambleWord } from "@/utils/scramble";
import { $word, captureWordLetters, setWordLetters } from "@/ui/word";
import { $currentTries, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters } from "@/ui/mistakes";
import { captureLetterFields, setLetterFields, $typing } from "@/ui/typing";
import { $currentResets, $resetsIndicators } from "@/ui/resets";
import { hideTimerBar } from "@/ui/timer";
import { $reset } from "@/ui/actions";

export function generateRandomWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];

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

  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $resetsIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";
  $currentResets.textContent = `${gameResets}`;
  hideTimerBar();
  $reset.disabled = true;
}
