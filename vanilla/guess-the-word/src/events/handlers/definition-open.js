import { ResponseError } from "@lib/fetcher";
import { getDefinition } from "@/services/definition";
import { getElementBySelector } from "@lib/dom";
import { createRetryButton } from "@/ui/definition/retry";
import { createErrorMessage } from "@/ui/definition/error-message";
import { createErrorRemovedMessage } from "@/ui/definition/error-removed";
import { createSpinner } from "@/ui/spinner";
import { hasCompletedDifficulties } from "@/utils/difficulty/completed";

/**
 * @param {HTMLDetailsElement} $definitionDetails
 * @param {{ controller: AbortController }} extraParams
 */
export async function handleDefinitionOpen($definitionDetails, { controller }) {
  const status = $definitionDetails.dataset.status;

  if (status === "success" || status === "loading") return;

  const $content = getElementBySelector(
    ".definition__content",
    HTMLElement,
    $definitionDetails,
  );
  const word = /** @type {string} */ ($definitionDetails.dataset.word);

  if ($content.querySelector(".spinner") == null)
    $content.appendChild(createSpinner());

  $definitionDetails.dataset.status = "loading";
  const [error, definitions] = await getDefinition(word);

  if (error != null) {
    $definitionDetails.dataset.status = "error";

    if ($content.querySelector(".definition_error") == null) {
      if (error instanceof ResponseError && error.res.status === 404) {
        controller.abort();
        $definitionDetails.removeAttribute("data-word");
        $content.appendChild(
          createErrorRemovedMessage($definitionDetails, { word }),
        );
        $content.querySelector(".spinner")?.remove();
        return;
      }

      $content.appendChild(createErrorMessage(error.message));
    }

    if ($content.querySelector(".definition__retry") == null)
      $content.appendChild(
        createRetryButton({ $definitionDetails, controller }),
      );

    return;
  }

  $definitionDetails.dataset.status = "success";
  for (const definition of definitions) {
    const $definition = document.createElement("p");

    $definition.textContent = `${definition}.`;
    $content.appendChild($definition);
  }

  controller.abort();
  if (hasCompletedDifficulties({ word }))
    $definitionDetails.removeAttribute("data-word");
  $definitionDetails.removeAttribute("data-status");
  $definitionDetails.scrollIntoView();
  $content.querySelector(".definition__error")?.remove();
  $content.querySelector(".definition__retry")?.remove();
  $content.querySelector(".spinner")?.remove();
}
