import { ValidationError, STATUS } from "@lib/fetcher";
import { getRandomQuote, getMockedRandomQuote } from "@/services/quotes";
import { setFetchingStatus } from "@/utils";
import { resetAlert } from "@lib/alert";
import { renderError, renderQuote } from "@/ui/quote/render";
import { handleCopyValidationError } from "./copy-error";
import { $copyError, $copyQuote } from "@/ui/actions";
import { $quote } from "@/ui/quote/elements";

let copyErrorHandler = () => {};

const quoteService = import.meta.env.DEV
  ? getMockedRandomQuote
  : getRandomQuote;

export function handleRandomQuote() {
  resetAlert();
  $copyError.removeEventListener("click", copyErrorHandler);
  setFetchingStatus(STATUS.LOADING);
  $quote.setAttribute("data-error", "");
  $copyQuote.disabled = true;

  quoteService().then(([error, quote]) => {
    if (error) {
      if (error instanceof ValidationError) {
        copyErrorHandler = () => handleCopyValidationError(error);
        $quote.setAttribute("data-error", "validation");
        $copyError.addEventListener("click", copyErrorHandler);
      }

      return renderError(error.message);
    }

    $copyQuote.disabled = false;
    renderQuote(quote);
  });
}
