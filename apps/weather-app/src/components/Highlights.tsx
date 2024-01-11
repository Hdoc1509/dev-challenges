import { useWeatherStore } from "../store/weather";
import { AirPressure } from "./AirPressure";
import { Humidity } from "./Humidity";
import { Wind } from "./Wind";
import { Visibility } from "./Visibility";
import "./Highlights.scss";

export const Highlights = () => {
  const weather = useWeatherStore((s) => s.weather);

  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <Wind wind={weather?.current.wind} />
      <Humidity humidity={weather?.current.humidity} />
      <Visibility visibility={weather?.current.visibility} />
      <AirPressure airPressure={weather?.current.airPressure} />
    </article>
  );
};
