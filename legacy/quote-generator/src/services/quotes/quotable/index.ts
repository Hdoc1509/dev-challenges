import { fetcher, ServiceError } from "@lib/fetcher";
import {
  AuthorQuotesResponseSchema,
  RandomQuoteResponseSchema,
} from "./schema";
import { parseQuotes } from "./parse";
import type { AuthorQuotesService, RandomQuoteService } from "../types";

const API_URL = "https://api.quotable.io/quotes";
const QuotesError = new ServiceError("Quotes");

export const getRandomQuote: RandomQuoteService = async () => {
  const [error, data] = await fetcher(`${API_URL}/random`, {
    schema: RandomQuoteResponseSchema,
    serviceError: QuotesError,
  });

  if (error) return [error];

  return [null, parseQuotes(data)[0]];
};

export const getAuthorQuotes: AuthorQuotesService = async (
  author,
  limit = 3,
) => {
  const params = new URLSearchParams({ author, limit: `${limit}` });
  console.log(params.toString());

  const [error, data] = await fetcher(`${API_URL}?${params.toString()}`, {
    schema: AuthorQuotesResponseSchema,
    serviceError: QuotesError,
  });

  if (error) return [error];

  return [null, parseQuotes(data.results)];
};
