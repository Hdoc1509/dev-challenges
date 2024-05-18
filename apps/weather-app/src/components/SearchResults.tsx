import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import type { SearchCityResponse } from "../schemas/geolocation";
import "./SearchResults.scss";

type Props = {
  isLoading: boolean;
  results: SearchCityResponse;
  handleSelect: (option: SearchCityResponse[number]) => void;
};

export const SearchResults = ({ isLoading, results, handleSelect }: Props) => {
  if (isLoading) return <RingSpinner />;

  return (
    <menu className="search-drawer__results">
      {results.map((result) => (
        <li key={result.id}>
          <Button onClick={() => handleSelect(result)} disableShadow>
            {result.name} - {result.country}
            <Icon name="keyboard_arrow_right" />
          </Button>
        </li>
      ))}
    </menu>
  );
};
