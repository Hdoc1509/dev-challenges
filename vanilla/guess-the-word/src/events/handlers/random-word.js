import { resetAlert } from "@lib/alert";
import { currentWord, setCurrentWord } from "@/state/current-word";
import {
  nextDifficulty,
  setDifficulty,
  setNextDifficulty,
} from "@/state/difficulty";
import { setGameState } from "@/state/game-state";
import { createLetterFields } from "@/utils/letter-fields";
import { scrambleWord } from "@/utils/scramble";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { $word } from "@/ui/word";
import { captureLetterFields, setLetterFields, $typing } from "@/ui/typing";
import { DEFAULT_WORDS, DIFFICULTY, GAME_STATE } from "@/consts";

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
  // TODO: move logic to separate function
  // it should be called in reset-game.js too
  if (nextDifficulty != null) {
    if (nextDifficulty === DIFFICULTY.HARD) applyHardDifficulty();
    setDifficulty(nextDifficulty);
    setNextDifficulty(null);
  }
  setGameState(GAME_STATE.READY);
}
