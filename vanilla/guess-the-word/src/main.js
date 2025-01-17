import { getElementById } from "@lib/dom";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

const $word = getElementById("word", HTMLDivElement);

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

const generateRandomWord = () => {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  currentWord = scrambleWord(randomWord);
  currentWord.split("").forEach(letter => {
    const $letter = document.createElement("span");

    $letter.textContent = letter;
    $word.appendChild($letter);
  });
};

/** @param {number} quantity */
const createLetterFields = (quantity) => {};

const handleLetterInput = () => {};

const resetGame = () => {};

document.addEventListener("DOMContentLoaded", () => generateRandomWord());
