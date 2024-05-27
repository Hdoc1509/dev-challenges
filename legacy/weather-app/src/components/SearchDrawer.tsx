import { useRef, useState } from "react";
import { clsx } from "clsx";
import { searchCity } from "@/services/geolocation/client";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";
import { useWeatherStore } from "@/store/weather";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import type { City, Status } from "@/types";
import "./SearchDrawer.scss";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const [results, setResults] = useState<City[]>([]);
  const [searchStatus, setSearchStatus] = useState<Status>("idle");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState<Error | null>(null);
  const lastSearch = useRef("");
  const setWeatherError = useWeatherStore((s) => s.setError);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const className = clsx("search-drawer", {
    "search-drawer--open": isOpen,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === lastSearch.current) return;

    lastSearch.current = search;
    setSearchStatus("loading");

    const [citiesError, cities] = await searchCity(search);

    if (citiesError) {
      setSearchError(citiesError);
      setSearchStatus("error");
      return;
    }

    setResults(cities);
    setSearchStatus("success");
  };

  // NOTE: Can it be moved to SearchResults?
  const handleSelect = async ({ latitude, longitude }: City) => {
    const coords = { latitude, longitude };

    clearData();
    onClose();

    const [[weatherError, weather], [forecastError, forecast]] =
      await Promise.all([getWeather(coords), getForecast(coords)]);

    if (weatherError) return setWeatherError(weatherError);
    if (forecastError) return setWeatherError(forecastError);

    lastSearch.current = "";
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
      <SearchForm
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
        disabled={!isOpen}
      />
      {searchStatus === "loading" && <RingSpinner />}
      {searchStatus === "error" && <p>{searchError?.message}</p>}
      {searchStatus === "success" && (
        <SearchResults results={results} handleSelect={handleSelect} />
      )}
    </div>
  );
};
