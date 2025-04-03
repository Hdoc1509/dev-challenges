/** @param {string} message */
export function createErrorMessage(message) {
  const $error = document.createElement("p");

  $error.classList.add("definition__error");
  $error.textContent = message;

  return $error;
}
