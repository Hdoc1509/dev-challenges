import { useEffect, useState } from "react";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { Footer } from "@internal/components";
import { CityWeather } from "./CityWeather";
import { Forecast } from "./Forecast";
import { Highlights } from "./Highlights";
import { TemperatureConverter } from "./TemperatureConverter";
import { SearchDrawer } from "./SearchDrawer";
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
      void getCurrentWeather();
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
        getCurrentWeather={() => getCurrentWeather}
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
