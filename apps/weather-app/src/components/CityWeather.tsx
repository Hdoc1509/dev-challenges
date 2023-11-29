import { Button, ButtonIcon } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import "./CityWeather.scss";

export const CityWeather = () => {
  return (
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
  );
};
