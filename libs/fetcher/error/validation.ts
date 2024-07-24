import type { z } from "zod";

export class ValidationError extends Error {
  error: z.ZodError;

  constructor(message: string, error: z.ZodError) {
    super(message);
    this.name = "ValidationError";
    this.error = error;
  }
}
