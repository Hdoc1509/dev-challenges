import { useJobsStore } from "@/store/jobs";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { SearchForm } from "@/components/SearchForm";
import { SearchOptions } from "@/components/SearchOptions";
import { Results } from "@/components/Results";
import { Pagination } from "@/components/Pagination";
import "./Home.scss";

export const Home = () => {
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);
  const jobs = useJobsStore((s) => s.jobs);
  const pages = useJobsStore((s) => s.pages);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        {status === "loading" && <RingSpinner size="large" />}
        {status === "error" && <p className="error">{error?.message}</p>}
        {status === "success" && <Results jobs={jobs} />}
        {pages > 1 && <Pagination />}
      </main>
    </div>
  );
};
