import { getElementById, getElementBySelector } from "@lib/dom";
import {
  discoveredWords,
  removeDiscoveredWord,
} from "@/state/discovered-words";
import { renderDefinitionsCount } from "./render/count";
import { createErrorMessage } from "./error-message";

const $removeNowTemplate = getElementById(
  "defintion-remove-now-template",
  HTMLTemplateElement,
);

/**
 * @param {HTMLDetailsElement} $definitionDetails
 * @param {{ word: string }} extraParams
 */
export function createErrorRemovedMessage($definitionDetails, { word }) {
  const $fragment = document.createDocumentFragment();
  const $removeNowClone = /** @type {DocumentFragment} */ (
    $removeNowTemplate.content.cloneNode(true)
  );
  const $removeNow = getElementBySelector(
    ".definition__remove-now",
    HTMLButtonElement,
    $removeNowClone,
  );
  const $error = createErrorMessage("Word has been removed from game.");
  const $explanation = document.createElement("p");

  removeDiscoveredWord(word);

  $explanation.classList.add("definition__error");
  $explanation.textContent =
    "It will not be loaded next time you open the app.";

  $removeNow.addEventListener(
    "click",
    async () => {
      // NOTE: hack to prevent ReferenceError about initialization
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_access_lexical_declaration_before_init
      const { DefinitionPages } = await import("./pages");
      const { DefinitionPagination } = await import("./pagination");
      const $page = $definitionDetails.parentElement?.parentElement;
      const pageNumber = Number($page?.dataset.page);

      $definitionDetails.remove();
      DefinitionPages.updateItems(Array.from(discoveredWords.keys()), {
        fromPage: pageNumber,
      });
      DefinitionPages.renderPage(pageNumber);
      DefinitionPagination.updateCurrentPage(pageNumber);
      renderDefinitionsCount(discoveredWords.size);
    },
    { once: true },
  );

  $fragment.append($error, $explanation, $removeNowClone);

  return $fragment;
}
