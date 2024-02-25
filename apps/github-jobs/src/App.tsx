import { Footer } from "@internal/components";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { SearchOptions } from "./components/SearchOptions";
import { Results } from "./components/Results";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <SearchForm />
      <SearchOptions />
      <Results />
      <Footer />
    </>
  );
}

export default App;
