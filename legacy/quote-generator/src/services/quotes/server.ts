import {
  ServiceError,
  fetcher,
  is5xxError,
  type PromiseWithError,
} from "@lib/fetcher";
import {
  QuoteListErrorResponseSchema,
  QuoteListResponseSchema,
  type QuoteResponse,
} from "./schema";
import { parseServerQuotes } from "./parse";
import { FAVQS_API } from "@/config";

const QuotesServiceError = new ServiceError("Quotes");
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

  if (error) {
    if (is5xxError(error)) return [QuotesServiceError.internal()];

    return [error];
  }

  if ("error_code" in data) return [QuotesServiceError.generic(data.message)];

  return [null, parseServerQuotes(data.quotes)[0]];
};

type AuthorParamsOptions = { filter: string; type: "author" };

export const getAuthorQuotes = async (
  author: string,
): PromiseWithError<QuoteResponse[]> => {
  const paramsOptions: AuthorParamsOptions = { type: "author", filter: author };
  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(
    `${FAVQS_API.URL}/quotes?${params.toString()}`,
    fetcherOptions,
  );

  if (error) {
    if (is5xxError(error)) return [QuotesServiceError.internal()];

    return [error];
  }

  if ("error_code" in data) return [QuotesServiceError.generic(data.message)];

  return [null, parseServerQuotes(data.quotes)];
};
