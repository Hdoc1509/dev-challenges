import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import type { SearchCityResponse } from "@/schemas/geolocation";
import "./SearchResults.scss";

type Props = {
  results: SearchCityResponse;
  handleSelect: (option: SearchCityResponse[number]) => void;
};

export const SearchResults = ({ results, handleSelect }: Props) => {
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
