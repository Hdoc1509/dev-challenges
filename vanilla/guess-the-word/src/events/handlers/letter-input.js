import { showAlert } from "@lib/alert";
import { currentWord } from "@/state/current-word";
import { hasReachedMaxTries, increaseTries, tries } from "@/state/tries";
import { hasNoMistakes, mistakes, setMistakes } from "@/state/mistakes";
import { resetGame } from "./reset-game";
import { $mistakenLetters, $tries, $triesIndicators } from "@/ui/info";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts";

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

    setMistakes(
      hasNoMistakes() ? enteredLetter : `${mistakes}, ${enteredLetter}`,
    );

    $tries.textContent = `${tries}`;
    $triesIndicators[tries - 1].setAttribute("data-completed", "");
    $mistakenLetters.textContent = mistakes;
  }

  $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING_LETTER_CURRENT);

  if ($nextLetter instanceof HTMLSpanElement) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING_LETTER_CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  } else if (hasNoMistakes()) {
    showAlert({ color: "success", text: "🎉 Success!" });
    $reset.disabled = true;
  }
}
