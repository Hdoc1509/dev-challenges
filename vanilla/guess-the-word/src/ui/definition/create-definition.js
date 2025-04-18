import { getElementById, getElementBySelector } from "@lib/dom";
import { discoveredWords } from "@/state/discovered-words";
import { DefinitionElement, DefinitionItem } from "@/state/definition";
import { handleDefinitionOpen } from "@/events/handlers/definition-open";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { addNewBadge } from "./badge";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";

const $definitionTemplate = getElementById(
  "definition-template",
  HTMLTemplateElement,
);

/** @param {string} word */
const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

/**
 * @param {string} word
 * @param {{ isNew?: boolean }} [options]
 */
export const createDefinition = (word, { isNew = false } = {}) => {
  const $clone = /** @type {DocumentFragment} */ (
    $definitionTemplate.content.cloneNode(true)
  );
  const $definition = getElementBySelector(
    ".definition",
    HTMLDetailsElement,
    $clone,
  );
  const $label = getElementBySelector(
    ".definition__label",
    HTMLElement,
    $clone,
  );
  // TODO: move to createDefinitionDifficulties()
  const $difficulties = document.createElement("ul");
  const controller = new AbortController();
  const completedDifficulties = discoveredWords.get(word);
  const hasCompletedAllDifficulties =
    completedDifficulties === DIFFICULTIES_ALL;

  DefinitionItem.set($definition, { controller, word });
  DefinitionElement.set(word, $definition);
  $difficulties.setAttribute("aria-label", "Difficulties available");
  $difficulties.classList.add("definition__difficulties");
  $label.textContent = capitalize(word);
  if (isNew) addNewBadge({ $details: $definition, $label });
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
    $span.textContent = `${difficulty[0].toUpperCase()}`;
    $span.setAttribute("aria-hidden", "true");
    $item.appendChild($span);
    $difficulties.appendChild($item);
  });
  $label.appendChild($difficulties);

  $definition.addEventListener(
    "toggle",
    () => {
      if ($definition.open) handleDefinitionOpen($definition);
    },
    { signal: controller.signal },
  );

  return $clone;
};
