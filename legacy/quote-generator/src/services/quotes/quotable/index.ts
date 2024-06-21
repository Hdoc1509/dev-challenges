import {
  AuthorQuotesResponseSchema,
  RandomQuoteResponseSchema,
} from "./schema";
import { fetcher, ServiceError, type PromiseWithError } from "@lib/fetcher";
import type { Quote } from "@/types";

const API_URL = "https://api.quotable.io/quotes";
const QuotesError = new ServiceError("Quotes");

export const getRandomQuote = async (): PromiseWithError<Quote> => {
  const [error, data] = await fetcher(`${API_URL}/random`, {
    schema: RandomQuoteResponseSchema,
    serviceError: QuotesError,
  });

  if (error) return [error];

  return [null, data[0]];
};

export const getAuthorQuotes = async (
  author: string,
  limit = 3,
): PromiseWithError<Quote[]> => {
  const params = new URLSearchParams({ author, limit: `${limit}` });
  console.log(params.toString());

  const [error, data] = await fetcher(`${API_URL}?${params.toString()}`, {
    schema: AuthorQuotesResponseSchema,
    serviceError: QuotesError,
  });

  if (error) return [error];

  return [null, data.results];
};
