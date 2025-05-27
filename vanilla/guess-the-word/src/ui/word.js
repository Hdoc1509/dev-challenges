import { getElementById } from "@lib/dom";
import { currentWord } from "@/state/current-word";

const ATTRIBUTRES = Object.freeze({
  LETTER: Object.freeze({
    USED: "data-used",
  }),
});

export const $word = getElementById("word", HTMLDivElement);

/** @type {Array<[HTMLSpanElement, string | null]>} */
const $wordLetters = [];
const lettersToUse = [""];

/** @param {string} word */
export const createWordLetters = (word) => {
  $word.replaceChildren();
  $wordLetters.length = 0;
  lettersToUse.length = 0;

  word.split("").forEach((letter) => {
    const $letter = document.createElement("span");

    $letter.textContent = letter;
    $letter.classList.add("word__letter");
    $word.append($letter);
    $wordLetters.push([$letter, letter]);
    lettersToUse.push(letter);
  });
};

export const clearUsedLetters = () =>
  $wordLetters.forEach(([$letter], idx) => {
    $letter.removeAttribute(ATTRIBUTRES.LETTER.USED);
    $wordLetters[idx][1] = lettersToUse[idx];
  });

/** @param {string} letter */
export const useLetter = (letter) => {
  const letterIndex = $wordLetters.findIndex(
    ([, letterText]) => letterText === letter,
  );

  if (letterIndex === -1) return;

  const [$letter] = $wordLetters[letterIndex];

  $letter.setAttribute(ATTRIBUTRES.LETTER.USED, "");
  $wordLetters[letterIndex][1] = null;
  if ($wordLetters.every(([, letterText]) => letterText === null))
    clearUsedLetters();
};

export const showCorrectWord = async () => {
  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];
    const [$letter] = $wordLetters[i];

    if ($letter.textContent !== letter) {
      /* TODO: try to use a transition
      1. letter grows
      2. update the letter
      3. letter shrinks
      4. go to next letter */
      $letter.textContent = letter;
      // TODO: decrease delay timer per changed letter
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
};
