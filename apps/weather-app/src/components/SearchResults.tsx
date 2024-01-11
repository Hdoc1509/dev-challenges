import { Icon } from "@hdoc/react-material-icons";
import type { SearchCityResponse } from "../schemas/geolocation";
import "./SearchResults.scss";

type Props = {
  results: SearchCityResponse;
  handleSelect: (option: SearchCityResponse[number]) => void;
};

export const SearchResults = ({ results, handleSelect }: Props) => {
  return (
    <ul className="search-drawer__results">
      {results.map((result) => (
        <li key={result.id} onClick={() => handleSelect(result)}>
          {result.name} - {result.country}
          <Icon name="keyboard_arrow_right" />
        </li>
      ))}
    </ul>
  );
};
