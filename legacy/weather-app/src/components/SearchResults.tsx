import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import type { City } from "@/types";
import "./SearchResults.scss";

type Props = {
  results: City[];
  handleSelect: (option: City) => void;
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
