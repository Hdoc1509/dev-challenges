import { useSearchStore } from "@/store/search";
import { useJobs } from "./hooks/useJobs";
import { RingSpinner } from "@hrc/spinner";
import { SearchForm } from "@/components/SearchForm";
import { SearchOptions } from "@/components/SearchOptions";
import { Results } from "@/components/Results";
import { Pagination } from "@/components/Pagination";
import "./Home.scss";

export const Home = () => {
  const { jobs, jobsError, jobsStatus } = useJobs();
  const pages = useSearchStore((s) => s.pages);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        {jobsStatus === "loading" && <RingSpinner size="large" />}
        {jobsStatus === "error" && (
          <p className="error">{jobsError?.message}</p>
        )}
        {jobsStatus === "success" && <Results jobs={jobs} />}
        {pages > 1 && <Pagination />}
      </main>
    </div>
  );
};
