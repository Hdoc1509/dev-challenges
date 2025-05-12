import { getElementById, getElementBySelector } from "@lib/dom";
import { DefinitionElement, DefinitionItem } from "@/state/definition";
import { handleDefinitionOpen } from "@/events/handlers/definition-open";
import { capitalize } from "@/utils/string";
import { createDefinitionDifficulties } from "./definition-difficulties";
import { addNewBadge } from "./badge";

const $definitionTemplate = getElementById(
  "definition-template",
  HTMLTemplateElement,
);

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
  const $difficulties = createDefinitionDifficulties(word);
  const controller = new AbortController();

  DefinitionItem.set($definition, { controller, word });
  DefinitionElement.set(word, $definition);
  $label.textContent = capitalize(word);
  if (isNew) addNewBadge({ $details: $definition, $label });
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
