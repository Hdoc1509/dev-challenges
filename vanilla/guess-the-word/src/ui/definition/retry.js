import { getElementById, getElementBySelector } from "@lib/dom";
import { DefinitionItem } from "@/state/definition";
import { handleDefinitionOpen } from "@/events/handlers/definition-open";

const $definitionRetryTemplate = getElementById(
  "definition-retry-template",
  HTMLTemplateElement,
);

/** @param {HTMLDetailsElement} $definitionDetails */
export const createRetryButton = ($definitionDetails) => {
  const $clone = /** @type {DocumentFragment} */ (
    $definitionRetryTemplate.content.cloneNode(true)
  );
  const $retry = getElementBySelector(
    ".definition__retry",
    HTMLButtonElement,
    $clone,
  );

  $retry.addEventListener(
    "click",
    () => handleDefinitionOpen($definitionDetails),
    {
      signal: DefinitionItem.get($definitionDetails)?.controller.signal,
    },
  );

  return $retry;
};
