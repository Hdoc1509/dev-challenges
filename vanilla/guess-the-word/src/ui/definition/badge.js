/** @param {{ $label: HTMLElement}} params */
export function addNewBadge({ $label }) {
  const $badge = document.createElement("span");

  $badge.classList.add("definition__badge");
  $badge.textContent = "New";
  $label.appendChild($badge);
}
