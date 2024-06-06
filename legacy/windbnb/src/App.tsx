import { useEffect } from "react";
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
      <main>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>{error?.message}</p>}
        {status === "success" && <SearchResults results={stays} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
