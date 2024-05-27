import { useSearchStore } from "@/store/search";
import { useWeatherStore } from "@/store/weather";
import { clsx } from "clsx";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import type { City } from "@/types";
import "./SearchDrawer.scss";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const status = useSearchStore((s) => s.status);
  const searchError = useSearchStore((s) => s.error);
  const results = useSearchStore((s) => s.results);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setResults = useSearchStore((s) => s.setResults);
  const setWeatherError = useWeatherStore((s) => s.setError);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const className = clsx("search-drawer", { open: isOpen });

  // NOTE: Can it be moved to SearchResults?
  const handleSelect = async ({ latitude, longitude }: City) => {
    const coords = { latitude, longitude };

    clearData();
    onClose();

    const [[weatherError, weather], [forecastError, forecast]] =
      await Promise.all([getWeather(coords), getForecast(coords)]);

    if (weatherError) return setWeatherError(weatherError);
    if (forecastError) return setWeatherError(forecastError);

    setLastSearch("");
    setForecast(forecast);
    setWeather(weather);
    setResults([]);
    setSearch("");
  };

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={onClose}>
        <Icon name="close" />
      </div>
      <SearchForm disabled={!isOpen} />
      {status === "loading" && <RingSpinner />}
      {status === "error" && <p>{searchError?.message}</p>}
      {status === "success" && (
        <SearchResults results={results} handleSelect={handleSelect} />
      )}
    </div>
  );
};
