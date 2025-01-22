import { resetAlert } from "@lib/alert";
import { currentWord, setCurrentWord } from "@/state/current-word";
import { createLetterFields } from "@/utils/letter-fields";
import { scrambleWord } from "@/utils/scramble";
import { $word } from "@/ui/word";
import { $typing, updateLetterFields } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { words } from "@/consts";

export function generateRandomWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];

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
  updateLetterFields();
  $reset.disabled = false;
  resetAlert();
}
