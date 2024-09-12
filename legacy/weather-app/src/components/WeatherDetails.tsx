import { useTemperatureUnitStore } from "@/store/temperature-unit";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { getCurrentDate } from "@/utils/date";
import { stringifyLocation } from "@/utils/location";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@hrc/material-icons";
import "./WeatherDetails.scss";

export const WeatherDetails = () => {
  const { weather } = useCurrentWeather();
  const temperatureUnit = useTemperatureUnitStore((s) => s.unit);
  const { current, location } = weather ?? {};

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
        {location == null ? <Skeleton /> : stringifyLocation(location)}
      </p>
    </>
  );
};
