import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@hrc/material-icons";
import { Highlights } from "./Highlights";
import type { Wind as WindType } from "@/types";
import "./Wind.scss";

const getWindDegree = (degree: number) =>
  ({ "--wind-degree": `${degree}deg` }) as React.CSSProperties;

export const Wind = ({ wind }: { wind?: WindType }) => {
  const { speed, directionDegree } = wind ?? {};
  const lastDegree = useRef(0);

  if (directionDegree != null) lastDegree.current = directionDegree;

  return (
    <section className="wind">
      <h3>Wind Status</h3>
      <Highlights.Value value={speed} unit="mph" />
      <p className="wind__direction" style={getWindDegree(lastDegree.current)}>
        <span className="wind__direction-icon-wrapper">
          <Icon name="near_me" />
        </span>
        {wind == null ? <Skeleton /> : wind.direction}
      </p>
    </section>
  );
};
