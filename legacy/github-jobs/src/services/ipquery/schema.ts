import * as z from "zod";

// NOTE: simplified to pick only the fields we need

const LocationSchema = z.object({
  city: z.string(),
  country: z.string(),
  state: z.string(),
});

export const IPQueryResponseSchema = z.object({
  location: LocationSchema,
});
export type IPQueryResponse = z.infer<typeof IPQueryResponseSchema>;
