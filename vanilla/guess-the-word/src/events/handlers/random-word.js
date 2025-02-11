import { resetAlert } from "@lib/alert";
import { currentWord, setCurrentWord } from "@/state/current-word";
import { nextDifficulty } from "@/state/difficulty";
import { setGameState } from "@/state/game-state";
import { resetTries } from "@/state/tries";
import { handleGameReady } from "./game-ready";
import { createLetterFields } from "@/utils/letter-fields";
import { scrambleWord } from "@/utils/scramble";
import { $word } from "@/ui/word";
import { $currentTries, $mistakenLetters, $triesIndicators } from "@/ui/info";
import { captureLetterFields, setLetterFields, $typing } from "@/ui/typing";
import { DEFAULT_WORDS, GAME_STATE } from "@/consts";

export function generateRandomWord() {
  const randomWord =
    DEFAULT_WORDS[Math.floor(Math.random() * DEFAULT_WORDS.length)];

  setCurrentWord(randomWord);
  resetAlert();
  resetTries();
  setGameState(GAME_STATE.READY);

  while ($word.firstChild) $word.removeChild($word.firstChild);
  scrambleWord(currentWord)
    .split("")
    .forEach((letter) => {
      const $letter = document.createElement("span");

      $letter.textContent = letter;
      $word.appendChild($letter);
    });

  while ($typing.firstChild) $typing.removeChild($typing.firstChild);
  createLetterFields(currentWord.length);
  setLetterFields(captureLetterFields());

  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";

  if (nextDifficulty != null) handleGameReady({ difficulty: nextDifficulty });
}
