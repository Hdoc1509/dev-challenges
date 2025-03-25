import { getElementById, getElementBySelector } from "@lib/dom";
import { handleDefinitionOpen } from "@/events/handlers/definition-open";

const $definitionTemplate = getElementById(
  "definition-template",
  HTMLTemplateElement,
);

/** @param {string} word */
const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

/** @param {string} word */
export const createDefinition = (word) => {
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
  const controller = new AbortController();

  $definition.dataset.word = word;
  $label.textContent = capitalize(word);

  $definition.addEventListener(
    "toggle",
    () => {
      if ($definition.open) handleDefinitionOpen($definition, { controller });
    },
    { signal: controller.signal },
  );

  return $clone;
};
