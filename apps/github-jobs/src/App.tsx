import { useCallback, useEffect } from "react";
// import { getJobs } from "./services/jobs";
import { getJobs } from "./services/jobs-mock";
import { searchLocation } from "./services/geolocation";
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
    const [coordsError, coords] = await getCurrentCoords();

    if (coordsError) {
      console.error(coordsError);
      return;
    }

    const [locationError, coordsLocation] = await searchLocation({ coords });

    if (locationError) {
      console.error(locationError);
      return;
    }

    const { name: location } = coordsLocation;

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
