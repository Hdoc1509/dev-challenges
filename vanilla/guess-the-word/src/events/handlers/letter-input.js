import { showAlert } from "@lib/alert";
import { currentWord } from "@/state/current-word";
import { hasReachedMaxTries, increaseTries, tries } from "@/state/tries";
import { hasNoMistakes, mistakes, setMistakes } from "@/state/mistakes";
import { difficulty } from "@/state/difficulty";
import { resetGame } from "./reset-game";
import { $mistakenLetters, $tries, $triesIndicators } from "@/ui/info";
import { $reset } from "@/ui/actions";
import { CLASSES, CSS_VARIABLES, DIFFICULTY } from "@/consts";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const $nextLetter = $currentLetter.nextElementSibling;
  const letterIndex = Number($currentLetter.dataset.letterIndex);
  const enteredLetter = $currentField.value;
  const matches = new RegExp(currentWord[letterIndex], "i").test(enteredLetter);

  if (!matches) {
    increaseTries();

    if (hasReachedMaxTries()) return resetGame();

    const $mistakenLetter = document.createElement("span");

    if (hasNoMistakes()) $mistakenLetters.textContent = "";

    // NOTE: it seems that i can only use `tries` and remove `mistakes` from the state
    setMistakes(
      hasNoMistakes() ? enteredLetter : `${mistakes}${enteredLetter}`,
    );

    $tries.textContent = `${tries}`;
    $triesIndicators[tries - 1].setAttribute("data-completed", "");

    if (difficulty === DIFFICULTY.EASY) {
      // TODO: use css variable that matches difficulty name colors
      const color = "var(--primary)";
      $mistakenLetter.classList.add(CLASSES.MISTAKES.LETTER);
      $mistakenLetter.style.setProperty(
        CSS_VARIABLES.MISTAKEN_LETTER.TEXT,
        color,
      );
      $currentLetter.classList.add(CLASSES.TYPING.LETTER.MISTAKEN);
      $currentLetter.style.setProperty(
        CSS_VARIABLES.LETTER_BORDER.MISTAKEN,
        color,
      );
    }
    $mistakenLetter.textContent = enteredLetter;
    if (tries >= 2) $mistakenLetters.append(", ");
    $mistakenLetters.appendChild($mistakenLetter);
  }

  $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER.CURRENT);

  if ($nextLetter instanceof HTMLSpanElement) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING.LETTER.CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  } else if (hasNoMistakes()) {
    showAlert({ color: "success", text: "🎉 Success!" });
    $reset.disabled = true;
  }
}
