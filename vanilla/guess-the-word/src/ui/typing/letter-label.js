/** @param {number} idx */
export function createLetterLabel(idx) {
  const $hiddenLabel = document.createElement("span");

  $hiddenLabel.textContent = `Letter ${idx + 1}`;
  $hiddenLabel.classList.add("visually-hidden");
  $hiddenLabel.setAttribute("id", `letter-label-${idx}`);

  return $hiddenLabel;
}
