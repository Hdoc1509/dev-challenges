import { showAlert } from "@lib/alert";
import { currentWord } from "./state/current-word";
import { hasReachedMaxTries, increaseTries, tries } from "./state/tries";
import { hasNoMistakes, setMistakes, mistakes } from "./state/mistakes";
import { generateRandomWord } from "./events/handlers/random-word";
import { $mistakenLetters, $tries, $triesIndicators } from "./ui/info";
import { $randomWord, $reset } from "./ui/actions";
import { CLASSES } from "./consts";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";
import { resetGame } from "./events/handlers/reset-game";

/** @param {HTMLInputElement} $currentField */
const handleLetterInput = ($currentField) => {
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
};

document.addEventListener("DOMContentLoaded", () => generateRandomWord());

document.addEventListener("click", (e) => {
  const $target = e.target;

  if ($target === $randomWord) generateRandomWord();
  if ($target === $reset) resetGame();
});

document.addEventListener("input", (e) => {
  const $target = e.target;

  if (
    $target instanceof HTMLInputElement &&
    $target.matches(".typing__letter--current > input")
  )
    handleLetterInput($target);
});
// NOTE: should I reset animation of letter input on blur?
