import { resetAlert, showAlert } from "@lib/alert";
import { renderError } from "@/ui/quote/render";
import { copyToClipboard } from "@/utils/clipboard";
import { $text } from "@/ui/quote/elements";

export async function handleCopyToClipboard() {
  const text = $text.textContent;

  if (text == null) return;

  resetAlert();

  const clipboardError = await copyToClipboard(text);

  if (clipboardError != null) return renderError(clipboardError.message);

  showAlert({ color: "success", text: "✅ Quote copied to clipboard!" });
}
