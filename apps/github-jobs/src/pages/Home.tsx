import { SearchForm } from "../components/SearchForm";
import { SearchOptions } from "../components/SearchOptions";
import { Results } from "../components/Results";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        <Results />
        <Pagination />
      </main>
    </div>
  );
};
