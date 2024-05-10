import { useCallback, useEffect } from "react";
// import { getJobs } from "./services/jobs";
import { getJobs } from "./services/jobs-mock";
import { useJobsStore } from "./store/jobs";
import { getLocationOption } from "./utils/jobs";
import { Footer } from "@internal/components/src/Footer";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { SearchOptions } from "./components/SearchOptions";
import { Results } from "./components/Results";
import "./App.css";

let didInit = false;

function App() {
  const setJobs = useJobsStore((s) => s.setJobs);

  const getInitialJobs = useCallback(async () => {
    const [locationError, location] = await getLocationOption();

    if (locationError) {
      console.error(locationError);
      return;
    }

    const [jobsError, jobs] = await getJobs(undefined, { location });

    if (jobsError) {
      console.error(jobsError);
      return;
    }

    setJobs(jobs);
  }, [setJobs]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getInitialJobs();
    }
  }, [getInitialJobs, setJobs]);

  return (
    <>
      <Header />
      <SearchForm />
      <SearchOptions />
      <Results />
      <Footer />
    </>
  );
}

export default App;
