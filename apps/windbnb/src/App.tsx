import { Footer } from "@internal/components";
import { SearchResults } from "./components/Results";
import { SearchBar } from "./components/SearchBar";
import { FilterDrawer } from "./components/FilterDrawer";
import { useFilterStore } from "./store/filter";
import logoUrl from "../assets/logo.png";
import "./App.css";

function App() {
  const filter = useFilterStore((state) => state.filter);

  return (
    <>
      <header className="main-header">
        <img src={logoUrl} className="main-header__logo" alt="windbnb logo" />
        <SearchBar />
        <FilterDrawer isOpen={filter !== null} />
      </header>
      <main>
        <SearchResults />
      </main>
      <Footer />
    </>
  );
}

export default App;
