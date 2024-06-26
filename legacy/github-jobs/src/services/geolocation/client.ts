import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { LocationResponseSchema } from "./schema";
import type { LocationOptions } from "@/types";

const ApiResponseSchema = LocationResponseSchema.or(ApiErrorSchema);
const GeolocationError = new ServiceError("Geolocation");

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<string> => {
  const params = new URLSearchParams();

  if ("coords" in options) {
    const { latitude, longitude } = options.coords;
    params.append("q", `${latitude},${longitude}`);
  } else {
    params.append("q", `${options.zipCode}`);
  }

  const [error, data] = await fetcher(`/api/geolocation?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: GeolocationError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, data[0].name];
};
