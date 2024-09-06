import { z } from "zod";
import { ServiceError, fetcher } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { QuoteSchema } from "./schema";
import { parseQuotes } from "./parse";
import type { AuthorQuotesService, RandomQuoteService } from "./types";

const QuotesServiceError = new ServiceError("Quotes");

export const getRandomQuote: RandomQuoteService = async () => {
  const [error, data] = await fetcher("/api/quotes/random", {
    serviceError: QuotesServiceError,
    schema: QuoteSchema.or(ApiErrorSchema),
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, parseQuotes([data])[0]];
};

type AuthorParamsOptions = { author: string };

export const getAuthorQuotes: AuthorQuotesService = async (author) => {
  const paramsOptions: AuthorParamsOptions = { author };
  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(`/api/quotes?${params.toString()}`, {
    serviceError: QuotesServiceError,
    schema: z.array(QuoteSchema).or(ApiErrorSchema),
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, parseQuotes(data)];
};
