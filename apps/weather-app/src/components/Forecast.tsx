import { useWeatherStore } from "../store/weather";
import { getWeatherIcon } from "../utils/icons";
import "./Forecast.scss";

export const Forecast = () => {
  const forecast = useWeatherStore((s) => s.forecast);

  if (forecast == null) {
    return <div className="forecast__loading">Loading forecast...</div>;
  }

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
            <span>{temperature.max}℃</span>
            <span>{temperature.min}℃</span>
          </p>
        </article>
      ))}
    </article>
  );
};
