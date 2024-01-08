import { useEffect, useState } from "react";
import { useWeatherStore } from "./store/weather";
import { getCurrentPosition } from "./utils/geolocation";
import { getWeather } from "./services/weather";
import { Footer } from "@internal/components";
import { CityWeather } from "./components/CityWeather";
import { Forecast } from "./components/Forecast";
import { Highlights } from "./components/Highlights";
import { TemperatureConverter } from "./components/TemperatureConverter";
import { SearchDrawer } from "./components/SearchDrawer";
import "./App.scss";

let didInit = false;

function App() {
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);
  const setWeather = useWeatherStore((s) => s.setWeather);

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
      void getCurrentPosition().then((currentPosition) => {
        void getWeather({ coords: currentPosition }).then(setWeather);
      });
    }
  }, [setWeather]);

  // TODO: Use weather from store
  return (
    <div className="App">
      <CityWeather openDrawer={openDrawer} />
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
