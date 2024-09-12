import { useTemperatureUnitStore } from "@/store/temperature-unit";
import { Button } from "@hrc/button";
import "./TemperatureConverter.scss";

export const TemperatureConverter = () => {
  const unit = useTemperatureUnitStore((s) => s.unit);
  const setUnit = useTemperatureUnitStore((s) => s.setUnit);

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
