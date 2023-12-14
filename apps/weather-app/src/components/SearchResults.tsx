import { Icon } from "@hdoc/react-material-icons";
import "./SearchResults.scss";

export const SearchResults = ({ results }: { results: string[] }) => {
  return (
    <ul className="search-drawer__results">
      {results.map((result) => (
        <li key={result}>
          {result} <Icon name="keyboard_arrow_right" />
        </li>
      ))}
    </ul>
  );
};
