import { useRef, useState } from "react";
import { clsx } from "clsx";
import { searchCity } from "../services/geolocation";
import { getWeather } from "@/services/client/weather";
import { useWeatherStore } from "@/store/weather";
import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import { Input } from "@hrc/input/dist/Input";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchResults } from "./SearchResults";
import type { SearchCityResponse } from "@/schemas/geolocation";
import "./SearchDrawer.scss";
import { getForecast } from "../services/forecast";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const [results, setResults] = useState<SearchCityResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const lastSearch = useRef("");
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const className = clsx("search-drawer", {
    "search-drawer--open": isOpen,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      lastSearch.current = "";
    });
    void getForecast(coords).then(setForecast);
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
