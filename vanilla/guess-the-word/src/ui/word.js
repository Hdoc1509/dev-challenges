import { getElementById } from "@lib/dom";
import { currentWord } from "@/state/current-word";

const ATTRIBUTRES = Object.freeze({
  WORD: Object.freeze({
    COMPLETED: "data-completed",
  }),
  LETTER: Object.freeze({
    USED: "data-used",
  }),
});

export const $word = getElementById("word", HTMLDivElement);

/** @type {HTMLSpanElement[]} */
export let $wordLetters = [];

/** @param {string} word */
export const createWordLetters = (word) => {
  while ($word.firstChild) $word.removeChild($word.firstChild);

  word.split("").forEach((letter) => {
    const $letter = document.createElement("span");

    $letter.textContent = letter;
    $letter.classList.add("word__letter");
    $word.appendChild($letter);
  });

  $wordLetters = Array.from($word.querySelectorAll(".word__letter"));

  $word.removeAttribute(ATTRIBUTRES.WORD.COMPLETED);
};

/** @param {string} letter */
export const useLetter = (letter) => {
  const $letter = $wordLetters.find(
    ($letter) => $letter.dataset.used == null && $letter.textContent === letter,
  );

  if ($letter != null) $letter.setAttribute(ATTRIBUTRES.LETTER.USED, "");
};

export const setWordCompleted = () =>
  $word.setAttribute(ATTRIBUTRES.WORD.COMPLETED, "");

export const showCorrectWord = async () => {
  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];
    const $letter = $wordLetters[i];

    if ($letter.textContent !== letter) {
      /* TODO: try to use a transition
      1. letter grows
      2. update the letter
      3. letter shrinks
      4. go to next letter */
      $letter.textContent = letter;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
};
