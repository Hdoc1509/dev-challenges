import * as z from "zod";

export const SearchLocationResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    url: z.string(),
  }),
);
export type SearchLocationResponse = z.infer<
  typeof SearchLocationResponseSchema
>;
