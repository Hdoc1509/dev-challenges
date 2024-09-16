import Skeleton from "react-loading-skeleton";
import { Highlights } from "./Highlights";
import { Meter } from "@/components/Meter";
import "./Humidity.scss";

export const Humidity = ({ humidity }: { humidity?: number }) => {
  return (
    <section className="humidity">
      <h3>Humidity</h3>
      <Highlights.Value value={humidity} unit="%" />
      <Meter
        value={humidity}
        trackFallback={<Skeleton containerClassName="flex-1" />}
        unit="%"
        marks
      />
    </section>
  );
};
