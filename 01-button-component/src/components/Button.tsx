import classNames from "classnames";
import "./Button.scss";

type Props = {
  variant?: "outline" | "text";
  disableShadow?: boolean;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  iconStyle?: "outlined" | "round" | "sharp" | "two-tone";
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary" | "danger";
};

export const Button = ({
  variant,
  disableShadow = false,
  disabled = false,
  startIcon,
  endIcon,
  iconStyle,
  size = "md",
  color,
}: Props) => {
  const btnClass = classNames("btn", {
    [`btn--${variant}`]: variant !== undefined,
    ["btn--no-shadow"]: disableShadow,
    [`btn--${size}`]: size !== undefined,
    [`btn--${color}`]: color !== undefined && color !== "default",
  });
  const iconClass = classNames("md-18", {
    ["material-icons"]: iconStyle === undefined,
    [`material-icons-${iconStyle}`]: iconStyle !== undefined,
  });

  return (
    <button className={btnClass} disabled={disabled}>
      {startIcon && <span className={iconClass}>{startIcon}</span>}
      Default
      {endIcon && <span className={iconClass}>{endIcon}</span>}
    </button>
  );
};
