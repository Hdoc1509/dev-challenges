import { generateRandomWord } from "./handlers/random-word";
import { handleLetterInput } from "./handlers/letter-input";
import { resetGame } from "./handlers/reset-game";
import { $randomWord, $reset } from "@/ui/actions";
import { CLASSES } from "@/consts";

export function setupEventListeners() {
  generateRandomWord();

  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $randomWord) generateRandomWord();
    if ($target === $reset) resetGame();
  });

  // NOTE: should I reset animation of letter input on blur?
  document.addEventListener("input", (e) => {
    const $target = e.target;

    if (
      $target instanceof HTMLInputElement &&
      $target.matches(`.${CLASSES.TYPING_LETTER_CURRENT} > input`)
    )
      handleLetterInput($target);
  });
}