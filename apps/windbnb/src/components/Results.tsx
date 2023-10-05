import { StayCard } from "./StayCard";
import "./Results.scss";

export const SearchResults = () => {
  return (
    <div className="search-results">
      <header>
        <h2 className="search-results__city">Stays in Finland</h2>
        <span className="search-results__count">12+ stays</span>
      </header>
      <div className="search-results__cards">
        <StayCard />
        <StayCard />
        <StayCard />
        <StayCard />
      </div>
    </div>
  );
};
