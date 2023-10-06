import { StayCard } from "./StayCard";
import { parseResults } from '../utils.ts'
import results from "../../mocks/stays.json";
import "./Results.scss";

export const SearchResults = () => {
  return (
    <div className="search-results">
      <header>
        <h2 className="search-results__city">Stays in Finland</h2>
        <span className="search-results__count">12+ stays</span>
      </header>
      <div className="search-results__cards">
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
          parseResults(results).map((stay) => (
            <StayCard key={`${stay.city}-${stay.title}`} stay={stay} />
          ))
        )}
      </div>
    </div>
  );
};
