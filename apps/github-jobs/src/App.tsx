import { useCallback, useEffect } from "react";
// import { getJobs } from "./services/jobs";
import { getJobs } from "./services/jobs-mock";
import { useJobsStore } from "./store/jobs";
import { getCurrentCoords } from "./utils/geolocation";
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
    const [cordsError, coords] = await getCurrentCoords();

    if (cordsError) {
      console.error(cordsError);
      return;
    }

    const [jobsError, jobs] = await getJobs(undefined, { location: coords });

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
