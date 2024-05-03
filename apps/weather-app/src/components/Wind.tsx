import Skeleton from "react-loading-skeleton";
import { Icon } from "@hrc/material-icons";
import { Highlights } from "./Highlights";
import { useRef, type CSSProperties } from "react";
import type { WeatherWind } from "../schemas/weather";
import "./Wind.scss";

interface CustomCSS extends CSSProperties {
  "--wind-degree": `${number}deg`;
}

export const Wind = ({ wind }: { wind?: WeatherWind }) => {
  const { speed, directionDegree } = wind ?? {};
  const lastDegree = useRef(0);

  if (directionDegree != null) lastDegree.current = directionDegree;

  return (
    <section className="wind">
      <h3>Wind Status</h3>
      <Highlights.Value value={speed} unit="mph" />
      <p className="wind__direction">
        <span
          className="wind__direction-icon-wrapper"
          style={
            {
              "--wind-degree": `${lastDegree.current}deg`,
            } as CustomCSS
          }
        >
          <Icon name="near_me" />
        </span>
        {wind == null ? <Skeleton /> : wind.direction}
      </p>
    </section>
  );
};
