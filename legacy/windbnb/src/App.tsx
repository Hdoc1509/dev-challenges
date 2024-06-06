import { useEffect } from "react";
import { Footer } from "@internal/components/src/Footer";
import { SearchResults } from "./components/Results";
import { Header } from "./components/Header.tsx";
import { useStays } from "./hooks/useStays.ts";
import "./App.css";

function App() {
  const { stays, getStays, isLoading, error } = useStays();

  useEffect(() => void getStays(), [getStays]);

  return (
    <>
      <Header getStays={getStays} />
      <main>
        {error && <p>{error.message}</p>}
        {isLoading ? <p>Loading...</p> : <SearchResults results={stays} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
