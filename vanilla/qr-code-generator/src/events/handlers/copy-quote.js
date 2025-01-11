import { resetAlert, showAlert } from "@lib/alert";
import { copyToClipboard } from "@/utils/clipboard";
import { $errorDialog, $errorMessage } from "@/ui/error";

/** @param {string} qrQuote */
export const handleCopyQRQuote = async (qrQuote) => {
  const error = await copyToClipboard(qrQuote);

  if (error != null) {
    $errorMessage.textContent = error.message;
    $errorDialog.showModal();
    return;
  }

  resetAlert();
  showAlert({ text: "✅ QR quote copied to clipboard!", color: "success" });
};
