import classNames from "classnames";
import "./Button.scss";
import { ComponentProps } from "react";
import type { MaterialIcon } from "@material-design-icons/font";

// Taken from https://stackoverflow.com/a/76212204
type Prettify<T> = T extends infer R
  ? {
      [K in keyof R]: R[K];
    }
  : never;

type Props = Prettify<{
  variant?: "outline" | "text";
  disableShadow?: boolean;
  disabled?: boolean;
  startIcon?: MaterialIcon;
  endIcon?: MaterialIcon;
  iconStyle?: "outlined" | "round" | "sharp" | "two-tone";
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary" | "danger";
} & Omit<ComponentProps<"button">, 'className'>>;

export const Button = ({
  variant,
  disableShadow = false,
  startIcon,
  endIcon,
  iconStyle,
  size = "md",
  color,
  ...restProps
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
    <button {...restProps} className={btnClass}>
      {startIcon && <span className={iconClass}>{startIcon}</span>}
      Default
      {endIcon && <span className={iconClass}>{endIcon}</span>}
    </button>
  );
};
