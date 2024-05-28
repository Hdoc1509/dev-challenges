import * as z from "zod";

export const paginationSchema = z.object({
  currentPage: z.number(),
  nextPage: z.number().nullable(),
  totalPages: z.number(),
});
export type Pagination = z.infer<typeof paginationSchema>;

export const quoteSchema = z
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
export type Quote = z.infer<typeof quoteSchema>;

export const quoteResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  pagination: paginationSchema,
  totalQuotes: z.number(),
  data: z.array(quoteSchema),
});
export type QuoteResponse = z.infer<typeof quoteResponseSchema>;
