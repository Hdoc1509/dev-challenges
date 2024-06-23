import * as z from "zod";

const PaginationSchema = z.object({
  currentPage: z.number(),
  nextPage: z.number().nullable(),
  totalPages: z.number(),
});

const QuoteSchema = z.object({
  _id: z.string(),
  quoteText: z.string(),
  quoteAuthor: z.string(),
  quoteGenre: z.string(),
  __v: z.number(),
});
export type QuoteResponse = z.infer<typeof QuoteSchema>;

export const QuotesResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  pagination: PaginationSchema,
  totalQuotes: z.number(),
  data: z.array(QuoteSchema),
});
