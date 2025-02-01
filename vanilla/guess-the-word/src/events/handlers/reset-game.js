import { resetTries } from "@/state/tries";
import { resetMistakes } from "@/state/mistakes";
import {
  nextDifficulty,
  setDifficulty,
  setNextDifficulty,
} from "@/state/difficulty";
import { setGameState } from "@/state/game-state";
import { $mistakenLetters, $tries, $triesIndicators } from "@/ui/info";
import { $letterFields, $typing } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { CLASSES, CSS_VARIABLES, GAME_STATE } from "@/consts";

export function resetGame() {
  const $firstField = $letterFields[0];
  const $currentLetter = /** @type {HTMLSpanElement | null} */ (
    document.querySelector(`.${CLASSES.TYPING.LETTER.CURRENT}`)
  );
  /** @type {NodeListOf<HTMLSpanElement>} */
  const $typingMistakenLetters = $typing.querySelectorAll(
    `.${CLASSES.TYPING.LETTER.MISTAKEN}`,
  );

  resetTries();
  resetMistakes();
  setGameState(GAME_STATE.READY);

  if (nextDifficulty != null) {
    setDifficulty(nextDifficulty);
    setNextDifficulty(null);
  }
  $tries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";
  $currentLetter?.classList.remove(CLASSES.TYPING.LETTER.CURRENT);
  $typingMistakenLetters.forEach(($letter) => {
    $letter.classList.remove(CLASSES.TYPING.LETTER.MISTAKEN);
    $letter.style.removeProperty(CSS_VARIABLES.LETTER_BORDER.MISTAKEN);
  });
  $letterFields.forEach(($field) => {
    $field.readOnly = false;
    $field.disabled = true;
    $field.value = "";
  });
  $firstField.parentElement?.classList.add(CLASSES.TYPING.LETTER.CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
  $reset.disabled = true;
}
