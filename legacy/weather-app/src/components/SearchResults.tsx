import { useSearchStore } from "@/store/search";
import { useWeatherStore } from "@/store/weather";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";
import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import type { City } from "@/types";
import "./SearchResults.scss";

export const SearchResults = ({ onClose }: { onClose: () => void }) => {
  const results = useSearchStore((s) => s.results);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setResults = useSearchStore((s) => s.setResults);
  const setWeatherError = useWeatherStore((s) => s.setError);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const handleSelect = async ({ latitude, longitude }: City) => {
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

    setLastSearch("");
    setForecast(forecast);
    setWeather(weather);
    setResults([]);
    setSearch("");
  };

  return (
    <menu className="search-drawer__results">
      {results.map((result) => (
        <li key={result.id}>
          <Button onClick={() => void handleSelect(result)} disableShadow>
            {result.name} - {result.country}
            <Icon name="keyboard_arrow_right" />
          </Button>
        </li>
      ))}
    </menu>
  );
};
