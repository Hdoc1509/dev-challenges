import { useWeatherStore } from "@/store/weather";
import { Button } from "@hrc/button/dist/Button";
import "./TemperatureConverter.scss";

export const TemperatureConverter = () => {
  const unit = useWeatherStore((s) => s.temperatureUnit);
  const setUnit = useWeatherStore((s) => s.setTemperatureUnit);

  return (
    <menu className="temperature-converter">
      <li>
        <Button
          onClick={() => setUnit("celsius")}
          aria-label="Change temperature unit to celsius"
          disabled={unit === "celsius"}
        >
          °C
        </Button>
      </li>
      <li>
        <Button
          onClick={() => setUnit("fahrenheit")}
          aria-label="Change temperature unit to fahrenheit"
          disabled={unit === "fahrenheit"}
        >
          °F
        </Button>
      </li>
    </menu>
  );
};
