import { Button } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import { Footer } from "@internal/components";
import { CityWeather } from "./components/CityWeather";
import { Forecast } from "./components/Forecast";
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
        <article className="highlights">
          <h2>{`Today's Highlights`}</h2>
          <section className="wind">
            <h3>Wind Status</h3>
            <p>7 mph</p>
            <p className="wind_direction">
              <Icon name="near_me" />
              WSW
            </p>
          </section>
          <section className="humidity">
            <h3>Humidity</h3>
            <p>84%</p>
            <div className="humidity__range" data-range="84"></div>
          </section>
          <section className="visibility">
            <h3>Visibility</h3>
            <p>6,4 miles</p>
          </section>
          <section className="air-pressure">
            <h3>Air Pressure</h3>
            <p>998 mb</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default App;
