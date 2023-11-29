import { Button, ButtonIcon } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import { Footer } from "@internal/components";
import "./App.scss";

const OPEN_WEATHER_MAP_API = "https://openweathermap.org/api";
const WEATHER_API = "https://www.weatherapi.com/";
const OPEN_METEO_API = "https://open-meteo.com/en/docs";
const VISUAL_CROSSING_API = "https://www.visualcrossing.com/weather-api";

function App() {
  return (
    <div className="App">
      <aside className="city-weather">
        <header>
          <Button text="Search for places" />
          <ButtonIcon icon="gps_fixed" />
        </header>
        <section>
          <img src="/shower.png" alt="shower" />
          <p className="weather-degree">15 °C</p>
          <p className="weather-description">Shower</p>
          <footer>
            <p className="weather-date">Today · Fri, 5 Jun</p>
            <p className="weather-location">
              <Icon name="location_on" />
              Helsinki
            </p>
          </footer>
        </section>
      </aside>
      <main>
        <section className="temperature-unit">
          <Button text="°C" />
          <Button text="°F" />
        </section>
        <article className="forecast">
          <article className="forecast-item">
            <h2 className="forecast-item__day">Tomorrow</h2>
            <img src="/sleet.png" alt="sleet" className="forecast-item__icon" />
            <footer className="forecast-item__degrees">
              <span>16 °C</span>
              <span>11 °C</span>
            </footer>
          </article>
          <article className="forecast-item">
            <h2 className="forecast-item__day">Sun, 7 Jun</h2>
            <img src="/snow.png" alt="snow" className="forecast-item__icon" />
            <footer className="forecast-item__degrees">
              <span>16 °C</span>
              <span>11 °C</span>
            </footer>
          </article>
          <article className="forecast-item">
            <h2 className="forecast-item__day">Mon, 8 Jun</h2>
            <img
              src="/thunderstorm.png"
              alt="thunderstorm"
              className="forecast-item__icon"
            />
            <footer className="forecast-item__degrees">
              <span>16 °C</span>
              <span>11 °C</span>
            </footer>
          </article>
          <article className="forecast-item">
            <h2 className="forecast-item__day">Tue, 9 Jun</h2>
            <img
              src="/light-cloud.png"
              alt="light-cloud"
              className="forecast-item__icon"
            />
            <footer className="forecast-item__degrees">
              <span>16 °C</span>
              <span>11 °C</span>
            </footer>
          </article>
          <article className="forecast-item">
            <h2 className="forecast-item__day">Wed, 10 Jun</h2>
            <img
              src="/heavy-rain.png"
              alt="heavy-rain"
              className="forecast-item__icon"
            />
            <footer className="forecast-item__degrees">
              <span>16 °C</span>
              <span>11 °C</span>
            </footer>
          </article>
        </article>
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
