import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  QuoteListResponseSchema,
  type QuoteResponse,
  type QuoteListResponse,
} from "./schema";
import { FAVQS_API } from "@/config";

export const getRandomQuote = async (): PromiseWithError<QuoteResponse> => {
  const [error, data] = await fetcher(`${FAVQS_API.URL}/quotes`, {
    schema: QuoteListResponseSchema,
    serviceError: new ServiceError("Quotes"),
    headers: FAVQS_API.HEADERS,
  });

  if (error) return [error];

  return [null, data.quotes[0]];
};

type AuthorParamsOptions = { filter: string; type: "author" };

export const getAuthorQuotes = async (
  author: string,
): PromiseWithError<QuoteListResponse> => {
  const paramsOptions: AuthorParamsOptions = { type: "author", filter: author };
  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(
    `${FAVQS_API}/quotes?${params.toString()}`,
    {
      schema: QuoteListResponseSchema,
      serviceError: new ServiceError("Quotes"),
      headers: FAVQS_API.HEADERS,
    },
  );

  if (error) return [error];

  return [null, data];
};
