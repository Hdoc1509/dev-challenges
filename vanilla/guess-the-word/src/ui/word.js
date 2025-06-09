import { getElementById } from "@lib/dom";
import { currentWord } from "@/state/current-word";
import { clearChildren } from "@/utils/dom";

const ATTRIBUTRES = Object.freeze({
  LETTER: Object.freeze({
    USED: "data-used",
    GROW: "data-grow",
  }),
});

export const $word = getElementById("word", HTMLDivElement);

/** @type {Array<[HTMLSpanElement, string | null]>} */
const $wordLetters = [];
const lettersToUse = [""];

/** @param {string} word */
export const createWordLetters = (word) => {
  clearChildren($word);
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
};

export const showCorrectWord = async () => {
  let delay = 250;

  for (let i = 0; i < currentWord.length; i++) {
    const correctLetter = currentWord[i];
    const letterToCheck = lettersToUse[i];
    const [$letter] = $wordLetters[i];

    if (letterToCheck !== correctLetter) {
      $letter.style.setProperty("--letter-grow-duration", `${delay}ms`);
      await /** @type {Promise<void>} */ (
        new Promise((resolve) => {
          $letter.addEventListener(
            "transitionend",
            () => {
              $letter.textContent = correctLetter;
              $letter.removeAttribute(ATTRIBUTRES.LETTER.GROW);
              resolve();
            },
            { once: true },
          );
          $letter.setAttribute(ATTRIBUTRES.LETTER.GROW, "");
        })
      );
      if (delay > 150) delay -= 15;
    }
  }
};
