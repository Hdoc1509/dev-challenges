import { isValidLetterField } from "@/ui/typing/validation";

/** @param {HTMLSpanElement} $nextLetter */
export function goNextLetter($nextLetter) {
  const $nextField = $nextLetter.firstElementChild;
  if (!isValidLetterField($nextField)) return;

  $nextLetter.dataset.state = "current";
  $nextField.disabled = false;
  $nextField.focus();
}
