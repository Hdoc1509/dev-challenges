import { z } from "zod";
import { ApiErrorSchema } from "@/schemas/api-error";
import type { City, PromiseWithError } from "@/types";

const Schema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
);
const ApiResponseSchema = Schema.or(ApiErrorSchema);
const errorPrefix = "Search city service error";

export const searchCity = async (city: string): PromiseWithError<City[]> => {
  try {
    const res = await fetch(`/api/geolocation?city=${city}`);

    // NOTE: ALL VALIDATIONS are done on the SERVER
    // if api endpoint has an error, it returns `{ error: string }`
    const parsed = ApiResponseSchema.safeParse(await res.json());

    if (!parsed.success) return [new Error(`${errorPrefix}. Invalid data`)];

    if ("error" in parsed.data) return [new Error(parsed.data.error)];

    return [null, parsed.data];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [
    new Error(`${errorPrefix}. Something went wrong. Please try again later.`),
  ];
};
