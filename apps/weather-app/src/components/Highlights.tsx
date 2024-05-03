import { useWeatherStore } from "../store/weather";
import Skeleton from "react-loading-skeleton";
import { AirPressure } from "./AirPressure";
import { Humidity } from "./Humidity";
import { Wind } from "./Wind";
import { Visibility } from "./Visibility";
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
  const weather = useWeatherStore((s) => s.weather);
  const { wind, humidity, visibility, airPressure } = weather?.current ?? {};

  return (
    <article className="highlights">
      <h2>{`Today's Highlights`}</h2>
      <Wind wind={wind} />
      <Humidity humidity={humidity} />
      <Visibility visibility={visibility} />
      <AirPressure airPressure={airPressure} />
    </article>
  );
};

Highlights.Value = Value;
