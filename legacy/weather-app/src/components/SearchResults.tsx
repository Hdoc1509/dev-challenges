import { useWeatherStore } from "@/store/weather";
import { useSearchLocation } from "@/hooks/useSearchLocation";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import type { City } from "@/types";
import "./SearchResults.scss";

type Props = {
  disabled: boolean;
  onClose: () => void;
};

export const SearchResults = ({ disabled, onClose }: Props) => {
  const { results, removeResultById } = useSearchLocation();
  const setWeatherError = useWeatherStore((s) => s.setError);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const handleSelect = async ({ latitude, longitude, id }: City) => {
    const coords = { latitude, longitude };

    clearData();
    onClose();

    // NOTE: it is typed incorrectly with array desctructuring
    // const [[weatherError, weather], [forecastError, forecast]] =
    //   await Promise.all([getWeather(coords), getForecast(coords)]);
    const [weatherResult, forecastResult] = await Promise.all([
      getWeather(coords),
      getForecast(coords),
    ]);
    const [weatherError, weather] = weatherResult;
    const [forecastError, forecast] = forecastResult;

    if (weatherError) return setWeatherError(weatherError);
    if (forecastError) return setWeatherError(forecastError);

    setForecast(forecast);
    setWeather(weather);
    removeResultById(id);
  };

  return (
    <menu className="search-drawer__results">
      {results.map((result) => (
        <li key={result.id}>
          <Button
            onClick={() => handleSelect(result)}
            disabled={disabled}
            noShadow
          >
            {result.name} - {result.country}
            <Icon name="keyboard_arrow_right" />
          </Button>
        </li>
      ))}
    </menu>
  );
};
