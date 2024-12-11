import { showAlert } from "@lib/alert";
import { renderError } from "@/ui/quote/render";
/** @typedef {import('@lib/fetcher').ValidationError} ValidationError */

/** @param {unknown} error */
const isNotAllowedError = (error) =>
  error instanceof DOMException && error.name === "NotAllowedError";

/** @param {ValidationError} error */
export async function handleCopyValidationError(error) {
  try {
    await navigator.clipboard.writeText(
      JSON.stringify(error.error.issues, null, "  "),
    );
    showAlert({
      color: "success",
      text: "✅ Error copied to clipboard!",
    });
  } catch (error) {
    if (isNotAllowedError(error))
      return renderError("Clipboard Error: Access not allowed.");

    renderError("Clipboard Error: An unknown error occurred. Try again.");
  }
}
