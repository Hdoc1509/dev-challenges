import * as z from "zod";

export const QuoteSchema = z.object({
  id: z.number(),
  dialogue: z.boolean(),
  private: z.boolean(),
  tags: z.array(z.string()),
  url: z.string(),
  favorites_count: z.number(),
  upvotes_count: z.number(),
  downvotes_count: z.number(),
  author: z.string().optional(),
  author_permalink: z.string().optional(),
  body: z.string().optional(),
});
export type QuoteResponse = z.infer<typeof QuoteSchema>;

export const QuoteListResponseSchema = z.object({
  page: z.number(),
  last_page: z.boolean(),
  quotes: z.array(QuoteSchema),
});
