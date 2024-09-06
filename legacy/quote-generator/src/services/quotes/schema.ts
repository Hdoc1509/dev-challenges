import * as z from "zod";

// from @/mocks/success.json
export const QuoteSchema = z.object({
  id: z.number(),
  dialogue: z.boolean(),
  private: z.boolean(),
  tags: z.array(z.string()),
  url: z.string(),
  favorites_count: z.number(),
  upvotes_count: z.number(),
  downvotes_count: z.number(),
  author: z.string(),
  body: z.string(),
});
export type QuoteResponse = z.infer<typeof QuoteSchema>;

// from @/mocks/success.json
export const QuoteMultipleAuthorSchema = QuoteSchema.omit({
  author: true,
  body: true,
}).extend({
  lines: z.array(
    z.object({
      position: z.number(),
      body: z.string(),
      author: z.string(),
    }),
  ),
});

// from @/mocks/success.json
export const QuoteListResponseSchema = z.object({
  page: z.number(),
  last_page: z.boolean(),
  quotes: z.array(QuoteSchema.or(QuoteMultipleAuthorSchema)).length(25),
});
export type QuoteListResponse = z.infer<typeof QuoteListResponseSchema>;
