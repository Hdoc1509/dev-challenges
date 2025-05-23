import { TypingLetterIndex } from "@/state/typing-letter";
import {
  resetTimer,
  startTimer,
  showTimerBar,
  timerController,
} from "@/ui/timer";
import { isValidLetterField } from "@/ui/typing/validation";
import { Random } from "@/utils/random";
import { handleLetterInput } from "./letter-input";

/** @type {HTMLInputElement | null} */
// NOTE: avoids weird behaviors when focusing more than once on the same input
let $lastFocusedInput = null;

/** @param {FocusEvent} e */
export const handleLetterFocus = (e) => {
  const $target = e.target;
  if (!isValidLetterField($target)) return;

  const letterIdx = TypingLetterIndex.get($target);

  if (letterIdx === 0 || $lastFocusedInput === $target) return;
  if (letterIdx === 1) showTimerBar();

  const timerDuration = Random.intInRange(3, 5);

  $lastFocusedInput = $target;

  timerController?.abort();
  resetTimer();
  startTimer({
    duration: timerDuration,
    onEnd: () => handleLetterInput($target),
    onLabel: (duration) => `${duration}  seconds available`,
    controller: new AbortController(),
  });
};
