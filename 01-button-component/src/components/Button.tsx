import classNames from "classnames";
import "./Button.scss";

type Props = {
  variant?: "outline" | "text";
  disableShadow?: boolean;
};

export const Button = ({ variant, disableShadow = false }: Props) => {
  const btnClass = classNames("btn", {
    [`btn--${variant}`]: variant !== undefined,
    ["btn--no-shadow"]: disableShadow,
  });

  return <button className={btnClass}>Default</button>;
};
