import { resetTries } from "@/state/tries";
import { difficulty } from "@/state/difficulty";
import { setGameState } from "@/state/game-state";
import { gameResets, increaseGameResets } from "@/state/resets";
import { $currentTries, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters } from "@/ui/mistakes";
import { $currentResets, $resetsIndicators } from "@/ui/resets";
import { $letterFields, $typing } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { CLASSES, CSS_VARIABLES, DIFFICULTY, GAME_STATE } from "@/consts";

export function resetGame() {
  const $firstField = $letterFields[0];
  const $currentLetter = /** @type {HTMLSpanElement | null} */ (
    document.querySelector(`.${CLASSES.TYPING.LETTER__CURRENT}`)
  );
  /** @type {NodeListOf<HTMLSpanElement>} */
  const $typingMistakenLetters = $typing.querySelectorAll(
    `.${CLASSES.TYPING.LETTER__MISTAKEN}`,
  );

  resetTries();
  setGameState(GAME_STATE.READY);

  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  if (difficulty === DIFFICULTY.MASTER) {
    increaseGameResets();
    $currentResets.textContent = `${gameResets}`;
    $resetsIndicators[gameResets - 1].setAttribute("data-completed", "");
  }
  $mistakenLetters.textContent = "-";
  $currentLetter?.classList.remove(CLASSES.TYPING.LETTER__CURRENT);
  $typingMistakenLetters.forEach(($letter) => {
    $letter.classList.remove(CLASSES.TYPING.LETTER__MISTAKEN);
    $letter.style.removeProperty(CSS_VARIABLES.LETTER_BORDER_MISTAKEN);
  });
  $letterFields.forEach(($field) => {
    $field.readOnly = false;
    $field.disabled = true;
    $field.value = "";
  });
  $firstField.parentElement?.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
  $reset.disabled = true;
}
