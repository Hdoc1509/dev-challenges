import { Highlights } from "./Highlights";
import "./Visibility.scss";

export const Visibility = ({ visibility }: { visibility?: number }) => {
  return (
    <section className="visibility">
      <h3>Visibility</h3>
      <Highlights.Value value={visibility} unit="miles" />
    </section>
  );
};
