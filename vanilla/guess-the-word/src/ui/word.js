import { getAllElementsBySelector, getElementById } from "@lib/dom";
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

/** @param {HTMLSpanElement[]} $letters */
export const setWordLetters = ($letters) => ($wordLetters = $letters);

export const captureWordLetters = () =>
  getAllElementsBySelector(".word__letter", HTMLSpanElement, $word);

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
      $letter.textContent = letter;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
};
