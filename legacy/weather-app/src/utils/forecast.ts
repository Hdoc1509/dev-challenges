import { formatDate, parseDate } from "./date";
import { FORECAST_CODES } from "../consts";
import type { ForecastResponse } from "../schemas/forecast";
import type { Forecast } from "@/types";

const celsiusToFahrenheit = (celsius: number) => {
  const result = (celsius * 9) / 5 + 32;
  return Number(result.toFixed(2));
};

export const parseForecast = (data: ForecastResponse): Forecast[] => {
  const { daily } = data;
  const { time, temperature_2m_max, temperature_2m_min, weather_code } = daily;
  const forecast: Forecast[] = [];

  time.forEach((date, index) => {
    const minTemp = temperature_2m_min[index];
    const maxTemp = temperature_2m_max[index];

    forecast.push({
      day: formatDate(parseDate(date)),
      temperature: {
        min: {
          celsius: minTemp,
          fahrenheit: celsiusToFahrenheit(minTemp),
        },
        max: {
          celsius: maxTemp,
          fahrenheit: celsiusToFahrenheit(maxTemp),
        },
      },
      condition: {
        code: weather_code[index],
        name: FORECAST_CODES[
          weather_code[index] as keyof typeof FORECAST_CODES
        ],
      },
    });
  });

  forecast.shift();
  forecast[0].day = "Tomorrow";

  return forecast;
};
