import { useWeatherStore } from "../store/weather";
import { getCurrentDate } from "../utils/date";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@hrc/material-icons";
import "./WeatherDetails.scss";

export const WeatherDetails = () => {
  const weather = useWeatherStore((s) => s.weather);
  const temperatureUnit = useWeatherStore((s) => s.temperatureUnit);
  const { current, location } = weather ?? {};
  const locationName = `${location?.name}, ${location?.country}`;

  return (
    <>
      <span className="weather__degree">
        {current?.temperature[temperatureUnit] ?? <Skeleton inline />}
        <span className="weather__degree-unit">
          {` °${temperatureUnit[0].toUpperCase()}`}
        </span>
      </span>
      <p className="weather__description">
        {current?.condition.name ?? <Skeleton />}
      </p>
      <p className="weather__date">
        {current == null ? <Skeleton /> : `Today • ${getCurrentDate()}`}
      </p>
      <p className="weather__location">
        <Icon name="location_on" />
        {location == null ? <Skeleton /> : locationName}
      </p>
    </>
  );
};
