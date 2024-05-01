import { useRef, useState } from "react";
import { clsx } from "clsx";
import { searchCity } from "../services/geolocation";
import { getWeather } from "../services/weather";
import { useWeatherStore } from "../store/weather";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { SearchResults } from "./SearchResults";
import type { SearchCityResponse } from "../schemas/geolocation";
import "./SearchDrawer.scss";
import { getForecast } from "../services/forecast";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const [results, setResults] = useState<SearchCityResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastSearch = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const className = clsx("search-drawer", {
    "search-drawer--open": isOpen,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = inputRef.current?.value ?? "";

    if (search === lastSearch.current) return;

    lastSearch.current = search;
    setIsLoading(true);
    void searchCity(search)
      .then((locations) => setResults(locations))
      .then(() => setIsLoading(false));
  };

  const handleSelect = (option: SearchCityResponse[number]) => {
    const coords = { latitude: option.lat, longitude: option.lon };

    clearData();
    onClose();
    void getWeather(coords).then((location) => {
      setWeather(location);
      setResults([]);
      if (inputRef.current) inputRef.current.value = "";
      lastSearch.current = "";
    });
    void getForecast(coords).then(setForecast);
  };

  if (isOpen) inputRef.current?.focus();

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={onClose}>
        <Icon name="close" />
      </div>
      <form className="search-drawer__form" onSubmit={handleSubmit}>
        <label className="input-wrapper">
          <Icon name="search" />
          <input
            name="location"
            placeholder="search location"
            ref={inputRef}
            required
          />
        </label>
        <Button color="primary">Search</Button>
      </form>
      {isLoading ? (
        <RingSpinner />
      ) : (
        <SearchResults results={results} handleSelect={handleSelect} />
      )}
    </div>
  );
};
