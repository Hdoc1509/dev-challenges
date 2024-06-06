import { z } from "zod";

const StaysResponseSchema = z.array(
  z.object({
    photo: z.string(),
    superHost: z.boolean(),
    city: z.string(),
    country: z.string(),
    title: z.string(),
    rating: z.number(),
    maxGuests: z.number(),
    type: z.string(),
    beds: z.number().nullable(),
  }),
);

export const validateResults = (results: unknown) => {
  return StaysResponseSchema.safeParse(results);
};
