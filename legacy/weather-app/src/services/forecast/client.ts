import { ServiceError, fetcher } from "@lib/fetcher";
import { ForecastSchema } from "@/schemas/forecast";
import { parseForecast } from "@/utils/forecast";
import { OPEN_METEO_API } from "@/config";
import { FORECAST_PARAMS } from "./params";
import type { LocationCoords } from "@lib/geolocation";
import type { Forecast, PromiseWithError } from "@/types";

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
  });

  const [error, data] = await fetcher(
    `${OPEN_METEO_API.URL}/forecast?${params.toString()}`,
    {
      schema: ForecastSchema,
      serviceError: ForecastError,
    },
  );

  if (error) return [error];

  return [null, parseForecast(data)];
};
