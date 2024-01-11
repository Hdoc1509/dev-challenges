import { Icon } from "@hdoc/react-material-icons";
import type { CSSProperties } from "react";
import type { WeatherWind } from "../schemas/weather";
import "./Wind.scss";

interface CustomCSS extends CSSProperties {
  "--wind-degree": `${number}deg`;
}

export const Wind = ({ wind }: { wind?: WeatherWind }) => {
  const isLoading = wind == null;

  return (
    <section className="wind">
      <h3>Wind Status</h3>
      {isLoading ? (
        <div className="wind__loading">Loading...</div>
      ) : (
        <>
          <p className="wind__speed">{wind.speed}</p>
          <p className="wind__direction">
            <span
              className="wind__direction-icon-wrapper"
              style={
                {
                  "--wind-degree": `${wind.directionDegree}deg`,
                } as CustomCSS
              }
            >
              <Icon name="near_me" />
            </span>
            {wind.direction}
          </p>
        </>
      )}
    </section>
  );
};
