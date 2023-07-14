import classNames from "classnames";
import "./Button.scss";

export const Button = ({ variant, disableShadow }) => {
  const btnClass = classNames("btn", {
    [`btn--${variant}`]: variant !== undefined,
    ["btn--no-shadow"]: disableShadow,
  });

  return <button className={btnClass}>Default</button>;
};
