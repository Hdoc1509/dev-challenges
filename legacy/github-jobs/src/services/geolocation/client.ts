import { fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { LocationResponseSchema } from "./schema";
import { GeolocationServiceError } from "./service-error";
import { pickLocationOption } from "@/utils/geolocation";
import type { LocationOptions } from "@/types";
import type { LocationParams } from "./params";

const ApiResponseSchema = LocationResponseSchema.or(ApiErrorSchema);

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<string> => {
  const params = new URLSearchParams({
    q: pickLocationOption(options),
  } satisfies LocationParams["client"]);

  const [error, data] = await fetcher(`/api/geolocation?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: GeolocationServiceError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, data[0].name];
};
