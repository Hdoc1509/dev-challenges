import { formatDate, parseDate } from "./date";
import { FORECAST_CODES } from "../consts";
import type { ForecastResponse } from "../schemas/forecast";
import type { Forecast } from "../store/weather";

export const parseForecast = (data: ForecastResponse): Forecast[] => {
  const { daily } = data;
  const { time, temperature_2m_max, temperature_2m_min, weather_code } = daily;
  const forecast: Forecast[] = [];

  time.forEach((date, index) => {
    forecast.push({
      day: formatDate(parseDate(date)),
      temperature: {
        min: temperature_2m_min[index],
        max: temperature_2m_max[index],
      },
      condition:
        FORECAST_CODES[weather_code[index] as keyof typeof FORECAST_CODES],
    });
  });

  forecast.shift();
  forecast[0].day = "Tomorrow";

  return forecast;
};
