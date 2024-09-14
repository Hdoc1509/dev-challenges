import { useWeather } from "@/hooks/useWeather";
import { ForecastItem } from "./ForecastItem";
import "./Forecast.scss";

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
