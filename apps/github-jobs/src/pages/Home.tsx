import { useJobsStore } from "../store/jobs";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchForm } from "../components/SearchForm";
import { SearchOptions } from "../components/SearchOptions";
import { Results } from "../components/Results";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);
  const jobs = useJobsStore((s) => s.jobs);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        {status === "loading" && <RingSpinner size="large" />}
        {status === "error" && <h3>{error?.message}</h3>}
        {status === "success" && <Results jobs={jobs} />}
        <Pagination />
      </main>
    </div>
  );
};
