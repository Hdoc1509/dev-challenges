import { useCallback, useEffect, useState } from "react";
import { useWeatherStore } from "./store/weather";
import { getCurrentPosition } from "./utils/geolocation";
import { getWeather } from "./services/weather";
import { getForecast } from "./services/forecast";
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
  const temperatureUnit = useWeatherStore((s) => s.temperatureUnit);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);

  const openDrawer = () => {
    setShowSearchDrawer(true);
    document.body.classList.add("no-scroll");
  };
  const closeDrawer = () => {
    setShowSearchDrawer(false);
    document.body.classList.remove("no-scroll");
  };

  const getCurrentLocationWeather = useCallback(() => {
    void getCurrentPosition().then((coords) => {
      void getWeather(coords).then(setWeather);
      void getForecast(coords).then(setForecast);
    });
  }, [setForecast, setWeather]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getCurrentLocationWeather();
    }
  }, [getCurrentLocationWeather]);

  return (
    <div className="App">
      <CityWeather
        openDrawer={openDrawer}
        getCurrentLocationWeather={getCurrentLocationWeather}
      />
      <SearchDrawer onClose={closeDrawer} isOpen={showSearchDrawer} />
      <main>
        <TemperatureConverter unit={temperatureUnit} />
        <Forecast />
        <Highlights />
        <Footer />
      </main>
    </div>
  );
}

export default App;
