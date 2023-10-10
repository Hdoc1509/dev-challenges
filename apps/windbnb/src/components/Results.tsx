import { StayCard } from "./StayCard";
import { Stay } from "../types";
import "./Results.scss";

export const SearchResults = ({ results }: { results: Stay[] }) => {
  return (
    <div className="search-results">
      <header>
        <h2 className="search-results__city">Stays in Finland</h2>
        {results.length > 0 && (
          <span className="search-results__count">12+ stays</span>
        )}
      </header>
      <div className="search-results__cards">
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
          results.map((stay) => (
            <StayCard key={`${stay.city}-${stay.title}`} stay={stay} />
          ))
        )}
      </div>
    </div>
  );
};
