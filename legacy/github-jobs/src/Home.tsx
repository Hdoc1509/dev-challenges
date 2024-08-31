import { useSearchStore } from "@/store/search";
import { useJobs } from "./hooks/useJobs";
import { RingSpinner } from "@hrc/spinner";
import { SearchForm } from "@/components/SearchForm";
import { SearchOptions } from "@/components/SearchOptions";
import { Results } from "@/components/Results";
import { Pagination } from "@/components/Pagination";
import { STATUS } from "@lib/fetcher";
import "./Home.scss";

export const Home = () => {
  const { jobs, jobsError, jobsStatus } = useJobs();
  const pages = useSearchStore((s) => s.pages);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        {jobsStatus === STATUS.LOADING && <RingSpinner size="large" />}
        {jobsStatus === STATUS.ERROR && (
          <p className="error">{jobsError?.message}</p>
        )}
        {jobsStatus === STATUS.SUCCESS && <Results jobs={jobs} />}
        {pages > 1 && <Pagination />}
      </main>
    </div>
  );
};
