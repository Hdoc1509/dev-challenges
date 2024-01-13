import Skeleton from "react-loading-skeleton";
import { useWeatherStore } from "../store/weather";
import { getWeatherIcon } from "../utils/icons";
import { Button, ButtonIcon } from "@hdoc/react-button";
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
          text="Search for places"
          className="weather__search"
          onClick={openDrawer}
        />
        <ButtonIcon
          icon="gps_fixed"
          className="weather__current"
          onClick={getCurrentLocationWeather}
        />
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
