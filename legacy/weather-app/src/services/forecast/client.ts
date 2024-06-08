import { parseForecast } from "@/utils/forecast";
import { ForecastSchema } from "@/schemas/forecast";
import { OPEN_METEO_API } from "@/config";
import type { Forecast, LocationCoords, PromiseWithError } from "@/types";

const dailyParams = [
  "temperature_2m_max",
  "temperature_2m_min",
  "weather_code",
].join(",");

export const getForecast = async (
  coords: LocationCoords,
): PromiseWithError<Forecast[]> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: `${latitude}`,
    longitude: `${longitude}`,
    daily: dailyParams,
    forecast_days: "6",
    timezone: "auto",
  });

  try {
    const res = await fetch(
      `${OPEN_METEO_API.URL}/forecast?${params.toString()}`,
    );

    if (!res.ok) return [new Error("Forecast service error. Response error.")];

    const parsedData = ForecastSchema.safeParse(await res.json());

    if (!parsedData.success)
      return [new Error("Forecast service error. Invalid data")];

    return [null, parseForecast(parsedData.data)];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [
    new Error(
      "Forecast service error. Something went wrong. Please try again later.",
    ),
  ];
};
