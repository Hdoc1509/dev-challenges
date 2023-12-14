import { Icon } from "@hdoc/react-material-icons";
import "./Highlights.scss";

export const Highlights = () => {
  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <section className="wind">
        <h3>Wind Status</h3>
        <p className="wind__speed">7</p>
        <p className="wind__direction">
          <span className="wind__direction-icon-wrapper">
            <Icon name="near_me" />
          </span>
          WSW
        </p>
      </section>
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
