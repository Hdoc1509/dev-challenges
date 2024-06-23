import * as z from "zod";

export const LocationResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  url: z.string(),
});
export type LocationResponse = z.infer<typeof LocationResponseSchema>;

export const SearchLocationResponseSchema = z.array(LocationResponseSchema);

// based on http://www.weatherapi.com/docs/#intro-error-codes
export const SearchLocationErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});
