import { handleRandomQuote } from "./handlers/random-quote";
import { handleCopyQuote } from "./handlers/copy-quote";
import { $copyQuote, $randomQuote } from "@/ui/actions";

export function setupListeners() {
  $randomQuote.addEventListener("click", () => handleRandomQuote());

  $copyQuote.addEventListener("click", () => handleCopyQuote());
}
