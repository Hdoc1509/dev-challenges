import { useJobsStore } from "../store/jobs";
import { SearchForm } from "../components/SearchForm";
import { SearchOptions } from "../components/SearchOptions";
import { Results } from "../components/Results";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const jobs = useJobsStore((s) => s.jobs);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        <Results />
        {jobs.length > 0 && <Pagination />}
      </main>
    </div>
  );
};
