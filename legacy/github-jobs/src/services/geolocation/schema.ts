import * as z from "zod";

// TODO: rename from Location... to SearchLocation...
// TODO: pick only the needed fields: name, regionand country
export const LocationResponseSchema = z.array(
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
export type LocationResponse = z.infer<typeof LocationResponseSchema>;

// based on http://www.weatherapi.com/docs/#intro-error-codes
export const LocationErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});
