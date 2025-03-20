import { getMockedDefinition } from "@/services/definition";
import { getElementBySelector } from "@lib/dom";
import { $spinnerTemplate } from "@/ui/spinner";

/** @param {HTMLDetailsElement} $definitionDetails */
export async function handleDefinitionOpen($definitionDetails) {
  const status = $definitionDetails.dataset.status;

  if (status === "success" || status === "loading") return;

  const $content = getElementBySelector(
    ".definition__content",
    HTMLElement,
    $definitionDetails,
  );
  let $error = $content.querySelector(".definition__error");
  /** @type {HTMLButtonElement | null} */
  let $retry = $content.querySelector(".definition__retry");
  /** @type {HTMLDivElement | null} */
  let $spinner = $content.querySelector(".spinner");
  const word = /** @type {import("@/consts/definitions").DefinitionWord} */ (
    $definitionDetails.dataset.word
  );

  if ($spinner == null) {
    const $spinnerClone = $spinnerTemplate.content.cloneNode(true);
    $content.appendChild($spinnerClone);
  }

  $definitionDetails.dataset.status = "loading";
  const [error, definitions] = await getMockedDefinition(word);

  if (error != null) {
    $definitionDetails.dataset.status = "error";

    if ($error == null) {
      $error = document.createElement("p");
      $error.classList.add("definition__error");
      $error.textContent = error.message;
      $content.appendChild($error);
    }

    if ($retry == null) {
      // TODO: add listener with event delegation
      $retry = document.createElement("button");
      $retry.classList.add("definition__retry");
      $retry.textContent = "Try again";
      $retry.dataset.word = word;
      $content.appendChild($retry);
    }

    return;
  }

  $definitionDetails.dataset.status = "success";
  for (const definition of definitions) {
    const $definition = document.createElement("p");

    $definition.textContent = `${definition}.`;
    $content.appendChild($definition);
  }

  $definitionDetails.querySelector(".definition__error")?.remove();
  $definitionDetails.querySelector(".definition__retry")?.remove();
  $definitionDetails.querySelector(".spinner")?.remove();
}
