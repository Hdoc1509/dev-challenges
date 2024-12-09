import { getMockedRandomQuote } from "@/services/quotes";
import { $copyQuote, $randomQuote } from "@/ui/actions";
import { $quote, $text } from "@/ui/quote/elements";
import { renderError, renderQuote } from "@/ui/quote/render";
import { showAlert } from "@lib/alert";

export function setupListeners() {
  $randomQuote.addEventListener("click", () => {
    $quote.setAttribute("data-status", "LOADING");
    $copyQuote.disabled = true;

    getMockedRandomQuote().then(([error, quote]) => {
      if (error) {
        renderError(error.message);
        $quote.setAttribute("data-status", "ERROR");
        return;
      }

      $quote.setAttribute("data-status", "LOADED");
      $copyQuote.disabled = false;
      renderQuote(quote);
    });
  });

  $copyQuote.addEventListener("click", () => {
    if ($text.textContent == null) return;

    navigator.clipboard.writeText($text.textContent);
    showAlert({ color: "success", text: "✅ Quote copied to clipboard!" });
  });
}
