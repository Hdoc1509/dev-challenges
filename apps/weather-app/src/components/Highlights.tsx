import { Icon } from "@hdoc/react-material-icons";
import "./Highlights.scss";

export const Highlights = () => {
  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <section className="wind">
        <h3>Wind Status</h3>
        <p>7 mph</p>
        <p className="wind_direction">
          <Icon name="near_me" />
          WSW
        </p>
      </section>
      <section className="humidity">
        <h3>Humidity</h3>
        <p>84%</p>
        <div className="humidity__range" data-range="84"></div>
      </section>
      <section className="visibility">
        <h3>Visibility</h3>
        <p>6,4 miles</p>
      </section>
      <section className="air-pressure">
        <h3>Air Pressure</h3>
        <p>998 mb</p>
      </section>
    </article>
  );
};
