import { resetAlert } from "@lib/alert";
import { currentWord, setCurrentWord } from "@/state/current-word";
import { setGameState } from "@/state/game-state";
import { createLetterFields } from "@/utils/letter-fields";
import { scrambleWord } from "@/utils/scramble";
import { $word } from "@/ui/word";
import { captureLetterFields, setLetterFields, $typing } from "@/ui/typing";
import { DEFAULT_WORDS, GAME_STATE } from "@/consts";

export function generateRandomWord() {
  const randomWord =
    DEFAULT_WORDS[Math.floor(Math.random() * DEFAULT_WORDS.length)];

  setCurrentWord(randomWord);

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
  resetAlert();
  setGameState(GAME_STATE.READY);
}
