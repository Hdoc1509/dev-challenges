import { useEffect } from "react";
import { useStays } from "./hooks/useStays.ts";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { Footer } from "@lib/components/Footer";
import { SearchResults } from "./components/Results";
import { Header } from "./components/Header.tsx";
import "./App.css";

function App() {
  const { stays, error, isLoading, isError, isSuccess, getStays } = useStays();

  useEffect(() => void getStays(), [getStays]);

  return (
    <>
      <Header />
      <main data-loading={isLoading}>
        {isLoading && <RingSpinner />}
        {isError && <p>{error?.message}</p>}
        {isSuccess && <SearchResults results={stays} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
