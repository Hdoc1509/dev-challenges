import * as z from "zod";

export const LocationPositionSchema = z
  .object({
    name: z.string(),
    local_names: z
      .union([z.record(z.string(), z.string()), z.null()])
      .optional(),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string(),
  })
  .transform(({ lat, lon }) => ({ latitude: lat, longitude: lon }));

export type LocationPosition = z.infer<typeof LocationPositionSchema>;

export const LocationResponseSchema = z.array(LocationPositionSchema);
