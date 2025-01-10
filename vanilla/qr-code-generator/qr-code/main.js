import html2canvas from "html2canvas";
import { getElementById } from "@lib/dom";
import { copyToClipboard } from "@/utils/clipboard";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "@/styles/global.css";
import "@/styles/page/qr-code.css";

// NOTE: presence of `?url=` parameter is handled by redirect.js
const urlParam = /** @type {string} */ (
  new URL(location.href).searchParams.get("url")
);

const $picture = getElementById("qr-code-image", HTMLPictureElement);

new window.QRCode($picture, {
  text: urlParam,
  colorDark: "#111729",
  colorLight: "#f2f5f9",
});

const QR_QUOTE = $picture.title;

const $downloadQRImage = getElementById("download-qr-image", HTMLButtonElement);
const $shareQRQuote = getElementById("share-qr-quote", HTMLButtonElement);

const handleDownload = async () => {
  const $anchor = document.createElement("a");
  const canvas = await html2canvas($picture);
  const source = canvas.toDataURL("image/png");

  $anchor.href = source;
  $anchor.download = "qr-code.png";
  $anchor.click();
};

const handleCopy = () => {
  copyToClipboard(QR_QUOTE);
  // TODO: show alert
};

document.addEventListener("click", (e) => {
  if (e.target === $downloadQRImage) handleDownload();

  if (e.target === $shareQRQuote) handleCopy();
});
