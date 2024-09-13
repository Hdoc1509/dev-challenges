import { useState } from "react";
import { useSearchStore } from "@/store/search";
import { searchCity } from "@/services/geolocation/client";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { STATUS } from "@lib/fetcher";
import "./SearchForm.scss";

export const SearchForm = ({ disabled }: { disabled: boolean }) => {
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const setError = useSearchStore((s) => s.setError);
  const setStatus = useSearchStore((s) => s.setStatus);
  const setResults = useSearchStore((s) => s.setResults);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === lastSearch) return;

    setLastSearch(search);
    setStatus(STATUS.LOADING);

    const [citiesError, cities] = await searchCity(search);

    if (citiesError) {
      setError(citiesError);
      setStatus(STATUS.ERROR);
      return;
    }

    setResults(cities);
    setStatus(STATUS.SUCCESS);
  };

  return (
    <form className="search-drawer__form" onSubmit={handleSubmit}>
      <Input
        iconStart={<Icon name="search" />}
        placeholder="search location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        required
        disabled={disabled}
      />
      <Button color="primary" rounded="none" disabled={disabled}>
        Search
      </Button>
    </form>
  );
};
