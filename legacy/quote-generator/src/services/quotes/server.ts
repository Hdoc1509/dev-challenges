import { fetcher, is5xxError, type PromiseWithError } from "@lib/fetcher";
import {
  QuoteListErrorResponseSchema,
  QuoteListResponseSchema,
  type QuoteResponse,
} from "./schema";
import { QuotesServiceError } from "./service-error";
import { parseServerQuotes } from "./parse";
import { FAVQS_API } from "@/config";
import type { AuthorQuotesParams } from "./params";

const fetcherOptions = {
  schema: QuoteListResponseSchema.or(QuoteListErrorResponseSchema),
  serviceError: QuotesServiceError,
  headers: FAVQS_API.HEADERS,
};

export const getRandomQuote = async (): PromiseWithError<QuoteResponse> => {
  const [error, data] = await fetcher(
    `${FAVQS_API.URL}/quotes`,
    fetcherOptions,
  );

  if (error) return [is5xxError(error) ? QuotesServiceError.internal() : error];

  if ("error_code" in data) return [QuotesServiceError.generic(data.message)];

  return [null, parseServerQuotes(data.quotes)[0]];
};

export const getAuthorQuotes = async (
  author: string,
): PromiseWithError<QuoteResponse[]> => {
  const params = new URLSearchParams({
    type: "author",
    filter: author,
  } satisfies AuthorQuotesParams["server"]);

  const [error, data] = await fetcher(
    `${FAVQS_API.URL}/quotes?${params.toString()}`,
    fetcherOptions,
  );

  if (error) return [is5xxError(error) ? QuotesServiceError.internal() : error];

  if ("error_code" in data) return [QuotesServiceError.generic(data.message)];

  return [null, parseServerQuotes(data.quotes)];
};
