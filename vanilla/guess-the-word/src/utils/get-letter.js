import { TypingLetterIndex } from "@/state/typing-letter";

/** @param {HTMLInputElement} $currentField */
export function getLetter($currentField) {
  const letterIndex = TypingLetterIndex.get($currentField);

  if (letterIndex == null) return null;

  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const enteredLetter = $currentField.value;
  const lowercaseLetter = enteredLetter.toLowerCase();

  if (
    enteredLetter !== "" &&
    (enteredLetter === " " || !/[a-z]/.test(lowercaseLetter))
  ) {
    $currentField.value = "";
    return null;
  }

  return { $currentLetter, enteredLetter, letterIndex, lowercaseLetter };
}
