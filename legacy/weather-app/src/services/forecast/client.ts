import { OPEN_METEO_API_URL } from "@/config";
import { ForecastSchema } from "@/schemas/forecast";
import type { Forecast } from "@/types";
import { parseForecast } from "@/utils/forecast";
import type { LocationCoords } from "@/types";

const dailyParams = [
  "temperature_2m_max",
  "temperature_2m_min",
  "weather_code",
];

export const getForecast = async (
  coords: LocationCoords,
): Promise<Forecast[]> => {
  // TODO: Use error handling method from github-jobs
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    daily: dailyParams.join(","),
    forecast_days: "6",
    timezone: "auto",
  });

  const res = await fetch(
    `${OPEN_METEO_API_URL}/forecast?${params.toString()}`,
  );
  const data = ForecastSchema.parse(await res.json());

  return parseForecast(data);
};
