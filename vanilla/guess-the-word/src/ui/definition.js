import { getElementById, getElementBySelector } from "@lib/dom";
import { handleDefinitionOpen } from "@/events/handlers/definition-open";
import { DEFINITIONS_PER_PAGE, TOTAL_WORDS } from "@/consts/definitions";

// TODO: split into multiple files
// - elements.js
// - render.js

/** @typedef {import("@/consts/definitions").DefinitionWord} DefinitionWord */

export const $definition = getElementBySelector(
  ".info .definition",
  HTMLElement,
);

export const $definitionsProgress = getElementBySelector(
  ".definitions-count__progress",
  HTMLDivElement,
);
export const $definitionsCurrent = getElementBySelector(
  ".definitions-count__current",
  HTMLSpanElement,
);

const $definitionsTotal = getElementBySelector(
  ".definitions-count__total",
  HTMLSpanElement,
);

$definitionsTotal.textContent = TOTAL_WORDS.toString();

export const $showDefinition = getElementBySelector(
  ".info .definition__open",
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

/** @param {number} count */
export const renderDefinitionsCount = (count) => {
  const percent = ((count / TOTAL_WORDS) * 100).toFixed(8);

  $definitionsProgress.style.setProperty("--definitions-count", `${percent}%`);
  $definitionsCurrent.textContent = count.toString();
};

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

  if ($notYet != null) $notYet.remove();

  $details.dataset.word = word;
  $label.textContent = capitalize(word);

  $details.addEventListener("toggle", () => {
    if ($details.open) handleDefinitionOpen($details);
  });

  if (initialRender) {
    $definitionslist.appendChild($itemClone);
    if (word !== lastWord) $definitionslist.appendChild($separator);
  } else {
    if ($definitionslist.childElementCount >= 1)
      $definitionslist.prepend($separator);

    const $badge = document.createElement("span");

    $badge.classList.add("definition__badge");
    $badge.textContent = "New";
    $label.appendChild($badge);
    $details.dataset.new = "";

    $definitionslist.prepend($itemClone);
  }
};

export const clearNewDefinitionStatus = () => {
  const $definitions = document.querySelectorAll(".definition[data-new]");

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-new");
    $definition.querySelector(".definition__badge")?.remove();
  });
};
