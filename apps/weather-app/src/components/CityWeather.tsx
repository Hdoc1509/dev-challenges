import Skeleton from "react-loading-skeleton";
import { Button, ButtonIcon } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import { useWeatherStore } from "../store/weather";
import { getCurrentDate } from "../utils/date";
import { getWeatherIcon } from "../utils/icons";
import type { Weather } from "../schemas/weather";
import "./CityWeather.scss";

const WeatherDetails = ({ weather }: { weather: Weather | null }) => {
  const temperatureUnit = useWeatherStore((s) => s.temperatureUnit);
  const current = weather?.current;
  const location = weather?.location;

  return (
    <>
      <p className="weather__degree">
        {current == null ? (
          <Skeleton />
        ) : (
          <>
            {current.temperature[temperatureUnit]}
            <span className="weather__degree-unit">
              °{temperatureUnit[0].toUpperCase()}
            </span>
          </>
        )}
      </p>
      <p className="weather__description">
        {current?.condition.name ?? <Skeleton />}
      </p>
      <p className="weather__date">
        {current == null ? <Skeleton /> : `Today • ${getCurrentDate()}`}
      </p>
      <p className="weather__location">
        {location == null ? (
          <Skeleton />
        ) : (
          <>
            <Icon name="location_on" />
            {location.name}, {location.country}
          </>
        )}
      </p>
    </>
  );
};

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
