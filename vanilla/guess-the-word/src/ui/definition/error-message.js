/** @param {string} message */
export function createErrorMessage(message) {
  const $error = document.createElement("p");

  $error.classList.add("definition__error", "text-center");
  $error.textContent = message;

  return $error;
}
