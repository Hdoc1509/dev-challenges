import { useWeatherStore } from "../store/weather";
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
      <section className="air-pressure">
        <h3>Air Pressure</h3>
        <p className="air-pressure__pressure">998</p>
      </section>
    </article>
  );
};
