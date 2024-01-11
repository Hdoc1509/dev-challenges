import { useWeatherStore } from "../store/weather";
import { Wind } from "./Wind";
import "./Highlights.scss";

export const Highlights = () => {
  const weather = useWeatherStore((s) => s.weather);

  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <Wind wind={weather?.current.wind} />
      <section className="humidity">
        <h3>Humidity</h3>
        <p className="humidity__percentage">84</p>
        <div className="humidity-slider">
          <div className="humidity-slider__legend">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          {/* TODO: Use progress element */}
          <progress value="84" max="100" style={{ width: "100%" }}></progress>
          <div className="humidity-slider__bar-wrapper">
            <div className="humidity-slider__bar"></div>
            <div
              className="humidity-slider__value"
              style={{ width: "84%" }}
            ></div>
          </div>
          <span className="humidity-slider__symbol">%</span>
        </div>
      </section>
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
