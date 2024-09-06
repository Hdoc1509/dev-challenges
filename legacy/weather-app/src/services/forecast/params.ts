import type { ParamOptions } from "@lib/fetcher";

export type ForecastParams = {
  client: ParamOptions<
    "latitude" | "longitude" | "daily" | "forecast_days" | "timezone"
  >;
};

const DAILY_VARIABLES = [
  "temperature_2m_max",
  "temperature_2m_min",
  "weather_code",
];

export const FORECAST_PARAMS = {
  DAILY: DAILY_VARIABLES.join(","),
  DAYS: "6",
  TIMEZONE: "auto",
};
