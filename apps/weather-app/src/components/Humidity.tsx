import Skeleton from "react-loading-skeleton";
import { Highlights } from "./Highlights";
import "./Humidity.scss";

export const Humidity = ({ humidity }: { humidity?: number }) => {
  return (
    <section className="humidity">
      <h3>Humidity</h3>
      <Highlights.Value value={humidity} unit="%" />
      <div className="humidity-slider">
        <div className="humidity-slider__legend">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div className="humidity-slider__bar">
          {humidity == null ? (
            <Skeleton containerClassName="flex-1" />
          ) : (
            <div
              className="humidity-slider__value"
              style={{ width: `${humidity}%` }}
            ></div>
          )}
        </div>
        <span className="humidity-slider__symbol">%</span>
      </div>
    </section>
  );
};
