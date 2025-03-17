import { getElementById, getElementBySelector } from "@lib/dom";
import { getMockedDefinition } from "@/services/definition";
import { DEFINITIONS_PER_PAGE, TOTAL_WORDS } from "@/consts/definitions";

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
    //   - if only one previous page, show number
    //   - if no previous page, disable
    // - current page
    // - go-next button
    //   - if only one next page, show number
    //   - if no next page, disable
    console.log("render pagination section", pages, "pages");
  }
};

/**
 * @param {import("@/consts/definitions").DefinitionWord} word
 * @param {{ lastWord?: string, initialRender?: boolean }} options
 */
// TODO: call only when opening its `<details>` element
// - if data-status="success", do nothing
// - if data-status="idle":
//   - set data-status="loading", render loading spinner
//   - call service
//   - if error:
//     - set data-status="error"
//     - render try again button
//   - if success:
//     - set data-status="success"
//     - render definition
export const renderDefinition = async (
  word,
  { lastWord, initialRender = false } = {},
) => {
  const $itemClone = /** @type {DocumentFragment} */ (
    $definitionTemplate.content.cloneNode(true)
  );
  const $item = getElementBySelector(
    ".definition",
    HTMLDetailsElement,
    $itemClone,
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

  const definitions = await getMockedDefinition(word);

  const $notYet = $definitionslist.querySelector(".not-yet");

  if ($notYet != null) $notYet.remove();

  $item.dataset.word = word;
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
    if ($definitionslist.childElementCount >= 1)
      $definitionslist.prepend($separator);

    const $badge = document.createElement("span");

    $badge.classList.add("definition__badge");
    $badge.textContent = "New";
    $label.appendChild($badge);
    $item.dataset.status = "new";

    $definitionslist.prepend($itemClone);
  }
};

export const clearNewDefinitionStatus = () => {
  const $definitions = document.querySelectorAll(
    ".definition[data-status=new]",
  );

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-status");
    $definition.querySelector(".definition__badge")?.remove();
  });
};
