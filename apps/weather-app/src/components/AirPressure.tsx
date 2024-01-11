import "./AirPressure.scss";

export const AirPressure = ({ airPressure }: { airPressure?: number }) => {
  return (
    <section className="air-pressure">
      <h3>Air Pressure</h3>
      <p className="air-pressure__pressure">{airPressure}</p>
    </section>
  );
};
