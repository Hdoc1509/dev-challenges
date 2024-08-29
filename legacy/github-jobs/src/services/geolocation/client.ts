import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { LocationResponseSchema } from "./schema";
import type { LocationOptions } from "@/types";
import type { SharedSearchParams } from "./params";

type SearchParams = SharedSearchParams;

const ApiResponseSchema = LocationResponseSchema.or(ApiErrorSchema);
const GeolocationError = new ServiceError("Geolocation");

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<string> => {
  const paramsOptions: SearchParams = { q: "" };

  if ("coords" in options) {
    const { latitude, longitude } = options.coords;
    paramsOptions.q = `${latitude},${longitude}`;
  } else {
    paramsOptions.q = `${options.zipCode}`;
  }

  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(`/api/geolocation?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: GeolocationError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, data[0].name];
};
