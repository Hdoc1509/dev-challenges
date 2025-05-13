import { isValidLetterField } from "@/ui/typing/validation";
import { CLASSES } from "@/consts/css-classes";

/** @param {HTMLSpanElement} $nextLetter */
export function goNextLetter($nextLetter) {
  const $nextField = $nextLetter.firstElementChild;
  if (!isValidLetterField($nextField)) return;

  $nextLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $nextField.disabled = false;
  $nextField.focus();
}
