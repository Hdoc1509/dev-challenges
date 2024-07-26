import { useCallback, useEffect } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Footer } from "@lib/components/src/Footer";
import { Header } from "@/components/Header";
import { Home } from "./Home";
import { JobPage } from "./JobPage";
import { isDev } from "@/config";

let didInit = false;

function App() {
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);

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
      void getInitialJobs();
    }
  }, [getInitialJobs, setJobs]);

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
