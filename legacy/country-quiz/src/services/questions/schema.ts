import { z } from "zod";

export const StoredSchema = z.array(
  z.object({
    name: z.string(),
    region: z.string(),
    capital: z.array(z.string()),
    flagUrl: z.string(),
  }),
);
