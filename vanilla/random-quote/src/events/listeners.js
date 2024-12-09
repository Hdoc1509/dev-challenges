import { getMockedRandomQuote } from "@/services/quotes";
import { $randomQuote } from "@/ui/actions";
import { $quote } from "@/ui/quote/elements";
import { renderError, renderQuote } from "@/ui/quote/render";

export function setupListeners() {
  $randomQuote.addEventListener("click", () => {
    $quote.setAttribute("data-status", "LOADING");
    getMockedRandomQuote().then(([error, quote]) => {
      if (error) {
        renderError(error.message);
        $quote.setAttribute("data-status", "ERROR");
        return;
      }

      $quote.setAttribute("data-status", "LOADED");
      renderQuote(quote);
    });
  });
}
