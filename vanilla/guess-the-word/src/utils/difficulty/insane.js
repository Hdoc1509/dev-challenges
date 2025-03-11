import { handleLetterInput } from "@/events/handlers/letter-input";
import {
  hideTimer,
  resetTimer,
  setTimerDuration,
  showTimer,
  showTimerBar,
} from "@/ui/timer";
import { isValidLetterField } from "../letter-fields";

/** @type {HTMLInputElement | null} */
// NOTE: avoids weird behaviors when focusing more than once on the same input
let $lastFocusedInput = null;

/** @param {FocusEvent} e */
const handleLetterFocus = (e) => {
  const $target = e.target;

  if (!isValidLetterField($target)) return;

  const $currentLetter = /** @type {HTMLSpanElement} */ ($target.parentElement);
  const letterIdx = $currentLetter.dataset.letterIndex;

  if (letterIdx === "0" || $lastFocusedInput === $target) return;
  if (letterIdx === "1") showTimerBar();

  $lastFocusedInput = $target;
  resetTimer();
  // TODO: duration should be 3, 4 or 5 seconds
  setTimerDuration(3, () => handleLetterInput($target));
};

export const InsaneDifficulty = Object.freeze({
  apply() {
    showTimer();
    document.addEventListener("focusin", handleLetterFocus);
  },
  unapply() {
    hideTimer();
    document.removeEventListener("focusin", handleLetterFocus);
  },
});
