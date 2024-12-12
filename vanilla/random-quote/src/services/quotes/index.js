import { ServiceError, fetcher } from "@lib/fetcher";
import { QuotesResponseSchema, QuotesErrorResponseSchema } from "./schema";
import { parseQuotes } from "./parse";
import { randomElement, randomInt } from "@/utils";
import quotesMock from "@/mocks/quotes.json";

/**
 * @typedef {"limit"|"offset"|"lang"|"curated"} QuoteServiceParamList
 * @typedef {import("@/types").Quote} Quote
 * @typedef {import("@lib/fetcher").PromiseWithError<Quote>} QuoteServiceResult
 * @typedef {import("@lib/fetcher").ParamOptions<QuoteServiceParamList>} QuoteParams
 */

// https://paperquotes.com/api-docs/
const API_URL = "https://api.paperquotes.com";

const ApiResponseSchema = QuotesResponseSchema.or(QuotesErrorResponseSchema);
const QuotesError = new ServiceError("Quotes");

// https://api.paperquotes.com/quotes/?curated=1&lang=en&limit=10&offset=20100
const OFFSET_MAX = 2_010;

const PARAMS = {
  LIMIT: "10",
  LANG: "en",
  CURATED: "1",
};

const getRandomOffset = () => randomInt(0, OFFSET_MAX) * Number(PARAMS.LIMIT);

/** @returns {QuoteServiceResult} */
export const getRandomQuote = async () => {
  const params = new URLSearchParams(
    /** @satisfies {QuoteParams} */ ({
      limit: PARAMS.LIMIT,
      offset: getRandomOffset().toString(),
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
  await new Promise((resolve) => setTimeout(resolve, randomInt(1000, 3000)));
  return [null, randomElement(parseQuotes(quotesMock.results))];
};
