import { useTemperatureUnitStore } from "@/store/temperature-unit";
import { getWeatherIcon } from "@/utils/icons";
import Skeleton from "react-loading-skeleton";
import type { Forecast } from "@/types";
import "./ForecastItem.scss";

export const ForecastItem = ({ day }: { day?: Forecast }) => {
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
