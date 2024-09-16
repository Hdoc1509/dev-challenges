import { useCallback, useEffect } from "react";
import { useWeatherStore } from "@/store/weather";
import { getCurrentCoords, type LocationCoords } from "@lib/geolocation";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";

let didInit = false;

export const useWeather = () => {
  const weather = useWeatherStore((s) => s.weather);
  const forecast = useWeatherStore((s) => s.forecast);
  const userLocation = useWeatherStore((s) => s.userLocation);
  const error = useWeatherStore((s) => s.error);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const setUserLocation = useWeatherStore((s) => s.setUserLocation);
  const setError = useWeatherStore((s) => s.setError);
  const clearData = useWeatherStore((s) => s.clearData);

  const searchWeather = useCallback(
    async (coords: LocationCoords) => {
      clearData();

      // NOTE: it is typed incorrectly with array desctructuring
      // const [[weatherError, weather], [forecastError, forecast]] =
      //   await Promise.all([getWeather(coords), getForecast(coords)]);
      const [weatherResult, forecastResult] = await Promise.all([
        getWeather(coords),
        getForecast(coords),
      ]);
      const [weatherError, weather] = weatherResult;
      const [forecastError, forecast] = forecastResult;

      if (weatherError) {
        setError(weatherError);
        return weatherError;
      }
      if (forecastError) {
        setError(forecastError);
        return forecastError;
      }

      setWeather(weather);
      setForecast(forecast);
    },
    [clearData, setError, setForecast, setWeather],
  );

  const getCurrentWeather = useCallback(async () => {
    if (userLocation != null) return searchWeather(userLocation);

    clearData();

    const [coordsError, coords] = await getCurrentCoords({ timeout: 8000 });

    if (coordsError) return setError(coordsError);

    setUserLocation(coords);
    searchWeather(coords);
  }, [userLocation, searchWeather, clearData, setError, setUserLocation]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getCurrentWeather();
    }
  }, [getCurrentWeather]);

  return {
    weather,
    forecast,
    error,
    getCurrentWeather,
    getWeather: searchWeather,
  };
};
