import { useEffect, useState } from "react";
import { Footer } from "@internal/components";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { SearchOptions } from "./components/SearchOptions";
import { Results } from "./components/Results";
import { getMockedJobs, type JobsResults } from "./services/jobs";
import "./App.css";

let didInit = false;

function App() {
  const [results, setResults] = useState<JobsResults>([]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      setResults(getMockedJobs());
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
