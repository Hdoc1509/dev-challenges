import { StayCard } from "./StayCard";
import { parseResults } from "../utils.ts";
import results from "../../mocks/stays.json";
import "./Results.scss";

export const SearchResults = () => {
  const parsedResults = parseResults(results);

  return (
    <div className="search-results">
      <header>
        <h2 className="search-results__city">Stays in Finland</h2>
        {parsedResults.length > 0 && (
          <span className="search-results__count">12+ stays</span>
        )}
      </header>
      <div className="search-results__cards">
        {parsedResults.length === 0 ? (
          <p>No results</p>
        ) : (
          parsedResults.map((stay) => (
            <StayCard key={`${stay.city}-${stay.title}`} stay={stay} />
          ))
        )}
      </div>
    </div>
  );
};
