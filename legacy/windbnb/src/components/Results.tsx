import { StayCard } from "./StayCard";
import type { Stay } from "@/types";
import "./Results.scss";

export const SearchResults = ({ results }: { results: Stay[] }) => {
  const total = results.length;
  const isEmpty = total === 0;

  return (
    <div className="search-results">
      <header>
        <h2 className="search-results__city">Stays in Finland</h2>
        {!isEmpty && (
          <span className="search-results__count">{total} stays</span>
        )}
      </header>
      <div className="search-results__cards">
        {isEmpty ? (
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
