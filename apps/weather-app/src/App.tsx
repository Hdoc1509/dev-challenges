import { useState } from "react";
import { Footer } from "@internal/components";
import { CityWeather } from "./components/CityWeather";
import { Forecast } from "./components/Forecast";
import { Highlights } from "./components/Highlights";
import { TemperatureConverter } from "./components/TemperatureConverter";
import { SearchDrawer } from "./components/SearchDrawer";
import "./App.scss";

const OPEN_WEATHER_MAP_API = "https://openweathermap.org/api";
const WEATHER_API = "https://www.weatherapi.com/";
const OPEN_METEO_API = "https://open-meteo.com/en/docs";
const VISUAL_CROSSING_API = "https://www.visualcrossing.com/weather-api";

function App() {
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  const openDrawer = () => {
    setShowSearchDrawer(true);
    document.body.classList.add("no-scroll");
  };
  const closeDrawer = () => {
    setShowSearchDrawer(false);
    document.body.classList.remove("no-scroll");
  };

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
