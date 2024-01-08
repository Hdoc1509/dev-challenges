import { useRef, useState } from "react";
import { clsx } from "clsx";
import { searchCity } from "../services/search-city";
import { getWeather } from "../services/weather";
import { useWeatherStore } from "../store/weather";
import { Button } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import { SearchResults } from "./SearchResults";
import type { SearchCityResponse } from "../schemas/search-city";
import "./SearchDrawer.scss";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const [results, setResults] = useState<SearchCityResponse>([]);
  const lastSearch = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const setWeather = useWeatherStore((s) => s.setWeather);

  const className = clsx("search-drawer", {
    "search-drawer--open": isOpen,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = inputRef.current?.value ?? "";

    if (search === lastSearch.current) return;

    lastSearch.current = search;
    void searchCity(search).then((locations) => setResults(locations));
  };

  const handleSelect = (option: SearchCityResponse[number]) => {
    const coords = { latitude: option.lat, longitude: option.lon };

    void getWeather(coords).then((location) => {
      setWeather(location);
      onClose();
      setResults([]);
      if (inputRef.current) inputRef.current.value = "";
      lastSearch.current = "";
    });
  };

  if (isOpen) inputRef.current?.focus();

  return (
    <div className={className}>
      <div className="search-drawer__close" onClick={onClose}>
        <Icon name="close" />
      </div>
      <form className="search-drawer__form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Icon name="search" />
          <input
            name="location"
            placeholder="search location"
            ref={inputRef}
            required
          />
        </div>
        <Button text="Search" color="primary" />
      </form>
      <SearchResults results={results} handleSelect={handleSelect} />
    </div>
  );
};
