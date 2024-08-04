import { useCallback, useEffect } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Footer } from "@lib/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "./Home";
import { JobPage } from "./JobPage";
import { isDev } from "@/config";

let didInit = false;

function App() {
  const cacheJobs = useJobsStore((s) => s.cacheJobs);
  const setSearch = useJobsStore((s) => s.setSearch);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);

  const getInitialJobs = useCallback(async () => {
    setStatus("loading");

    const [locationError, location] = await getLocationOption();

    if (locationError) return setError(locationError);

    const search = { query: "front", location };
    const [jobsError, jobsResult] = await (isDev
      ? getMockedJobs(search)
      : getJobs(search));

    if (jobsError) return setError(jobsError);

    const { jobs, nextPageToken } = jobsResult;

    setJobs(jobs);
    if (jobs.length < 10) setPages(1);
    else {
      setSearch({ nextPageToken });
      cacheJobs(jobs);
    }
  }, [cacheJobs, setError, setJobs, setPages, setSearch, setStatus]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getInitialJobs();
    }
  }, [getInitialJobs]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:name" element={<JobPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
