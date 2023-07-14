import classNames from "classnames";
import "./Button.scss";

export const Button = ({ variant }) => {
  const btnClass = classNames("btn", {
    [`btn--${variant}`]: variant !== undefined,
  });

  return <button className={btnClass}>Default</button>;
};
