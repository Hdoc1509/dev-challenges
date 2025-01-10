import { getElementById, getElementBySelector } from "@lib/dom";
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
const $qrImg = getElementBySelector("img", HTMLImageElement, $picture);
// const $qrCanvas = getElementBySelector("canvas", HTMLCanvasElement, $picture);

const handleDownload = () => {
  // TODO: use html2canvas to download image
  // https://html2canvas.hertzen.com/
  // - use `canvas.toDataURL("image/png")` to set image source
  // - it will allow to include white border/background on image
  // - and removes the need to access image or canvas elements conditionally
  const $anchor = document.createElement("a");

  $anchor.href = $qrImg.src;
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
