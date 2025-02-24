import { handleLetterInput } from "@/events/handlers/letter-input";
import {
  resetTimer,
  setTimerDuration,
  showTimer,
  showTimerBar,
} from "@/ui/timer";
import { CLASSES } from "@/consts";

/** @type {HTMLInputElement | null} */
// NOTE: avoids weird behaviors when focusing more than once on the same input
let lastFocusedInput = null;

/** @type {($target: EventTarget | null) => $target is HTMLInputElement} */
// TODO: use it for `input` event in listeners.js
const isValidLetterInput = ($target) =>
  $target instanceof HTMLInputElement &&
  $target.matches(`.${CLASSES.TYPING.LETTER__CURRENT} > input`);

/** @param {FocusEvent} e */
const handleLetterFocus = (e) => {
  const $target = e.target;
  setTimerDuration(0, () => {});

  if (!isValidLetterInput($target)) return;

  const $currentLetter = /** @type {HTMLSpanElement} */ ($target.parentElement);
  const letterIdx = $currentLetter.dataset.letterIndex;

  if (letterIdx === "0" || lastFocusedInput === $target) return;
  if (letterIdx === "1") showTimerBar();

  lastFocusedInput = $target;
  resetTimer();
  // TODO: duration should be 3, 4 or 5 seconds
  setTimerDuration(3, () => handleLetterInput($target));
};

export function applyInsaneDifficulty() {
  showTimer();
  document.addEventListener("focusin", handleLetterFocus);
}
