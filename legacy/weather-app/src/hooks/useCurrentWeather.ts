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

    const [coordsError, coords] = await getCurrentCoords();

    if (coordsError) return setError(coordsError);

    // NOTE: it is typed incorrectly with array desctructuring
    // const [[weatherError, weather], [forecastError, forecast]] =
    //   await Promise.all([getWeather(coords), getForecast(coords)]);
    const [weatherResult, forecastResult] = await Promise.all([
      getWeather(coords),
      getForecast(coords),
    ]);
    const [weatherError, weather] = weatherResult;
    const [forecastError, forecast] = forecastResult;

    if (weatherError) return setError(weatherError);
    if (forecastError) return setError(forecastError);

    setWeather(weather);
    setForecast(forecast);
  }, [setForecast, setWeather, clearData]);

  return { getCurrentLocationWeather, error };
};
