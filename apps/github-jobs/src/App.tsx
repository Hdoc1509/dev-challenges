import { useEffect } from "react";
import { getMockedJobs } from "./services/jobs";
import { useJobsStore } from "./store/jobs";
import { Footer } from "@internal/components/src/Footer";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { SearchOptions } from "./components/SearchOptions";
import { Results } from "./components/Results";
import "./App.css";

let didInit = false;

function App() {
  const setJobs = useJobsStore((s) => s.setJobs);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // void getJobs().then(([error, jobs]) => {
      void getMockedJobs().then(([error, jobs]) => {
        if (error) {
          console.error(error);
          return;
        }

        setJobs(jobs);
      });
    }
  }, [setJobs]);

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
