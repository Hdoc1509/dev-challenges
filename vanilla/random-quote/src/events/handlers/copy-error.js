import { resetAlert, showAlert } from "@lib/alert";
import { renderError } from "@/ui/quote/render";
import { copyToClipboard } from "@/utils/clipboard";

/** @param {import("@lib/fetcher").ValidationError} error */
export async function handleCopyValidationError(error) {
  resetAlert();

  const text = JSON.stringify(error.error.issues, null, "  ");
  const clipboardError = await copyToClipboard(text);

  if (clipboardError != null) return renderError(clipboardError.message);

  showAlert({ color: "success", text: "✅ Error copied to clipboard!" });
}
