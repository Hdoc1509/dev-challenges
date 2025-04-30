import { currentWord } from "@/state/current-word";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { maxResets, gameResets, implementsMaxResets } from "@/state/resets";
import { handleLetterMistake } from "./letter-mistake";
import { resetGame } from "./reset-game";
import { handleGameOver } from "./game-over";
import { handleGameSuccess } from "./game-success";
import { getLetter } from "@/utils/get-letter";
import { showCorrectWord, useLetter } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { $hints, addHint } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";
import { TRIES } from "@/consts/tries";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const retrievedLetter = getLetter($currentField);

  if (retrievedLetter == null) return;

  const { letterIndex, lowercaseLetter, enteredLetter, $currentLetter } =
    retrievedLetter;
  const isMatch = currentWord[letterIndex] === lowercaseLetter;

  addHint(enteredLetter, { letterIndex, isCorrect: isMatch });

  if (!isMatch) {
    if (implementsMaxResets() && gameResets === maxResets) {
      handleLetterMistake({ $currentLetter, enteredLetter, tries });
      handleGameOver({ $currentField, $currentLetter });
      showCorrectWord(); // TODO: move to handleGameOver()
      // PERF: only hide timer if difficulty implements it
      hideTimerBar();
      return;
    }

    increaseTries();
    handleLetterMistake({ $currentLetter, enteredLetter, tries });

    if (tries === maxTries) return resetGame();
  } else {
    // TODO: move to handleLetterCorrect() in another file
    useLetter(lowercaseLetter);
    $currentLetter.classList.add(CLASSES.TYPING.LETTER__CORRECT);
  }

  if (tries <= TRIES.FIRST && gameResets <= maxResets)
    $hints.setAttribute("data-active", "");

  const $nextLetter = $currentLetter.nextElementSibling;

  if (gameResets < maxResets) $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER__CURRENT);

  // TODO: add util isValidTypingLetter()
  if (
    $nextLetter instanceof HTMLSpanElement &&
    $nextLetter.matches(`.${CLASSES.TYPING.LETTER}`)
  ) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  } else if (tries === TRIES.NONE) {
    handleGameSuccess();
  } else {
    // PERF: only hide timer if difficulty implements it
    hideTimerBar();
  }
}
