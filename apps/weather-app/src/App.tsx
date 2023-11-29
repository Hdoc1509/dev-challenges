import { Button } from "@hdoc/react-button";
import { Footer } from "@internal/components";
import { CityWeather } from "./components/CityWeather";
import { Forecast } from "./components/Forecast";
import { Highlights } from "./components/Highlights";
import "./App.scss";

const OPEN_WEATHER_MAP_API = "https://openweathermap.org/api";
const WEATHER_API = "https://www.weatherapi.com/";
const OPEN_METEO_API = "https://open-meteo.com/en/docs";
const VISUAL_CROSSING_API = "https://www.visualcrossing.com/weather-api";

function App() {
  return (
    <div className="App">
      <CityWeather />
      <main>
        <section className="temperature-unit">
          <Button text="°C" />
          <Button text="°F" />
        </section>
        <Forecast />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}

export default App;
