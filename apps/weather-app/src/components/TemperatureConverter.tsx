import { clsx } from "clsx";
import { useWeatherStore, type TemperatureUnit } from "../store/weather";
import { Button } from "@hdoc/react-button";
import "./TemperatureConverter.scss";

const buttonClasses = {
  base: "temperature-converter__button",
  active: "temperature-converter__button--active",
};

export const TemperatureConverter = ({ unit }: { unit: TemperatureUnit }) => {
  const setUnit = useWeatherStore((s) => s.setTemperatureUnit);

  return (
    <section className="temperature-converter">
      <Button
        text="°C"
        className={clsx(buttonClasses.base, {
          [buttonClasses.active]: unit === "celsius",
        })}
        onClick={() => setUnit("celsius")}
      />
      <Button
        text="°F"
        className={clsx(buttonClasses.base, {
          [buttonClasses.active]: unit === "fahrenheit",
        })}
        onClick={() => setUnit("fahrenheit")}
      />
    </section>
  );
};
