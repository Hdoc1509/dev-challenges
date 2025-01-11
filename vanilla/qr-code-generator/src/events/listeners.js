import { handleDownloadQRImage } from "@/events/handlers/download-image";
import { handleCopyQRQuote } from "@/events/handlers/copy-quote";
import { $downloadQRImage, $shareQRQuote } from "@/ui/actions";
import { $errorDialog, $errorClose } from "@/ui/error";

/** @param {string} qrQuote */
export function setupListeners(qrQuote) {
  document.addEventListener("click", (e) => {
    if (e.target === $downloadQRImage) handleDownloadQRImage();

    if (e.target === $shareQRQuote) handleCopyQRQuote(qrQuote);

    if (e.target === $errorClose) $errorDialog.close();
  });
}
