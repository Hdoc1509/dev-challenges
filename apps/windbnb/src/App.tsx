import { Footer } from "@internal/components";
import { SearchResults } from "./components/Results";
import { SearchBar } from "./components/SearchBar";
import { FilterDrawer } from "./components/FilterDrawer";
import { useFilterStore } from "./store/filter";
import logoUrl from "../assets/logo.png";
import "./App.css";

function App() {
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  return (
    <>
      <header>
        <img src={logoUrl} alt="windbnb logo" />
        <SearchBar />
        <FilterDrawer isOpen={filter !== null}/>
      </header>
      <main onClick={() => setFilter(null)}>
        <SearchResults />
      </main>
      <Footer />
    </>
  );
}

export default App;
