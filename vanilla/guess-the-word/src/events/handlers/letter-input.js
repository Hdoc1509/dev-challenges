import { showAlert } from "@lib/alert";
import { currentWord } from "@/state/current-word";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { difficulty } from "@/state/difficulty";
import { gameSate, setGameState } from "@/state/game-state";
import { resetGame } from "./reset-game";
import { applyEasyDifficulty } from "@/utils/difficulty/easy";
import { $mistakenLetters, $currentTries, $triesIndicators } from "@/ui/info";
import { $reset } from "@/ui/actions";
import { CLASSES, DIFFICULTY, GAME_STATE, TRIES } from "@/consts";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const letterIndex = Number($currentLetter.dataset.letterIndex);
  const enteredLetter = $currentField.value;

  if (enteredLetter === " ") {
    $currentField.value = "";
    return;
  }

  const matches = new RegExp(currentWord[letterIndex], "i").test(enteredLetter);

  if (gameSate !== GAME_STATE.PLAYING) setGameState(GAME_STATE.PLAYING);

  if (!matches) {
    increaseTries();

    if (tries === maxTries) return resetGame();

    const $newMistakenLetter = document.createElement("span");

    if (tries === TRIES.FIRST) $mistakenLetters.textContent = "";

    $currentTries.textContent = `${tries}`;
    $triesIndicators[tries - 1].setAttribute("data-completed", "");

    if (difficulty === DIFFICULTY.EASY)
      applyEasyDifficulty({
        $mistakenLetter: $newMistakenLetter,
        $currentLetter,
        currentTries: tries,
      });

    $newMistakenLetter.classList.add(CLASSES.MISTAKES.LETTER);
    $newMistakenLetter.textContent = enteredLetter;
    if (tries > TRIES.FIRST) $mistakenLetters.append(",");
    $mistakenLetters.appendChild($newMistakenLetter);
  }

  const $nextLetter = $currentLetter.nextElementSibling;

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
  } else if (tries === TRIES.NONE) {
    showAlert({ color: "success", text: "🎉 Success!" });
    $reset.disabled = true;
  }
}
