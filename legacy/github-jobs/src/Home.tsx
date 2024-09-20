import { useSearchStore } from "@/store/search";
import { useJobsStore } from "./store/jobs";
import { RingSpinner } from "@hrc/spinner";
import { SearchForm } from "@/components/SearchForm";
import { SearchOptions } from "@/components/SearchOptions";
import { Results } from "@/components/Results";
import { Pagination } from "@/components/Pagination";
import { STATUS } from "@lib/fetcher";
import "./Home.scss";

export const Home = () => {
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);
  const jobs = useJobsStore((s) => s.jobs);
  const pages = useSearchStore((s) => s.pages);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        {status === STATUS.LOADING && <RingSpinner size="large" />}
        {status === STATUS.ERROR && <p className="error">{error?.message}</p>}
        {status === STATUS.SUCCESS && <Results jobs={jobs} />}
        {pages > 1 && <Pagination />}
      </main>
    </div>
  );
};
