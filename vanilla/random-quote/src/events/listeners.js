import { showAlert } from "@lib/alert";
import { handleRandomQuote } from "./handlers/random-quote";
import { $copyQuote, $randomQuote } from "@/ui/actions";
import { $text } from "@/ui/quote/elements";

export function setupListeners() {
  $randomQuote.addEventListener("click", () => handleRandomQuote());

  $copyQuote.addEventListener("click", () => {
    if ($text.textContent == null) return;

    navigator.clipboard.writeText($text.textContent);
    showAlert({ color: "success", text: "✅ Quote copied to clipboard!" });
  });
}
