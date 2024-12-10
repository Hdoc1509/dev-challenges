import { resetAlert, showAlert } from "@lib/alert";
import { $text } from "@/ui/quote/elements";
import { renderError } from "@/ui/quote/render";

export async function handleCopyToClipboard() {
  if ($text.textContent == null) return;
  resetAlert();

  try {
    await navigator.clipboard.writeText($text.textContent);
    showAlert({ color: "success", text: "✅ Quote copied to clipboard!" });
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError")
      return renderError("😔 Clipboard access is not allowed.");

    renderError("Something went wrong while copying the quote to clipboard.");
  }
}
