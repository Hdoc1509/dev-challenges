import { useSearchStore } from "@/store/search";
import { searchCity } from "@/services/geolocation/client";
import { Button } from "@hrc/button/dist/Button";
import { Input } from "@hrc/input/dist/Input";
import { Icon } from "@hrc/material-icons";
import "./SearchForm.scss";

export const SearchForm = ({ disabled }: { disabled: boolean }) => {
  const search = useSearchStore((s) => s.search);
  const lastSearch = useSearchStore((s) => s.lastSearch);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setError = useSearchStore((s) => s.setError);
  const setStatus = useSearchStore((s) => s.setStatus);
  const setResults = useSearchStore((s) => s.setResults);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === lastSearch) return;

    setLastSearch(search);
    setStatus("loading");

    const [citiesError, cities] = await searchCity(search);

    if (citiesError) {
      setError(citiesError);
      setStatus("error");
      return;
    }

    setResults(cities);
    setStatus("success");
  };

  return (
    <form className="search-drawer__form" onSubmit={() => handleSubmit}>
      <Input
        iconStart={<Icon name="search" />}
        placeholder="search location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        required
        disabled={disabled}
      />
      <Button color="primary" disabled={disabled}>
        Search
      </Button>
    </form>
  );
};
