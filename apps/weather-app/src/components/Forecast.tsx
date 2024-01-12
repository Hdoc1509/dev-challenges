import { useWeatherStore } from "../store/weather";
import { getWeatherIcon } from "../utils/icons";
import "./Forecast.scss";

export const Forecast = () => {
  const forecast = useWeatherStore((s) => s.forecast);
  const temperatureUnit = useWeatherStore((s) => s.temperatureUnit);

  if (forecast == null) {
    return <div className="forecast__loading">Loading forecast...</div>;
  }

  const temperatureUnitLetter = temperatureUnit[0].toUpperCase();

  return (
    <article className="forecast">
      {forecast.map(({ day, condition, temperature }) => (
        <article key={day} className="forecast-item">
          <h2 className="forecast-item__day">{day}</h2>
          <img
            src={`/weather/${getWeatherIcon(condition.code)}.png`}
            alt={condition.name}
            className="forecast-item__icon"
          />
          <p className="forecast-item__degrees">
            <span>
              {temperature.max[temperatureUnit]}°{temperatureUnitLetter}
            </span>
            <span>
              {temperature.min[temperatureUnit]}°{temperatureUnitLetter}
            </span>
          </p>
        </article>
      ))}
    </article>
  );
};
