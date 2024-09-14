import Skeleton from "react-loading-skeleton";
import { useTemperatureUnitStore } from "@/store/temperature-unit";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherIcon } from "@/utils/icons";
import type { Forecast as ForecastType } from "@/types";
import "./Forecast.scss";

const ForecastItem = ({ day }: { day?: ForecastType }) => {
  const temperatureUnit = useTemperatureUnitStore((s) => s.unit);
  const temperatureUnitLetter = temperatureUnit[0].toUpperCase();
  const { condition, temperature } = day ?? {};
  const maxTemp = `${temperature?.max[temperatureUnit]}°${temperatureUnitLetter}`;
  const minTemp = `${temperature?.min[temperatureUnit]}°${temperatureUnitLetter}`;

  return (
    <article className="forecast-item">
      <h2 className="forecast-item__day">{day?.day ?? <Skeleton />}</h2>
      <picture className="forecast-item__icon">
        {condition == null ? (
          <Skeleton />
        ) : (
          <img
            src={`/icons/${getWeatherIcon(condition.code)}.png`}
            alt={condition.name}
          />
        )}
      </picture>
      <p className="forecast-item__degrees">
        <span>{temperature == null ? <Skeleton /> : maxTemp}</span>
        <span>{temperature == null ? <Skeleton /> : minTemp}</span>
      </p>
    </article>
  );
};

export const Forecast = () => {
  const { forecast } = useWeather();

  return (
    <article className="forecast">
      <ForecastItem day={forecast?.[0]} />
      <ForecastItem day={forecast?.[1]} />
      <ForecastItem day={forecast?.[2]} />
      <ForecastItem day={forecast?.[3]} />
      <ForecastItem day={forecast?.[4]} />
    </article>
  );
};
