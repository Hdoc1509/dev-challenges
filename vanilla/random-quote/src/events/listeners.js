import { handleRandomQuote } from "./handlers/random-quote";
import { handleCopyToClipboard } from "./handlers/copy-clipboard";
import { $copyQuote, $randomQuote } from "@/ui/actions";

export function setupListeners() {
  $randomQuote.addEventListener("click", () => handleRandomQuote());

  $copyQuote.addEventListener("click", () => handleCopyToClipboard());
}
