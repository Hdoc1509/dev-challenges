import * as z from "zod";

export const CityResponseSchema = z.array(
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
export type CityResponse = z.infer<typeof CityResponseSchema>;
