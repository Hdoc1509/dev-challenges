import * as z from "zod";

const QuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  authorSlug: z.string(),
  length: z.number(),
  dateAdded: z.string(),
  dateModified: z.string(),
});
export type QuoteResponse = z.infer<typeof QuoteSchema>;

export const RandomQuoteResponseSchema = z.array(QuoteSchema);

export const AuthorQuotesResponseSchema = z.object({
  count: z.number(),
  totalCount: z.number(),
  page: z.number(),
  totalPages: z.number(),
  lastItemIndex: z.number().nullable(),
  results: z.array(QuoteSchema),
});
