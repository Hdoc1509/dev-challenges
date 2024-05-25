import { useRef, useState } from "react";
import { clsx } from "clsx";
import { searchCity } from "@/services/geolocation/client";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";
import { useWeatherStore } from "@/store/weather";
import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import { Input } from "@hrc/input/dist/Input";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchResults } from "./SearchResults";
import type { City } from "@/types";
import "./SearchDrawer.scss";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const lastSearch = useRef("");
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
    setIsLoading(true);

    const [locationsError, locations] = await searchCity(search);

    if (locationsError) return setIsLoading(false);

    setResults(locations);
    setIsLoading(false);
  };

  const handleSelect = async ({ latitude, longitude }: City) => {
    const coords = { latitude, longitude };

    clearData();
    onClose();

    const [locationError, location] = await getWeather(coords);

    if (locationError) return;

    const [forecastError, forecast] = await getForecast(coords);

    if (forecastError) return;

    lastSearch.current = "";
    setForecast(forecast);
    setWeather(location);
    setResults([]);
    setSearch("");
  };

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={onClose}>
        <Icon name="close" />
      </div>
      <form className="search-drawer__form" onSubmit={handleSubmit}>
        <Input
          iconStart={<Icon name="search" />}
          placeholder="search location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          required
          disabled={!isOpen}
        />
        <Button color="primary" disabled={!isOpen}>
          Search
        </Button>
      </form>
      {isLoading ? (
        <RingSpinner />
      ) : (
        <SearchResults results={results} handleSelect={handleSelect} />
      )}
    </div>
  );
};
