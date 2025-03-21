import { handleDefinitionOpen } from "@/events/handlers/definition-open";
import { getElementById, getElementBySelector } from "@lib/dom";

const $definitionRetryTemplate = getElementById(
  "definition-retry-template",
  HTMLTemplateElement,
);

/**
 * @param {Object} params
 * @param {HTMLDetailsElement} params.$definitionDetails
 * @param {AbortController} params.controller
 */
export const createRetryButton = ({ $definitionDetails, controller }) => {
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
    () => handleDefinitionOpen($definitionDetails, { controller }),
    { signal: controller.signal },
  );

  return $retry;
};
