import { z } from "zod";

const ResultSchema = z.object({
  quote: z.string(),
  author: z.string().nullable(),
  tags: z.array(z.string()),
  pk: z.number(),
});

export const QuotesResponseSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(ResultSchema),
});
/** @typedef {z.infer<typeof QuotesResponseSchema>} QuotesResponse */

export const QuotesErrorResponseSchema = z.object({
  errno: z.number(),
  errmsg: z.string(),
});
/** @typedef {z.infer<typeof QuotesErrorResponseSchema>} QuotesErrorResponse */
