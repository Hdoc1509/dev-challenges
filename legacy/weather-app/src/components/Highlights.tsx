import { useWeather } from "@/hooks/useWeather";
import Skeleton from "react-loading-skeleton";
import { Humidity } from "./Humidity";
import { Wind } from "./Wind";
import "./Highlights.scss";

const Value = ({ value, unit }: { value?: number; unit: string }) => {
  return (
    <p className="highlights__value">
      {value ?? <Skeleton inline />}
      <span className="highlights__unit"> {unit}</span>
    </p>
  );
};

export const Highlights = () => {
  const { weather } = useWeather();
  const { wind, humidity, visibility, airPressure } = weather?.current ?? {};

  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <Wind wind={wind} />
      <Humidity humidity={humidity} />
      <section className="visibility">
        <h3>Visibility</h3>
        <Value value={visibility} unit="miles" />
      </section>
      <section className="air-pressure">
        <h3>Air Pressure</h3>
        <Value value={airPressure} unit="mb" />
      </section>
    </article>
  );
};

Highlights.Value = Value;
