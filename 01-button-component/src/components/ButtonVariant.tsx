import './ButtonVariant.scss'

export const ButtonVariant = ({ name, children }) => {
  return (
    <span className="button-variant">
      <p className="button-variant__name">{name}</p>
      {children}
    </span>
  );
};
