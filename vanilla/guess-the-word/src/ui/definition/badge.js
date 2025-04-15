/**
 * @param {Object} params
 * @param {HTMLDetailsElement} params.$details
 * @param {HTMLElement} params.$label
 */
export function addNewBadge({ $details, $label }) {
  const $badge = document.createElement("span");

  $badge.classList.add("definition__badge");
  $badge.textContent = "New";
  $label.appendChild($badge);
  $details.dataset.new = "";
}
