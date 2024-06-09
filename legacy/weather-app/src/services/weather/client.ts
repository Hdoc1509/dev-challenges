import { ServiceError, fetcher } from "@lib/fetcher";
import { parseWeather } from "@/utils/weather";
import { ApiErrorSchema } from "@/schemas/api-error";
import { WeatherResponseSchema } from "@/schemas/weather";
import type { LocationCoords, PromiseWithError, Weather } from "@/types";

const ApiResponseSchema = WeatherResponseSchema.or(ApiErrorSchema);
const WeatherError = new ServiceError("Weather");

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<Weather> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: `${latitude}`,
    longitude: `${longitude}`,
  });

  const [error, data] = await fetcher(`/api/weather?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: WeatherError,
    checkStatus: false,
    // NOTE:
    // response error is the same for client and server, because of ServiceError
    // it means that `checkStatus` option has no effect to the error message
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)];

  return [null, parseWeather(data)];
};
