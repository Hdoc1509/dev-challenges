import { useCallback, useEffect } from "react";
import { useJobsStore } from "./store/jobs";
import { useSearchStore } from "@/store/search";
import { useRemainingSearchesStore } from "./store/remaining-searches";
import { isJobsEmptyResultsError } from "./services/jobs/service-error";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Footer } from "@lib/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "./Home";
import { JobPage } from "./JobPage";
import { DEFAULT_SEARCH } from "@/constants";

let didInit = false;

function App() {
  const searchJobs = useJobsStore((s) => s.searchJobs);
  const getRemainingSearches = useRemainingSearchesStore(
    (s) => s.getRemainingSearches,
  );
  const setSearch = useSearchStore((s) => s.setSearch);
  const setUserLocation = useSearchStore((s) => s.setUserLocation);
  const setPages = useSearchStore((s) => s.setPages);

  const getInitialJobs = useCallback(async () => {
    const [searchError, searchResult] = await searchJobs(DEFAULT_SEARCH);

    if (searchError) {
      if (isJobsEmptyResultsError(searchError)) getRemainingSearches();
      return;
    }

    const { nextPageToken, usedLocation } = searchResult;

    setUserLocation(usedLocation);
    setSearch({ nextPageToken });
    setPages(nextPageToken == null ? 1 : 10);
    getRemainingSearches();
  }, [searchJobs, setUserLocation, setSearch, setPages, getRemainingSearches]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getInitialJobs();
    }
  }, [getInitialJobs]);

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
