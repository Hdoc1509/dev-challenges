import { Button } from "@hdoc/react-button";
import "./TemperatureConverter.scss";

export const TemperatureConverter = () => {
  return (
    <section className="temperature-converter">
      <Button text="°C" />
      <Button text="°F" />
    </section>
  );
};
