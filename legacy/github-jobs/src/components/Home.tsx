import { useCallback, useEffect } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
// import { SearchForm } from "./SearchForm";
// import { SearchOptions } from "./SearchOptions";
// import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { isDev } from "@/config";

let didInit = false;

export const Home = () => {
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);
  // const jobs = useJobsStore((s) => s.jobs);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);
  const setStatus = useJobsStore((s) => s.setStatus);

  const getInitialJobs = useCallback(async () => {
    setStatus("loading");

    try {
      const [locationError, location] = await getLocationOption();

      if (locationError) throw locationError;

      const search = { query: "front", location };
      const [jobsError, jobs] = await (isDev
        ? getMockedJobs(search)
        : getJobs(search));

      if (jobsError) throw jobsError;

      setJobs(jobs);
      setStatus("success");
      if (jobs.length < 10) setPages(1);
    } catch (error) {
      // NOTE: All errors are thrown and handled manually
      setError(error as Error);
      setStatus("error");
    }
  }, [setError, setJobs, setPages, setStatus]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getInitialJobs();
    }
  }, []);

  return (
    <div className="home">
      {/* <SearchForm /> */}
      <div className="search-form">search form</div>
      {/* <SearchOptions /> */}
      <div className="search-options">search options</div>
      <main>
        {status === "loading" && <RingSpinner size="large" />}
        {status === "error" && <h3>{error?.message}</h3>}
        {/* {status === "success" && <Results jobs={jobs} />} */}
        {status === "success" && <p>results</p>}
        <Pagination />
      </main>
    </div>
  );
};
