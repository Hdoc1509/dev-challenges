import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { LocationResponseSchema } from "./schema";
import { pickLocationOption } from "@/utils/geolocation";
import type { LocationOptions } from "@/types";
import type { LocationParams } from "./params";

const ApiResponseSchema = LocationResponseSchema.or(ApiErrorSchema);
const GeolocationError = new ServiceError("Geolocation");

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<string> => {
  const params = new URLSearchParams({
    q: pickLocationOption(options),
  } satisfies LocationParams["client"]);

  const [error, data] = await fetcher(`/api/geolocation?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: GeolocationError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, data[0].name];
};
