import { $definitionslist } from "./elements";

export const clearNewDefinitionStatus = () => {
  const $definitions = $definitionslist.querySelectorAll(
    ".definition[data-new]",
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
export const setNewDefinitionStatus = ({ $details, $label }) => {
  const $badge = document.createElement("span");

  $badge.classList.add("definition__badge");
  $badge.textContent = "New";
  $label.appendChild($badge);
  $details.dataset.new = "";
};
