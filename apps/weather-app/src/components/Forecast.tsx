import Skeleton from "react-loading-skeleton";
import {
  useWeatherStore,
  type Forecast as ForecastType,
} from "../store/weather";
import { getWeatherIcon } from "../utils/icons";
import "./Forecast.scss";

const ForecastDay = ({ day }: { day?: ForecastType }) => {
  const temperatureUnit = useWeatherStore((s) => s.temperatureUnit);
  const temperatureUnitLetter = temperatureUnit[0].toUpperCase();
  const condition = day?.condition;
  const temperature = day?.temperature;

  return (
    <article className="forecast-item">
      <h2 className="forecast-item__day">{day?.day ?? <Skeleton />}</h2>
      <picture className="forecast-item__icon">
        {condition == null ? (
          <Skeleton />
        ) : (
          <img
            src={`/weather/${getWeatherIcon(condition.code)}.png`}
            alt={condition.name}
          />
        )}
      </picture>
      <p className="forecast-item__degrees">
        <span>
          {temperature == null ? (
            <Skeleton />
          ) : (
            `${temperature.max[temperatureUnit]}°${temperatureUnitLetter}`
          )}
        </span>
        <span>
          {temperature == null ? (
            <Skeleton />
          ) : (
            `${temperature.min[temperatureUnit]}°${temperatureUnitLetter}`
          )}
        </span>
      </p>
    </article>
  );
};

export const Forecast = () => {
  const forecast = useWeatherStore((s) => s.forecast);

  return (
    <article className="forecast">
      <ForecastDay day={forecast?.[0]} />
      <ForecastDay day={forecast?.[1]} />
      <ForecastDay day={forecast?.[2]} />
      <ForecastDay day={forecast?.[3]} />
      <ForecastDay day={forecast?.[4]} />
    </article>
  );
};
