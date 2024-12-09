import { ServiceError, fetcher } from "@lib/fetcher";
import { QuotesResponseSchema, QuotesErrorResponseSchema } from "./schema";
import { parseQuotes } from "./parse";
import { randomElement } from "@/utils";
import quotesMock from "@/mocks/quotes.json";

/**
 * @typedef {"limit"|"offset"|"lang"|"curated"} QuoteServiceParamList
 * @typedef {import("@/types").Quote} Quote
 * @typedef {import("@lib/fetcher").PromiseWithError<Quote>} QuoteServiceResult
 * @typedef {import("@lib/fetcher").ParamOptions<QuoteServiceParamList>} QuoteParams
 */

const API_URL = "https://api.paperquotes.com";

const ApiResponseSchema = QuotesResponseSchema.or(QuotesErrorResponseSchema);
const QuotesError = new ServiceError("Quotes");

const PARAMS = {
  LIMIT: "1",
  LANG: "en",
  CURATED: "1",
};

/** @returns {QuoteServiceResult} */
export const getRandomQuote = async () => {
  const params = new URLSearchParams(
    /** @satisfies {QuoteParams} */ ({
      limit: PARAMS.LIMIT,
      offset: Math.floor(Math.random() * 217_699).toString(),
      lang: PARAMS.LANG,
      curated: PARAMS.CURATED,
    }),
  );

  const [error, data] = await fetcher(
    `${API_URL}/quotes?${params.toString()}`,
    {
      schema: ApiResponseSchema,
      serviceError: QuotesError,
      checkStatus: false, //
    },
  );

  if (error) return [error];

  if ("errno" in data) return [QuotesError.generic(data.errmsg)];

  return [null, parseQuotes(data.results)[0]];
};

/** @returns {QuoteServiceResult} */
export const getMockedRandomQuote = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [null, randomElement(parseQuotes(quotesMock.results))];
};
