import Skeleton from "react-loading-skeleton";
import "./AirPressure.scss";

export const AirPressure = ({ airPressure }: { airPressure?: number }) => {
  return (
    <section className="air-pressure">
      <h3>Air Pressure</h3>
      <p className="air-pressure__pressure">
        {airPressure == null ? (
          <Skeleton />
        ) : (
          <>
            {airPressure}
            <span className="air-pressure__pressure-unit"> mb</span>
          </>
        )}
      </p>
    </section>
  );
};
