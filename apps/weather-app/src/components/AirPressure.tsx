import { Highlights } from "./Highlights";
import "./AirPressure.scss";

export const AirPressure = ({ airPressure }: { airPressure?: number }) => {
  return (
    <section className="air-pressure">
      <h3>Air Pressure</h3>
      <Highlights.Value value={airPressure} unit="mb" />
    </section>
  );
};
