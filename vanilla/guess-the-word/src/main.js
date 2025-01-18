import { getElementById, getElementBySelector } from "@lib/dom";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

const $word = getElementById("word", HTMLDivElement);
const $typing = getElementById("typing", HTMLElement);

const $randomWord = getElementById("random", HTMLButtonElement);

const CLASSES = Object.freeze({
  TYPING_LETTER_CURRENT: "typing__letter--current",
});

// TODO: allow user to create a list of words and use them
const words = [
  "example",
  "javascript",
  "coding",
  "challenge",
  "flower",
  "adventure",
];
let currentWord = "";
let tries = 0;
let mistakes = 0;

/** @param {string} word */
const scrambleWord = (word) => {
  const letters = word.split("");
  const scrambledLetter = letters.sort(() => Math.random() - 0.5);

  return scrambledLetter.join("");
};

/** @param {number} quantity */
const createLetterFields = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    // TODO: use a <template> instead
    // - add .typing__caret as <span> element
    const $letter = document.createElement("span");
    const $field = document.createElement("input");
    const $caret = document.createElement("span");

    $letter.classList.add("typing__letter");
    $letter.setAttribute("data-letter-index", `${i}`);
    $field.disabled = true;
    $caret.classList.add("typing__caret");

    $letter.append($field, $caret);
    $typing.appendChild($letter);
  }

  const $firstLetter = /** @type {HTMLSpanElement} */ (
    $typing.firstElementChild
  );
  const $firstField = /** @type {HTMLInputElement} */ (
    $firstLetter.firstElementChild
  );

  $firstLetter.classList.add(CLASSES.TYPING_LETTER_CURRENT);
  $firstField.disabled = false;
};

const generateRandomWord = () => {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  currentWord = scrambleWord(randomWord);
  while ($word.firstChild) $word.removeChild($word.firstChild);
  currentWord.split("").forEach((letter) => {
    const $letter = document.createElement("span");

    $letter.textContent = letter;
    $word.appendChild($letter);
  });

  while ($typing.firstChild) $typing.removeChild($typing.firstChild);
  createLetterFields(currentWord.length);
};

/** @param {HTMLInputElement} $currentField */
const handleLetterInput = ($currentField) => {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const $nextLetter = $currentLetter.nextElementSibling;

  $currentField.disabled = true;
  $currentLetter.classList.remove(CLASSES.TYPING_LETTER_CURRENT);

  if ($nextLetter instanceof HTMLSpanElement) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING_LETTER_CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  }
};

const resetGame = () => {};

document.addEventListener("DOMContentLoaded", () => generateRandomWord());

document.addEventListener("click", (e) => {
  const $target = e.target;

  if ($target === $randomWord) generateRandomWord();
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
