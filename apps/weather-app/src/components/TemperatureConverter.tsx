import { clsx } from "clsx";
import { useWeatherStore } from "../store/weather";
import { Button } from "@hrc/button/dist/Button";
import "./TemperatureConverter.scss";

export const TemperatureConverter = () => {
  const unit = useWeatherStore((s) => s.temperatureUnit);
  const setUnit = useWeatherStore((s) => s.setTemperatureUnit);

  return (
    <menu className="temperature-converter">
      <li>
        <Button
          className={clsx("converter-button", { active: unit === "celsius" })}
          onClick={() => setUnit("celsius")}
        >
          °C
        </Button>
      </li>
      <li>
        <Button
          className={clsx("converter-button", {
            active: unit === "fahrenheit",
          })}
          onClick={() => setUnit("fahrenheit")}
        >
          °F
        </Button>
      </li>
    </menu>
  );
};
