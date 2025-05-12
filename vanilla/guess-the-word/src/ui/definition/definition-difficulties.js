import { discoveredWords } from "@/state/discovered-words";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { capitalize } from "@/utils/string";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";

/** @param {string} word */
export function createDefinitionDifficulties(word) {
  const $difficulties = document.createElement("ul");
  const completedDifficulties = discoveredWords.get(word);
  const hasCompletedAllDifficulties =
    completedDifficulties === DIFFICULTIES_ALL;

  $difficulties.setAttribute("aria-label", "Available difficulties");
  $difficulties.classList.add("definition__difficulties");

  getDifficultiesOfWord(word).forEach((difficulty) => {
    const $item = document.createElement("li");
    const $span = document.createElement("span");
    const label = capitalize(difficulty);

    $item.classList.add("definition__difficulty");
    $item.setAttribute("aria-label", label);
    if (
      hasCompletedAllDifficulties ||
      completedDifficulties?.includes(difficulty)
    )
      $item.dataset.completed = "";
    // NOTE: should I use letter-[letter] icons instead of text?
    $span.textContent = difficulty[0].toUpperCase();
    $span.setAttribute("aria-hidden", "true");
    $item.appendChild($span);
    $difficulties.appendChild($item);
  });

  return $difficulties;
}
