import { useCallback } from "react";
import { useWeatherStore } from "@/store/weather";
import { getCurrentCoords } from "@lib/geolocation";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";

export const useCurrentWeather = () => {
  const error = useWeatherStore((s) => s.error);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const setError = useWeatherStore((s) => s.setError);
  const clearData = useWeatherStore((s) => s.clearData);

  const getCurrentLocationWeather = useCallback(async () => {
    clearData();

    try {
      const [coordsError, coords] = await getCurrentCoords();

      if (coordsError) throw coordsError;

      // NOTE: it is typed incorrectly with array desctructuring
      // const [[weatherError, weather], [forecastError, forecast]] =
      //   await Promise.all([getWeather(coords), getForecast(coords)]);
      const [weatherResult, forecastResult] = await Promise.all([
        getWeather(coords),
        getForecast(coords),
      ]);
      const [weatherError, weather] = weatherResult;
      const [forecastError, forecast] = forecastResult;

      if (weatherError) throw weatherError;
      if (forecastError) throw forecastError;

      setWeather(weather);
      setForecast(forecast);
    } catch (error) {
      // NOTE: All errors are thrown and handled manually
      setError(error as Error);
    }
  }, [setForecast, setWeather, clearData]);

  return { getCurrentLocationWeather, error };
};
