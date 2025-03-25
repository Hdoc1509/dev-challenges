import { $definitionPagesContainer } from "./pages";

export const removeAllNewBadges = () => {
  const $definitions = $definitionPagesContainer.querySelectorAll(
    ".definitions-list.page[data-active] .definition[data-new]",
  );

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-new");
    $definition.querySelector(".definition__badge")?.remove();
  });
};

/**
 * @param {Object} params
 * @param {HTMLDetailsElement} params.$details
 * @param {HTMLElement} params.$label
 */
// TODO: add way to integrate it with `DefinitionPages` instance
export const addNewBadge = ({ $details, $label }) => {
  const $badge = document.createElement("span");

  $badge.classList.add("definition__badge");
  $badge.textContent = "New";
  $label.appendChild($badge);
  $details.dataset.new = "";
};
