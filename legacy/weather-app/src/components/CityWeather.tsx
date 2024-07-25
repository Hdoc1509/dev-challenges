import Skeleton from "react-loading-skeleton";
import { useWeatherStore } from "@/store/weather";
import { getWeatherIcon } from "@/utils/icons";
import { Button } from "@hrc/button/dist/Button";
import { ButtonIcon } from "@hrc/button/dist/ButtonIcon";
import { Icon } from "@hrc/material-icons";
import { WeatherDetails } from "./WeatherDetails";
import "./CityWeather.scss";

type Props = {
  getCurrentWeather: () => void;
  openDrawer: () => void;
};

export const CityWeather = ({ openDrawer, getCurrentWeather }: Props) => {
  const weather = useWeatherStore((s) => s.weather);

  return (
    <aside className="weather">
      <header>
        <Button
          className="weather__search"
          color="secondary"
          rounded="none"
          onClick={openDrawer}
        >
          Search for places
        </Button>
        <ButtonIcon
          color="secondary"
          rounded="full"
          onClick={getCurrentWeather}
          aria-label="Get current location weather"
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
        {weather == null ? (
          <div className="weather-image__loading">
            <Skeleton circle />
          </div>
        ) : (
          <img
            src={`/icons/${getWeatherIcon(weather.current.condition.code)}.png`}
            alt="shower"
            className="weather-image__icon"
          />
        )}
      </picture>
      <WeatherDetails />
    </aside>
  );
};
