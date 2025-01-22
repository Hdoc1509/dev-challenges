import { resetAlert, showAlert } from "@lib/alert";
import { getElementBySelector } from "@lib/dom";
import { $word } from "./ui/word";
import { $mistakenLetters, $tries, $triesIndicators } from "./ui/info";
import {
  $letterFields,
  $letterTemplate,
  $typing,
  updateLetterFields,
} from "./ui/typing";
import { $randomWord, $reset } from "./ui/actions";
import { CLASSES, words } from "./consts";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

let currentWord = "";
let tries = 0;
let mistakes = "";

/** @param {string} word */
const scrambleWord = (word) => {
  const letters = word.split("");
  const scrambledLetter = letters.sort(() => Math.random() - 0.5);

  return scrambledLetter.join("");
};

/** @param {number} quantity */
const createLetterFields = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    const $letterClone = /** @type {DocumentFragment} */ (
      $letterTemplate.content.cloneNode(true)
    );
    const $letter = getElementBySelector(
      ".typing__letter",
      HTMLSpanElement,
      $letterClone,
    );

    $letter.setAttribute("data-letter-index", `${i}`);

    $typing.appendChild($letterClone);
  }

  const $firstLetter = /** @type {HTMLSpanElement} */ (
    $typing.firstElementChild
  );
  const $firstField = /** @type {HTMLInputElement} */ (
    $firstLetter.firstElementChild
  );

  $firstLetter.classList.add(CLASSES.TYPING_LETTER_CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
};

const generateRandomWord = () => {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  currentWord = randomWord;

  while ($word.firstChild) $word.removeChild($word.firstChild);
  scrambleWord(currentWord)
    .split("")
    .forEach((letter) => {
      const $letter = document.createElement("span");

      $letter.textContent = letter;
      $word.appendChild($letter);
    });

  while ($typing.firstChild) $typing.removeChild($typing.firstChild);
  createLetterFields(currentWord.length);
  updateLetterFields();
  $reset.disabled = false;
  resetAlert();
};

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
    tries++;

    if (tries === 6) return resetGame();

    mistakes =
      mistakes === "" ? enteredLetter : `${mistakes}, ${enteredLetter}`;

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
  } else if (tries === 0) {
    showAlert({ color: "success", text: "🎉 Success!" });
    $reset.disabled = true;
  }
};

const resetGame = () => {
  const $firstField = $letterFields[0];
  const $currentLetter = /** @type {HTMLSpanElement | null} */ (
    document.querySelector(`.${CLASSES.TYPING_LETTER_CURRENT}`)
  );

  tries = 0;
  mistakes = "";

  $tries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";
  $currentLetter?.classList.remove(CLASSES.TYPING_LETTER_CURRENT);
  $letterFields.forEach(($field) => {
    $field.readOnly = false;
    $field.disabled = false;
    $field.value = "";
  });
  $firstField.parentElement?.classList.add(CLASSES.TYPING_LETTER_CURRENT);
  $firstField.focus();
  $reset.disabled = true;
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
