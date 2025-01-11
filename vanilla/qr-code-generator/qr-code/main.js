import html2canvas from "html2canvas";
import { resetAlert, showAlert } from "@lib/alert";
import { copyToClipboard } from "@/utils/clipboard";
import { $downloadQRImage, $shareQRQuote } from "@/ui/actions";
import { $errorDialog, $errorMessage, $errorClose } from "@/ui/error";
import { $picture } from "@/ui/qr";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "@/styles/main.css";
import "@/styles/page/qr-code.css";

// NOTE: presence of `?url=` parameter is handled by redirect.js
const urlParam = /** @type {string} */ (
  new URL(location.href).searchParams.get("url")
);

new window.QRCode($picture, {
  text: urlParam,
  colorDark: "#111729",
  colorLight: "#f2f5f9",
});

const QR_QUOTE = $picture.title;

const handleDownload = async () => {
  const $anchor = document.createElement("a");
  const canvas = await html2canvas($picture, { logging: import.meta.env.DEV });
  const source = canvas.toDataURL("image/png");

  $anchor.href = source;
  $anchor.download = "qr-code.png";
  $anchor.click();
};

const handleCopy = async () => {
  const error = await copyToClipboard(QR_QUOTE);

  if (error != null) {
    $errorMessage.textContent = error.message;
    $errorDialog.showModal();
    return;
  }

  resetAlert();
  showAlert({ text: "✅ QR quote copied to clipboard!", color: "success" });
};

document.addEventListener("click", (e) => {
  if (e.target === $downloadQRImage) handleDownload();

  if (e.target === $shareQRQuote) handleCopy();

  if (e.target === $errorClose) $errorDialog.close();
});
