import { getElementById, getElementBySelector } from "@lib/dom";
import { DEFINITIONS } from "@/consts";

export const $definition = getElementBySelector(
  ".info .definition",
  HTMLElement,
);

export const $showDefinition = getElementById(
  "show-definition",
  HTMLButtonElement,
);

export const $definitionTemplate = getElementById(
  "definition-template",
  HTMLTemplateElement,
);

export const $definitionslist = getElementBySelector(
  "#definitions-tab-content > .definitions-list",
  HTMLUListElement,
);

/** @param {string} word */
const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

/** @param {Array<keyof DEFINITIONS>} words */
export const renderSavedDefinitions = (words) => {
  if (words.length === 0) return;

  const $notYet = $definitionslist.querySelector(".not-yet");

  if ($notYet != null) $notYet.remove();

  const lastWord = words[words.length - 1];

  for (const word of words)
    renderDefinition(word, { lastWord, initialRender: true });
};

/**
 * @param {keyof DEFINITIONS} word
 * @param {{ lastWord?: string, initialRender?: boolean }} options
 */
export const renderDefinition = (word, { lastWord, initialRender = false }) => {
  const $itemClone = /** @type {DocumentFragment} */ (
    $definitionTemplate.content.cloneNode(true)
  );
  const $label = getElementBySelector(
    ".definition__label",
    HTMLElement,
    $itemClone,
  );
  const $content = getElementBySelector(
    ".definition__content",
    HTMLElement,
    $itemClone,
  );
  const $separator = document.createElement("hr");
  /** @type {string[]} */
  const definitions = DEFINITIONS[word];

  $label.textContent = capitalize(word);

  for (const definition of definitions) {
    const $definition = document.createElement("p");

    $definition.textContent = `${definition}.`;
    $content.appendChild($definition);
  }

  if (initialRender) {
    $definitionslist.appendChild($itemClone);
    if (word !== lastWord) $definitionslist.appendChild($separator);
  } else {
    $definitionslist.prepend($itemClone, $separator);
  }
};
