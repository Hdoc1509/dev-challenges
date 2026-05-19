import * as z from "zod";

// NOTE: simplified to pick only the fields we need

const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const IPQueryResponseSchema = z.object({
  location: LocationSchema,
});
