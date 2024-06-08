import * as z from "zod";

export const SearchCityResponseSchema = z.array(
  z
    .object({
      id: z.number(),
      name: z.string(),
      region: z.string(),
      country: z.string(),
      lat: z.number(),
      lon: z.number(),
      url: z.string(),
    })
    .transform(({ id, name, country, lat, lon }) => ({
      id,
      name,
      country,
      latitude: lat,
      longitude: lon,
    })),
);
export type SearchCityResponse = z.infer<typeof SearchCityResponseSchema>;
