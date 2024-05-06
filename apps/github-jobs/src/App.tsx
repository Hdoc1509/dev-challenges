import { useEffect, useState } from "react";
import { Footer } from "@internal/components/src/Footer";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { SearchOptions } from "./components/SearchOptions";
import { Results } from "./components/Results";
import { getMockedJobs } from "./services/jobs";
import type { Job } from "./types";
import "./App.css";

let didInit = false;

function App() {
  const [results, setResults] = useState<Job[]>([]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getMockedJobs().then(setResults);
    }
  }, []);

  return (
    <>
      <Header />
      <SearchForm />
      <SearchOptions />
      <Results jobs={results} />
      <Footer />
    </>
  );
}

export default App;
