import './Visibility.scss';

export const Visibility = ({ visibility }: { visibility?: number }) => {
  return (
    <section className="visibility">
      <h3>Visibility</h3>
      <p className="visibility__distance">{visibility}</p>
    </section>
  );
};
