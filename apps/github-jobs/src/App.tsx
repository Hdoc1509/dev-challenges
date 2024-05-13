import { useCallback, useEffect } from "react";
// import { getJobs } from "./services/jobs";
import { getJobs } from "./services/jobs-mock";
import { useJobsStore } from "./store/jobs";
import { getLocationOption } from "./utils/jobs";
import { Route, Routes } from "react-router-dom";
import { Footer } from "@internal/components/src/Footer";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { JobPage } from "./pages/JobPage";
import "./App.css";

let didInit = false;

function App() {
  const setJobs = useJobsStore((s) => s.setJobs);
  const setLoading = useJobsStore((s) => s.setLoading);

  const getInitialJobs = useCallback(async () => {
    setLoading(true);

    const [locationError, location] = await getLocationOption();

    if (locationError) {
      console.error(locationError);
      return;
    }

    // TODO: Pass frontend as query
    const [jobsError, jobs] = await getJobs(undefined, { location });

    if (jobsError) {
      console.error(jobsError);
      return;
    }

    setJobs(jobs);
    setLoading(false);
  }, [setJobs, setLoading]);

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
