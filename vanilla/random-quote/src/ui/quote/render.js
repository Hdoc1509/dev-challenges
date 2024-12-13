import { setFetchingStatus } from "@/utils/status";
import { $author, $tags, $text, $error } from "./elements";
import { STATUS } from "@lib/fetcher";
/** @typedef {import('@/types').Quote} Quote */

/** @param {HTMLElement} $el */
function clearChildren($el) {
  while ($el.firstChild) $el.removeChild($el.firstChild);
}

/** @param {Quote} quote */
export function renderQuote(quote) {
  const { tags, text, author } = quote;

  clearChildren($tags);
  $author.textContent = author;
  $text.textContent = text;
  tags.slice(0, 2).forEach((tag) => {
    const $tag = document.createElement("li");

    $tag.classList.add("quote__tag");
    $tag.textContent = tag;
    $tags.appendChild($tag);
  });
  setFetchingStatus(STATUS.SUCCESS);
}

/** @param {string} error */
export function renderError(error) {
  $error.textContent = error;
  setFetchingStatus(STATUS.ERROR);
}
