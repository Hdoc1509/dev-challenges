import { Footer } from "@internal/components";
import logoUrl from "../assets/logo.png";
import { StayCard } from "./components/StayCard";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <img src={logoUrl} alt="windbnb logo" />
        <div className="searchbar">
          <button className="location">Helsinki, Finland</button>
          <button className="guests">Add guests</button>
          <button className="search">Search</button>
        </div>
      </header>
      <main>
        <header>
          <h2>Stays in Finland</h2>
          <span>12+ stays</span>
        </header>
        <StayCard />
        <StayCard />
        <StayCard />
        <StayCard />
      </main>
      <Footer />
    </>
  );
}

export default App;
