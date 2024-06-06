import * as z from "zod";

export const PaginationSchema = z.object({
  currentPage: z.number(),
  nextPage: z.number().nullable(),
  totalPages: z.number(),
});

export const QuoteSchema = z
  .object({
    _id: z.string(),
    quoteText: z.string(),
    quoteAuthor: z.string(),
    quoteGenre: z.string(),
    __v: z.number(),
  })
  .transform(({ _id, quoteText, quoteAuthor, quoteGenre }) => ({
    id: _id,
    text: quoteText,
    author: quoteAuthor,
    genre: quoteGenre,
  }));
export type Quote = z.infer<typeof QuoteSchema>;

export const QuoteResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  pagination: PaginationSchema,
  totalQuotes: z.number(),
  data: z.array(QuoteSchema),
});
