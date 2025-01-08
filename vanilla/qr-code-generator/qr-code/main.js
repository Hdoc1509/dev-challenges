import { getElementById, getElementBySelector } from "@lib/dom";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "@/styles/global.css";
import "@/styles/page/qr-code.css";

const urlParam = new URL(location.href).searchParams.get("url");

if (!urlParam) {
  throw new Error("Url param is required");
}

const $picture = getElementById("qr-code-image", HTMLPictureElement);

// eslint-disable-next-line no-undef
new QRCode($picture, {
  text: urlParam,
  colorDark: "#111729",
  colorLight: "#f2f5f9",
});

const $downloadQRImage = getElementById("download-qr-image", HTMLButtonElement);
const $qrImg = getElementBySelector("img", HTMLImageElement, $picture);
// const $qrCanvas = getElementBySelector("canvas", HTMLCanvasElement, $picture);

const handleDownload = () => {
  const $anchor = document.createElement("a");

  $anchor.href = $qrImg.src;
  $anchor.download = "qr-code.png";
  $anchor.click();
}

document.addEventListener("click", (e) => {
  if (e.target === $downloadQRImage) handleDownload();
});
