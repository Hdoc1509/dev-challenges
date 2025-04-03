import { getDefinition } from "@/services/definition";
import { getElementBySelector } from "@lib/dom";
import { createRetryButton } from "@/ui/definition/retry";
import { createErrorMessage } from "@/ui/definition/error-message";
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
  let $error = $content.querySelector(".definition__error");
  let $retry = $content.querySelector(".definition__retry");
  /** @type {HTMLDivElement | null} */
  let $spinner = $content.querySelector(".spinner");
  const word = /** @type {string} */ ($definitionDetails.dataset.word);

  if ($spinner == null) $content.appendChild(createSpinner());

  $definitionDetails.dataset.status = "loading";
  const [error, definitions] = await getDefinition(word);

  if (error != null) {
    $definitionDetails.dataset.status = "error";

    if ($error == null) {

      $content.appendChild(createErrorMessage(error.message));
    }

    if ($retry == null)
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
