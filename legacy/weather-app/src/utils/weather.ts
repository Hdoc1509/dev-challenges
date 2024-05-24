import type { WeatherResponse } from "@/schemas/weather";
import type { Weather } from "@/types";

export const parseWeather = (weather: WeatherResponse): Weather => {
  const { location, current } = weather;

  return {
    location,
    current: {
      condition: {
        name: current.condition.text,
        code: current.condition.code,
      },
      temperature: {
        celsius: current.temp_c,
        fahrenheit: current.temp_f,
      },
      wind: {
        speed: current.wind_mph,
        direction: current.wind_dir,
        directionDegree: current.wind_degree,
      },
      humidity: current.humidity,
      visibility: current.vis_miles,
      airPressure: current.pressure_mb,
    },
  };
};
