import { SearchForm } from "../components/SearchForm";
import { SearchOptions } from "../components/SearchOptions";
import { Results } from "../components/Results";

export const Home = () => {
  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <Results />
    </div>
  );
};
