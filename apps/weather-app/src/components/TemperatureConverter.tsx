import { clsx } from "clsx";
import { useWeatherStore } from "../store/weather";
import { Button } from "@hrc/button";
import "./TemperatureConverter.scss";

export const TemperatureConverter = () => {
  const unit = useWeatherStore((s) => s.temperatureUnit);
  const setUnit = useWeatherStore((s) => s.setTemperatureUnit);

  return (
    <section className="temperature-converter">
      <Button
        className={clsx("converter-button", { active: unit === "celsius" })}
        onClick={() => setUnit("celsius")}
      >
        °C
      </Button>
      <Button
        className={clsx("converter-button", { active: unit === "fahrenheit" })}
        onClick={() => setUnit("fahrenheit")}
      >
        °F
      </Button>
    </section>
  );
};
