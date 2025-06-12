import { getElementBySelector } from "@lib/dom";
import {
  DefinitionElement,
  DefinitionItem,
  DefinitionNew,
} from "@/state/definition";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { clearChildren } from "@/utils/dom";
import { createRetryButton } from "@/ui/definition/retry";
import { createErrorMessage } from "@/ui/definition/error-message";

/** @param {HTMLDetailsElement} $definitionDetails */
export async function handleDefinitionOpen($definitionDetails) {
  const status = $definitionDetails.dataset.status;

  if (status === "success" || status === "loading") return;

  const $content = getElementBySelector(
    ".definition__content",
    HTMLElement,
    $definitionDetails,
  );
  const word = DefinitionItem.get($definitionDetails)?.word;

  if (word == null) return;

  $definitionDetails.dataset.status = "loading";

  const { getDefinition } = await import("@/services/definition");

  const [error, definitions] = await getDefinition(word);

  if (error != null) {
    $definitionDetails.dataset.status = "error";

    if ($content.querySelector(":scope > .definition__error") == null)
      $content.appendChild(createErrorMessage(error.message));

    if ($content.querySelector(":scope > .definition__retry") == null)
      $content.appendChild(createRetryButton($definitionDetails));

    return;
  }

  clearChildren($content);
  $definitionDetails
    .querySelector(":scope > .definition__label > .definition__badge")
    ?.remove();
  $definitionDetails.removeAttribute("data-status");

  for (const definition of definitions) {
    const $definition = document.createElement("p");

    $definition.textContent = `${definition}.`;
    $content.appendChild($definition);
  }

  DefinitionItem.get($definitionDetails)?.controller.abort();
  DefinitionItem.delete($definitionDetails);
  DefinitionNew.delete(word);
  if (hasCompletedAllDifficulties({ word })) DefinitionElement.delete(word);
  $definitionDetails.scrollIntoView();
}
