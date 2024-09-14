import { useState } from "react";
import { useSearchLocation } from "@/hooks/useSearchLocation";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import "./SearchForm.scss";

export const SearchForm = ({ disabled }: { disabled: boolean }) => {
  const { searchLocation } = useSearchLocation();
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === lastSearch) return;

    setLastSearch(search);
    searchLocation(search);
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
