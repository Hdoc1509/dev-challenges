import { useWeather } from "@/hooks/useWeather";
import { getWeatherIcon } from "@/utils/icons";
import Skeleton from "react-loading-skeleton";
import "./WeatherImage.scss";

export function WeatherImage() {
  const { weather } = useWeather();

  return (
    <picture className="weather-image">
      <img
        src="/cloud-background.png"
        alt="clouds"
        className="weather-image__background"
      />
      {weather == null ? (
        <div className="weather-image__loading">
          <Skeleton circle />
        </div>
      ) : (
        <img
          src={`/icons/${getWeatherIcon(weather.current.condition.code)}.png`}
          alt={weather.current.condition.name}
          className="weather-image__icon"
        />
      )}
    </picture>
  );
}
