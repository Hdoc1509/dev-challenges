import { setupListeners } from "@/events/listeners";
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

setupListeners(QR_QUOTE);
