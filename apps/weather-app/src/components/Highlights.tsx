import { useWeatherStore } from "../store/weather";
import { Humidity } from "./Humidity";
import { Wind } from "./Wind";
import "./Highlights.scss";

export const Highlights = () => {
  const weather = useWeatherStore((s) => s.weather);

  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <Wind wind={weather?.current.wind} />
      <Humidity humidity={weather?.current.humidity} />
      <section className="visibility">
        <h3>Visibility</h3>
        <p className="visibility__distance">6,4</p>
      </section>
      <section className="air-pressure">
        <h3>Air Pressure</h3>
        <p className="air-pressure__pressure">998</p>
      </section>
    </article>
  );
};
