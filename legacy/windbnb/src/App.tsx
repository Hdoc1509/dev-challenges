import { useEffect } from "react";
import { RingSpinner } from "@hrc/spinner";
import { Footer } from "@internal/components/src/Footer";
import { SearchResults } from "./components/Results";
import { Header } from "./components/Header.tsx";
import { useStays } from "./hooks/useStays.ts";
import "./App.css";

function App() {
  const { stays, error, status, getStays } = useStays();

  useEffect(() => void getStays(), [getStays]);

  return (
    <>
      <Header getStays={getStays} />
      <main data-status={status}>
        {status === "loading" && <RingSpinner />}
        {status === "error" && <p>{error?.message}</p>}
        {status === "success" && <SearchResults results={stays} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
