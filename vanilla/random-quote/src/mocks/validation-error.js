import { ValidationError } from "@lib/fetcher";
import { z } from "zod";

export const validationErrorMock = new ValidationError(
  "Mocked Validation Error",
  new z.ZodError([
    {
      code: "invalid_type",
      expected: "string",
      received: "number",
      path: ["results", 0, "text"],
      message: "Expected string, received number",
    },
  ]),
);
