import { z } from "zod";
import { fetcher } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { QuoteSchema } from "./schema";
import { QuotesServiceError } from "./service-error";
import { parseQuotes } from "./parse";
import type { AuthorQuotesService, RandomQuoteService } from "./types";
import type { AuthorQuotesParams } from "./params";

export const getRandomQuote: RandomQuoteService = async () => {
  const [error, data] = await fetcher("/api/quotes/random", {
    serviceError: QuotesServiceError,
    schema: QuoteSchema.or(ApiErrorSchema),
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, parseQuotes([data])[0]];
};

export const getAuthorQuotes: AuthorQuotesService = async (author) => {
  const paramsOptions: AuthorQuotesParams["client"] = { author };
  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(`/api/quotes?${params.toString()}`, {
    serviceError: QuotesServiceError,
    schema: z.array(QuoteSchema).or(ApiErrorSchema),
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, parseQuotes(data)];
};
