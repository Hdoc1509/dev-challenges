import { useEffect, useState } from "react";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { Footer } from "@lib/components/Footer";
import { CityWeather } from "@/components/CityWeather";
import { Forecast } from "@/components/Forecast";
import { Highlights } from "@/components/Highlights";
import { TemperatureConverter } from "@/components/TemperatureConverter";
import { SearchDrawer } from "@/components/SearchDrawer";
import "./App.scss";

let didInit = false;

function App() {
  const { getCurrentWeather, error } = useCurrentWeather();
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  const openDrawer = () => {
    setShowSearchDrawer(true);
    document.body.classList.add("no-scroll");
  };
  const closeDrawer = () => {
    setShowSearchDrawer(false);
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getCurrentWeather();
    }
  }, [getCurrentWeather]);

  if (error) {
    return (
      <div className="App" data-error>
        <h2 className="App__error">{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <CityWeather
        openDrawer={openDrawer}
        getCurrentWeather={getCurrentWeather}
      />
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
