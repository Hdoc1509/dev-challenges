import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ForecastResponseSchema } from "./schema";
import { parseForecast } from "./parse";
import { OPEN_METEO_API } from "@/config";
import { FORECAST_PARAMS } from "./params";
import type { LocationCoords } from "@lib/geolocation";
import type { Forecast, ParamOptions } from "@/types";

type ForecastParams = ParamOptions<
  "latitude" | "longitude" | "daily" | "forecast_days" | "timezone"
>;

const ForecastError = new ServiceError("Forecast");

export const getForecast = async (
  coords: LocationCoords,
): PromiseWithError<Forecast[]> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: `${latitude}`,
    longitude: `${longitude}`,
    daily: FORECAST_PARAMS.DAILY,
    forecast_days: FORECAST_PARAMS.DAYS,
    timezone: FORECAST_PARAMS.TIMEZONE,
  } satisfies ForecastParams);

  const [error, data] = await fetcher(
    `${OPEN_METEO_API.URL}/forecast?${params.toString()}`,
    {
      schema: ForecastResponseSchema,
      serviceError: ForecastError,
    },
  );

  if (error) return [error];

  return [null, parseForecast(data)];
};
