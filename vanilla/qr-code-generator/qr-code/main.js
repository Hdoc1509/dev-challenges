import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "@/styles/global.css";
import "@/styles/page/qr-code.css";

const PICTURE_ID = "qr-code-image";
const urlParam = new URL(location.href).searchParams.get("url");

if (!urlParam) {
  throw new Error("Url param is required");
}

// eslint-disable-next-line no-undef
new QRCode(PICTURE_ID, {
  text: urlParam,
  colorDark: "#111729",
  colorLight: "#f2f5f9",
});
