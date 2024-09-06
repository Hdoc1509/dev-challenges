import { z } from "zod";

export const ApiErrorSchema = z.object({ error: z.string() });
