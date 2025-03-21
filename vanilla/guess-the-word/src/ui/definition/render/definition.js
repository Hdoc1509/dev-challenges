import { getElementById, getElementBySelector } from "@lib/dom";
import { handleDefinitionOpen } from "@/events/handlers/definition-open";
import { renderDefinitionsCount } from "./count";
import { addNewBadge } from "../new";
import { $definitionslist } from "../elements";
import { DEFINITIONS_PER_PAGE } from "@/consts/definitions";
/** @typedef {import("@/consts/definitions").DefinitionWord} DefinitionWord */

const $definitionTemplate = getElementById(
  "definition-template",
  HTMLTemplateElement,
);

/** @param {string} word */
const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

/** @param {Array<DefinitionWord>} words */
export const renderSavedDefinitions = (words) => {
  if (words.length === 0) return;

  renderDefinitionsCount(words.length);

  const $notYet = $definitionslist.querySelector(".not-yet");

  if ($notYet != null) $notYet.remove();

  const wordsToRender = words.slice(0, DEFINITIONS_PER_PAGE);
  const lastWord = wordsToRender[wordsToRender.length - 1];
  const pages = Math.ceil(words.length / DEFINITIONS_PER_PAGE);

  for (const word of wordsToRender)
    renderDefinition(word, { lastWord, initialRender: true });

  if (words.length > DEFINITIONS_PER_PAGE) {
    // TODO: render pagination section
    // - go-prev button:
    //   - if no previous page, disable
    // - current page
    // - go-next button
    //   - if no next page, disable
    console.log("render pagination section", pages, "pages");
  }
};

/**
 * @param {import("@/consts/definitions").DefinitionWord} word
 * @param {{ lastWord?: string, initialRender?: boolean }} options
 */
export const renderDefinition = async (
  word,
  { lastWord, initialRender = false } = {},
) => {
  const $itemClone = /** @type {DocumentFragment} */ (
    $definitionTemplate.content.cloneNode(true)
  );
  const $details = getElementBySelector(
    ".definition",
    HTMLDetailsElement,
    $itemClone,
  );
  const $label = getElementBySelector(
    ".definition__label",
    HTMLElement,
    $itemClone,
  );
  const $separator = document.createElement("hr");
  const $notYet = $definitionslist.querySelector(".not-yet");
  const controller = new AbortController();

  if ($notYet != null) $notYet.remove();

  $details.dataset.word = word;
  $label.textContent = capitalize(word);

  $details.addEventListener(
    "toggle",
    () => {
      if ($details.open) handleDefinitionOpen($details, { controller });
    },
    { signal: controller.signal },
  );

  if (initialRender) {
    $definitionslist.appendChild($itemClone);
    if (word !== lastWord) $definitionslist.appendChild($separator);
  } else {
    if ($definitionslist.childElementCount >= 1)
      $definitionslist.prepend($separator);

    addNewBadge({ $details, $label });
    $definitionslist.prepend($itemClone);
  }
};
