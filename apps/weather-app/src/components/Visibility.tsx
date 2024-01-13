import Skeleton from "react-loading-skeleton";
import "./Visibility.scss";

export const Visibility = ({ visibility }: { visibility?: number }) => {
  return (
    <section className="visibility">
      <h3>Visibility</h3>
      <p className="visibility__distance">
        {visibility == null ? (
          <Skeleton />
        ) : (
          <>
            {visibility}
            <span className="visibility__distance-unit"> miles</span>
          </>
        )}
      </p>
    </section>
  );
};
