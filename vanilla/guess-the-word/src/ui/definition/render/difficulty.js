import { getElementBySelector } from "@lib/dom";
import { $definitionPagesContainer } from "../pages";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { hasCompletedDifficulties } from "@/utils/difficulty/completed";

/**
 * @param {Object} params
 * @param {string} params.word
 * @param {import("@/consts/difficulty").Difficulty} params.difficulty
 * @returns {boolean} whether the definition was rendered
 */
export function renderCompletedDifficulty({ word, difficulty }) {
  if (!getDifficultiesOfWord(word).includes(difficulty)) return false;

  const $definition = $definitionPagesContainer.querySelector(
    `.definitions-list.page .definition[data-word=${word}]`,
  );

  if ($definition == null || !($definition instanceof HTMLDetailsElement))
    return false;

  if (hasCompletedDifficulties({ word })) return false;

  const $difficulty = getElementBySelector(
    `.definition__difficulty[aria-label="${difficulty}" i]`,
    HTMLLIElement,
    $definition,
  );

  $difficulty.dataset.completed = "";
  return true;
}
