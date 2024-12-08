/** @typedef {import("@/types").Quote} Quote */
/** @typedef {import("./schema").QuotesResponse} QuotesResponse */

/**
 * @param {QuotesResponse["results"][number]} quote
 * @returns {Quote}
 */
export function parseQuote(quote) {
  const { author, tags, pk } = quote;
  return { id: pk, text: quote.quote, author, tags };
}
