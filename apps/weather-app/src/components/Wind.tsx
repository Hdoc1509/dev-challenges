import Skeleton from "react-loading-skeleton";
import { Icon } from "@hdoc/react-material-icons";
import { Highlights } from "./Highlights";
import type { CSSProperties } from "react";
import type { WeatherWind } from "../schemas/weather";
import "./Wind.scss";

interface CustomCSS extends CSSProperties {
  "--wind-degree": `${number}deg`;
}

export const Wind = ({ wind }: { wind?: WeatherWind }) => {
  return (
    <section className="wind">
      <h3>Wind Status</h3>
      <Highlights.Value value={wind?.speed} unit="mph" />
      <p className="wind__direction">
        {wind == null ? (
          <Skeleton />
        ) : (
          <>
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
          </>
        )}
      </p>
    </section>
  );
};
