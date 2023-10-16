import { useEffect } from "react";
import { Footer } from "@internal/components";
import { SearchResults } from "./components/Results";
import { Header } from "./components/Header.tsx";
import { useStays } from "./hooks/useStays.ts";
import "./App.css";

function App() {
  const { stays, getStays, isLoading } = useStays();

  useEffect(() => {
    void getStays();
  }, [getStays]);

  return (
    <>
      <Header getStays={getStays} />
      <main>
        {isLoading ? <p>Loading...</p> : <SearchResults results={stays} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
