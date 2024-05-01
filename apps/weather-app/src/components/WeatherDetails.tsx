import { useWeatherStore } from "../store/weather";
import { getCurrentDate } from "../utils/date";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@hrc/material-icons";
import type { Weather } from "../schemas/weather";
import "./WeatherDetails.scss";

export const WeatherDetails = ({ weather }: { weather: Weather | null }) => {
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
