import { useCallback, useEffect } from "react";
import { getJobs } from "./services/jobs";
import { getMockedJobs } from "./services/jobs-mock";
import { useJobsStore } from "./store/jobs";
import { getLocationOption } from "./utils/jobs";
import { Route, Routes } from "react-router-dom";
import { Footer } from "@internal/components/src/Footer";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { JobPage } from "./pages/JobPage";
import { isDev } from "./config";
import "./App.css";

let didInit = false;

function App() {
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);

  const getInitialJobs = useCallback(async () => {
    setStatus("loading");

    try {
      const [locationError, location] = await getLocationOption();

      if (locationError) throw locationError;

      const searchArgs = ["front", { location }] as const;
      const [jobsError, jobs] = await (isDev
        ? getMockedJobs(...searchArgs)
        : getJobs(...searchArgs));

      if (jobsError) throw jobsError;

      setJobs(jobs);
      setStatus("success");
    } catch (error) {
      // NOTE: All errors are thrown and handled manually
      setError(error as Error);
      setStatus("error");
    }
  }, [setError, setJobs, setStatus]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getInitialJobs();
    }
  }, [getInitialJobs, setJobs]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:name" element={<JobPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
