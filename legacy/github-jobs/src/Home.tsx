import { useSearchStore } from "@/store/search";
import { useJobs } from "./hooks/useJobs";
import { RingSpinner } from "@hrc/spinner";
import { SearchForm } from "@/components/SearchForm";
import { SearchOptions } from "@/components/SearchOptions";
import { Results } from "@/components/Results";
import { Pagination } from "@/components/Pagination";
import "./Home.scss";

export const Home = () => {
  const { jobs, jobsError, isError, isLoading, isSuccess } = useJobs();
  const pages = useSearchStore((s) => s.pages);

  return (
    <div className="home">
      <SearchForm />
      <SearchOptions />
      <main>
        {isLoading && <RingSpinner size="large" />}
        {isError && <p className="error">{jobsError?.message}</p>}
        {isSuccess && <Results jobs={jobs} />}
        {pages > 1 && <Pagination />}
      </main>
    </div>
  );
};
