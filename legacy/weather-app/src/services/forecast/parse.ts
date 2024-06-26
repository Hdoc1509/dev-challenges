import { formatDate, parseDate } from "@/utils/date";
import { FORECAST_CODES } from "@/consts";
import type { ForecastResponse } from "./schema";
import type { Forecast } from "@/types";

const celsiusToFahrenheit = (celsius: number) => {
  const result = (celsius * 9) / 5 + 32;
  return Number(result.toFixed(2));
};

export const parseForecast = ({ daily }: ForecastResponse): Forecast[] => {
  const { time, temperature_2m_max, temperature_2m_min, weather_code } = daily;
  const forecast = time.map((date, index) => {
    const minTemp = temperature_2m_min[index];
    const maxTemp = temperature_2m_max[index];

    return {
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
    } satisfies Forecast;
  });

  forecast.shift(); // remove today
  forecast[0].day = "Tomorrow";

  return forecast;
};
