import { Button, ButtonIcon } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import "./CityWeather.scss";

export const CityWeather = () => {
  return (
    <aside className="weather">
      <header>
        <Button text="Search for places" className="weather__search" />
        <ButtonIcon icon="gps_fixed" className="weather__current" />
      </header>
      <img src="/shower.png" alt="shower" className="weather__icon" />
      <p className="weather__degree">
        15<span className="weather__degree-unit">℃</span>
      </p>
      <p className="weather__description">Shower</p>
      <p className="weather__date">Today • Fri, 5 Jun</p>
      <p className="weather__location">
        <Icon name="location_on" />
        Helsinki
      </p>
    </aside>
  );
};
