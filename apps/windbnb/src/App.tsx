import { Footer } from "@internal/components";
import { SearchResults } from "./components/Results";
import { SearchBar } from "./components/SearchBar";
import { FilterDrawer } from "./components/FilterDrawer";
import logoUrl from "../assets/logo.png";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <img src={logoUrl} alt="windbnb logo" />
        <SearchBar />
        <FilterDrawer isOpen/>
      </header>
      <main>
        <SearchResults />
      </main>
      <Footer />
    </>
  );
}

export default App;
