import { getElementBySelector } from "@lib/dom";
import { DefinitionElement } from "@/state/definition";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";

/**
 * @param {Object} params
 * @param {string} params.word
 * @param {import("@/consts/difficulty").Difficulty} params.difficulty
 * @returns {boolean} whether the definition was rendered
 */
export function renderCompletedDifficulty({ word, difficulty }) {
  if (!getDifficultiesOfWord(word).includes(difficulty)) return false;

  const $definition = DefinitionElement.get(word);

  if (!($definition instanceof HTMLDetailsElement)) return false;

  const $difficulty = getElementBySelector(
    `.definition__difficulty[aria-label="${difficulty}" i]`,
    HTMLLIElement,
    $definition,
  );

  $difficulty.dataset.completed = "";
  return true;
}
