import { handleLetterInput } from "@/events/handlers/letter-input";
import {
  hideTimer,
  resetTimer,
  setTimerDuration,
  showTimer,
  showTimerBar,
} from "@/ui/timer";
import { isValidLetterField } from "@/ui/typing";
import { Random } from "../random";

/** @type {HTMLInputElement | null} */
// NOTE: avoids weird behaviors when focusing more than once on the same input
let $lastFocusedInput = null;
/** @type {AbortController | null} */
let controller = null;

/** @param {FocusEvent} e */
const handleLetterFocus = (e) => {
  const $target = e.target;

  if (!isValidLetterField($target)) return;

  const $currentLetter = /** @type {HTMLSpanElement} */ ($target.parentElement);
  const letterIdx = $currentLetter.dataset.letterIndex;

  if (letterIdx === "0" || $lastFocusedInput === $target) return;
  if (letterIdx === "1") showTimerBar();

  const timerDuration = Random.intInRange(3, 5);

  controller?.abort();

  controller = new AbortController();

  $lastFocusedInput = $target;
  resetTimer();
  setTimerDuration(timerDuration, () => handleLetterInput($target), {
    controller,
  });
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
