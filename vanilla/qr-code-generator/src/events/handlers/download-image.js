import html2canvas from "html2canvas";
import { $picture } from "@/ui/qr";

export const handleDownloadQRImage = async () => {
  const $anchor = document.createElement("a");
  const canvas = await html2canvas($picture, { logging: import.meta.env.DEV });
  const source = canvas.toDataURL("image/png");

  $anchor.href = source;
  $anchor.download = "qr-code.png";
  $anchor.click();
};
