import { useCallback, useEffect } from "react";
import { useSearchStore } from "@/store/search";
import { useJobs } from "@/hooks/useJobs";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Footer } from "@lib/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "./Home";
import { JobPage } from "./JobPage";
import { DEFAULT_SEARCH } from "@/constants";

let didInit = false;

function App() {
  const { searchJobs } = useJobs();
  const setSearch = useSearchStore((s) => s.setSearch);
  const setUserLocation = useSearchStore((s) => s.setUserLocation);
  const setPages = useSearchStore((s) => s.setPages);

  const getInitialJobs = useCallback(async () => {
    const [searchError, searchResult] = await searchJobs(DEFAULT_SEARCH);

    if (searchError) return;

    const { nextPageToken, usedLocation } = searchResult;

    setUserLocation(usedLocation);
    setSearch({ nextPageToken });
    if (nextPageToken == null) setPages(1);
    else setPages(10);
  }, [searchJobs, setUserLocation, setPages, setSearch]);

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
