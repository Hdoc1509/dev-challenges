import { useState } from "react";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { Footer } from "@lib/components/Footer";
import { CityWeather } from "@/components/CityWeather";
import { Forecast } from "@/components/Forecast";
import { Highlights } from "@/components/Highlights";
import { TemperatureConverter } from "@/components/TemperatureConverter";
import { SearchDrawer } from "@/components/SearchDrawer";
import "./App.scss";

function App() {
  const { error } = useCurrentWeather();
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  const closeDrawer = () => {
    setShowSearchDrawer(false);
    document.body.classList.remove("no-scroll");
  };

  if (error) {
    return (
      <div className="App" data-error>
        <h2 className="App__error">{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <CityWeather />
      <SearchDrawer onClose={closeDrawer} isOpen={showSearchDrawer} />
      <main>
        <TemperatureConverter />
        <Forecast />
        <Highlights />
        <Footer />
      </main>
    </div>
  );
}

export default App;
