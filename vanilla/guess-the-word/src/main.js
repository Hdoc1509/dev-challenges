import { generateRandomWord } from "./events/handlers/random-word";
import { handleLetterInput } from "./events/handlers/letter-input";
import { resetGame } from "./events/handlers/reset-game";
import { $randomWord, $reset } from "./ui/actions";
import "@lib/alert/styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

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
