import type { PromiseWithError } from "@lib/fetcher";
import type { Quote } from "@/types";

export type RandomQuoteService = () => PromiseWithError<Quote>;
export type AuthorQuotesService = (
  author: string,
  limit?: number,
) => PromiseWithError<Quote[]>;
