import { useEffect } from "react";
import { Footer } from "@internal/components";
import { SearchResults } from "./components/Results";
import { SearchBar } from "./components/SearchBar";
import { FilterDrawer } from "./components/FilterDrawer";
import { useFilterStore } from "./store/filter";
import { useStays } from "./hooks/useStays.ts";
import logoUrl from "../assets/logo.png";
import "./App.css";

function App() {
  const { stays, getStays, isLoading } = useStays();
  const filter = useFilterStore((state) => state.filter);

  useEffect(() => {
    void getStays();
  }, [getStays]);

  return (
    <>
      <header className="main-header">
        <img src={logoUrl} className="main-header__logo" alt="windbnb logo" />
        <SearchBar />
        <FilterDrawer
          isOpen={filter !== null}
          onSearch={({ guests, location }) =>
            void getStays({ guests, location })
          }
        />
      </header>
      <main>
        {isLoading ? <p>Loading...</p> : <SearchResults results={stays} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
