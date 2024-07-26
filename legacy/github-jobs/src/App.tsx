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
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);

  const getInitialJobs = useCallback(async () => {
    setStatus("loading");

    const [locationError, location] = await getLocationOption();

    if (locationError) {
      setError(locationError);
      setStatus("error");
      return;
    }

    const search = { query: "front", location };
    const [jobsError, jobs] = await (isDev
      ? getMockedJobs(search)
      : getJobs(search));

    if (jobsError) {
      setError(jobsError);
      setStatus("error");
      return;
    }

    setJobs(jobs);
    setStatus("success");
    if (jobs.length < 10) setPages(1);
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
