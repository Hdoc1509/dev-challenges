import { getAllElementsBySelector, getElementById } from "@lib/dom";

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
