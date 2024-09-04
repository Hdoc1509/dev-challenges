import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { QuotesResponseSchema, type QuotesResponse } from "./schema";
import { FAVQS_API } from "@/config";

export const getRandomQuote = async (): PromiseWithError<QuotesResponse> => {
  const [error, data] = await fetcher(`${FAVQS_API.URL}/quotes`, {
    schema: QuotesResponseSchema,
    serviceError: new ServiceError("Quotes"),
    headers: FAVQS_API.HEADERS,
  });

  if (error) return [error];

  return [null, data];
};
