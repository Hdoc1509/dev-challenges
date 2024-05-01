import Skeleton from "react-loading-skeleton";
import { useWeatherStore } from "../store/weather";
import { getWeatherIcon } from "../utils/icons";
import { Button } from "@hrc/button/dist/Button";
import { ButtonIcon } from "@hrc/button/dist/ButtonIcon";
import { Icon } from "@hrc/material-icons";
import { WeatherDetails } from "./WeatherDetails";
import "./CityWeather.scss";

type Props = {
  getCurrentLocationWeather: () => void;
  openDrawer: () => void;
};

export const CityWeather = ({
  openDrawer,
  getCurrentLocationWeather,
}: Props) => {
  const weather = useWeatherStore((s) => s.weather);
  const isLoading = weather == null;

  return (
    <aside className="weather">
      <header>
        <Button
          className="weather__search"
          color="secondary"
          onClick={openDrawer}
        >
          Search for places
        </Button>
        <ButtonIcon
          className="weather__current"
          color="secondary"
          onClick={getCurrentLocationWeather}
        >
          <Icon name="gps_fixed" />
        </ButtonIcon>
      </header>
      <picture className="weather-image">
        <img
          src="/cloud-background.png"
          alt="clouds"
          className="weather-image__background"
        />
        {isLoading ? (
          <div className="weather-image__loading">
            <Skeleton circle />
          </div>
        ) : (
          <img
            src={`/weather/${getWeatherIcon(
              weather.current.condition.code,
            )}.png`}
            alt="shower"
            className="weather-image__icon"
          />
        )}
      </picture>
      <WeatherDetails weather={weather} />
    </aside>
  );
};
