import type { Quote } from "@/types";
import * as z from "zod";

export const QuoteSchema = z
  .object({
    _id: z.string(),
    content: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    authorSlug: z.string(),
    length: z.number(),
    dateAdded: z.string(),
    dateModified: z.string(),
  })
  .transform(
    ({ _id, content, author, tags }) =>
      ({
        id: _id,
        text: content,
        author,
        genre: tags[0],
      }) satisfies Quote,
  );

export const RandomQuoteResponseSchema = z.array(QuoteSchema);

export const AuthorQuotesResponseSchema = z.object({
  count: z.number(),
  totalCount: z.number(),
  page: z.number(),
  totalPages: z.number(),
  lastItemIndex: z.number().nullable(),
  results: z.array(QuoteSchema),
});
